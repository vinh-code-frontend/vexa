using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Utilities;

public sealed class EmailService(IOptions<MailSettings> options) : IEmailService
{
    private readonly MailSettings _settings = options.Value;

    public async Task SendAsync(string recipient, string subject, string body, bool isHtml = false, CancellationToken cancellationToken = default)
    {
        EnsureConfigured();

        MimeMessage message = new();
        message.From.Add(new MailboxAddress(_settings.FromName, _settings.FromEmail));
        message.To.Add(MailboxAddress.Parse(recipient));
        message.Subject = subject;
        message.Body = new BodyBuilder
        {
            TextBody = isHtml ? null : body,
            HtmlBody = isHtml ? body : null
        }.ToMessageBody();

        using SmtpClient client = new();
        await client.ConnectAsync(
            _settings.Host,
            _settings.Port,
            ParseSecurity(_settings.Security),
            cancellationToken);

        if (!string.IsNullOrWhiteSpace(_settings.Username))
        {
            await client.AuthenticateAsync(
                _settings.Username,
                _settings.Password,
                cancellationToken);
        }

        await client.SendAsync(message, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);
    }

    private void EnsureConfigured()
    {
        if (string.IsNullOrWhiteSpace(_settings.Host) ||
            string.IsNullOrWhiteSpace(_settings.FromEmail))
        {
            throw new InvalidOperationException(
                "Mail settings are incomplete. Configure Mail:Host and Mail:FromEmail.");
        }
    }

    private static SecureSocketOptions ParseSecurity(string security)
    {
        return Enum.TryParse(security, ignoreCase: true, out SecureSocketOptions result)
            ? result
            : throw new InvalidOperationException($"Unsupported mail security mode: {security}");
    }

}
