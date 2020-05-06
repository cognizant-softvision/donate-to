using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRepository : EntityFrameworkRepository<Donation, DonateToDbContext>
    {
        public DonationRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        private IQueryable<Donation> GetHydratedDonations() {
            return DbContext.Set<Donation>().Include( d => d.Address).Include( d => d.Status).Include( d => d.DonationItems)
                .Include( d => d.DonationRequest.DonationRequestItems).Include( d => d.DonationRequest.DonationRequestCategories)
                .Include( d => d.DonationRequest.Organization).Include( d => d.DonationRequest.Status);
        }

        ///<inheritdoc cref="IRepository{Donation}"/>
        public override IQueryable<Donation> Get()
        {
            return GetHydratedDonations();
                
        }
        ///<inheritdoc cref="IRepository{Donation}"/>
        public override async Task<IQueryable<Donation>> GetAsync()
        {
            return await Task.FromResult(GetHydratedDonations()).ConfigureAwait(false);
        }
        ///<inheritdoc cref="IRepository{Donation}"/>
        public override Donation Get(long id)
        {
            return GetHydratedDonations().FirstOrDefault(d => d.Id.Equals(id));
        }
        public override async Task<Donation> GetAsync(long id)
        {
            return await GetHydratedDonations().FirstOrDefaultAsync(d => d.Id.Equals(id)).ConfigureAwait(false);
        }
        ///<inheritdoc cref="IRepository{Donation}"/>
        public override PagedResult<Donation> GetPaged(int page, int pageSize)
        {
            return GetHydratedDonations().GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{Donation}"/>
        public override async Task<PagedResult<Donation>> GetPagedAsync(int page, int pageSize)
        {
            return await GetHydratedDonations().GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }
    }
}
