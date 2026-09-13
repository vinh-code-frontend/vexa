namespace Vexa.Infrastructure.Data.Configurations;

public class CategoryConfiguration : TimestampWithSoftDeleteEntityConfiguration<Category>
{
    public override void Configure(EntityTypeBuilder<Category> builder)
    {
        base.Configure(builder);

        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id).ValueGeneratedOnAdd();

        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(c => c.Name)
            .IsUnique();

        builder.Property(c => c.Slug)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(c => c.Slug)
            .IsUnique();

        builder.Property(c => c.Description).HasMaxLength(500);
        builder.Property(c => c.LogoUrl).HasMaxLength(500);
        builder.Property(c => c.IsActive).HasDefaultValue(true);

        builder.HasOne(c => c.Parent)
            .WithMany(c => c.Children)
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
