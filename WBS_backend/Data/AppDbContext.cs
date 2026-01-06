using Microsoft.EntityFrameworkCore;
using WBS_backend.Entities;

namespace WBS_backend.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Member> Members { get; set; }

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
    } 
}