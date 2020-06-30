using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.ApplicationCore.Models;
using System.Linq.Expressions;
using System;
using DonateTo.ApplicationCore.Common;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class OrganizationController : BaseApiController<Organization>
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService) : base(organizationService)
        {
            _organizationService = organizationService;
        }

        /// <summary>
        /// Get a list of organizations linked to a user by id.
        /// </summary>
        /// <param name="userId">Id</param>
        /// <returns>List of organizations</returns>
        [HttpGet("{userId}", Name = "GetByUserId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public async Task<ActionResult<IEnumerable<Organization>>> GetByUserId(long userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _organizationService.GetByUserIdAsync(userId).ConfigureAwait(false);

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
        /// 
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="filter"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        [HttpPost("searchOrganization")]
        public async Task<ActionResult<PagedResult<OrganizationModel>>> SearchOrganization(
            int pageNumber = 0, 
            int pageSize = 100, 
            IEnumerable<FilterModel> filter = null, 
            SortModel sort = null)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {             
                var result = await _organizationService.GetPagedAsync(pageNumber, pageSize, filter, sort).ConfigureAwait(false);

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