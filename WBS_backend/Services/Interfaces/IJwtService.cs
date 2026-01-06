using WBS_backend.Entities;

namespace WBS_backend.Services;
public interface IJwtService
{
    string GenerateToken(Member member);
    int? ValidateToken(string token);
}