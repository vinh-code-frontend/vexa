namespace Vexa.Infrastructure.Data.Configurations;

public class BrandConfiguration : IEntityTypeConfiguration<Brand>
{
    public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.Property(e => e.CreatedAt)
            .IsRequired()
            .HasConversion(UtcDateTimeConverters.UtcDateTimeConverter)
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'");

        builder.Property(e => e.UpdatedAt)
            .HasConversion(UtcDateTimeConverters.NullableUtcDateTimeConverter)
            .ValueGeneratedOnUpdate()
            .HasDefaultValueSql("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'");

        builder.HasIndex(e => e.DeletedAt);

        builder.HasKey(b => b.Id);
        builder.Property(b => b.Id).ValueGeneratedOnAdd();

        builder.HasIndex(b => b.Name).IsUnique();
        builder.Property(b => b.Name).IsRequired().HasMaxLength(100);

        builder.HasIndex(b => b.Slug).IsUnique();
        builder.Property(b => b.Slug).IsRequired().HasMaxLength(100);

        builder.Property(b => b.Description).HasMaxLength(500);
        builder.Property(b => b.LogoUrl).HasMaxLength(500);
        builder.Property(b => b.IsActive).HasDefaultValue(true);
    }
}
