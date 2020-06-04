using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Models.Pagination;
using System;

namespace DonateTo.WebApi.V1.Controllers
{
    /// <summary>
    /// Base api controller
    /// </summary>
    /// <typeparam name="T"></typeparam>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public abstract class BaseApiController<T> : ControllerBase where T : class
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1051:Do not declare visible instance fields", Justification = "<Pending>")]
        protected readonly IBaseService<T> _baseService;

        public BaseApiController(IBaseService<T> baseService)
        {
            _baseService = baseService;
        }

        /// <summary>
        /// Get an entity list.
        /// </summary>
        /// <returns>List of entities.</returns>
        [HttpGet(Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual async Task<ActionResult<IEnumerable<T>>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _baseService.GetAsync().ConfigureAwait(false);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        /// <summary>
        /// Get an Entity by id.
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>Entity.</returns>
        [HttpGet("{id}",Name = "[controller]_[action]_Id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual async Task<ActionResult<IEnumerable<T>>> Get(long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _baseService.GetAsync(id).ConfigureAwait(false);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        /// <summary>
        /// Creates a new entity.
        /// </summary>
        /// <param name="value">Entity to create.</param>
        /// <returns>Created entity.</returns>
        [HttpPost(Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Post([FromBody] T value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _baseService.CreateAsync(value).ConfigureAwait(false);

                return Ok(result);
            }
        }

        /// <summary>
        /// Updates an entity
        /// </summary>
        /// <param name="id">Id of the entity to update.</param>
        /// <param name="value">Entity to update.</param>
        /// <returns>Updated entity.</returns>
        [HttpPut("{id}",Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Put(long id, [FromBody] T value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    var result = await _baseService.UpdateAsync(value, id).ConfigureAwait(false);

                    return Ok(result);
                }
                catch (ArgumentNullException ex)
                {
                    return NotFound(ex);
                }
                catch (InvalidOperationException ex)
                {
                    return BadRequest(ex);
                }                
            }
        }

        /// <summary>
        /// Deletes an entity
        /// </summary>
        /// <param name="id">Id of the entity to delete.</param>
        [HttpDelete("{id}",Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Delete(long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    await _baseService.DeleteAsync(id).ConfigureAwait(false);

                    return Ok();
                }
                catch (KeyNotFoundException ex)
                {
                    return NotFound(ex);
                }
            }
        }

        /// <summary>
        /// Gets a paged entity list starting with given <paramref name="pageNumber"/> and with <paramref name="pageSize"/>
        /// </summary>
        /// <param name="pageNumber">Page number.</param>
        /// <param name="pageSize">Page size.</param>
        /// <returns>Entity paged result.</returns>
        [AllowAnonymous]
        [HttpGet("paged", Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<ActionResult<PagedResult<T>>> GetPaged(int pageNumber, int pageSize)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _baseService.GetPagedAsync(pageNumber, pageSize).ConfigureAwait(false);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
        }
    }
}
