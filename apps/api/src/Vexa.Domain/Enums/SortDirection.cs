using System.Text.Json.Serialization;

namespace Vexa.Domain.Enums;

public enum SortDirection
{
    [JsonStringEnumMemberName("asc")]
    Asc,

    [JsonStringEnumMemberName("desc")]
    Desc,
}