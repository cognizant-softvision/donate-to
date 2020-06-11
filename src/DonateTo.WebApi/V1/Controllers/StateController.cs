using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{State}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class StateController : BaseApiController<State>
    {
        private readonly IStateService _stateService;

        public StateController(IStateService stateService) : base(stateService)
        {
            _stateService = stateService;
        }

        /// <summary>
        /// Gets a states list by country Id.
        /// </summary>
        /// <param name="countryId">Country Id</param>
        /// <returns>Users list.</returns>
        [HttpGet("ByCountry")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IEnumerable<State>> GetStatesByCountryAsync(long countryId)
        {
            return await _stateService.GetStatesByCountryAsync(countryId).ConfigureAwait(false);
        }
    }
}