namespace Vexa.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
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

        builder.HasKey(user => user.Id);
        builder.HasIndex(user => user.Username).IsUnique();
        builder.HasIndex(user => user.Email).IsUnique();

        builder.Property(user => user.Username).IsRequired().HasMaxLength(30);

        builder.Property(user => user.Email)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(user => user.HashedPassword)
            .IsRequired()
            .HasMaxLength(500);

        // builder.Property(user => user.Status).HasDefaultValue(UserStatus.Active);
        // builder.Property(user => user.Role).HasDefaultValue(UserRole.User);
    }
}
