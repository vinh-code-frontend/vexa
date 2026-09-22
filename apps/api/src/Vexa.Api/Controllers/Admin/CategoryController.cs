namespace Vexa.Api.Controllers;

[Route("api/admin/categories")]
[Tags("Category")]
public class AdminCategoryController(ICategoryService categoryService) : AdminApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ListResponse<CategoryResponse>>> GetAsync([FromQuery] CategoryListRequest request)
    {
        ListResponse<CategoryResponse> result = await categoryService.GetAsync(request);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CategoryDetailResponse?>> GetDetailAsync([FromRoute] int id)
    {
        CategoryDetailResponse? result = await categoryService.GetDetailAsync(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<CategoryDetailResponse>> AddAsync([FromBody] CreateCategoryRequest request)
    {
        CategoryDetailResponse result = await categoryService.AddAsync(request);
        return Ok(result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<CategoryDetailResponse>> UpdateAsync([FromRoute] int id, [FromBody] UpdateCategoryRequest request)
    {
        CategoryDetailResponse result = await categoryService.UpdateAsync(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteAsync([FromRoute] int id)
    {
        await categoryService.DeleteAsync(id);
        return NoContent();
    }
}
