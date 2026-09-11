using System.Security.Cryptography;
namespace Vexa.Application.Helpers;

public static class PasswordGenerator
{
    private const string _chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";

    public static string Generate(int length = 12)
    {
        return string.Concat(
            Enumerable.Range(0, length)
                .Select(_ => _chars[RandomNumberGenerator.GetInt32(_chars.Length)])
        );
    }
}
