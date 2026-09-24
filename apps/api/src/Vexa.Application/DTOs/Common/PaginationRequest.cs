namespace Vexa.Application.DTOs;

public class PaginationRequest
{
    public int PageSize { get; set; } = 10;
    public int Page { get; set; }
    public string? Search { get; set; }
    public string? SortBy { get; set; }
    public SortDirection? SortDirection { get; set; }
}
