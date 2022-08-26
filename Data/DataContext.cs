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

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(
        //        @"Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True");
        //}

        public DbSet<User> User { get; set; }
    }
}
