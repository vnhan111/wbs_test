using Microsoft.EntityFrameworkCore;
using WBS_backend.Data;
using WBS_backend.DTOs.Response;

namespace WBS_backend.Services
{
    public class MemberService : IMemberService
    {
        private readonly AppDbContext _context;
        public MemberService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<MemberListResponse>> GetAllMemberAsync()
        {
            return await _context.Members
                .Where(m => m.IsActive == true)
                .Select(m => new MemberListResponse
                {
                    MemberId = m.MemberId,
                    MemberFullName = m.MemberFullName ?? "chưa có tên"
                })
                .OrderByDescending(m => m.MemberId)
                .ToListAsync();
        }
    }
}