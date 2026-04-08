using Microsoft.EntityFrameworkCore;
using SquadProject.Backend.Data.Entities;
using SquadProject.Backend.Data.Configurations;

namespace SquadProject.Backend.Data
{
    /// <summary>
    /// EF Core DbContext for the application
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Unit> Units { get; set; }
        public DbSet<Conversion> Conversions { get; set; }
        public DbSet<Person> People { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<RandomNumber> RandomNumbers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UnitConfiguration());
            modelBuilder.ApplyConfiguration(new ConversionConfiguration());
            modelBuilder.ApplyConfiguration(new PersonConfiguration());
            modelBuilder.ApplyConfiguration(new RandomNumberConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
