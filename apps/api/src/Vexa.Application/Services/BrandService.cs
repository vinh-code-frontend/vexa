using Vexa.Application.Exceptions;

namespace Vexa.Application.Services;

public class BrandService(
    IBrandRepository brandRepository,
    IMapper mapper,
    ICurrentUserService currentUserService) : IBrandService
{
    public async Task<BrandDetailResponse> CreateBrandAsync(CreateBrandRequest request)
    {
        Brand brand = mapper.Map<Brand>(request);
        brand.Name = request.Name.Trim();
        brand.Slug = SlugHelper.GenerateSlug(brand.Name);

        if (await brandRepository.ExistsAsync(brand.Name, brand.Slug))
        {
            throw new ConflictException("Brand name or slug already exists!");
        }

        await brandRepository.AddAsync(brand);
        return mapper.Map<BrandDetailResponse>(brand);
    }

    public async Task<BrandDetailResponse> UpdateBrandAsync(int id, UpdateBrandRequest request)
    {
        Brand? brand = await brandRepository.GetByIdAsync(id);
        if (brand is null)
        {
            throw new NotFoundException("Brand not found!");
        }

        mapper.Map(request, brand);
        brand.Name = request.Name.Trim();
        brand.Slug = SlugHelper.GenerateSlug(brand.Name);

        if (await brandRepository.ExistsAsync(brand.Name, brand.Slug, brand.Id))
        {
            throw new ConflictException("Brand name or slug already exists!");
        }

        brand.UpdatedAt = DateTime.UtcNow;

        await brandRepository.UpdateAsync(brand);

        return mapper.Map<BrandDetailResponse>(brand);
    }

    public async Task DeleteBrandAsync(int id)
    {
        Brand? brand = await brandRepository.GetByIdIncludingDeletedAsync(id);
        if (brand is null)
        {
            throw new NotFoundException("Brand not found!");
        }
        if (brand.DeletedAt != null)
        {
            throw new ConflictException("Brand has already been deleted!");
        }
        await brandRepository.SoftDeleteAsync(brand, currentUserService.UserId);
    }

    public async Task<BrandDetailResponse?> GetBrandByIdAsync(int id)
    {
        Brand? brand = await brandRepository.GetByIdAsync(id);

        return brand is null ? null : mapper.Map<BrandDetailResponse>(brand);
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
