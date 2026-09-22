namespace Vexa.Api.Controllers;

[Route("api/admin/brands")]
[Tags("Brand")]
public class AdminBrandController(IBrandService brandService) : AdminApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginationResponse<BrandResponse>>> GetAsync([FromQuery] PaginationRequest request)
    {
        PaginationResponse<BrandResponse> result = await brandService.GetAsync(request);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BrandDetailResponse?>> GetDetailAsync([FromRoute] int id)
    {
        BrandDetailResponse? result = await brandService.GetDetailAsync(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<BrandDetailResponse>> AddAsync([FromBody] CreateBrandRequest request)
    {
        BrandDetailResponse result = await brandService.AddAsync(request);
        return Ok(result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<BrandDetailResponse>> UpdateAsync([FromRoute] int id, [FromBody] UpdateBrandRequest request)
    {
        BrandDetailResponse result = await brandService.UpdateAsync(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteAsync([FromRoute] int id)
    {
        await brandService.DeleteAsync(id);
        return NoContent();
    }
}

