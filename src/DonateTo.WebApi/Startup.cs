using DonateTo.Infrastructure.Logging;
using DonateTo.WebApi.Middlewares;
using DonateTo.WebApi.Swagger;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using DonateTo.Services.Extensions;
using Newtonsoft.Json;

namespace DonateTo.WebApi
{
    public class Startup
    {
        private const string DonateToCorsPolicy = "_donateToCorsPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            services.AddVersioning();

            services.AddCors(SetupCorsPolicyAction);

            services.AddSwagger();

            services.AddLoggingToPipeline(Configuration);

            services.AddDonateToModule(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApiVersionDescriptionProvider provider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseMiddleware<ExceptionHandlerMiddleware>();

            app.UseRouting();

            app.UseCors(DonateToCorsPolicy);

            app.UseSwaggerWithVersioning(provider);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void SetupCorsPolicyAction(CorsOptions options)
        {
            var domainsAllowed = Configuration.GetSection("WebApiConfig:AllowedDomainCors").Value;

            if (!string.IsNullOrEmpty(domainsAllowed))
            {
                options.AddPolicy(
                    DonateToCorsPolicy,
                    builder =>
                    {
                        builder.WithOrigins(domainsAllowed.Split(';'))
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            }
        }
    }
}
