namespace Vexa.Api.Controllers;

[Route("api/admin/brands")]
public class AdminBrandController(IBrandService brandService) : AdminApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetBrandsAsync()
    {
        return Ok();
    }
    [HttpGet("{id:int}")]
    public async Task<ActionResult> GetBrandByIdAsync()
    {
        return Ok();
    }
    [HttpPost]
    public async Task<ActionResult<BrandDetailResponse>> CreateBrandAsync([FromBody] CreateBrandRequest createBrandRequest)
    {
        return Ok(await brandService.CreateBrandAsync(createBrandRequest));
    }
    [HttpPut("{id:int}")]
    public async Task<ActionResult<BrandDetailResponse>> UpdateBrandAsync([FromRoute] int id, [FromBody] UpdateBrandRequest updateBrandRequest)
    {
        return Ok(await brandService.UpdateBrandAsync(id, updateBrandRequest));
    }
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteBrandAsync([FromRoute] int id)
    {
        await brandService.DeleteBrandAsync(id);
        return NoContent();
    }
}

