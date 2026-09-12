using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace Vexa.Infrastructure.Authentication;

public class TokenService : ITokenService
{
    private readonly JwtSettings _jwtSettings;
    public TokenService(IConfiguration configuration)
    {
        _jwtSettings = configuration.GetSection("Jwt").Get<JwtSettings>()!;
    }
    public string HashToken(string token)
    {
        using SHA256 sha = SHA256.Create();
        byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes);
    }
    public string GenerateCstfToken()
    {
        byte[] bytes = RandomNumberGenerator.GetBytes(32);
        return Convert.ToBase64String(bytes);
    }
    public int GetExpiredRefreshTokenDays()
    {
        return _jwtSettings.RefreshTokenDays;
    }
    public (string token, DateTime expired) GenerateAccessToken(User user)
    {
        DateTime expiry = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpireMinutes);

        List<Claim> claims = new()
        {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Email, user.Email),
                new(ClaimTypes.Role, user.Role.ToString()),
            };
        SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_jwtSettings.Key));
        SigningCredentials creds = new(key, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken token = new(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: expiry,
            signingCredentials: creds
        );

        return (new JwtSecurityTokenHandler().WriteToken(token), expiry);
    }
    public (RefreshToken entity, string plainToken) GenerateRefreshToken(Guid userId)
    {
        string refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

        RefreshToken newRefreshToken = new()
        {
            Id = new Guid(),
            UserId = userId,
            HashedToken = HashToken(refreshToken),
            CreatedAt = DateTime.UtcNow,
            ExpiredAt = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenDays)
        };
        return (newRefreshToken, refreshToken);
    }
}
