using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Entities;
using DonateTo.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class LogController : ControllerBase
    {
        private readonly ILogService _logService;

        public LogController(ILogService logService)
        {
            _logService = logService;
        }
        
        /// <summary>
        /// Gets a paged logs list starting with given <paramref name="pageNumber"/> and with <paramref name="pageSize"/>
        /// </summary>
        /// <param name="pageNumber">Page number.</param>
        /// <param name="pageSize">Page size.</param>
        /// <returns>USers paged result.</returns>
        [HttpGet("paged", Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ServiceFilter(typeof(SuperAdminAccessFilter))]
        public async Task<ActionResult<PagedResult<Log>>> GetPaged(int pageNumber, int pageSize)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _logService.GetPagedAsync(pageNumber, pageSize).ConfigureAwait(false);

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
        /// Get a paged list or Logs filterd by given data
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet("pagedFiltered", Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ServiceFilter(typeof(SuperAdminAccessFilter))]
        public async Task<ActionResult<PagedResult<Log>>> GetPagedFiltered([FromQuery] LogFilterModel filter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _logService.GetPagedFilteredAsync(filter).ConfigureAwait(false);

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