using DonateTo.ApplicationCore.Entities;
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
    public class OrganizationRepository : EntityFrameworkRepository<Organization, DonateToDbContext>
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

        #region private
        private IQueryable<Organization> GetHydratedOrganization()
        {
            return DbContext.Set<Organization>()
                .Include(o => o.Addresses).ThenInclude(a => a.Contact)
                .Include(o => o.Contact);
        }
        #endregion
    }
}
