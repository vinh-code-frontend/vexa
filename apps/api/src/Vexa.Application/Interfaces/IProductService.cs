namespace Vexa.Application.Interfaces;

public interface IProductService
{
    Task<ProductDetailResponse> AddAsync(CreateProductRequest request);
    Task<ProductDetailResponse> UpdateAsync(int id, UpdateProductRequest request);
    Task DeleteAsync(int id);
    Task<PaginationResponse<ProductResponse>> GetAsync(ProductPaginationRequest request);
    Task<ProductDetailResponse?> GetDetailAsync(int id);
}
