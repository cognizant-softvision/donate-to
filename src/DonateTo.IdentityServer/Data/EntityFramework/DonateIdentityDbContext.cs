using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DonateTo.IdentityServer.Data.EntityFramework
{
    public class DonateIdentityDbContext : IdentityDbContext<User, Role, long, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public DonateIdentityDbContext(DbContextOptions<DonateIdentityDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
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
               
                b.Ignore(w => w.UserOrganizations);
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

            modelBuilder.Entity<IdentityUserClaim<long>>(b =>
            {
                b.HasKey(uc => uc.Id);
                b.ToTable("UserClaim");
            });

            modelBuilder.Entity<IdentityRoleClaim<long>>(b =>
            {
                b.HasKey(rc => rc.Id);
                b.ToTable("RoleClaim");
            });

            modelBuilder.Entity<IdentityUserRole<long>>(b =>
            {
                b.HasKey(r => new { r.UserId, r.RoleId });
                b.ToTable("UserRole");
            });

            modelBuilder.Entity<IdentityUserLogin<long>>(b =>
            {
                b.HasKey(l => new { l.LoginProvider, l.ProviderKey });
                b.ToTable("UserLogin");
            });

            modelBuilder.Entity<IdentityUserToken<long>>(b =>
            {
                b.HasKey(l => new { l.UserId, l.LoginProvider, l.Name });
                b.ToTable("UserToken");
            });

            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }
        }
    }
}
