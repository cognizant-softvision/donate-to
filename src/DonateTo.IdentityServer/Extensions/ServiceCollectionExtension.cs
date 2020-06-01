using DonateTo.IdentityServer.Services;
using IdentityServer4.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DonateTo.IdentityServer.Extensions
{
    public static class ServiceCollectionExtension
    {
        /// <summary>
        /// Add all the DonateTo's dependencies to the collection.
        /// </summary>
        /// <param name="service">IServiceCollection.</param>
        /// <param name="configuration">IConfiguration.</param>
        public static void AddIdentityServices(this IServiceCollection service)
        {
            service.AddScoped<IProfileService, ProfileService>();   
        }
    }
}
