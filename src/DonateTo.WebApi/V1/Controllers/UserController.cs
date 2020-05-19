using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : BaseApiController<User>
    {
        IUserService _userService;

        public UserController(IUserService userService, IUnitOfWork unitOfWork) : base(userService, unitOfWork)
        {
            _userService = userService;
        }

        [HttpPut]
        public async Task<ActionResult<User>> AssociateUserToOrganization(long userId, long organizationId)
        {
            // TDOO: Verify user is an administrator
            /* Yo - admin de organización- solo puedo asociar a usuarios de mis organizaciones.
               Yo - admin de todo el sistema-puedo asociar cualquier usuario a cualquier organización. */

            // Associate user
            return await _userService.AssociateUserToOrganization(userId, organizationId).ConfigureAwait(false);
            // Once associated, user permissions must be administrator

        }
    }

}