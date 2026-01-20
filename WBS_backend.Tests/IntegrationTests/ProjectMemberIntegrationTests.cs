using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WBS_backend.Data;
using WBS_backend.DTOs;
using WBS_backend.DTOs.RequestDTOs;
using WBS_backend.DTOs.ResponseDTOs;
using WBS_backend.Entities;

namespace WBS_backend.Tests.Integration
{
    public class ProjectMemberIntegrationTests  : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public ProjectMemberIntegrationTests(WebApplicationFactory<Program> factory)
        {
            // Tùy biến host cho test: dùng InMemory DB + seed dữ liệu
            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Bỏ cấu hình DbContext dùng MySQL
                    var descriptor = services.SingleOrDefault(
                        d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
                    if (descriptor != null)
                    {
                        services.Remove(descriptor);
                    }

                    // Thay bằng InMemory database cho test (tên riêng cho class này để tránh đụng nhau)
                    services.AddDbContext<AppDbContext>(options =>
                        options.UseInMemoryDatabase("ProjectIntegrationTestDb_ProjectMember"));

                    // Build provider để seed dữ liệu
                    var sp = services.BuildServiceProvider();
                    using var scope = sp.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                    db.Database.EnsureCreated();

                    // Seed dữ liệu phụ thuộc nếu cần (status, member lead,…)
                    if (!db.ProjectStatus.Any())
                    {
                        db.ProjectStatus.Add(new ProjectStatus
                        {
                            ProjectStatusId = 1,
                            StatusName = "New"
                        });
                    }

                    if (!db.Members.Any())
                    {
                        db.Members.Add(new Member
                        {
                            MemberId = 1,
                            LoginName = "leader",
                            MemberFullName = "Leader Test",
                            Email = "leader@test.com",
                            IsActive = true
                        });
                    }

                    db.SaveChanges();

                    // Cấu hình authentication giả cho test, bypass [Authorize]
                    services.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = "Test";
                        options.DefaultChallengeScheme = "Test";
                    })
                    .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>("Test", options => { });
                });
            });
        }

        [Fact]
        public async Task PostMemberInProject_Should_returnOk()
        {
            var client = _factory.CreateClient();
            var scope = _factory.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var member = new Member
            {
                LoginName = "a",
                Password = "123456",
                Email = "a@gmail.com",
                MemberFullName = "User A",
                IsActive = true
            };
            db.Members.Add(member);
            await db.SaveChangesAsync();

            var request = new CreateProjectRequest
            {
                ProjectCode = "PRJ-IT-001",
                ProjectName = "Integration Test Project",
                ProjectStatusId = 1,
                ExpectedStartDate = new DateTime(2024, 1, 1),
                ExpectedEndDate = new DateTime(2024, 12, 31),
                ProjectLeadId = 1
            };

            var role = new Role
            {
                RoleName = "leader"
            };
            db.Roles.Add(role);
            await db.SaveChangesAsync();

            var response_project = await client.PostAsJsonAsync("/api/Project/create", request);

            response_project.StatusCode.Should().Be(HttpStatusCode.OK);

            var createdProject = await response_project.Content.ReadFromJsonAsync<Project>();
            createdProject.Should().NotBeNull();
            createdProject!.ProjectId.Should().BeGreaterThan(0);
            createdProject.ProjectName.Should().Be(request.ProjectName);
            createdProject.ProjectCode.Should().Be(request.ProjectCode);
            createdProject.ProjectStatusId.Should().Be(request.ProjectStatusId);
            createdProject.ProjectLeadId.Should().Be(request.ProjectLeadId);

            member.MemberId.Should().BeGreaterThan(0);
            role.RoleId.Should().BeGreaterThan(0);

            var projectmember_request = new ProjectMemberRequest
            {
                MemberId = member.MemberId,
                RoleId = role.RoleId,
                StartDate = new DateTime(2025,1,1),
                EndDate = new DateTime(2026,1,1),
                IsCurrent = true
            };

            var response = await client.PostAsJsonAsync($"/api/projectmember/{createdProject.ProjectId}", projectmember_request);
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var checked_projectmember = await response.Content.ReadFromJsonAsync<ProjectMemberResponse>();
            checked_projectmember.Should().NotBeNull();
            checked_projectmember!.MediateProjectMemberId.Should().BeGreaterThan(0);
            checked_projectmember.MemberId.Should().Be(member.MemberId);
            checked_projectmember.RoleId.Should().Be(role.RoleId);

            var projectMemberInDb = await db.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.MediateProjectMemberId == checked_projectmember.MediateProjectMemberId);

            projectMemberInDb.Should().NotBeNull();
            projectMemberInDb!.ProjectId.Should().Be(createdProject.ProjectId);

            // PostMemberInProject_Should_Project_Notfound
            var response_notfound_projectid = await client.PostAsJsonAsync($"/api/projectmember/{createdProject.ProjectId + 999}", projectmember_request);
            response_notfound_projectid.StatusCode.Should().Be(HttpStatusCode.NotFound);

            //PostMemberInProject_Should_Member_Notfound
            var projectmember_request_member_notfound = new ProjectMemberRequest
            {
                MemberId = 999,
                RoleId = role.RoleId,
                StartDate = new DateTime(2025,1,1),
                EndDate = new DateTime(2026,1,1),
                IsCurrent = true
            };

            var response_notfound_memberid = await client.PostAsJsonAsync($"/api/projectmember/{createdProject.ProjectId}", projectmember_request_member_notfound);
            response_notfound_memberid.StatusCode.Should().Be(HttpStatusCode.NotFound);

            scope.Dispose();
        }
    }
}