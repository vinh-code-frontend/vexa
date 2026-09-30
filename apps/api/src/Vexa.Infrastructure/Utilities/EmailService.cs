using System.Reflection;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Utilities;

public sealed class EmailService(IOptions<MailSettings> options) : IEmailService
{
    private const string _passwordResetTemplateResourceName = "Vexa.Infrastructure.Templates.PasswordResetEmail.html";
    private static readonly Lazy<string> _passwordResetTemplate = new(() => LoadEmbeddedTemplate(_passwordResetTemplateResourceName));

    private readonly MailSettings _settings = options.Value;

    public async Task SendPasswordResetEmailAsync(string recipient, string resetUrl, CancellationToken cancellationToken = default)
    {
        string body = _passwordResetTemplate.Value
            .Replace("{{Email}}", recipient)
            .Replace("{{ResetUrl}}", resetUrl);

        await SendAsync(recipient, "[Vexa] Reset Password", body, isHtml: true, cancellationToken);
    }

    private static string LoadEmbeddedTemplate(string resourceName)
    {
        using Stream? stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourceName)
            ?? throw new InvalidOperationException($"Embedded template '{resourceName}' was not found.");

        using StreamReader reader = new(stream);
        return reader.ReadToEnd();
    }

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
