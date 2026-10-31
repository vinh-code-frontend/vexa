namespace Vexa.Infrastructure.Data.Configurations;

public class PasswordResetTokenConfiguration : IEntityTypeConfiguration<PasswordResetTokenEntity>
{
    public void Configure(EntityTypeBuilder<PasswordResetTokenEntity> builder)
    {
        builder.HasKey(item => item.Id);

        builder.Property(item => item.HashedToken)
            .IsRequired()
            .HasMaxLength(64);

        builder.HasIndex(item => item.HashedToken)
            .IsUnique();

        builder.Property(item => item.CreatedAt)
            .IsRequired()
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'");

        builder.Property(item => item.ExpiresAt)
            .IsRequired();

        builder.HasOne(item => item.User)
            .WithMany(user => user.PasswordResetTokens)
            .HasForeignKey(item => item.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
