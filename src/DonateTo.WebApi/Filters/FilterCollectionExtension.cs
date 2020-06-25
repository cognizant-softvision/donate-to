using Microsoft.Extensions.DependencyInjection;

namespace DonateTo.WebApi.Filters
{
    public static class FilterCollectionExtension
    {
        /// <summary>
        /// Add Filters dependencies to the collection.
        /// </summary>
        /// <param name="service">IServiceCollection.</param>
        public static void AddFiltersToModule(this IServiceCollection service)
        {
            service.AddScoped<OrganizationAccessFilter>();
        }
    }
}
