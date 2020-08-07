using System.Threading.Tasks;
using DonateTo.IdentityServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.IdentityServer.Services.Interfaces;

namespace DonateTo.IdentityServer.Controllers
{
    [Authorize(Roles = "Superadmin")]
    public class UserRoleController : Controller
    {
        private readonly IUserService _userService;
        private readonly IUserRoleService _userRoleService;

        public UserRoleController(IUserService userService,
                                  IUserRoleService userRoleService)
        {
            _userService = userService;
            _userRoleService = userRoleService;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var users = await _userService.GetAsync().ConfigureAwait(false);
            return View("List", users);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var userRoles = await _userRoleService.GetAsync(id).ConfigureAwait(false);
            return View("Edit", userRoles);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(UserRoleViewModel userRoleViewModel)
        {
            await _userRoleService.UpdateAsync(userRoleViewModel).ConfigureAwait(false);
            return RedirectToAction("List");
        }
    }
}
