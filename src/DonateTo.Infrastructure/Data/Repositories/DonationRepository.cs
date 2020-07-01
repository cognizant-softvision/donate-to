using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class DonationRepository : EntityFrameworkRepository<Donation, DonateToDbContext>
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
        public override PagedResult<Donation> GetPaged(int page, int pageSize, Expression<Func<Donation, bool>> filter = null)
        {
            var donations = GetHydratedDonations();

            if (filter != null) 
            {
                donations = donations.Where(filter);
            }

            return donations.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{Donation}"/>
        public override async Task<PagedResult<Donation>> GetPagedAsync(int page, int pageSize, Expression<Func<Donation, bool>> filter = null)
        {
            var donations = GetHydratedDonations();

            if (filter != null)
            {
                donations = donations.Where(filter);
            }

            return await donations.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        #region private
        private IQueryable<Donation> GetHydratedDonations()
        {
            return DbContext.Set<Donation>()
                .Include(d => d.Address).ThenInclude(a => a.Contact)
                .Include(d => d.Availabilities)
                .Include(d => d.Status)
                .Include(d => d.DonationItems).ThenInclude(di => di.Unit)
                .Include(d => d.DonationRequest.DonationRequestItems).ThenInclude(dri => dri.Unit)
                .Include(d => d.DonationRequest.DonationRequestCategories).ThenInclude(drc => drc.Category)
                .Include(d => d.DonationRequest.Organization)
                .Include(d => d.DonationRequest.Status);
        }
        #endregion
    }
}
