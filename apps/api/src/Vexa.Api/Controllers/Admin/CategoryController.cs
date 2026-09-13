namespace Vexa.Api.Controllers;

[Route("api/admin/categories")]
public class AdminCategoryController() : AdminApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetCategoriesAsync()
    {
        return Ok();
    }
    [HttpGet("{id:int}")]
    public async Task<ActionResult> GetCategoryByIdAsync()
    {
        return Ok();
    }
    [HttpPost]
    public async Task<ActionResult> CreateCategoryAsync()
    {
        return Ok();
    }
    [HttpPut]
    public async Task<ActionResult> UpdateCategoryAsync()
    {
        return Ok();
    }
    [HttpDelete]
    public async Task<ActionResult> DeleteCategoryAsync()
    {
        return Ok();
    }
}
