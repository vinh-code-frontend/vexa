namespace Vexa.Application.Interfaces;

public interface IBrandService
{
    Task<BrandDetailResponse> CreateBrandAsync(CreateBrandRequest request);
    Task<BrandDetailResponse> UpdateBrandAsync(int id, UpdateBrandRequest request);
    Task DeleteBrandAsync(int id);
    Task<PaginationResponse<BrandResponse>> GetBrandsAsync(PaginationRequest request);
    Task<BrandDetailResponse?> GetBrandByIdAsync(int id);
}
