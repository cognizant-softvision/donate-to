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

        #region private
        private IQueryable<DonationRequest> GetHydratedDonationRequests()
        {
            return DbContext.Set<DonationRequest>()
                .Include(d => d.Address)
                .Include(d => d.Status)
                .Include(d => d.DonationRequestItems).ThenInclude(dri => dri.Unit)
                .Include(d => d.DonationRequestCategories).ThenInclude(drc => drc.Category)
                .Include(d => d.Organization);
        }
        #endregion
    }
}
