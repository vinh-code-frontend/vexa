namespace Vexa.Application.Services;

public class BrandService(IBrandRepository brandRepository, IMapper mapper) : IBrandService
{
    public async Task<BrandDetailResponse> CreateBrandAsync(CreateBrandRequest request)
    {
        Brand brand = mapper.Map<Brand>(request);
        throw new NotImplementedException();
    }

    public async Task<BrandDetailResponse> UpdateBrandAsync(int id, UpdateBrandRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteBrandAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<BrandDetailResponse?> GetBrandByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<PaginationResponse<BrandResponse>> GetBrandsAsync(PaginationRequest request)
    {
        throw new NotImplementedException();
    }
}
