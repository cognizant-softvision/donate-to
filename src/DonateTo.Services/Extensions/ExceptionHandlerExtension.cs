using Microsoft.AspNetCore.Builder;

namespace DonateTo.Services.Extensions
{
    public static class ExceptionHandlerExtension
    {
        public static IApplicationBuilder UseExceptionHandlerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandlerMiddleware>();
        }
    }
}