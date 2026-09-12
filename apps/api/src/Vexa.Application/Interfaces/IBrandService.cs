namespace Vexa.Application.Interfaces;

public interface IBrandService
{
    Task GetBrandsAsync();
    Task GetBrandByIdAsync();
    Task CreateBrandAsync();
    Task UpdateBrandAsync();
    Task DeleteBrandAsync();
}
