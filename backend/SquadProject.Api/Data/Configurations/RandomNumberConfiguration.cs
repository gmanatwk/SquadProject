using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SquadProject.Backend.Data.Entities;

namespace SquadProject.Backend.Data.Configurations
{
    public class RandomNumberConfiguration : IEntityTypeConfiguration<RandomNumber>
    {
        public void Configure(EntityTypeBuilder<RandomNumber> builder)
        {
            builder.ToTable("RandomNumbers");
            builder.HasKey(r => r.Id);
            builder.Property(r => r.Value).IsRequired();
            builder.Property(r => r.GeneratedAt).IsRequired();
        }
    }
}
