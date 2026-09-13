namespace Vexa.Application.Interfaces;

public interface IBrandRepository
{
    Task<Brand?> GetByIdAsync(Guid id);

    Task<List<Brand>> GetAllAsync();

    Task AddAsync(Brand brand);

    Task UpdateAsync(Brand brand);

    Task DeleteAsync(Brand brand);
}
