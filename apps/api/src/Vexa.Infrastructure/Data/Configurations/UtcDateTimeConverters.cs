namespace Vexa.Infrastructure.Data.Configurations;

internal static class UtcDateTimeConverters
{
    public static readonly ValueConverter<DateTime, DateTime> UtcDateTimeConverter = new(
        value => ConvertToUtcForDatabase(value),
        value => ConvertFromDatabaseAsUtc(value)
    );

    public static readonly ValueConverter<DateTime?, DateTime?> NullableUtcDateTimeConverter = new(
        value => ConvertNullableToUtcForDatabase(value),
        value => ConvertNullableFromDatabaseAsUtc(value)
    );

    private static DateTime ConvertToUtcForDatabase(DateTime value)
    {
        return value.Kind == DateTimeKind.Utc
            ? value
            : value.ToUniversalTime();
    }

    private static DateTime ConvertFromDatabaseAsUtc(DateTime value)
    {
        // DB value is treated as UTC so downstream code always sees Kind = Utc.
        return DateTime.SpecifyKind(value, DateTimeKind.Utc);
    }

    private static DateTime? ConvertNullableToUtcForDatabase(DateTime? value)
    {
        return !value.HasValue || value.Value.Kind == DateTimeKind.Utc
            ? value
            : value.Value.ToUniversalTime();
    }

    private static DateTime? ConvertNullableFromDatabaseAsUtc(DateTime? value)
    {
        if (!value.HasValue)
        {
            return value;
        }

        // DB value is treated as UTC so downstream code always sees Kind = Utc.
        return DateTime.SpecifyKind(value.Value, DateTimeKind.Utc);
    }
}
