using DonateTo.Infrastructure.Logging;
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
using DonateTo.Mailer.Entities;
using System.IdentityModel.Tokens.Jwt;
using DonateTo.WebApi.Filters;
using DonateTo.Infrastructure.Data.EntityFramework;
using Microsoft.EntityFrameworkCore;

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
            var bearerOptions = Configuration.GetSection("Bearer").GetSection("Options");

            services.AddControllers().AddNewtonsoftJson(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = bearerOptions.GetValue<string>("Authority");
                    options.RequireHttpsMetadata = bearerOptions.GetValue<bool>("RequireHttpsMetadata");
                    options.Audience = bearerOptions.GetValue<string>("Audience");
                });

            services.AddFiltersToModule();

            services.AddVersioning();

            services.AddCors(SetupCorsPolicyAction);

            services.AddSwagger();

            services.AddLoggingToPipeline(Configuration);

            var mailConfig = Configuration.GetSection("MailSettings")
                .Get<MailServerSettings>();

            services.AddSingleton(mailConfig);

            services.AddDonateToModule(Configuration);
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Performance", "CA1822:Mark members as static", Justification = "<Pending>")]
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApiVersionDescriptionProvider provider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(DonateToCorsPolicy);

            app.UseSwaggerWithVersioning(provider);

            app.UseAuthentication();
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
