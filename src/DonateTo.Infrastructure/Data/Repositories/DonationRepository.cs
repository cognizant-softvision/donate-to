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
using System.Collections.Generic;
using DonateTo.ApplicationCore.Common;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRepository : EntityFrameworkRepository<Donation, DonateToDbContext>, IDonationRepository
    {
        public DonationRepository(DonateToDbContext dbContext) : base(dbContext)
        {
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
        public override ApplicationCore.Models.Pagination.PagedResult<Donation> 
            GetPaged(int page, int pageSize, Expression<Func<Donation, bool>> filter = null, string sort = "")
        {
            return GetHydratedDonations().FilterAndSort(filter, sort).GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{Donation}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<Donation>> 
            GetPagedAsync(int page, int pageSize, Expression<Func<Donation, bool>> filter = null, string sort = "")
        {
            return await GetHydratedDonations().FilterAndSort(filter, sort).GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        public async Task SoftDeleteDonation(Donation donation)
        {
            var donationToSoftDelete = Get(null)
                .Where(d => d.Id == donation.Id)
                .FirstOrDefault();

            DbContext.Donations.Remove(donationToSoftDelete);
            await DbContext.SaveChangesAsync().ConfigureAwait(false);
        }

        public IEnumerable<User> GetDonors(long donationRequestItemId)
        {
            var donors = Get(null)
                .Include(d => d.Owner)
                .Where(d => (d.DonationRequestId == donationRequestItemId) &&
                            (d.StatusId == StatusType.Pending))
                .Select(d => d.Owner)
                .ToList();

            return donors;
        }

        #region private
        private IQueryable<Donation> GetHydratedDonations()
        {
            return DbContext.Set<Donation>()
                .Include(d => d.Address).ThenInclude(a => a.Contact)                
                .Include(d => d.Address).ThenInclude(a => a.Country)                
                .Include(d => d.Address).ThenInclude(a => a.State)                
                .Include(d => d.Address).ThenInclude(a => a.City)                
                .Include(d => d.Owner)
                .Include(d => d.Availabilities)
                .Include(d => d.Status)
                .Include(d => d.DonationItems).ThenInclude(di => di.Unit)
                .Include(d => d.DonationItems).ThenInclude(di => di.Status)
                .Include(d => d.DonationRequest.DonationRequestItems).ThenInclude(dri => dri.Unit)
                .Include(d => d.DonationRequest.DonationRequestCategories).ThenInclude(drc => drc.Category)
                .Include(d => d.DonationRequest.Organization)
                .Include(d => d.DonationRequest.Status);
        }
        #endregion
    }
}
