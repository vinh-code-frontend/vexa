namespace Vexa.Api.Controllers;

public class BrandController() : ClientApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetAsync()
    {
        return Ok();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult> GetDetailAsync([FromRoute] int id)
    {
        return Ok(id);
    }

    [HttpPost]
    public async Task<ActionResult> AddAsync()
    {
        return Ok();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateAsync([FromRoute] int id)
    {
        return Ok(id);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteAsync([FromRoute] int id)
    {
        return NoContent();
    }
}
