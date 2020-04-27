using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationItemRepository : EntityFrameworkRepository<DonationItem, DonateToDbContext>
    {
        public DonationItemRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
