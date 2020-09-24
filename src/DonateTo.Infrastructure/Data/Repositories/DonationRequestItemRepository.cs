using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.Infrastructure.Data.EntityFramework;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRequestItemRepository : EntityFrameworkRepository<DonationRequestItem, DonateToDbContext>, IDonationRequestItemRepository
    {
        public DonationRequestItemRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        public async Task SoftDeleteDonationRequestItem(long donationRequestItemId)
        {
            var activeDonationsItem = DbContext.DonationItems.Where
                (di => (di.DonationRequestItemId == donationRequestItemId));

            if (activeDonationsItem.Any())
            {
                throw new Exception("Admin.DonationRequestError.DeleteError");
            }
            else
            {
                var donationRequestItemToSoftDelete = DbContext.DonationRequestItems
                    .Where(d => d.Id == donationRequestItemId)
                    .FirstOrDefault();

                DbContext.DonationRequestItems.Remove(donationRequestItemToSoftDelete);
                await DbContext.SaveChangesAsync().ConfigureAwait(false);
            }
        }
    }
}
