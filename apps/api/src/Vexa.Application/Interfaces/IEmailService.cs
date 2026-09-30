namespace Vexa.Application.Interfaces;

public interface IEmailService
{
    Task SendAsync(
        string recipient,
        string subject,
        string body,
        bool isHtml = false,
        CancellationToken cancellationToken = default);

    Task SendPasswordResetEmailAsync(
        string recipient,
        string resetUrl,
        CancellationToken cancellationToken = default);
}
