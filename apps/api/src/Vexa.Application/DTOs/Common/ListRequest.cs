namespace Vexa.Application.DTOs;

public class ListRequest
{
    public int PageSize { get; set; } = 20;
    public int Skip { get; set; } = 0;
    public string? Search { get; set; }
    public string? SortBy { get; set; }
    public SortDirection? SortDirection { get; set; }
}