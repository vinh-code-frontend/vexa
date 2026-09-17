using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class BrandRepository(AppDbContext db) : BaseRepository<Brand>(db), IBrandRepository
{
    public async Task AddAsync(Brand brand)
    {
        db.Brands.Add(brand);
        await db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Brand brand)
    {
        db.Brands.Remove(brand);
        await db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Brand brand)
    {
        db.Brands.Update(brand);
        await db.SaveChangesAsync();
    }

    public async Task<(List<Brand> Items, int TotalCount)> GetBrandListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        string? sortDirection)
    {
        IQueryable<Brand> brandsQuery = db.Brands
            .AsNoTracking()
            .Where(brand => brand.DeletedAt == null);

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

    public async Task<Brand?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }


}
