using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class BrandRepository(AppDbContext db) : BaseRepository<Brand>(db), IBrandRepository
{
    public async Task AddAsync(Brand brand)
    {
        DbSet.Add(brand);
        await SaveChangesAsync();
    }

    public async Task SoftDeleteAsync(Brand brand, Guid? deletedBy)
    {
        DateTime deletedAt = DateTime.UtcNow;
        brand.DeletedAt = deletedAt;
        brand.UpdatedAt = deletedAt;
        brand.DeletedBy = deletedBy;
        DbSet.Update(brand);
        await SaveChangesAsync();
    }

    public async Task UpdateAsync(Brand brand)
    {
        DbSet.Update(brand);
        await SaveChangesAsync();
    }

    public async Task<(List<Brand> Items, int TotalCount)> GetBrandListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        string? sortDirection)
    {
        IQueryable<Brand> brandsQuery = Query().Where(brand => brand.DeletedAt == null);

        if (!string.IsNullOrWhiteSpace(search))
        {
            string searchPattern = $"%{search.Trim()}%";
            brandsQuery = brandsQuery.Where(brand =>
                EF.Functions.ILike(brand.Name, searchPattern) ||
                EF.Functions.ILike(brand.Slug, searchPattern) ||
                (brand.Description != null && EF.Functions.ILike(brand.Description, searchPattern)));
        }

        bool descending = string.Equals(sortDirection, "desc", StringComparison.OrdinalIgnoreCase);
        brandsQuery = sortBy?.Trim().ToLowerInvariant() switch
        {
            "name" => descending
                ? brandsQuery.OrderByDescending(brand => brand.Name).ThenBy(brand => brand.Id)
                : brandsQuery.OrderBy(brand => brand.Name).ThenBy(brand => brand.Id),
            "slug" => descending
                ? brandsQuery.OrderByDescending(brand => brand.Slug).ThenBy(brand => brand.Id)
                : brandsQuery.OrderBy(brand => brand.Slug).ThenBy(brand => brand.Id),
            "displayorder" => descending
                ? brandsQuery.OrderByDescending(brand => brand.DisplayOrder).ThenBy(brand => brand.Id)
                : brandsQuery.OrderBy(brand => brand.DisplayOrder).ThenBy(brand => brand.Id),
            "createdat" => descending
                ? brandsQuery.OrderByDescending(brand => brand.CreatedAt).ThenBy(brand => brand.Id)
                : brandsQuery.OrderBy(brand => brand.CreatedAt).ThenBy(brand => brand.Id),
            _ => brandsQuery
                .OrderBy(brand => brand.DisplayOrder)
                .ThenBy(brand => brand.Name)
                .ThenBy(brand => brand.Id)
        };

        int totalCount = await brandsQuery.CountAsync();
        List<Brand> items = await brandsQuery
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<Brand?> GetByIdAsync(int id)
    {
        return await Query().FirstOrDefaultAsync(item => item.Id == id && item.DeletedAt == null);
    }

    public async Task<Brand?> GetByIdIncludingDeletedAsync(int id)
    {
        return await Query().FirstOrDefaultAsync(item => item.Id == id);
    }

    public async Task<bool> ExistsAsync(string name, string slug, int? excludedId = null)
    {
        return await DbSet.AnyAsync(item =>
            (excludedId == null || item.Id != excludedId) &&
            (item.Name == name || item.Slug == slug));
    }

}
