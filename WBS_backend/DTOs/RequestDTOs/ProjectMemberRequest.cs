using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WBS_backend.DTOs.RequestDTOs
{
    public class ProjectMemberRequest
    {
        public int MemberId {get; set;} 
        public int RoleId {get; set; }
        public DateTime? StartDate {get; set;}
        public DateTime? EndDate {get; set;}
        public bool? IsCurrent {get; set;}
    }
}