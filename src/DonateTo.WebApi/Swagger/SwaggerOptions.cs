using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace DonateTo.WebApi.Swagger
{
    public class SwaggerOptions : IConfigureOptions<SwaggerGenOptions>
    {
        private readonly IApiVersionDescriptionProvider _provider;

        public SwaggerOptions(IApiVersionDescriptionProvider provider)
        {
            _provider = provider;
        }

        /// <summary>
        /// This method is used to generate the 
        /// SwaggerDoc Info for the API.
        /// </summary>
        /// <param name="options">SwaggerGenOptions</param>
        public void Configure(SwaggerGenOptions options)
        {
            foreach (var description in _provider.ApiVersionDescriptions)
            {
                options.SwaggerDoc(description.GroupName, new OpenApiInfo()
                {
                    Title = "DonateTo API",
                    Version = description.ApiVersion.ToString(),
                });
            }
        }
    }
}
