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

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{Donation}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class DonationController : BaseApiController<Donation>
    {
        private readonly IDonationService _donationService;
        private readonly IUserService _userService;

        public DonationController(IDonationService donationService,
            IUserService userService,
            IMailSender mailSender) : base(donationService)
        {
            _userService = userService;
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

                var username = User.Claims.FirstOrDefault(claim => claim.Type == _usernameClaim)?.Value;
                var userId = Convert.ToInt64(User.Claims.FirstOrDefault(claim => claim.Type == _userIdClaim)?.Value, CultureInfo.InvariantCulture);

                var donation = await _baseService.CreateAsync(value, username).ConfigureAwait(false);

                var user = await _userService.GetAsync(userId).ConfigureAwait(false);
                await _donationService.SendNewDonationMailAsync(donation, user, client).ConfigureAwait(false);

                return Ok(donation);
            }
        }
    }
}