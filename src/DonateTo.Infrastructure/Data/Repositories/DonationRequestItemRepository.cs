using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRequestItemRepository : EntityFrameworkRepository<DonationRequestItem, DonateToDbContext>
    {
        public DonationRequestItemRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        //public async Task SoftDeleteDonationRequestItem(DonationRequestItem donationRequest)
        //{
        //    using var transaction = await DbContext.Database.BeginTransactionAsync().ConfigureAwait(false);

        //    try
        //    {
        //        var donationRequestsItemsToSoftDelete = Get(null)
        //            .Join(DbContext.DonationRequests)
        //            .Where(d => d == donationRequest.Id)
        //            .FirstOrDefault();

        //        await DbContext.SaveChangesAsync().ConfigureAwait(false);
        //        await transaction.CommitAsync().ConfigureAwait(false);
        //    }
        //    catch (Exception)
        //    {
        //        await transaction.RollbackAsync().ConfigureAwait(false);
        //        throw;
        //    }
        //}
    }
}
