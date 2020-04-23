using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRequestRepository : EntityFrameworkRepository<DonationRequest, DonateToDbContext>
    {
        public DonationRequestRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
