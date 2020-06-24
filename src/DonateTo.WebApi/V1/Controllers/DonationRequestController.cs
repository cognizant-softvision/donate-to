using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System;
using System.Globalization;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Authorization;

using DonateTo.WebApi.Common;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{DonationRequest}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class DonationRequestController : BaseApiController<DonationRequest>
    {
        private readonly IDonationRequestService _donationRequestService;
        private readonly IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        public DonationRequestController(
            IDonationRequestService donationRequestService,
            IUserService userService,
            IAuthorizationService authorizationService) : base(donationRequestService)
        {
            _donationRequestService = donationRequestService;
            _userService = userService;
            _authorizationService = authorizationService;
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

                value.UserId = Convert.ToInt64(User.Claims.FirstOrDefault(claim => claim.Type == Claims.UserId)?.Value, CultureInfo.InvariantCulture);

                var donationRequest = await _baseService.CreateAsync(value, username).ConfigureAwait(false);
                var users = await _userService.GetByOrganizationIdAsync(donationRequest.OrganizationId).ConfigureAwait(false);
                await _donationRequestService.SendNewRequestMailToOrganizationUsersAsync(donationRequest, users, client).ConfigureAwait(false);

                return Ok(donationRequest);
            }
        }
    }
}