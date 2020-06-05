using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.Infrastructure.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DonateTo.Services.Extensions
{
    public static class ServiceCollectionExtension
    {
        /// <summary>
        /// Add all the DonateTo's dependencies to the collection.
        /// </summary>
        /// <param name="service">IServiceCollection.</param>
        /// <param name="configuration">IConfiguration.</param>
        public static void AddDonateToModule(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddEntityFramework(configuration);

            service.AddScoped<IUserService, UserService>();
            service.AddTransient<IBaseService<Donation>, DonationService>();
            service.AddTransient<IBaseService<DonationRequest>, DonationRequestService>();
            service.AddTransient<ISearchService, SearchService>();
            service.AddTransient<IBaseService<Organization>, OrganizationService>();
            service.AddTransient<IBaseService<Address>, AddressService>();
            service.AddTransient<IBaseService<Category>, CategoryService>();
            service.AddTransient<IBaseService<Status>, StatusService>();
        }
    }
}
