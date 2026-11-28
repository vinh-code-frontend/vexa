namespace Vexa.Api.Controllers;

[Route("api/admin/products")]
[Tags("Product")]
public class AdminProductController(IProductService productService) : AdminApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginationResponse<ProductResponse>>> GetAsync([FromQuery] ProductPaginationRequest request)
    {
        PaginationResponse<ProductResponse> result = await productService.GetAsync(request);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDetailResponse?>> GetDetailAsync([FromRoute] int id)
    {
        ProductDetailResponse? result = await productService.GetDetailAsync(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDetailResponse>> AddAsync([FromBody] CreateProductRequest request)
    {
        ProductDetailResponse result = await productService.AddAsync(request);
        return Ok(result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDetailResponse>> UpdateAsync([FromRoute] int id, [FromBody] UpdateProductRequest request)
    {
        ProductDetailResponse result = await productService.UpdateAsync(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteAsync([FromRoute] int id)
    {
        await productService.DeleteAsync(id);
        return NoContent();
    }
}
