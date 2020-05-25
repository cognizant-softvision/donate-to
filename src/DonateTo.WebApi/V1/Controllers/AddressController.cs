using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AddressController : BaseApiController<Address>
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService, IUnitOfWork unitOfWork) :
            base(addressService, unitOfWork)
        {
            _addressService = addressService;
        }

        /// <summary>
        /// Use the method to request a list of Addresses associated with an Organization by Organization Id from the server.
        /// </summary>
        /// <param name="organizationId">ID of the Organization resource to be search.</param>
        /// <returns>Status 200 if the request has succeeded,
        /// Status 404 if not found the request or
        /// Status 500 if that have an error</returns>
        [HttpGet("[action]", Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Address>>> GetByOrganizationId(long organizationId)
        {
            var result = await _addressService.GetByOrganizationIdAsync(organizationId).ConfigureAwait(false);

            return Ok(result);
        }

    }
}