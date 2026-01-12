using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WBS_backend.DTOs.Response;

namespace WBS_backend.Services
{
    public interface IMemberService
    {
        Task<List<MemberListResponse>> GetAllMemberAsync();
    }
}