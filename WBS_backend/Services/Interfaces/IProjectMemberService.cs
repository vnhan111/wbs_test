using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WBS_backend.DTOs.ResponseDTOs;

namespace WBS_backend.Services.Interfaces
{
    public interface IProjectMemberService
    {
        Task<List<ProjectMemberResponse>> GetAllMemberByProjectIdAsync (int id);
    }
}