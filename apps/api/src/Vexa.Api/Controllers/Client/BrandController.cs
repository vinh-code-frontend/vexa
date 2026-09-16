namespace Vexa.Api.Controllers;

public class BrandController() : ClientApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetBrandsAsync()
    {
        return Ok();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult> GetBrandByIdAsync([FromRoute] int id)
    {
        return Ok(id);
    }

    [HttpPost]
    public async Task<ActionResult> CreateBrandAsync()
    {
        return Ok();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateBrandAsync([FromRoute] int id)
    {
        return Ok(id);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteBrandAsync([FromRoute] int id)
    {
        return NoContent();
    }
}
