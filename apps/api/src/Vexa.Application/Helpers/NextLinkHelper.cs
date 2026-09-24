namespace Vexa.Application.Helpers;

public static class NextLinkHelper
{
    public static string Build(
        string domain,
        int skip,
        int pageSize,
        string? search,
        string? sortBy,
        string? sortDirection,
        int? parentId)
    {
        List<string> queryParams =
        [
            $"pageSize={pageSize}",
            $"skip={skip}"
        ];

        if (!string.IsNullOrWhiteSpace(search))
        {
            queryParams.Add($"search={Uri.EscapeDataString(search)}");
        }

        if (!string.IsNullOrWhiteSpace(sortBy))
        {
            queryParams.Add($"sortBy={Uri.EscapeDataString(sortBy)}");
        }

        if (!string.IsNullOrWhiteSpace(sortDirection))
        {
            queryParams.Add($"sortDirection={sortDirection}");
        }

        if (parentId != null)
        {
            queryParams.Add($"parentId={parentId}");
        }

        return $"/api/admin/{domain}?{string.Join("&", queryParams)}";
    }
}
