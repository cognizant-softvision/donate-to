using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : BaseApiController<User>
    {
        public UserController(IBaseService<User> userService, IUnitOfWork unitOfWork) :
         base(userService, unitOfWork)
        {
        }

        //[HttpGet]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Organization))]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //public async Task<ActionResult<Organization>> AssociateUserToOrganization(long userId)
        //{
        //    // TDOO: Verify user is an administrator

        //    // Associate user. Assign Organization Id to IdentityNumber in User

        //    // Once associated, user permissions must be administrator
        //    // return await AssociateUserAsync(userId).ConfigureAwait(false);
        //}
    }
}