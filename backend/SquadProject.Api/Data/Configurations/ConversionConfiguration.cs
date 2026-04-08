using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SquadProject.Backend.Data.Entities;

namespace SquadProject.Backend.Data.Configurations
{
    public class ConversionConfiguration : IEntityTypeConfiguration<Conversion>
    {
        public void Configure(EntityTypeBuilder<Conversion> builder)
        {
            builder.ToTable("Conversions");
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Factor).HasColumnType("decimal(18,6)");
            builder.HasOne(c => c.FromUnit).WithMany().HasForeignKey(c => c.FromUnitId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(c => c.ToUnit).WithMany().HasForeignKey(c => c.ToUnitId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
