using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace DonateTo.WebApi.Swagger
{
    public static class SwaggerExtensions
    {
        /// <summary>
        /// Add service API versioning to the collection.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(
                options =>
                {
                    // reporting api versions will return the headers "api-supported-versions" and "api-deprecated-versions"
                    options.ReportApiVersions = true;
                });
            services.AddVersionedApiExplorer(
                options =>
                {
                    options.GroupNameFormat = "'v'VVV";
                    options.SubstituteApiVersionInUrl = true;
                });

            return services;
        }

        /// <summary>
        /// Add Swagger to the collection.
        /// </summary>
        /// <param name="services">IServiceCollection.</param>
        /// <returns></returns>
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, SwaggerOptions>();

            services.AddSwaggerGen();

            return services;
        }

        /// <summary>
        /// Add SwaggerUI to the ASP.NET Core pipeline. This method generate
        /// the SwaggerUI for each specified API version.
        /// </summary>
        /// <param name="app">IApplicationBuilder.</param>
        /// <param name="provider">IApiVersionDescriptionProvider.</param>
        /// <returns></returns>
        public static IApplicationBuilder UseSwaggerWithVersioning(this IApplicationBuilder app, IApiVersionDescriptionProvider provider)
        {
            app.UseSwagger();
            app.UseSwaggerUI(
                options =>
                {
                    foreach (var description in provider.ApiVersionDescriptions)
                    {
                        options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json",
                            description.GroupName.ToUpperInvariant());
                    }
                });

            return app;
        }
    }
}
