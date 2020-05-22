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
        public DbSet<DonationRequestCategory> DonationRequestCategories { get; set; }
        public DbSet<DonationRequestItemCategory> DonationRequestItemCategories { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserClaim> UserClaims { get; set; }
        public DbSet<RoleClaim> RoleClaims { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            if (modelBuilder != null)
            {
                modelBuilder.Ignore<EntityBase>();

                modelBuilder.Entity<User>(b =>
                {
                    // Each User can have many UserClaims
                    b.HasMany(e => e.Claims)
                        .WithOne(e => e.User)
                        .HasForeignKey(uc => uc.UserId)
                        .IsRequired();

                    // Each User can have many UserLogins
                    b.HasMany(e => e.Logins)
                        .WithOne(e => e.User)
                        .HasForeignKey(ul => ul.UserId)
                        .IsRequired();

                    // Each User can have many UserTokens
                    b.HasMany(e => e.Tokens)
                        .WithOne(e => e.User)
                        .HasForeignKey(ut => ut.UserId)
                        .IsRequired();

                    // Each User can have many entries in the UserRole join table
                    b.HasMany(e => e.UserRoles)
                        .WithOne(e => e.User)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();
                });

                modelBuilder.Entity<Role>(b =>
                {
                    // Each Role can have many entries in the UserRole join table
                    b.HasMany(e => e.UserRoles)
                        .WithOne(e => e.Role)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();

                    // Each Role can have many associated RoleClaims
                    b.HasMany(e => e.RoleClaims)
                        .WithOne(e => e.Role)
                        .HasForeignKey(rc => rc.RoleId)
                        .IsRequired();
                });

                modelBuilder.Entity<UserClaim>(b =>
                {
                    b.HasKey(uc => uc.Id);
                    b.ToTable("UserClaim");
                });

                modelBuilder.Entity<RoleClaim>(b =>
                {
                    b.HasKey(rc => rc.Id);
                    b.ToTable("RoleClaim");
                });

                modelBuilder.Entity<UserRole>(b =>
                {
                    b.HasKey(r => new { r.UserId, r.RoleId });
                    b.ToTable("UserRole");
                });

                modelBuilder.Entity<UserLogin>(b =>
                {
                    b.HasKey(l => new { l.LoginProvider, l.ProviderKey });
                    b.ToTable("UserLogin");
                });

                modelBuilder.Entity<UserToken>(b =>
                {
                    b.HasKey(l => new { l.UserId, l.LoginProvider, l.Name });
                    b.ToTable("UserToken");
                });

                foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
                {
                    entityType.SetTableName(entityType.DisplayName());
                }

                #region Many to many relationships

                // Code to set up many to many relationships
                modelBuilder.Entity<DonationRequestCategory>()
                    .HasOne<Category>(c => c.Category)
                    .WithMany(drc => drc.DonationRequestCategories)
                    .HasForeignKey(c => c.CategoryId);

                modelBuilder.Entity<DonationRequestCategory>()
                    .HasOne<DonationRequest>(dr => dr.DonationRequest)
                    .WithMany(drc => drc.DonationRequestCategories)
                    .HasForeignKey(c => c.DonationRequestId);

                modelBuilder.Entity<DonationRequestItemCategory>()
                    .HasOne<Category>(c => c.Category)
                    .WithMany(drc => drc.DonationRequestItemCategories)
                    .HasForeignKey(c => c.CategoryId);

                modelBuilder.Entity<DonationRequestItemCategory>()
                    .HasOne<DonationRequestItem>(dr => dr.DonationRequestItem)
                    .WithMany(drc => drc.DonationRequestItemCategories)
                    .HasForeignKey(c => c.DonationRequestItemId);

                modelBuilder.Entity<DonationRequestCategory>().HasKey
                    (drc => new { drc.CategoryId, drc.DonationRequestId});

                modelBuilder.Entity<DonationRequestItemCategory>().HasKey
                    (drc => new { drc.CategoryId, drc.DonationRequestItemId});

                #endregion
            }
        }
    }
}
