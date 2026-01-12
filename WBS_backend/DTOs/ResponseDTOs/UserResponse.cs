namespace WBS_backend.DTOs.Response
{
    public class UserResponse
    {
        public int MemberId { get; set; }
        public string MemberFullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string LoginName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public int? RoleId { get; set; }
        public bool IsActive { get; set; }
    }

    public class MemberListResponse
    {
        public int MemberId {get; set;}
        public string MemberFullName {get; set;} = string.Empty;
    }
}
