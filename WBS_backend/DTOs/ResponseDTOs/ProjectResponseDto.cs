using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WBS_backend.DTOs
{
    public class ProjectResponseDto
    {
        public int ProjectId {get; set;}
        public string? ProjectCode {get; set;}
        public string? ProjectName {get; set;}
        public DateTime? ExpectedStartDate {get; set;}
        public DateTime? ExpectedEndDate {get; set;}
        public DateTime? ActualStartDate {get; set;}
        public DateTime? ActualEndDate {get; set;}
        public decimal WorkProgress {get; set;} = 0.00m;
        public double? EstimateTime {get; set; }
        public double? SpentTime {get; set; }
        public bool ProjectDeleteStatus {get; set;} = false;
        public int? MemberAuthorId {get; set;}
        public string? AuthorFullName { get; set; }
        public int? ProjectStatusId {get; set;}
        public string? ProjectStatusName {get; set;}
    }
}