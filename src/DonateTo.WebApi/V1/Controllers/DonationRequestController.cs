using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Authorization;
using DonateTo.WebApi.Common;
using DonateTo.WebApi.Filters;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using System.Globalization;
using DonateTo.ApplicationCore.Common;
using System;
using System.Collections.Generic;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{DonationRequest, DonationRequestFilterModel}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class DonationRequestController : BaseApiController<DonationRequest, DonationRequestFilterModel>
    {
        private readonly IDonationRequestService _donationRequestService;
        private readonly IUserService _userService;
        private readonly IDonationService _donationService;

        public DonationRequestController(
            IDonationRequestService donationRequestService,
            IUserService userService, 
            IDonationService donationService) : base(donationRequestService)
        {
            _donationRequestService = donationRequestService;
            _userService = userService;
            _donationService = donationService;
        }

        /// <summary>
        /// Creates a new DonationRequest.
        /// </summary>
        /// <param name="value">Entity to create.</param>
        /// <returns>Created entity.</returns>
        [HttpPost(Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ServiceFilter(typeof(OrganizationAccessFilter))]
        public override async Task<IActionResult> Post([FromBody] DonationRequest value)
        {
            if (!ModelState.IsValid || value == null)
            {
                return BadRequest();
            }
            else
            {
                StringValues client;
                Request.Headers.TryGetValue("Origin", out client);

                var username = User.Claims.FirstOrDefault(claim => claim.Type == Claims.UserName)?.Value;

                var donationRequest = await _baseService.CreateAsync(value, username).ConfigureAwait(false);
                var users = await _userService.GetByOrganizationIdAsync(donationRequest.OrganizationId).ConfigureAwait(false);
                await _donationRequestService.SendNewRequestMailToOrganizationUsersAsync(donationRequest, users, client).ConfigureAwait(false);

                return Ok(donationRequest);
            }
        }

        /// <summary>
        /// Updates a DonationRequest
        /// </summary>
        /// <param name="id">DonationRequest Id</param>
        /// <param name="donationRequest">DonationRequest</param>
        /// <returns>Updated DonationRequest.</returns>
        [ServiceFilter(typeof(OrganizationAccessFilter))]
        public override Task<IActionResult> Put(long id, [FromBody] DonationRequest donationRequest)
        {
            return base.Put(id, donationRequest);
        }

        /// <summary>
        /// Deletes a DonationRequest
        /// </summary>
        /// <param name="id">DonationRequestId to delete.</param>
        [ServiceFilter(typeof(OrganizationAccessFilter))]
        public override Task<IActionResult> Delete(long id)
        {
            return base.Delete(id);
        }

        ///<inheritdoc cref="BaseApiController{DonationRequest, DonationRequestFilterModel}"/>
        public override async Task<ActionResult<PagedResult<DonationRequest>>> GetPagedFiltered([FromQuery] DonationRequestFilterModel filter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var userRole = User.Claims.Select(c => c.Value).ToList();

                if (userRole.Contains(Roles.Superadmin))
                {
                    var result = await _donationRequestService.GetPagedFilteredAsync(filter).ConfigureAwait(false);

                    if (result != null)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return NotFound();
                    }
                } else if (userRole.Contains(Roles.Admin) || userRole.Contains(Roles.Organization)) {
                    // Obtengo mi userId
                    var userId = long.Parse(
                                 User.Claims.FirstOrDefault(
                                 claim => claim.Type.Contains(Claims.UserId, StringComparison.InvariantCulture))?.Value, CultureInfo.InvariantCulture);

                    var result = await _donationRequestService.GetPagedFilteredByOrganizationAsync(filter, userId).ConfigureAwait(false);

                    if (result != null)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return NotFound();
                    }
                } else
                {
                    return Unauthorized();
                }
            }
        }

        /// <summary>
        /// Soft Deletes a DonationRequest
        /// </summary>
        /// <param name="id">DonationRequest Id</param>
        /// <param name="donationRequest">DonationRequest</param>
        /// <returns>DonationRequest soft deleted.</returns>
        [HttpPut(Name = "[controller]_[action]")]
        [ServiceFilter(typeof(OrganizationAccessFilter))]
        public async Task<IActionResult> SoftDelete(long id, [FromBody] DonationRequest donationRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            } else
            {
                try
                {
                    StringValues client;
                    Request.Headers.TryGetValue("Origin", out client);

                    await _donationRequestService.SoftDelete(donationRequest).ConfigureAwait(false);

                    if(donationRequest.StatusId != StatusType.Completed)
                    {
                        var donations = await _donationService.GetAsync((donation => donation.DonationRequestId == donationRequest.Id)).ConfigureAwait(false);
                        donations = donations.Where(donation => donation.StatusId != StatusType.Completed);
                    
                        if (donations.Count() > 0)
                        {
                            var users = await _userService.GetByOrganizationIdAsync(donationRequest.OrganizationId).ConfigureAwait(false);
                            await _donationRequestService.SendDeleteRequestMailToOrganizationUsersAsync(donationRequest, users, client).ConfigureAwait(false);
                        }
                    }

                    return Ok();
                }
                catch (KeyNotFoundException ex)
                {
                    return NotFound(ex);
                }
            }
        }

        /// <summary>
        /// Soft Deletes a DonationRequestItem
        /// </summary>
        /// <param name="donationRequestItem">DonationRequestItem</param>
        /// <returns>DonationRequestItem soft deleted.</returns>
        [HttpPut("softDeleteItem", Name = "[controller]_[action]")]
        [ServiceFilter(typeof(OrganizationAccessFilter))]
        public async Task<IActionResult> SoftDeleteRequestItem([FromBody] DonationRequestItem donationRequestItem)
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

                    await _donationRequestService.SoftDelete(donationRequestItem).ConfigureAwait(false);

                    var donors = _donationService.GetDonorsByDonationRequestItemId(donationRequestItem.Id);
                    await _donationRequestService.SendDeletedDonationRequestItemMailAsync(donationRequestItem, donors, client).ConfigureAwait(false);

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
