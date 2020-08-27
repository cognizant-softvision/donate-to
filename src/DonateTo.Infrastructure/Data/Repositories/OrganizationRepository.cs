using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using DonateTo.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class OrganizationRepository : EntityFrameworkRepository<Organization, DonateToDbContext>, IOrganizationRepository
    {
        public OrganizationRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override ApplicationCore.Models.Pagination.PagedResult<Organization> 
            GetPaged(int page, int pageSize, Expression<Func<Organization, bool>> filter = null, string sort = "")
        {
            var organizations = GetHydratedOrganization()
                .FilterAndSort(filter, sort);

            return organizations.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<Organization>> 
            GetPagedAsync(int page, int pageSize, Expression<Func<Organization, bool>> filter = null, string sort = "")
        {
            var organizations = GetHydratedOrganization()
                .FilterAndSort(filter, sort);

            return await organizations.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override async Task<Organization> GetAsync(long id)
        {
            return await GetHydratedOrganization().FirstOrDefaultAsync(x => x.Id == id).ConfigureAwait(false);
        }

        public async Task SoftDeleteOrganization(Organization organization)
        {
            using var transaction = await DbContext.Database.BeginTransactionAsync().ConfigureAwait(false);

            try
            {
                var organizationToSoftDelete = Get(null)
                    .Include(o => o.Addresses)
                    .Where(o => o.Id == organization.Id)
                    .FirstOrDefault();

                if (organizationToSoftDelete.Addresses.ToList().Count > 0)
                {
                    organizationToSoftDelete.Addresses.ToList().ForEach(a => DbContext.Addresses.Remove(a));
                }

                DbContext.Organizations.Remove(organizationToSoftDelete);
                await DbContext.SaveChangesAsync().ConfigureAwait(false);
                await transaction.CommitAsync().ConfigureAwait(false);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync().ConfigureAwait(false);
                throw;
            }
        }

        public async Task SoftDeleteAddress(Address address)
        {
            using var transaction = await DbContext.Database.BeginTransactionAsync().ConfigureAwait(false);

            try
            {
                var addressToSoftDelete = DbContext.Addresses
                    .Where(a => a.Id == address.Id)
                    .FirstOrDefault();

                DbContext.Addresses.Remove(addressToSoftDelete);
                await DbContext.SaveChangesAsync().ConfigureAwait(false);
                await transaction.CommitAsync().ConfigureAwait(false);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync().ConfigureAwait(false);
                throw;
            }
        }

        #region private
        private IQueryable<Organization> GetHydratedOrganization()
        {
            return DbContext.Set<Organization>()
                .Include(a => a.Addresses).ThenInclude(a => a.Contact)
                .Include(a => a.Addresses).ThenInclude(c => c.Country)
                .Include(a => a.Addresses).ThenInclude(s => s.State)
                .Include(a => a.Addresses).ThenInclude(c => c.City)
                .Include(c => c.Contact)
                .Include(u => u.UserOrganizations);
        }
        #endregion
    }
}
