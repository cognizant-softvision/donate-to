using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.Infrastructure.Data.EntityFramework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationItemRepository : EntityFrameworkRepository<DonationItem, DonateToDbContext>, IDonationItemRepository
    {
        private readonly DonateToDbContext _dbContext;

        public DonationItemRepository(DonateToDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        ///<inheritdoc cref="IDonationItemRepository"/>
        public async Task<IEnumerable<DonationItem>> AddAllAsync(IEnumerable<DonationItem> donationItems)
        {
            await _dbContext.Set<DonationItem>().AddRangeAsync(donationItems).ConfigureAwait(false);

            return donationItems;
        }
    }
}
