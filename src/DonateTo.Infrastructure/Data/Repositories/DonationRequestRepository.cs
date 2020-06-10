using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRequestRepository : EntityFrameworkRepository<DonationRequest, DonateToDbContext>
    {
        public DonationRequestRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
        
        private IQueryable<DonationRequest> GetHydratedDonationRequests()
        {
            return DbContext.Set<DonationRequest>()
                .Include(d => d.Address).ThenInclude(a => a.Country)
                .Include(d => d.Address).ThenInclude(a => a.State)
                .Include(d => d.Address).ThenInclude(a => a.City)
                .Include(d => d.Status)
                .Include(d => d.DonationRequestItems).ThenInclude(dri => dri.Unit)
                .Include(d => d.DonationRequestCategories).ThenInclude(drc => drc.Category)
                .Include(d => d.Organization).ThenInclude(o => o.Contact);
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
        public override PagedResult<DonationRequest> GetPaged(int page, int pageSize, Expression<Func<DonationRequest, bool>> filter = null)
        {
            var requests = GetHydratedDonationRequests();

            if (filter != null)
            {
                requests = requests.Where(filter);
            }

            return requests.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{DonationRequest}"/>
        public override async Task<PagedResult<DonationRequest>> GetPagedAsync(int page, int pageSize, Expression<Func<DonationRequest, bool>> filter = null)
        {
            var requests = GetHydratedDonationRequests();

            if (filter != null) 
            {
                requests =  requests.Where(filter);
            }

            return await requests.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }
    }
}
