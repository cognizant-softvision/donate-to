using DonateTo.Infrastructure.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DonateTo.Services.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static void AddDonateToModule(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddEntityFramework(configuration);
        }
    }
}
