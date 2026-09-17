namespace Vexa.Api.Controllers;

[Route("api/admin/categories")]
public class AdminCategoryController(ICategoryService categoryService) : AdminApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginationResponse<CategoryResponse>>> GetCategoriesAsync([FromRoute] PaginationRequest request)
    {
        PaginationResponse<CategoryResponse> result = await categoryService.GetCategoriesAsync(request);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CategoryDetailResponse?>> GetCategoryByIdAsync([FromRoute] int id)
    {
        CategoryDetailResponse? result = await categoryService.GetCategoryByIdAsync(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<CategoryDetailResponse>> CreateCategoryAsync([FromBody] CreateCategoryRequest request)
    {
        CategoryDetailResponse result = await categoryService.CreateCategoryAsync(request);
        return Ok(result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<CategoryDetailResponse>> UpdateCategoryAsync([FromRoute] int id, [FromBody] UpdateCategoryRequest request)
    {
        CategoryDetailResponse result = await categoryService.UpdateCategoryAsync(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteCategoryAsync([FromRoute] int id)
    {
        await categoryService.DeleteCategoryAsync(id);
        return NoContent();
    }
}
