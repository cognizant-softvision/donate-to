using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        // GET: api/BaseApi
        [HttpGet]
        public ActionResult <IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/BaseApi/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult <string> Get(int id)
        {
            return "value";
        }

        // POST: api/BaseApi
        [HttpPost]
        public IActionResult Post([FromBody] string value)
        {
            return Ok();
        }

        // PUT: api/BaseApi/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }
    }
}
