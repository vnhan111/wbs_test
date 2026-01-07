using WBS_backend.DTOs;
using Microsoft.AspNetCore.Authorization;
using WBS_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace WBS_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetProjects()
        {
            var result = await _projectService.GetAllProjectAsync();
            return Ok(result);
        }

        // [HttpGet("{id}")]

        // [HttpPost("{id}")]

        // [HttpPatch("{id}")]

        // [HttpDelete("{id}")]
    }
}