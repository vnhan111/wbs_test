using Microsoft.AspNetCore.Mvc;
using WBS_backend.Data;
using WBS_backend.DTOs;
using WBS_backend.DTOs.Request;
using WBS_backend.Services;

namespace WBS_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            try
            {
                var message = await _authService.RegisterAsync(registerRequest);
                return Ok(new { Message = message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Lỗi hệ thống");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var result = await _authService.LoginAsync(loginRequest);

            if (!string.IsNullOrEmpty(result.Token))
                return Ok(result);

            return Unauthorized(result.Message);
        }

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string email, [FromQuery] string code)
        {
            try
            {
                var result = await _authService.VerifyEmailAsync(email, code);
                return Ok(new { Result = result });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Lỗi hệ thống");
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            try
            {
                await _authService.ForgotPassword(email);
                return Ok(new { message = "Gửi link đổi mật khẩu thành công trong email" });
            }
            catch (Exception)
            {
                return StatusCode(500, "Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại sau.");
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromQuery] string email, [FromQuery] string resetCode, [FromBody] ResetPasswordRequest resetPassword)
        {
            try
            {
                await _authService.ResetPassword(email, resetCode, resetPassword.Password, resetPassword.ConfirmPassword);
                return Ok(new { success = true, message = "Đổi mật khẩu thành công" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
}