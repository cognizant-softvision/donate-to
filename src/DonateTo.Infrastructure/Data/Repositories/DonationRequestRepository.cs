using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRequestRepository : EntityFrameworkRepository<DonationRequest, DonateToDbContext>
    {
        public DonationRequestRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
        
        private IQueryable<DonationRequest> GetHydratedDonationRequests() {
            return DbContext.Set<DonationRequest>().Include( d => d.Address).Include( d => d.Status)
                .Include( d => d.DonationRequestItems).Include( d => d.DonationRequestCategories)
                .Include( d => d.Organization);
        }

        ///<inheritdoc cref="IRepository{DonationRequest}"/>
        public override IQueryable<DonationRequest> Get()
        {
            return GetHydratedDonationRequests();
                
        }
        ///<inheritdoc cref="IRepository{DonationRequest}"/>
        public override async Task<IQueryable<DonationRequest>> GetAsync()
        {
            return await Task.FromResult(GetHydratedDonationRequests()).ConfigureAwait(false);
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
        public override PagedResult<DonationRequest> GetPaged(int page, int pageSize)
        {
            return GetHydratedDonationRequests().GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{DonationRequest}"/>
        public override async Task<PagedResult<DonationRequest>> GetPagedAsync(int page, int pageSize)
        {
            return await GetHydratedDonationRequests().GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }
    }
}
