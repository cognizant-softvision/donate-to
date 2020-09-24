using DonateTo.ApplicationCore.Entities;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Repositories
{
    public interface IDonationRequestRepository : IRepository<DonationRequest>
    {
        Task SoftDeleteDonationRequest(long donationRequestId);
        Task<Models.Pagination.PagedResult<DonationRequest>> GetPagedForAdminAsync(int page, int pageSize, Expression<Func<DonationRequest, bool>> filter = null, string sort = "");
    }
}
