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
        int page = request.Page > 0 ? request.Page : 1;
        int pageSize = request.PageSize > 0 ? request.PageSize : 10;
        (List<Brand> brandItems, int totalCount) = await brandRepository.GetBrandListAsync(
            page,
            pageSize,
            request.Search,
            request.SortBy,
            request.SortDirection);
        List<BrandResponse> items = mapper.Map<List<BrandResponse>>(
            brandItems);

        return new PaginationResponse<BrandResponse>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
}
