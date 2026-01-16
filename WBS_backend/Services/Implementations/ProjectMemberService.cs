using Microsoft.EntityFrameworkCore;
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
    }
}