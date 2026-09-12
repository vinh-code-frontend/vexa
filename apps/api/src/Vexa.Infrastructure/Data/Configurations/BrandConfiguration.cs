namespace Vexa.Infrastructure.Data.Configurations;

public class BrandConfiguration : TimestampWithSoftDeleteEntityConfiguration<Brand>
{
    public override void Configure(EntityTypeBuilder<Brand> builder)
    {
        base.Configure(builder);

        builder.HasKey(b => b.Id);
        builder.Property(b => b.Id).ValueGeneratedOnAdd();

        builder.HasIndex(b => b.Name).IsUnique();
        builder.Property(b => b.Name).IsRequired().HasMaxLength(100);

        builder.HasIndex(b => b.Slug).IsUnique();
        builder.Property(b => b.Slug).IsRequired().HasMaxLength(100);

        builder.Property(b => b.Description).HasMaxLength(500);
        builder.Property(b => b.Logo).HasMaxLength(500);
        builder.Property(b => b.IsActive).HasDefaultValue(true);
    }
}
