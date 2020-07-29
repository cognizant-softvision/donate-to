using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System;
using System.Linq.Dynamic.Core;
using DonateTo.Infrastructure.Extensions;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRequestRepository : EntityFrameworkRepository<DonationRequest, DonateToDbContext>
    {
        public DonationRequestRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        ///<inheritdoc cref="IRepository{DonationRequest}"/>
        public override DonationRequest Get(long id)
        {
            return GetHydratedDonationRequests().FirstOrDefault(d => d.Id.Equals(id));
        }

        public override async Task<DonationRequest> GetAsync(long id)
        {
            return await GetHydratedDonationRequests().FirstOrDefaultAsync(d => d.Id.Equals(id)).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{DonationRequest}"/>
        public override ApplicationCore.Models.Pagination.PagedResult<DonationRequest>
            GetPaged(int page, int pageSize, Expression<Func<DonationRequest, bool>> filter = null, string sort = "")
        {
            var questions = GetHydratedDonationRequests()
                .FilterAndSort(filter, sort);

            return questions.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{DonationRequest}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<DonationRequest>>
            GetPagedAsync(int page, int pageSize, Expression<Func<DonationRequest, bool>> filter = null, string sort = "")
        {
            var questions = GetHydratedDonationRequests()
                .FilterAndSort(filter, sort);

            return await questions.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        #region private
        private IQueryable<DonationRequest> GetHydratedDonationRequests()
        {
            return DbContext.Set<DonationRequest>()
                .Include(d => d.Address).ThenInclude(a => a.Country)
                .Include(d => d.Address).ThenInclude(a => a.State)
                .Include(d => d.Address).ThenInclude(a => a.City)
                .Include(d => d.Status)
                .Include(d => d.DonationRequestItems).ThenInclude(dri => dri.Unit)
                .Include(d => d.DonationRequestItems).ThenInclude(dri => dri.DonationRequestItemCategories)
                .Include(d => d.DonationRequestCategories).ThenInclude(drc => drc.Category)
                .Include(d => d.Organization).ThenInclude(o => o.Contact)
                .Include(d => d.Donations);
        }
        #endregion
    }
}
