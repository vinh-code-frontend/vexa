namespace Vexa.Infrastructure.Data.Configurations;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.HasKey(refreshToken => refreshToken.Id);

        builder.Property(refreshToken => refreshToken.HashedToken)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(refreshToken => refreshToken.CreatedAt)
            .IsRequired()
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'");

        builder.Property(refreshToken => refreshToken.ExpiredAt)
            .IsRequired();

        builder.HasOne(refreshToken => refreshToken.User)
            .WithMany(user => user.refreshTokens)
            .HasForeignKey(refreshToken => refreshToken.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
