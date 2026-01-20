using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WBS_backend.DTOs.RequestDTOs;
using WBS_backend.Services.Interfaces;

namespace WBS_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProjectMemberController : ControllerBase
    {
        private readonly IProjectMemberService _projectMemberService;
        public ProjectMemberController(IProjectMemberService projectMemberService)
        {
            _projectMemberService = projectMemberService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllMemberByProjectId (int id)
        {
            try
            {
                var result = await _projectMemberService.GetAllMemberByProjectIdAsync(id);
                if(result == null)
                {
                    return NotFound(new {message = $"khong tim thay member voi ID = {id}"});
                }
                return Ok(result);
            }catch(Exception ex)
            {
                return StatusCode(500, new {message = "lỗi hệ thống: "+ ex.Message});
            }
        }
        
        [HttpGet("roles")]
        public async Task<IActionResult> GetAllRole()
        {
            try
            {
                var result = await _projectMemberService.GetAllRoleAsync();
                if(result == null)
                {
                    return NotFound(new {message = "khong tim thay role nao"});
                }
                return Ok(result);
            }catch(Exception ex)
            {
                return StatusCode(500, new {message = "lỗi hệ thống: "+ ex.Message});
            }
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> PostProjectMemberByProjectId(int id, ProjectMemberRequest projectMemberRequest)
        {
            try
            {
                var result = await _projectMemberService.AddMemberForProjectId(id, projectMemberRequest);
                if(result == null)
                {
                    return NotFound(new {message = $"Không thể thêm member vòa project!"});
                }
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch(Exception ex)
            {
                return StatusCode(500, new {message = "Lỗi hệ thống: " + ex.Message});
            }
        }
    }
}