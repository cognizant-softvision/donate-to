using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DonateTo.IdentityServer.Data.EntityFramework
{
    public class CustomConfigurationDbContext : ConfigurationDbContext<CustomConfigurationDbContext>
    {
        public CustomConfigurationDbContext(DbContextOptions<CustomConfigurationDbContext> options,
            ConfigurationStoreOptions storeOptions) : base(options, storeOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }
        }
    }
}
