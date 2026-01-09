using WBS_backend.DTOs.Request;
using WBS_backend.DTOs.Response;

namespace WBS_backend.Services;
public interface IAuthService
{
    Task<UserResponse> RegisterAsync(RegisterRequest registerRequest);
    Task<AuthResponseDto> LoginAsync(LoginRequest loginRequest);
    Task<UserResponse> VerifyEmailAsync(string email, string code);
    Task SendEmailAsync(string toEmail, string subject, string body);
    Task ForgotPassword(string email);
    Task<bool> ResetPassword(string email, string resetCode, string newPassword, string confirmPassword);
}