﻿using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.WebApi.Filters;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class OrganizationController : BaseApiController<Organization, OrganizationFilterModel>
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
        [HttpGet("getByUser", Name = "[controller]_[action]")]
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
        /// Updates an Organization
        /// </summary>
        /// <param name="id">Organization Id</param>
        /// <param name="organization">Organization</param>
        /// <returns>Updated Organization.</returns>
        [ServiceFilter(typeof(AdminAccessFilter))]
        public override async Task<IActionResult> Put(long id, [FromBody] Organization organization)
        {
            return await base.Put(id, organization).ConfigureAwait(false);
        }

        /// <summary>
        /// Creates an Organization
        /// </summary>
        /// <param name="value">Organization</param>
        /// <returns>New Organization.</returns>
        [ServiceFilter(typeof(AdminAccessFilter))]
        public override async Task<IActionResult> Post([FromBody] Organization value)
        {
            return await base.Post(value).ConfigureAwait(false);
        }
    }
}