using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WBS_backend.Entities
{
    [Table("tbl_midate_project_member")]
    public class ProjectMember
    {
        [Key]
        [Column("mediate_project_member_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MediateProjectMemberId { get; set; }

        [Required]
        [Column("project_id")]
        public int ProjectId { get; set; }

        [Required]
        [Column("member_id")]
        public int MemberId { get; set; }

        [Column("role_id")]
        public int? RoleId { get; set; }

        [Column("level_id")]
        public int? LevelId { get; set; }

        [Column("experience")]
        public int Experience { get; set; } = 0;

        [Column("is_current")]
        public bool IsCurrent { get; set; } = true;

        [Required]
        [Column("start_date")]
        public DateTime? StartDate { get; set; } 
        [Column("end_date")]
        public DateTime? EndDate { get; set; }

        [ForeignKey(nameof(ProjectId))]
        public virtual Project Project { get; set; } = null!;

        [ForeignKey(nameof(MemberId))]
        public virtual Member Member { get; set; } = null!;

        [ForeignKey(nameof(RoleId))]
        public virtual Role? Role { get; set; }

        [ForeignKey(nameof(LevelId))]
        public virtual Level? Level { get; set; }
    }
}