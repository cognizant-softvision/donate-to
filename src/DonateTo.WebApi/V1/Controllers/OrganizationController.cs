using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.WebApi.Filters;
using DonateTo.ApplicationCore.Models.Pagination;
using System.Linq;
using DonateTo.WebApi.Common;
using System.Globalization;
using System;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Authorization;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class OrganizationController : BaseApiController<Organization, OrganizationFilterModel>
    {
        private readonly IOrganizationService _organizationService;
        private readonly IContactService _contactService;

        public OrganizationController(IOrganizationService organizationService, IContactService contactService) : base(organizationService)
        {
            _organizationService = organizationService;
            _contactService = contactService;
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
        [ServiceFilter(typeof(OrganizationAccessFilter))]
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
            var organizations = await _organizationService.GetByUserIdAsync(GetUserId()).ConfigureAwait(false);

            if (!organizations.Any(o => o.Id == id))
            {
                return Unauthorized();
            }

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

        ///<inheritdoc cref="BaseApiController{Organization, OrganizationFilterModel}"/>
        [ServiceFilter(typeof(OrganizationAccessFilter))]
        public override Task<ActionResult<PagedResult<Organization>>> GetPagedFiltered([FromQuery] OrganizationFilterModel filter)
        {
            filter.UserId = GetUserId();

            return base.GetPagedFiltered(filter);
        }

        private long GetUserId()
        {
            return long.Parse(
                User.Claims.FirstOrDefault(claim =>
                    claim.Type.Contains(Claims.UserId, StringComparison.InvariantCulture))?.Value, CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// Soft Deletes an Organization
        /// </summary>
        /// <param name="id">Organization Id</param>
        /// <returns>IActionResult</returns>
        public override async Task<IActionResult> Delete(long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    StringValues client;
                    Request.Headers.TryGetValue("Origin", out client);

                    var organization = await _organizationService.GetAsync(id).ConfigureAwait(false);

                    await _organizationService.SoftDelete(id).ConfigureAwait(false);

                    var contact = await _contactService.GetAsync(organization.ContactId).ConfigureAwait(false);
                    await _organizationService.SendDeletedOrganizationMailAsync(contact, client).ConfigureAwait(false);

                    return Ok();
                }
                catch (KeyNotFoundException ex)
                {
                    return NotFound(ex);
                }
            }
        }
    }
}