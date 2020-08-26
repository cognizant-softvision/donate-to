using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DonateTo.Infrastructure.Extensions
{
    public static class ServiceCollectionExtension
    {
        /// <summary>
        /// Add the EF DbContext and every repository as scoped to the collection.
        /// </summary>
        /// <param name="services">IServiceCollection</param>
        /// <param name="configuration">IConfiguration</param>
        public static void AddEntityFramework(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DonateToDbContext>(
                options => options.UseNpgsql(configuration.GetConnectionString("PostgreSQL"))
            );

            services.AddScoped<IUnitOfWork, EntityFrameworkUnitOfWork<DonateToDbContext>>();
            services.AddScoped<IRepository<Address>, AddressRepository>();
            services.AddScoped<IRepository<Category>, CategoryRepository>();
            services.AddScoped<IRepository<Donation>, DonationRepository>();
            services.AddScoped<IRepository<DonationItem>, DonationItemRepository>();
            services.AddScoped<IDonationRequestRepository, DonationRequestRepository>();
            services.AddScoped<IRepository<DonationRequestItem>, DonationRequestItemRepository>();
            services.AddScoped<IRepository<Organization>, OrganizationRepository>();
            services.AddScoped<IRepository<Role>, RoleRepository>();
            services.AddScoped<IRepository<Status>, StatusRepository>();
            services.AddScoped<IRepository<Unit>, UnitRepository>();
            services.AddScoped<IRepository<User>, UserRepository>();
            services.AddScoped<IRepository<Country>, CountryRepository>();
            services.AddScoped<IRepository<State>, StateRepository>();
            services.AddScoped<IRepository<City>, CityRepository>();
            services.AddScoped<ISearchRepository, PostgresSearchRepository>();
            services.AddScoped<IQuestionRepository, QuestionRepository>();
            services.AddScoped<IRepository<ControlType>, ControlTypeRepository>();
            services.AddScoped<IRepository<Log>, LogRepository>();            
        }
    }
}
