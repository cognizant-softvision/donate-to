using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{User}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : BaseApiController<User>
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) : base(userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Gets a paged users list by organization Id.
        /// </summary>
        /// <param name="organizationId">Text search query</param>
        /// <param name="pageNumber">Page start number</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>Users list.</returns>
        [HttpGet("ByOrganization")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<ActionResult<PagedResult<User>>> GetPagedUsersByOrganizationAsync(long organizationId, int pageNumber, int pageSize)
        {
            return await _userService.GetPagedUsersByOrganizationAsync(organizationId, pageNumber, pageSize).ConfigureAwait(false);
        }
    }

}