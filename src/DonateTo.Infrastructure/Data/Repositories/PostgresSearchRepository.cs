using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class PostgresSearchRepository : ISearchRepository
    {
        private readonly DonateToDbContext DbContext;

        public PostgresSearchRepository(DonateToDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        private IQueryable<Donation> GetHydratedDonations() {
            return DbContext.Set<Donation>().Include( d => d.Address).Include( d => d.Status).Include( d => d.DonationItems)
                .Include( d => d.DonationRequest.DonationRequestItems).Include( d => d.DonationRequest.DonationRequestCategories)
                .Include( d => d.DonationRequest.Organization).Include( d => d.DonationRequest.Status);
        }
        private IQueryable<Donation> SearchDonationQuery(string queryString) {
           var likeString =  $"%{queryString}%";
           var query = this.GetHydratedDonations().Where( donation => 
                EF.Functions.ILike(donation.DonationRequest.Title, likeString) ||
                EF.Functions.ILike(donation.DonationRequest.Organization.Name, likeString) ||                
                donation.DonationRequest.DonationRequestCategories.Any( cdr => EF.Functions.ILike(cdr.Category.Name, likeString)) ||
                donation.DonationRequest.DonationRequestItems.Any( dri =>
                        EF.Functions.ILike(dri.Name, likeString)) ||
                donation.DonationRequest.DonationRequestItems.Any( dri =>
                        dri.DonationRequestItemCategories.Any( cdr => EF.Functions.ILike(cdr.Category.Name, likeString)))
           );
           return query;
        }

        /// <summary>
        ///     Searches for a queryString amongst multiple tables and multiples columns.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Paged Donations of matching criteria.</returns>
        public PagedResult<Donation> SearchDonation(string queryString, int page, int pageSize)
        {
          return SearchDonationQuery(queryString).GetPaged(page, pageSize);
        }
        
        /// <summary>
        ///    Searches for a query string amongst multiple tables and multiples columns asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Task of Paged Donations of matching criteria.</returns>
        public Task<PagedResult<Donation>> SearchDonationAsync(string queryString, int page, int pageSize) {
           return SearchDonationQuery(queryString).GetPagedAsync(page, pageSize );
        }

    }
    
}
