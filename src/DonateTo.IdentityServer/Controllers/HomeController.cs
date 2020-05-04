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
            return RedirectToAction("Login", "Account", new { returnUrl = "~/Account/SignedUp" });
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
