using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{DonationRequest}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class DonationRequestController : BaseApiController<DonationRequest>
    {
        public DonationRequestController(IBaseService<DonationRequest> donationRequestService) : base(donationRequestService)
        { }

        /// <summary>
        /// Creates a new entity.
        /// </summary>
        /// <param name="value">Entity to create.</param>
        /// <returns>Created entity.</returns>
        [HttpPost(Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public override async Task<IActionResult> Post([FromBody] DonationRequest value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var userId = User.Claims.FirstOrDefault(claim => claim.Type == _userIdClaim)?.Value;
                var username = User.Claims.FirstOrDefault(claim => claim.Type == _usernameClaim)?.Value;
                value.UserId = Convert.ToInt64(userId);
                var result = await _baseService.CreateAsync(value, username).ConfigureAwait(false);

                return Ok(result);
            }
        }
    }
}