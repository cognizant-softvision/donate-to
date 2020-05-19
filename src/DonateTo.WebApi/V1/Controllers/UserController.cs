using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
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

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ActionResult<User>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> AssociateUserToOrganization(long userId, long organizationId)
        {
            // TDOO: Verify user is an administrator

            await _userService.AssociateUserToOrganization(userId, organizationId).ConfigureAwait(false);
            await _unitOfWork.SaveAsync().ConfigureAwait(false);
            return NoContent();
        }
    }

}