using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WBS_backend.Entities
{
    [Table("levels")]
    public class Level
    {
        [Key]
        [Column("level_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LevelId { get; set; }

        [Required]
        [Column("level_name")]
        [StringLength(100)]
        public string LevelName { get; set; } = string.Empty;

        [Column("level_description")]
        [StringLength(255)]
        public string? LevelDescription { get; set; }

        [Column("min_experience")]
        public int? MinExperience { get; set; } = 0;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public virtual ICollection<ProjectMember> ProjectMembers { get; set; } = new List<ProjectMember>();
    }
}