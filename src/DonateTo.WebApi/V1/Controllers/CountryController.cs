using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using Microsoft.AspNetCore.Authorization;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{Country}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class CountryController : BaseApiController<Country, BaseFilterModel>
    {
        public CountryController(IBaseService<Country, BaseFilterModel> donationService) : base(donationService)
        {
        }
    }
}