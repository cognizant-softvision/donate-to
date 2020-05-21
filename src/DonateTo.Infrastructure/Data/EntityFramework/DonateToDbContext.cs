﻿using DonateTo.ApplicationCore.Entities;
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
        public DbSet<IdentityUserClaim<long>> UserClaims { get; set; }
        public DbSet<IdentityRoleClaim<long>> RoleClaims { get; set; }
        public DbSet<IdentityUserLogin<long>> UserLogins { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
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

                modelBuilder.Entity<User>(b =>
                {
                    // Each User can have many UserClaims
                    b.HasMany(e => e.Claims)
                        .WithOne()
                        .HasForeignKey(uc => uc.UserId)
                        .IsRequired();

                    // Each User can have many UserLogins
                    b.HasMany(e => e.Logins)
                        .WithOne()
                        .HasForeignKey(ul => ul.UserId)
                        .IsRequired();

                    // Each User can have many UserTokens
                    b.HasMany(e => e.Tokens)
                        .WithOne()
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
                });

                #region many to many relationships
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
