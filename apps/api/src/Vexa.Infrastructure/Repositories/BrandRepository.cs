using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class BrandRepository(AppDbContext db) : IBrandRepository
{
    public async Task AddAsync(Brand brand)
    {
        db.Brands.Add(brand);
        await db.SaveChangesAsync();
    }

    public async Task SoftDeleteAsync(Brand brand, Guid? deletedBy)
    {
        DateTime deletedAt = DateTime.UtcNow;
        brand.DeletedAt = deletedAt;
        brand.UpdatedAt = deletedAt;
        brand.DeletedBy = deletedBy;
        db.Brands.Update(brand);
        await db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Brand brand)
    {
        brand.UpdatedAt = DateTime.UtcNow;

        db.Brands.Update(brand);
        await db.SaveChangesAsync();
    }

    public async Task<(List<Brand> Items, int TotalCount)> GetBrandListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        SortDirection? sortDirection)
    {
        IQueryable<Brand> query = db.Brands.AsNoTracking().Where(item => item.DeletedAt == null);

        if (!string.IsNullOrWhiteSpace(search))
        {
            string searchPattern = $"%{search.Trim()}%";
            query = query.Where(item =>
                EF.Functions.ILike(item.Name, searchPattern) ||
                EF.Functions.ILike(item.Slug, searchPattern) ||
                (item.Description != null && EF.Functions.ILike(item.Description, searchPattern)));
        }

        bool descending = sortDirection == SortDirection.Desc;
        query = sortBy?.Trim().ToLowerInvariant() switch
        {
            "name" => descending
                ? query.OrderByDescending(item => item.Name).ThenBy(item => item.Id)
                : query.OrderBy(item => item.Name).ThenBy(item => item.Id),
            "slug" => descending
                ? query.OrderByDescending(item => item.Slug).ThenBy(item => item.Id)
                : query.OrderBy(item => item.Slug).ThenBy(item => item.Id),
            "displayorder" => descending
                ? query.OrderByDescending(item => item.DisplayOrder).ThenBy(item => item.Id)
                : query.OrderBy(item => item.DisplayOrder).ThenBy(item => item.Id),
            "createdat" => descending
                ? query.OrderByDescending(item => item.CreatedAt).ThenBy(item => item.Id)
                : query.OrderBy(item => item.CreatedAt).ThenBy(item => item.Id),
            _ => query
                .OrderBy(item => item.DisplayOrder)
                .ThenBy(item => item.Name)
                .ThenBy(item => item.Id)
        };

        int totalCount = await query.CountAsync();
        List<Brand> items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<Brand?> GetByIdAsync(int id)
    {
        return await db.Brands.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id && item.DeletedAt == null);
    }

    public async Task<Brand?> GetByIdIncludingDeletedAsync(int id)
    {
        return await db.Brands.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
    }

    public async Task<bool> ExistsAsync(string name, string slug, int? excludedId = null)
    {
        return await db.Brands.AnyAsync(item =>
            (excludedId == null || item.Id != excludedId) &&
            (item.Name == name || item.Slug == slug));
    }

}
