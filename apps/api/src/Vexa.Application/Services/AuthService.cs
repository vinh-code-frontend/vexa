namespace Vexa.Application.Services;

public class AuthService(
    ITokenService tokenService,
    IPasswordHasher passwordHasher,
    IUserRepository userRepository,
    IRefreshTokenRepository reFreshTokenRepository,
    IPasswordResetTokenRepository passwordResetTokenRepository,
    IEmailService emailService,
    IMapper mapper
    ) : IAuthService
{
    private readonly string _adminUrl = "http://localhost:5173";
    public async Task<bool> RegisterAsync(RegisterRequest registerRequest)
    {
        User newUser = new()
        {
            Username = registerRequest.Username.Trim().ToLower(),
            Email = registerRequest.Email.Trim().ToLower(),
            HashedPassword = passwordHasher.HashPassword(registerRequest.Password),
            CreatedAt = DateTime.UtcNow
        };

        await userRepository.AddUserAsync(newUser);
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
        string csrfToken = tokenService.GenerateToken();

        await reFreshTokenRepository.AddRefreshTokenAsync(refreshToken);

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
        string csrfToken = tokenService.GenerateToken();

        await reFreshTokenRepository.AddRefreshTokenAsync(newRefreshToken);

        return CreateLoginResponse(
            user,
            accessToken,
            accessTokenExpiredAt,
            plainRefreshToken,
            csrfToken,
            newRefreshToken.ExpiredAt);
    }

    public async Task ForgotPasswordAsync(string email)
    {
        User? user = await userRepository.GetUserByEmailAsync(email);

        if (user == null)
        {
            throw new NotFoundException("User not found!");
        }
        if (user.Status != UserStatus.Active || user.DeletedAt != null)
        {
            throw new ForbiddenException("Cannot reset password for this user");
        }

        string resetToken = await passwordResetTokenRepository.GenerateTokenByUserIdAsync(user.Id);
        string resetUrl = $"{_adminUrl}/auth/reset-token?token={resetToken}";
        await emailService.SendPasswordResetEmailAsync(user.Email, resetUrl);
    }

    public async Task<Guid> VerifyResetPasswordTokenAsync(string token)
    {
        string hashedToken = tokenService.HashToken(token);
        PasswordResetToken? passwordResetToken = await passwordResetTokenRepository.FindByTokenAsync(hashedToken);

        if (passwordResetToken == null || passwordResetToken.UsedAt != null || passwordResetToken.RevokedAt != null || passwordResetToken.ExpiresAt <= DateTime.UtcNow)
        {
            throw new UnauthorizedException("Invalid reset password token");
        }

        return passwordResetToken.UserId;
    }

    public async Task ResetPasswordAsync(ResetPasswordRequest request)
    {
        Guid userId = await VerifyResetPasswordTokenAsync(request.Token);
        User? user = await userRepository.GetUserByIdAsync(userId);

        if (user == null || user.Status != UserStatus.Active || user.DeletedAt != null)
        {
            throw new NotFoundException("User not found!");
        }

        user.HashedPassword = passwordHasher.HashPassword(request.NewPassword);
        await userRepository.UpdateUserAsync(user);
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
