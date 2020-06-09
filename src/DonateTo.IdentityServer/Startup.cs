using IdentityServer4.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Reflection;
using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity;
using IdentityServer4.Configuration;
using System;
using DonateTo.Services.Extensions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IdentityServer4.EntityFramework.Mappers;
using DonateTo.IdentityServer.Data.EntityFramework;
using DonateTo.IdentityServer.Services;
using DonateTo.IdentityServer.Data.Repositories.Interfaces;
using DonateTo.IdentityServer.Data.Repositories;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using DonateTo.Mailer.Entities;
using DonateTo.Mailer.Interfaces;
using DonateTo.Mailer;
using IdentityModel;
using System.IdentityModel.Tokens.Jwt;
using DonateTo.IdentityServer.Services;
using IdentityServer4.Services;

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
            var connectionString = Configuration.GetConnectionString("PostgreSQL");
            services.AddControllersWithViews();

            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddDbContext<DonateIdentityDbContext>(options =>
                options.UseNpgsql(connectionString));

            services.AddDonateToModule(Configuration);

            services.AddAutoMapper(typeof(Startup));

            services.AddTransient<IClientService, ClientService>();
            services.AddTransient<IClientRepository, ClientRepository>();

            var identityOptions = Configuration.GetSection("Identity").GetSection("Options");
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddIdentity<User, Role>(options =>
            {
                options.ClaimsIdentity.RoleClaimType = JwtClaimTypes.Role;
                options.ClaimsIdentity.UserIdClaimType = JwtClaimTypes.Id;
                options.ClaimsIdentity.UserNameClaimType = JwtClaimTypes.Name;
                options.Password.RequiredLength = identityOptions.GetSection("Password").GetValue<int>("RequiredLength");
                options.Password.RequireDigit = identityOptions.GetSection("Password").GetValue<bool>("RequireDigit");
                options.Password.RequireUppercase = identityOptions.GetSection("Password").GetValue<bool>("RequireUppercase");
                options.Password.RequireLowercase = identityOptions.GetSection("Password").GetValue<bool>("RequireLowercase");
                options.Password.RequireNonAlphanumeric = identityOptions.GetSection("Password").GetValue<bool>("RequireNonAlphanumeric");
                options.User.RequireUniqueEmail = identityOptions.GetSection("User").GetValue<bool>("RequireUniqueEmail");
                options.SignIn.RequireConfirmedEmail = identityOptions.GetSection("SignIn").GetValue<bool>("RequireConfirmedEmail");
            })
            .AddEntityFrameworkStores<DonateIdentityDbContext>()
            .AddDefaultTokenProviders();

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

                .AddConfigurationStore<CustomConfigurationDbContext>(options =>
                {
                    options.ConfigureDbContext = b => b.UseNpgsql(connectionString,
                        sql => sql.MigrationsAssembly(migrationsAssembly));
                })
                .AddOperationalStore<CustomPersistedGrantDbContext>(options =>
                {
                    options.ConfigureDbContext = b => b.UseNpgsql(connectionString,
                        sql => sql.MigrationsAssembly(migrationsAssembly));
                })
                .AddAspNetIdentity<User>()
                .AddProfileService<ProfileService>();

            builder.Services.ConfigureApplicationCookie(opt => { 
                opt.AccessDeniedPath = opt.LoginPath;
            });

            var mailConfig = Configuration.GetSection("MailSettings")
                .Get<MailServerSettings>();
            
            services.AddSingleton(mailConfig);
            services.AddScoped<IMailSender, MailSender>();

            //Need to handle credentials for production
            builder.AddDeveloperSigningCredential();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            InitializeDatabase(app);

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

        #region private methods
        private void InitializeDatabase(IApplicationBuilder app)
        {

            var apiResources = Configuration.GetSection("IdentityServer").GetSection("ApiResources").Get<IEnumerable<ApiResource>>();

            var clients = Configuration.GetSection("IdentityServer").GetSection("Clients").Get<IEnumerable<Client>>();

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<CustomPersistedGrantDbContext>().Database.Migrate();

                var context = serviceScope.ServiceProvider.GetRequiredService<CustomConfigurationDbContext>();
                context.Database.Migrate();
                if (!context.Clients.Any())
                {
                    foreach (var client in clients)
                    {
                        context.Clients.Add(client.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.IdentityResources.Any())
                {
                    foreach (var resource in Config.IdentityResources)
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.ApiResources.Any())
                {
                    foreach (var resource in apiResources)
                    {
                        context.ApiResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
            }
        }
        #endregion
    }
}
