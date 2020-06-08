using DonateTo.IdentityServer.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DonateTo.IdentityServer.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            if (User?.Identity?.IsAuthenticated == true && User.IsInRole(Roles.Superadmin)) {
                return View();
            }
            return RedirectToAction("Login", "Account", new { returnUrl = "~/Account/SignedUp" });
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
