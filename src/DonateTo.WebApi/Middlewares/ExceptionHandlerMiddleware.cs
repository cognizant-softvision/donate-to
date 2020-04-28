using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Threading.Tasks;
using DonateTo.Infrastructure.Logging;

namespace DonateTo.WebApi.Middlewares
{
    /// <summary>
    ///     Add this middleware in order to capture any unhandled exception.
    /// </summary>
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        ///     Processes the RequestDelegate.
        /// </summary>
        /// <param name="httpContext">HttpContext with all the 
        /// information about the request.</param>
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext).ConfigureAwait(false);
            }
            catch (Exception exc)
            {
                Logger.Error("Unhandled Exception occurred",exc);
                await HandleExceptionAsync(httpContext).ConfigureAwait(false);
            }
        }

        /// <summary>
        ///     Returns a 500 error with a custom message.
        /// </summary>
        /// <param name="httpContext">HttpContext with all the 
        /// information about the request.</param>
        private Task HandleExceptionAsync(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            return context.Response.WriteAsync(new 
            {
                context.Response.StatusCode,
                Message = "An Unhandled Exception Occurred."
            }.ToString());
        }
    }
}