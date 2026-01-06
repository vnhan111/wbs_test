using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WBS_backend.Entities
{
    [Table("tbl_member")]
    public class Member
    {
        [Key]
        [Column("member_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MemberId { get; set; }

        [Required]
        [Column("login_name")]
        [StringLength(100)]
        public string LoginName { get; set; } = string.Empty;

        [Required]
        [Column("password")]
        [StringLength(255)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Column("email")]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("member_full_name")]
        [StringLength(255)]
        public string MemberFullName { get; set; } = string.Empty;

        [Column("join_date")]
        public DateTime JoinDate { get; set; } = DateTime.UtcNow;

        [Column("is_active")]
        public bool IsActive { get; set; } = false;

        [Column("activated_code")]
        [StringLength(100)]
        public string? ActivatedCode { get; set; } 

        [Column("reset_code")]
        [StringLength(100)]
        public string? ResetCode { get; set; }

        [Column("role_id")]
        public int? RoleId { get; set; }

        [Column("member_code")]
        [StringLength(50)]
        public string? MemberCode { get; set; }

        [Column("phone_number")]
        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        [Column("address")]
        public string? Address { get; set; }

        [Column("pronounce")]
        [StringLength(100)]
        public string? Pronounce { get; set; }

        [Column("pronunciation")]
        [StringLength(100)]
        public string? Pronunciation { get; set; }

        [Column("skype")]
        [StringLength(100)]
        public string? Skype { get; set; }

        [Column("job_title")]
        [StringLength(255)]
        public string? JobTitle { get; set; }

        [Column("organization")]
        [StringLength(255)]
        public string? Organization { get; set; }

        [Column("bio")]
        public string? Bio { get; set; }

        [Column("language_id")]
        public int? LanguageId { get; set; }

        [Column("level_id")]
        public int? LevelId { get; set; }

        [Column("out_date")]
        public DateTime? OutDate { get; set; }
    }
}