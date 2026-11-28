namespace Vexa.Infrastructure.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<ProductEntity>
{
    public void Configure(EntityTypeBuilder<ProductEntity> builder)
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

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedOnAdd();
        builder.HasIndex(e => e.DeletedAt);

        builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
        builder.HasIndex(e => e.Name).IsUnique();
        builder.Property(e => e.Slug).IsRequired().HasMaxLength(100);
        builder.HasIndex(e => e.Slug).IsUnique();
        builder.Property(e => e.Description).HasMaxLength(500);

        builder.HasOne<BrandEntity>()
            .WithMany()
            .HasForeignKey(e => e.BrandId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne<CategoryEntity>()
            .WithMany()
            .HasForeignKey(e => e.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
