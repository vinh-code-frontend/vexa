namespace Vexa.Api.Controllers;

[Route("api/admin/brands")]
public class AdminBrandController(IBrandService brandService) : AdminApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginationResponse<BrandResponse>>> GetBrandsAsync([FromQuery] PaginationRequest request)
    {
        PaginationResponse<BrandResponse> result = await brandService.GetBrandsAsync(request);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BrandDetailResponse?>> GetBrandByIdAsync([FromRoute] int id)
    {
        BrandDetailResponse? result = await brandService.GetBrandByIdAsync(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<BrandDetailResponse>> CreateBrandAsync([FromBody] CreateBrandRequest request)
    {
        BrandDetailResponse result = await brandService.CreateBrandAsync(request);
        return Ok(result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<BrandDetailResponse>> UpdateBrandAsync([FromRoute] int id, [FromBody] UpdateBrandRequest request)
    {
        BrandDetailResponse result = await brandService.UpdateBrandAsync(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteBrandAsync([FromRoute] int id)
    {
        await brandService.DeleteBrandAsync(id);
        return NoContent();
    }
}

