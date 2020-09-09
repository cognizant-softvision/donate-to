using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using DonateTo.ApplicationCore.Models.Filtering;
using Microsoft.AspNetCore.Authorization;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{City}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class CityController : BaseApiController<City, BaseFilterModel>
    {
        private readonly ICityService _cityService;

        public CityController(ICityService cityService) : base(cityService)
        {
            _cityService = cityService;
        }

        /// <summary>
        /// Gets a list of cities by state Id.
        /// </summary>
        /// <param name="stateId">State Id</param>
        /// <returns>Users list.</returns>
        [HttpGet("ByState")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IEnumerable<City>> GetCitiesByStateAsync(long stateId)
        {
            return await _cityService.GetCitiesByStateAsync(stateId).ConfigureAwait(false);
        }
    }
}