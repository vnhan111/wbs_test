using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WBS_backend.DTOs.RequestDTOs;
using WBS_backend.DTOs.ResponseDTOs;
using WBS_backend.Entities;

namespace WBS_backend.Services.Interfaces
{
    public interface IProjectMemberService
    {
        Task<List<ProjectMemberResponse>> GetAllMemberByProjectIdAsync (int id);
        Task<List<RoleProjectMemberResponse>> GetAllRoleAsync();
        Task<ProjectMemberResponse> AddMemberForProjectId(int idProject,ProjectMemberRequest projectMemberRequest);
    }
}