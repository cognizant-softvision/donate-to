using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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
        public DbSet<UserOrganization> UserOrganizations { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<QuestionOption> QuestionOption { get; set; }
        public DbSet<Log> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            if (modelBuilder != null)
            {
                modelBuilder.Ignore<EntityBase>();

                modelBuilder.Entity<Contact>().Property(b => b.Id).HasIdentityOptions(startValue: 20);// remove after fixing migrations sequences, they must get restrated after insertion
                modelBuilder.Entity<Address>().Property(b => b.Id).HasIdentityOptions(startValue: 20);// remove after fixing migrations sequences, they must get restrated after insertion

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

                modelBuilder.Entity<UserOrganization>()
                    .HasOne<User>(u => u.User)
                    .WithMany(uo => uo.UserOrganizations)
                    .HasForeignKey(c => c.UserId);

                modelBuilder.Entity<UserOrganization>()
                    .HasOne<Organization>(o => o.Organization)
                    .WithMany(uo => uo.UserOrganizations)
                    .HasForeignKey(o => o.OrganizationId);

                modelBuilder.Entity<DonationRequestCategory>().HasKey
                    (drc => new { drc.CategoryId, drc.DonationRequestId });

                modelBuilder.Entity<DonationRequestItemCategory>().HasKey
                    (drc => new { drc.CategoryId, drc.DonationRequestItemId });

                modelBuilder.Entity<UserOrganization>().HasKey
                    (uo => new { uo.UserId, uo.OrganizationId });
                #endregion

                // Code to query objects from de db where IsDeleted = false
                modelBuilder.Entity<Donation>()
                    .HasQueryFilter(d => !d.IsDeleted);

                modelBuilder.Entity<DonationItem>()
                    .HasQueryFilter(di => !di.IsDeleted);

                modelBuilder.Entity<DonationRequest>()
                    .HasQueryFilter(dr => !dr.IsDeleted);

                modelBuilder.Entity<DonationRequestItem>()
                    .HasQueryFilter(dri => !dri.IsDeleted);

                modelBuilder.Entity<Organization>()
                    .HasQueryFilter(o => !o.IsDeleted);

                modelBuilder.Entity<Address>()
                    .HasQueryFilter(a => !a.IsDeleted);

                modelBuilder.Entity<Question>()
                    .HasQueryFilter(q => !q.IsDeleted);

                modelBuilder.Entity<QuestionOption>()
                    .HasQueryFilter(qo => !qo.IsDeleted);
            }
        }

        /// <summary>
        /// Marks any "Removed" Entities as "Modified" and then sets the Db [IsDeleted] Flag to true
        /// </summary>
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            ChangeTracker.DetectChanges();

            var markedAsDeleted = ChangeTracker.Entries().Where(x => x.State == EntityState.Deleted);

            foreach (var item in markedAsDeleted)
            {
                if (item.Entity is IIsDeleted entity)
                {
                    // Set the entity to modified
                    item.State = EntityState.Modified;
                    // Only update the IsDeleted flag - only this will get sent to the Db
                    entity.IsDeleted = true;
                }
            }
            return await base.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        }
    }
}