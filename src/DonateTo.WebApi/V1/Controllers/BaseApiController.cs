using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Models.Pagination;
using System;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public abstract class BaseApiController<T> : ControllerBase where T : class
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1051:Do not declare visible instance fields", Justification = "<Pending>")]
        protected readonly IBaseService<T> _baseService;

        public BaseApiController(IBaseService<T> baseService, IUnitOfWork unitOfWork)
        {
            _baseService = baseService;
        }

        /// <summary>
        /// Get a list of <typeparamref name="T"/>.
        /// </summary>
        /// <returns>List of <typeparamref name="T"/> entities.</returns>
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
        /// Get a single <typeparamref name="T"/> by <paramref name="id"/>.
        /// </summary>
        /// <param name="id"><typeparamref name="T"/> Id</param>
        /// <returns><typeparamref name="T"/> entity.</returns>
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
        /// Creates a new <typeparamref name="T"/> entity.
        /// </summary>
        /// <param name="value"><typeparamref name="T"/> to create.</param>
        /// <returns><typeparamref name="T"/> created entity.</returns>
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
        /// Updates a <typeparamref name="T"/>
        /// </summary>
        /// <param name="id"><paramref name="id"/> of the <typeparamref name="T"/> to update.</param>
        /// <param name="value"><paramref name="value"/> of the <typeparamref name="T"/>.</param>
        /// <returns><typeparamref name="T"/> updated entity.</returns>
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
        /// Deletes a <typeparamref name="T"/>
        /// </summary>
        /// <param name="id"><paramref name="id"/> of the <typeparamref name="T"/> to delete.</param>
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
        /// Gets a paged <typeparamref name="T"/> paged result matching given <paramref name="pageNumber"/> and <paramref name="pageSize"/>
        /// </summary>
        /// <param name="pageNumber"><paramref name="pageNumber"/> page number.</param>
        /// <param name="pageSize"><paramref name="pageSize"/> page size.</param>
        /// <returns><typeparamref name="T"/> paged result.</returns>
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
