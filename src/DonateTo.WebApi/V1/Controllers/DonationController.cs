using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using DonateTo.ApplicationCore;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{Donation}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class DonationController : BaseApiController<Donation>
    {
        private readonly IDonationService _donationService;

        public DonationController(IDonationService donationService) 
            : base(donationService)
        {
        }


        /// <summary>
        /// Creates a new donation with it's children.
        /// </summary>
        ///// <param name="donation">Hydrated donation to create.</param>
        ///// <returns>Created donation.</returns>
        //[HttpPost(Name = "PostHydrated")]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //public async Task<IActionResult> PostHydrated([FromBody] Donation donation)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest();
        //    }
        //    else
        //    {
        //        var result = await _baseService.CreateHydratedAsync(donation).ConfigureAwait(false);

        //        return Ok(result);
        //    }
        //}
    }
}