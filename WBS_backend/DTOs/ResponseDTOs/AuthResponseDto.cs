namespace WBS_backend.DTOs.Response
{
    public class AuthResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public UserResponse Member { get; set; } 
    }    
}