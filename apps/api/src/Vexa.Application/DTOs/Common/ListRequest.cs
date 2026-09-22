namespace Vexa.Application.DTOs;

public class ListRequest
{
    public int PageSize { get; set; } = 20;
    public int Skip { get; set; }
    public string? Search { get; set; }
    public string? SortBy { get; set; }
    public string? SortDirection { get; set; }
}
