using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System;
using System.Linq.Dynamic.Core;
using DonateTo.Infrastructure.Extensions;
using DonateTo.ApplicationCore.Interfaces.Repositories;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRequestRepository : EntityFrameworkRepository<DonationRequest, DonateToDbContext>, IDonationRequestRepository
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
        public override ApplicationCore.Models.Pagination.PagedResult<DonationRequest>
            GetPaged(int page, int pageSize, Expression<Func<DonationRequest, bool>> filter = null, string sort = "")
        {
            var questions = GetHydratedDonationRequests()
                .FilterAndSort(filter, sort);

            return questions.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{DonationRequest}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<DonationRequest>>
            GetPagedAsync(int page, int pageSize, Expression<Func<DonationRequest, bool>> filter = null, string sort = "")
        {
            var today = DateTime.UtcNow.Date;

            var donationRequests = GetHydratedDonationRequests()
                .Where(d => (d.Address.IsDeleted == false) &&
                            ((d.FinishDate >= today) || (d.FinishDate == null)))
                .FilterAndSort(filter, sort);
            

            return await donationRequests.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        public async Task<ApplicationCore.Models.Pagination.PagedResult<DonationRequest>>
            GetPagedForAdminAsync(int page, int pageSize, Expression<Func<DonationRequest, bool>> filter = null, string sort = "")
        {
            var donationRequests = GetHydratedDonationRequests()
                .Where(d => d.Address.IsDeleted == false)
                .FilterAndSort(filter, sort);

            return await donationRequests.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        public async Task SoftDeleteDonationRequest(long donationRequestId)
        {
            using var transaction = await DbContext.Database.BeginTransactionAsync().ConfigureAwait(false);

            try
            {
                var donationRequestToSoftDelete = Get(null)
                    .Include(d => d.DonationRequestItems)
                    .Where(d => d.Id == donationRequestId)
                    .FirstOrDefault();

                if(donationRequestToSoftDelete.DonationRequestItems.ToList().Count > 0)
                {
                    donationRequestToSoftDelete.DonationRequestItems.ToList().ForEach(i => DbContext.DonationRequestItems.Remove(i));
                }
                DbContext.DonationRequests.Remove(donationRequestToSoftDelete);
                await DbContext.SaveChangesAsync().ConfigureAwait(false);
                await transaction.CommitAsync().ConfigureAwait(false);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync().ConfigureAwait(false);
                throw;
            }            
        }

        #region private
        private IQueryable<DonationRequest> GetHydratedDonationRequests()
        {
            return DbContext.Set<DonationRequest>()
                .Include(d => d.Address).ThenInclude(a => a.Country)
                .Include(d => d.Address).ThenInclude(a => a.State)
                .Include(d => d.Address).ThenInclude(a => a.City)
                .Include(d => d.Status)
                .Include(d => d.DonationRequestItems).ThenInclude(dri => dri.Unit)
                .Include(d => d.DonationRequestItems).ThenInclude(dri => dri.DonationRequestItemCategories)
                .Include(d => d.DonationRequestCategories).ThenInclude(drc => drc.Category)
                .Include(d => d.Organization).ThenInclude(o => o.Contact)
                .Include(d => d.Donations);
        }
        #endregion
    }
}
