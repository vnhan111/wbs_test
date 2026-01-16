using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WBS_backend.Entities
{
    [Table("roles")]
    public class Role
    {
        [Key]
        [Column("role_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoleId { get; set; }

        [Required]
        [Column("role_name")]
        [StringLength(100)]
        public string RoleName { get; set; } = string.Empty;

        [Column("role_description")]
        [StringLength(255)]
        public string? RoleDescription { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<ProjectMember> ProjectMembers { get; set; } = new List<ProjectMember>();
    }
}