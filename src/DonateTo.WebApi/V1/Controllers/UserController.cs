using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : BaseApiController<User>
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService, IUnitOfWork unitOfWork) : base(userService, unitOfWork)
        {
            _userService = userService;
        }

        [HttpGet("paged", Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<ActionResult<PagedResult<User>>> GetPagedUsersByOrganizationAsync(long organizationId, int pageNumber, int pageSize)
        {
            return await _userService.GetPagedUsersByOrganizationAsync(organizationId, pageNumber, pageSize).ConfigureAwait(false);
        }
    }

}