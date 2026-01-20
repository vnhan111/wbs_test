using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg.OpenPgp;
using WBS_backend.Data;
using WBS_backend.DTOs;
using WBS_backend.DTOs.RequestDTOs;
using WBS_backend.DTOs.ResponseDTOs;
using WBS_backend.Entities;
using WBS_backend.Services.Interfaces;
namespace WBS_backend.Services
{
    public class ProjectMemberService : IProjectMemberService
    {
        private readonly AppDbContext _context;
        public ProjectMemberService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectMemberResponse>> GetAllMemberByProjectIdAsync (int id)
        {
            return await _context.ProjectMembers
                .Include(pm => pm.Project)
                .Include(pm => pm.Member)
                .Include(pm => pm.Level)
                .Include(pm => pm.Role)
                .Where(pm => pm.ProjectId == id && !pm.Project.ProjectDeleteStatus)
                .Select(pm => new ProjectMemberResponse
                {
                    MediateProjectMemberId = pm.MediateProjectMemberId,
                    MemberId = pm.MemberId,
                    MemberFullName = pm.Member.MemberFullName ?? "Unknown",
                    RoleId = pm.RoleId ?? 0,
                    RoleName = pm.Role != null ? pm.Role.RoleName : null,
                    StartDate = pm.StartDate,
                    EndDate   = pm.EndDate,
                    IsCurrent = pm.IsCurrent
                })
                .OrderBy(r => r.MemberFullName)
                .ThenByDescending(r => r.StartDate)
                .ToListAsync();
        }
        public async Task<List<RoleProjectMemberResponse>> GetAllRoleAsync()
        {
            return await _context.Roles
                .Select(r => new RoleProjectMemberResponse
                {
                    RoleId = r.RoleId,
                    RoleName = r.RoleName
                })
                .ToListAsync();
        }
         public async Task<ProjectMemberResponse> AddMemberForProjectId(int idProject,ProjectMemberRequest projectMemberRequest)
        {
            var projectExists = await _context.Projects.FindAsync(idProject) ?? throw new KeyNotFoundException($"Không tìm thấy project với id = {idProject}");
            var memberExists = await _context.Members.AnyAsync(m => m.MemberId == projectMemberRequest.MemberId);
            if (!memberExists)
            {
                throw new KeyNotFoundException($"Không tìm thấy member với id = {projectMemberRequest.MemberId}");
            }
            var duplicate = await _context.ProjectMembers.AnyAsync(pm => pm.ProjectId == idProject && pm.MemberId == projectMemberRequest.MemberId);
            if (duplicate)
            {
                throw new KeyNotFoundException($"Member với id = {projectMemberRequest.MemberId} đã tồn tại trong Project với id = {idProject}");
            }
            var project_member = new ProjectMember
            {
                ProjectId = idProject,
                MemberId = projectMemberRequest.MemberId,
                RoleId = projectMemberRequest.RoleId,
                StartDate = projectMemberRequest.StartDate,
                EndDate = projectMemberRequest.EndDate,
                IsCurrent = projectMemberRequest.IsCurrent ?? true
            };
            _context.ProjectMembers.Add(project_member);
            await _context.SaveChangesAsync();

            await _context.Entry(project_member).Reference(pm => pm.Member).LoadAsync();
            await _context.Entry(project_member).Reference(pm => pm.Role).LoadAsync();
            
            return new ProjectMemberResponse
            {
                MediateProjectMemberId = project_member.MediateProjectMemberId,
                MemberId = project_member.MemberId,
                MemberFullName = project_member.Member.MemberFullName ?? "null",
                RoleId = project_member.RoleId ?? 0,
                RoleName = project_member.Role?.RoleName,
                StartDate = project_member.StartDate,
                EndDate = project_member.EndDate,
                IsCurrent = project_member.IsCurrent
            };
        }
    }
}