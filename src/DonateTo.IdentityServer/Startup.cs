using IdentityServer4.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Reflection;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity;
using IdentityServer4.Configuration;
using System;
using DonateTo.Services.Extensions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace DonateTo.IdentityServer
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; set; }

        public Startup(IConfiguration configuration, 
            IWebHostEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddDbContext<DonateToDbContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("PostgreSQL")));

            services.AddDonateToModule(Configuration);
            services.AddAutoMapper(typeof(Startup));

            var identityOptions = Configuration.GetSection("Identity").GetSection("Options");

            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = identityOptions.GetSection("Password").GetValue<int>("RequiredLength");
                options.Password.RequireDigit = identityOptions.GetSection("Password").GetValue<bool>("RequireDigit");
                options.Password.RequireUppercase = identityOptions.GetSection("Password").GetValue<bool>("RequireUppercase");
                options.Password.RequireLowercase = identityOptions.GetSection("Password").GetValue<bool>("RequireLowercase");
                options.Password.RequireNonAlphanumeric = identityOptions.GetSection("Password").GetValue<bool>("RequireNonAlphanumeric");
                options.User.RequireUniqueEmail = identityOptions.GetSection("User").GetValue<bool>("RequireUniqueEmail");
                options.SignIn.RequireConfirmedEmail = identityOptions.GetSection("SignIn").GetValue<bool>("RequireConfirmedEmail");
            })
            .AddEntityFrameworkStores<DonateToDbContext>()
            .AddDefaultTokenProviders();

            var apiResources = Configuration.GetSection("IdentityServer").GetSection("ApiResources").Get<IEnumerable<ApiResource>>();

            var clients = Configuration.GetSection("IdentityServer").GetSection("Clients").Get<IEnumerable<Client>>();

            var builder = services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
                options.UserInteraction.LoginUrl = "/Account/Login";
                options.UserInteraction.LogoutUrl = "/Account/Logout";
                options.Authentication = new AuthenticationOptions()
                {
                    CookieLifetime = TimeSpan.FromHours(10), // ID server cookie timeout set to 10 hours
                    CookieSlidingExpiration = true
                };
            })
            .AddInMemoryIdentityResources(
                new List<IdentityResource>
                {
                    new IdentityResources.OpenId(),
                    new IdentityResources.Profile(),
                })
            .AddInMemoryApiResources(apiResources)
            .AddInMemoryClients(clients)
            .AddAspNetIdentity<User>();

            //Need to handle credentials for production
            builder.AddDeveloperSigningCredential();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseIdentityServer();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
