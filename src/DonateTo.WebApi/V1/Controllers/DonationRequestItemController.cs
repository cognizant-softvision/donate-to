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
using DonateTo.ApplicationCore.Interfaces.Repositories;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{DonationRequest, DonationRequestFilterModel}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class DonationRequestItemController : BaseApiController<DonationRequestItem, BaseFilterModel>
    {
        private readonly IDonationRequestItemService _donationRequestItemService;
        private readonly IDonationService _donationService;


        public DonationRequestItemController(IDonationRequestItemService donationRequestItemService, IDonationService donationService) : base(donationRequestItemService)
        {
            _donationRequestItemService = donationRequestItemService;
            _donationService = donationService;
        }

        /// <summary>
        /// Soft Deletes a DonationRequestItem
        /// </summary>
        /// <param name="donationRequestItemId">DonationRequestItemId</param>
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

                    var donationRequestItem = await _donationRequestItemService.GetAsync(id).ConfigureAwait(false);

                    await _donationRequestItemService.SoftDelete(id).ConfigureAwait(false);

                    var donors = _donationService.GetDonorsByDonationRequestItemId(id);
                    await _donationRequestItemService.SendDeletedDonationRequestItemMailAsync(donationRequestItem, donors, client).ConfigureAwait(false);

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