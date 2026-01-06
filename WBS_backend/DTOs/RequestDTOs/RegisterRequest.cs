using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace WBS_backend.DTOs.Request
{
    public class RegisterRequest
    {
        public string MemberFullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string LoginName { get; set; } = string.Empty;
        [JsonProperty("passWord")]
        public string Password { get; set; } = string.Empty;
    }
}