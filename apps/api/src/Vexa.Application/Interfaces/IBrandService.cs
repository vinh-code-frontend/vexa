namespace Vexa.Application.Interfaces;

public interface IBrandService
{
    Task<BrandDetailResponse> AddAsync(CreateBrandRequest request);
    Task<BrandDetailResponse> UpdateAsync(int id, UpdateBrandRequest request);
    Task DeleteAsync(int id);
    Task<PaginationResponse<BrandResponse>> GetAsync(PaginationRequest request);
    Task<BrandDetailResponse?> GetDetailAsync(int id);
}
