using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiController]
    public abstract class BaseApiController<T> : ControllerBase where T : class
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public abstract ActionResult<IEnumerable<T>> Get();

        [HttpGet("{id}", Name = "Get")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public abstract ActionResult<IEnumerable<T>> Get(int id);

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public abstract IActionResult Post([FromBody] string value);

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public abstract IActionResult Put(int id, [FromBody] string value);

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public abstract IActionResult Delete(int id);
    }
}
