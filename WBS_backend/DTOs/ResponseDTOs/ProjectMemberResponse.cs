
namespace WBS_backend.DTOs.ResponseDTOs
{
    public class ProjectMemberResponse
    {
        public int MediateProjectMemberId { get; set; }
        public int MemberId { get; set; }
        public string? MemberFullName { get; set; }
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public DateTime? StartDate {get; set; }
        public DateTime? EndDate { get; set;}
        public bool IsCurrent { get; set; }
    }
    public class RoleProjectMemberResponse
    {
        public int RoleId {get; set;}
        public string? RoleName {get; set;}
    }
}