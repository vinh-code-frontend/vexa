using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class BrandRepository(AppDbContext db) : IBrandRepository
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

    public async Task<List<Brand>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Brand?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }


}
