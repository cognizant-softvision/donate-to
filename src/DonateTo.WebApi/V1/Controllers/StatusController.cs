using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class StatusController : BaseApiController<Status>
    {
        public StatusController(IBaseService<Status> statusService, IUnitOfWork unitOfWork) :
            base(statusService, unitOfWork)
        {
        }
    }
}