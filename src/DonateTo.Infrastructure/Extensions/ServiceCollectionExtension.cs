using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DonateTo.Infrastructure.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static void AddEntityFramework(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DonateToDbContext>(
                options => options.UseNpgsql(configuration.GetConnectionString("Default"))
            );

            services.AddScoped<IUnitOfWork, EntityFrameworkUnitOfWork<DonateToDbContext>>();
            services.AddScoped<IRepository<Address>, AddressRepository>();
            services.AddScoped<IRepository<Category>, CategoryRepository>();
            services.AddScoped<IRepository<Donation>, DonationRepository>();
            services.AddScoped<IRepository<DonationItem>, DonationItemRepository>();
            services.AddScoped<IRepository<DonationRequest>, DonationRequestRepository>();
            services.AddScoped<IRepository<DonationRequestItem>, DonationRequestItemRepository>();
            services.AddScoped<IRepository<Organization>, OrganizationRepository>();
            services.AddScoped<IRepository<Role>, RoleRepository>();
            services.AddScoped<IRepository<Status>, StatusRepository>();
            services.AddScoped<IRepository<Unit>, UnitRepository>();
            services.AddScoped<IRepository<User>, UserRepository>();
        }
    }
}
