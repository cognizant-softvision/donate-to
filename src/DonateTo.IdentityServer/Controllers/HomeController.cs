using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DonateTo.IdentityServer.Models;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using System.Net.Http;
using System.Text.Json;

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

        public IActionResult SignedUp() 
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
