using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class StatusController : BaseApiController<Status, BaseFilterModel>
    {
        public StatusController(IBaseService<Status, BaseFilterModel> statusService) :
            base(statusService)
        {
        }
    }
}