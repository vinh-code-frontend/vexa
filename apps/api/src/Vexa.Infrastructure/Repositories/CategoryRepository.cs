using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class CategoryRepository(AppDbContext db) : ICategoryRepository
{
    public async Task AddAsync(Category category)
    {
        db.Categories.Add(category);
        await db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Category category)
    {
        db.Categories.Remove(category);
        await db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Category category)
    {
        db.Categories.Update(category);
        await db.SaveChangesAsync();
    }

    public async Task<List<Category>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }


}
