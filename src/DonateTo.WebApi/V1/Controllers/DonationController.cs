using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;
using DonateTo.Mailer.Interfaces;
using System;
using System.Linq;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using DonateTo.ApplicationCore.Models.Pagination;

using DonateTo.WebApi.Common;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{Donation}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class DonationController : BaseApiController<Donation>
    {
        private readonly IDonationService _donationService;
        private readonly IUserService _userService;

        public DonationController(IDonationService donationService,
            IUserService userService) : base(donationService)
        {
            _userService = userService;
            _donationService = donationService;
        }

        /// <summary>
        /// Creates a new Donation.
        /// </summary>
        /// <param name="value">Entity to create.</param>
        /// <returns>Created entity.</returns>
        [HttpPost(Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public override async Task<IActionResult> Post([FromBody] Donation value)
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
                var userId = Convert.ToInt64(User.Claims.FirstOrDefault(claim => claim.Type == Claims.UserId)?.Value, CultureInfo.InvariantCulture);

                var donation = await _baseService.CreateAsync(value, username).ConfigureAwait(false);

                var user = await _userService.GetAsync(donation.UserId).ConfigureAwait(false);
                await _donationService.SendNewDonationMailAsync(donation, user, client).ConfigureAwait(false);

                return Ok(donation);
            }
        }

        /// <summary>
        /// Gets a paged donation list starting with given <paramref name="pageNumber"/> and with <paramref name="pageSize"/> filtered by user
        /// </summary>
        /// <param name="pageNumber">Page number.</param>
        /// <param name="pageSize">Page size.</param>
        /// <param name="userId">Status</param>
        /// <param name="statusId">Status</param>
        /// <returns>Entity paged result.</returns>
        [AllowAnonymous]
        [HttpGet("pagedByUser", Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<Donation>>> GetPagedByUser(int pageNumber, int pageSize, long? userId = null, long? statusId = null)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var defaultedUserId = userId ?? long.Parse(User.Claims.First(claim => claim.Type == Claims.UserId).Value);
                var result = await _donationService.GetPagedAsync(
                                                        pageNumber, 
                                                        pageSize, 
                                                        (d => (d.UserId == defaultedUserId) && (!statusId.HasValue || d.StatusId == statusId)))
                                                    .ConfigureAwait(false);

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