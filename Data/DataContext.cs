using BettingProject.Model;
using Microsoft.EntityFrameworkCore;


namespace BettingProject.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }
        public DbSet<ConfigKey> ConfigKeys { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ConfigKey>()
                .ToTable("ConfigKey")
                .HasKey(x => x.IdConfig);
            
            modelBuilder.Entity<User>()
                .ToTable("Users")
                .HasKey(x => x.Username);
        }
    }
}
