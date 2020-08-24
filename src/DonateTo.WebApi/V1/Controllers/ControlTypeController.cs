using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class ControlTypeController : BaseApiController<ControlType, BaseFilterModel>
    {
        public ControlTypeController(IBaseService<ControlType, BaseFilterModel> controlTypeService) : base(controlTypeService)
        {
        }
    }
}