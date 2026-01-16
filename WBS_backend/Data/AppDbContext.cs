using Microsoft.EntityFrameworkCore;
using WBS_backend.Entities;

namespace WBS_backend.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Member> Members { get; set; }
    public DbSet<Project> Projects {get; set; }
    public DbSet<ProjectStatus> ProjectStatus {get; set;}
    public DbSet<ProjectMember> ProjectMembers {get; set;}
    public DbSet<Role> Roles {get; set;}
    public DbSet<Level> Levels {get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Member>(entity =>
        {
            entity.ToTable("tbl_member");
            entity.HasIndex(m => m.Email).IsUnique();
            entity.HasIndex(m => m.LoginName).IsUnique();
            entity.Property(m => m.JoinDate)
              .HasDefaultValueSql("CURRENT_TIMESTAMP")
              .ValueGeneratedOnAdd();

            entity.Property(m => m.IsActive)
                .HasDefaultValue(false);
        });
        modelBuilder.Entity<Project>(entity =>
        {
           entity.ToTable("tbl_project");
           entity.HasKey(p => p.ProjectId);
           entity.Property(p => p.ProjectId).HasColumnName("project_id").ValueGeneratedOnAdd();
           entity.Property(p => p.ProjectCode).HasColumnName("project_code");
           entity.Property(p => p.ProjectName).HasColumnName("project_name");
           entity.Property(p => p.ExpectedStartDate).HasColumnName("expected_start_date");
           entity.Property(p => p.ExpectedEndDate).HasColumnName("expected_end_date");
           entity.Property(p => p.ActualStartDate).HasColumnName("actual_start_date");
           entity.Property(p => p.ActualEndDate).HasColumnName("actual_end_date");
           entity.Property(p => p.WorkProgress)
            .HasColumnName("work_progress")
            .HasColumnType("decimal(6,2)")
            .HasDefaultValue(0.00m);
           entity.Property(p => p.EstimateTime).HasColumnName("estimate_time")
            .HasColumnType("double");
           entity.Property(p => p.SpentTime).HasColumnName("spent_time")
            .HasColumnType("double");
           entity.Property(p => p.ProjectDeleteStatus)
            .HasColumnName("project_delete_status")
            .HasDefaultValue(false);
           entity.Property(p => p.MemberAuthorId).HasColumnName("member_author_id");
           entity.Property(p => p.ProjectStatusId).HasColumnName("project_status_id");
        });

        modelBuilder.Entity<ProjectStatus>(entity =>
        {
            entity.ToTable("tbl_project_status");
            entity.HasKey(ps => ps.ProjectStatusId);
            entity.Property(ps => ps.ProjectStatusId).HasColumnName("project_status_id").ValueGeneratedOnAdd();
            entity.Property(ps => ps.StatusName).HasColumnName("status_name");
            entity.Property(ps => ps.StatusDescription).HasColumnName("status_description");
            entity.Property(ps => ps.StatusColor).HasColumnName("status_color");
            entity.Property(ps => ps.SortOrder).HasColumnName("sort_order");
            entity.Property(ps => ps.IsActive)
                .HasColumnName("is_active")
                .HasDefaultValue(true);
        });
        modelBuilder.Entity<ProjectMember>(entity =>
        {
            entity.ToTable("tbl_midate_project_member");

            entity.HasKey(pm => pm.MediateProjectMemberId);
            entity.Property(pm => pm.MediateProjectMemberId)
                .HasColumnName("mediate_project_member_id")
                .ValueGeneratedOnAdd();

            entity.Property(pm => pm.ProjectId).HasColumnName("project_id").IsRequired();
            entity.Property(pm => pm.MemberId).HasColumnName("member_id").IsRequired();

            entity.Property(pm => pm.RoleId).HasColumnName("role_id").IsRequired(false);
            entity.Property(pm => pm.LevelId).HasColumnName("level_id").IsRequired(false);

            entity.Property(pm => pm.Experience)
                .HasColumnName("experience")
                .HasDefaultValue(0);

            entity.Property(pm => pm.IsCurrent)
                .HasColumnName("is_current")
                .HasDefaultValue(true);

            entity.Property(pm => pm.StartDate)
                .HasColumnName("start_date")
                .IsRequired();

            entity.Property(pm => pm.EndDate).HasColumnName("end_date").IsRequired(false);

            entity.HasIndex(pm => new { pm.ProjectId, pm.MemberId })
                .IsUnique()
                .HasDatabaseName("uk_project_member");
        });
    } 
}