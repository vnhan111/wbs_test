using System.Collections.Generic;
using FluentAssertions;
using WBS_backend.Entities;
using Xunit;

namespace WBS_backend.Tests.Entities
{
    public class ProjectStatusTests
    {
        [Fact]
        public void Constructor_Should_Set_Default_Values()
        {
            var status = new ProjectStatus();

            status.ProjectStatusId.Should().Be(0);
            status.StatusName.Should().Be(string.Empty);
            status.StatusDescription.Should().BeNull();
            status.StatusColor.Should().BeNull();
            status.SortOrder.Should().Be(0);
            status.IsActive.Should().BeTrue();
            status.Projects.Should().NotBeNull();
            status.Projects.Should().BeEmpty();
        }

        [Fact]
        public void Properties_Should_Be_Settable()
        {
            var status = new ProjectStatus
            {
                ProjectStatusId = 1,
                StatusName = "In Progress",
                StatusDescription = "Project is currently in progress",
                StatusColor = "#00FF00",
                SortOrder = 10,
                IsActive = false
            };

            var project = new Project
            {
                ProjectId = 100,
                ProjectName = "Test Project",
                ProjectCode = "PRJ100"
            };

            status.Projects.Add(project);

            status.ProjectStatusId.Should().Be(1);
            status.StatusName.Should().Be("In Progress");
            status.StatusDescription.Should().Be("Project is currently in progress");
            status.StatusColor.Should().Be("#00FF00");
            status.SortOrder.Should().Be(10);
            status.IsActive.Should().BeFalse();
            status.Projects.Should().HaveCount(1);
            status.Projects.Should().ContainSingle(p => p.ProjectId == 100 && p.ProjectName == "Test Project");
        }
    }
}
