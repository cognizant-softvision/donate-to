using System.Collections.Generic;
using DonateTo.Infrastructure.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class SampleController : BaseApiController<string>
    {
        public override ActionResult<IEnumerable<string>> Get()
        {
            return Ok(new string[] { "value1", "value2" });
        }

        public override ActionResult<IEnumerable<string>> Get(long id)
        {
            return Ok("value");
        }

        public override IActionResult Post([FromBody] string value)
        {
            return Created("Get", value);
        }

        public override IActionResult Put(long id, [FromBody] string value)
        {
            return Ok();
        }

        public override IActionResult Delete(long id)
        {
            return Ok();
        }
    }
}
