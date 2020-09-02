using DonateTo.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Repositories
{
    public interface IDonationRequestItemRepository : IRepository<DonationRequestItem>
    {
        Task SoftDeleteDonationRequestItem(long donationRequestItemId);
    }
}
