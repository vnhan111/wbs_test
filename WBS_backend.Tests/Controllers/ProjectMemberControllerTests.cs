using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using WBS_backend.Controllers;
using WBS_backend.Services;
using WBS_backend.DTOs;
using WBS_backend.DTOs.RequestDTOs;
using WBS_backend.Entities;
using FluentAssertions;
using WBS_backend.Services.Interfaces;

namespace WBS_backend.Tests.Controllers
{
    public class ProjectMemberControllerTests
    {
        private readonly Mock<IProjectMemberService> _mockProjectMemberService;
        private readonly ProjectMemberController _controller;

        public ProjectMemberControllerTests()
        {
            _mockProjectMemberService = new Mock<IProjectMemberService>();
            _controller = new ProjectMemberController(_mockProjectMemberService.Object);
        }

        [Fact]
        public async Task aaa()
        {
            
        }
    }
}