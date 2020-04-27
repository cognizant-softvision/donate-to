using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRequestItemRepository : EntityFrameworkRepository<DonationRequestItem, DonateToDbContext>
    {
        public DonationRequestItemRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
