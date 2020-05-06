using DonateTo.Infrastructure.Logging;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        /// <summary>
        /// Add this controller to capture any unhandled exception.
        /// </summary>
        [Route("/error")]
        public IActionResult Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var errorMessage = context?.Error.Message ?? "An Unhandled Exception Occurred.";

            if (context?.Error != null)
                Logger.Error($"Unhandled Exception occurred: {errorMessage}", context.Error);
            

            return Problem(
                detail: errorMessage,
                title: "An Unhandled Exception Occurred.");
        }
    }
}

