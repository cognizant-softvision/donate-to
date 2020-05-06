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
        /// This controller is used to capture any unhandled exception by the exception middleware.
        /// </summary>
        [Route("/error")]
        public IActionResult Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            string errorMessage = "No message was found.";

            if (context?.Error != null)
            {
                errorMessage = !string.IsNullOrWhiteSpace(context.Error.Message) ? context.Error.Message : errorMessage;
                Logger.Error($"An unhandled exception occurred:{errorMessage}", context.Error);
            }

            return Problem(
                detail: errorMessage,
                title: "An unhandled exception occurred.");
        }
    }
}

