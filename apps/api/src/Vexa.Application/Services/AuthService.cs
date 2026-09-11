using Vexa.Application.Exceptions;

namespace Vexa.Application.Services;

public class AuthService(
    ITokenService tokenService,
    IPasswordHasher passwordHasher,
    IUserRepository userRepository,
    IRefreshTokenRepository reFreshTokenRepository,
    IUnitOfWork unitOfWork,
    IMapper mapper
    ) : IAuthService
{
    public async Task<bool> RegisterAsync(RegisterRequest registerRequest)
    {
        User newUser = new()
        {
            Username = registerRequest.Username.Trim().ToLower(),
            Email = registerRequest.Email.Trim().ToLower(),
            HashedPassword = passwordHasher.HashPassword(registerRequest.Password),
            CreatedAt = DateTime.UtcNow
        };

        userRepository.AddUser(newUser);
        await unitOfWork.SaveChangesAsync();
        return true;
    }
    public async Task<LoginResponse> LoginAsync(LoginRequest loginRequest)
    {
        User? user = await userRepository.GetUserByUsernameAsync(loginRequest.Username);

        if (user == null)
        {
            throw new UnauthorizedException("Wrong username or password");
        }
        bool isValidPassword = passwordHasher.Verify(loginRequest.Password, user.HashedPassword);
        if (!isValidPassword)
        {
            throw new UnauthorizedException("Wrong username or password");
        }

        (string? accessToken, DateTime accessTokenExpiredAt) = tokenService.GenerateAccessToken(user);
        (RefreshToken? refreshToken, string? plainRefreshToken) = tokenService.GenerateRefreshToken(user.Id);
        string csrfToken = tokenService.GenerateCstfToken();

        reFreshTokenRepository.AddRefreshToken(refreshToken);
        await unitOfWork.SaveChangesAsync();

        return CreateLoginResponse(
            user,
            accessToken,
            accessTokenExpiredAt,
            plainRefreshToken,
            csrfToken,
            refreshToken.ExpiredAt);
    }
    public async Task<LoginResponse> RefreshTokenAsync(string refreshToken)
    {
        string hashedToken = tokenService.HashToken(refreshToken);

        RefreshToken? session = await reFreshTokenRepository.FindRefreshToken(hashedToken);
        User? user = session?.User;
        if (session == null || user == null)
        {
            throw new UnauthorizedException("Invalid refresh token");
        }

        if (session.ExpiredAt <= DateTime.UtcNow)
        {
            throw new UnauthorizedException("Refresh token expired");
        }

        if (session.RevokedAt != null)
        {
            throw new UnauthorizedException("Refresh token reuse detected");
        }
        session.RevokedAt = DateTime.UtcNow;


        (string? accessToken, DateTime accessTokenExpiredAt) = tokenService.GenerateAccessToken(user);
        (RefreshToken? newRefreshToken, string? plainRefreshToken) = tokenService.GenerateRefreshToken(session.UserId);
        string csrfToken = tokenService.GenerateCstfToken();

        reFreshTokenRepository.AddRefreshToken(newRefreshToken);
        await unitOfWork.SaveChangesAsync();

        return CreateLoginResponse(
            user,
            accessToken,
            accessTokenExpiredAt,
            plainRefreshToken,
            csrfToken,
            newRefreshToken.ExpiredAt);
    }

    private LoginResponse CreateLoginResponse(
        User user,
        string accessToken,
        DateTime accessTokenExpiredAt,
        string refreshToken,
        string csrfToken,
        DateTime refreshTokenExpiredAt)
    {
        return new LoginResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            CsrfToken = csrfToken,
            AccessExpiresAt = accessTokenExpiredAt,
            RefreshExpiresAt = refreshTokenExpiredAt,
            User = mapper.Map<UserResponse>(user)
        };
    }
}
