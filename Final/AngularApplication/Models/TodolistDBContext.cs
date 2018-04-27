using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplication.Models
{
    public class TodoDBContext : IdentityDbContext<ApplicationUser>
    {
        public TodoDBContext(DbContextOptions<TodoDBContext> options) : base(options)
        {

        }
        public DbSet<Todo> Todo { get; set; }
        public DbSet<Warningtime> Warningtime{get; set; }

        //The following onModelCreating function was not in MICROSOFT TUTORIAL.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Todo>().ToTable("Todo");
            modelBuilder.Entity<Warningtime>().ToTable("Warningtime");
        }
    }
}
