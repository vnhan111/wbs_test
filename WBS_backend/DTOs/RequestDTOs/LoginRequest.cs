using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace WBS_backend.DTOs.Request
{
    public class LoginRequest
    {
        public string LoginName { get; set; } = string.Empty;
        [JsonProperty("passWord")]
        public string Password { get; set; } = string.Empty;
    }
}