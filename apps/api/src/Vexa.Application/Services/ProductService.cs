namespace Vexa.Application.Services;

public class ProductService(
    IProductRepository productRepository,
    IMapper mapper,
    ICurrentUserService currentUserService) : IProductService
{
    public async Task<ProductDetailResponse> AddAsync(CreateProductRequest request)
    {
        if (!await productRepository.ReferencesExistAsync(request.BrandId, request.CategoryId))
        {
            throw new ConflictException("Brand or category is invalid!");
        }

        ProductEntity product = mapper.Map<ProductEntity>(request);
        product.Name = request.Name.Trim();
        product.Slug = SlugHelper.GenerateSlug(product.Name);

        if (await productRepository.ExistsAsync(product.Name, product.Slug))
        {
            throw new ConflictException("Product name or slug already exists!");
        }

        await productRepository.AddAsync(product);
        return mapper.Map<ProductDetailResponse>(product);
    }

    public async Task<ProductDetailResponse> UpdateAsync(int id, UpdateProductRequest request)
    {
        ProductEntity? product = await productRepository.GetByIdAsync(id);
        if (product is null)
        {
            throw new NotFoundException("Product not found!");
        }

        if (!await productRepository.ReferencesExistAsync(request.BrandId, request.CategoryId))
        {
            throw new ConflictException("Brand or category is invalid!");
        }

        mapper.Map(request, product);
        await productRepository.UpdateAsync(product);
        return mapper.Map<ProductDetailResponse>(product);
    }

    public async Task DeleteAsync(int id)
    {
        ProductEntity? product = await productRepository.GetByIdIncludingDeletedAsync(id);
        if (product is null)
        {
            throw new NotFoundException("Product not found!");
        }
        if (product.DeletedAt != null)
        {
            throw new ConflictException("Product has already been deleted!");
        }

        await productRepository.SoftDeleteAsync(product, currentUserService.UserId);
    }

    public async Task<ProductDetailResponse?> GetDetailAsync(int id)
    {
        ProductEntity? product = await productRepository.GetByIdAsync(id);
        return product is null ? null : mapper.Map<ProductDetailResponse>(product);
    }

    public async Task<PaginationResponse<ProductResponse>> GetAsync(ProductPaginationRequest request)
    {
        int page = request.Page > 0 ? request.Page : 1;
        int pageSize = request.PageSize > 0 ? request.PageSize : 10;
        (List<ProductEntity> productItems, int totalCount) = await productRepository.GetProductListAsync(
            page,
            pageSize,
            request.Search,
            request.SortBy,
            request.SortDirection,
            request.BrandId,
            request.CategoryId);

        return new PaginationResponse<ProductResponse>
        {
            Items = mapper.Map<List<ProductResponse>>(productItems),
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
}
