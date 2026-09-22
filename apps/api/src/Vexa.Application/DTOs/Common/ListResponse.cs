namespace Vexa.Application.DTOs;

public sealed class ListResponse<T>
{
    public IReadOnlyList<T> Items { get; set; } = [];
    public string? NextLink { get; set; }
}
