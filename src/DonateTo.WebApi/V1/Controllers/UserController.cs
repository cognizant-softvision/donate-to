using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Infrastructure.Common;
using DonateTo.WebApi.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{User}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get a User by id.
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>User.</returns>
        [HttpGet("{id}", Name = "[controller]_[action]_Id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual async Task<ActionResult<User>> Get(long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _userService.GetAsync(id).ConfigureAwait(false);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        /// <summary>
        /// Get a users list.
        /// </summary>
        /// <returns>List of entities.</returns>
        [HttpGet(Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual async Task<ActionResult<IEnumerable<User>>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _userService.GetAsync().ConfigureAwait(false);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        /// <summary>
        /// Gets a paged users list starting with given <paramref name="pageNumber"/> and with <paramref name="pageSize"/>
        /// </summary>
        /// <param name="pageNumber">Page number.</param>
        /// <param name="pageSize">Page size.</param>
        /// <returns>USers paged result.</returns>
        [HttpGet("paged", Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<User>>> GetPaged(int pageNumber, int pageSize)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                var result = await _userService.GetPagedAsync(pageNumber, pageSize).ConfigureAwait(false);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        /// <summary>
        /// Gets a paged users list by organization Id.
        /// </summary>
        /// <param name="pageNumber">Page start number</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="organizationId">Text search query</param>
        /// <returns>Users list.</returns>
        [HttpGet("ByOrganization")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<User>>> GetPagedUsersByOrganizationAsync(int pageNumber, int pageSize, long organizationId)
        {
            //add filter matching organizationId as third parameter of the method eg. u => u.UserOrganization.Where(uo => uo.OrganizationId == organizationId)
            return await _userService.GetPagedAsync(pageNumber, pageSize).ConfigureAwait(false);
        }

        /// <summary>
        /// Update a User
        /// </summary>
        /// <param name="id">User Id to update.</param>
        /// <param name="value">User to update.</param>
        /// <returns>Updated user.</returns>
        [HttpPut("{id}", Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> Put(long id, [FromBody] User value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    var username = User.Claims.FirstOrDefault(claim => claim.Type == Claims.UserName)?.Value;

                    var result = await _userService.UpdateAsync(value, id, username).ConfigureAwait(false);

                    return Ok(result);
                }
                catch (ArgumentNullException ex)
                {
                    return NotFound(ex);
                }
                catch (InvalidOperationException ex)
                {
                    return BadRequest(ex);
                }
            }
        }

        /// <summary>
        /// Update a User linked Organizations
        /// </summary>
        /// <param name="userId">User Id to update.</param>
        /// <param name="value">Organizations Id list to update.</param>
        /// <returns>Updated user.</returns>
        [HttpPut(Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutUserOrganizationsAsync(long userId, [FromBody] IEnumerable<long> value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    //var userRole = User.Claims.FirstOrDefault(claim => claim.Type.Contains(Claims.Role))?.Value;
                    //if (userRole != Roles.Superadmin && userRole != Roles.Admin)
                    //{
                    //    return Forbid();
                    //}

                    var username = "dawd";
                    await _userService.UpdateUserOrganizationsAsync(userId, value, username).ConfigureAwait(false);

                    return Ok();
                }
                catch (ArgumentNullException ex)
                {
                    return NotFound(ex);
                }
                catch (InvalidOperationException ex)
                {
                    return BadRequest(ex);
                }
            }
        }
    }
}