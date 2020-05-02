using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DonateTo.Infrastructure.Data.EntityFramework
{
    public class DonateToDbContext : DbContext
    {
        public DonateToDbContext(DbContextOptions<DonateToDbContext> options) : base(options)
        {

        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<DonationItem> DonationItems { get; set; }
        public DbSet<DonationRequest> DonationRequests { get; set; }
        public DbSet<DonationRequestItem> DonationRequestItems { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<IdentityUserClaim<long>> UserClaims { get; set; }
        public DbSet<IdentityRoleClaim<long>> RoleClaims { get; set; }
        public DbSet<IdentityUserLogin<long>> UserLogins { get; set; }
        public DbSet<IdentityUserRole<long>> UserRoles { get; set; }
        public DbSet<IdentityUserToken<long>> UserTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (modelBuilder != null)
            {
                modelBuilder.Ignore<EntityBase>();
                modelBuilder.Entity<IdentityUserLogin<long>>().HasNoKey();
                modelBuilder.Entity<IdentityUserRole<long>>().HasNoKey();
                modelBuilder.Entity<IdentityUserToken<long>>().HasNoKey();

                foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
                {
                    entityType.SetTableName(entityType.DisplayName());
                }
            }
        }
    }
}
