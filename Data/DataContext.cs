using System.Collections.Generic;
using BettingProject.Model;
using Microsoft.EntityFrameworkCore;

namespace BettingProject.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        
        }

        public DbSet<User> Users { get; set; }
    }
}
