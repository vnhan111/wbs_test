using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WBS_backend.Data;
using WBS_backend.DTOs;

namespace WBS_backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;
        public ProjectService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<ProjectResponseDto>> GetAllProjectAsync()
        {
            return await _context.Projects
                .Select(p => new ProjectResponseDto
                {
                    ProjectId = p.ProjectId,
                    ProjectCode = p.ProjectCode,
                    ProjectName = p.ProjectName,
                    ExpectedStartDate = p.ExpectedStartDate,
                    ExpectedEndDate = p.ExpectedEndDate,
                    ActualStartDate = p.ActualStartDate,
                    ActualEndDate = p.ActualEndDate,
                    WorkProgress = p.WorkProgress,
                    EstimateTime = p.EstimateTime,
                    SpentTime = p.SpentTime,
                    ProjectDeleteStatus = p.ProjectDeleteStatus,
                    MemberAuthorId = p.MemberAuthorId,
                    ProjectStatusId = p.ProjectStatusId
                })
                .OrderByDescending(p => p.ProjectId)
                .ToListAsync();
        }
    }
}