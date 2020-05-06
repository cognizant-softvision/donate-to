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
        private readonly DonateToDbContext _dbContext;

        public PostgresSearchRepository(DonateToDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private IQueryable<DonationRequest> GetHydratedDonationRequests() {
            return _dbContext.Set<DonationRequest>().Include( d => d.Address).Include( d => d.Status).Include( d => d.DonationRequestItems)
                .Include( d => d.DonationRequestItems).Include( d => d.DonationRequestCategories)
                .Include( d => d.Organization).Include( d => d.Status);
        }
        private IQueryable<DonationRequest> SearchDonationRequestQuery(string queryString) {
           var likeString =  $"%{queryString}%";
           var query = GetHydratedDonationRequests().Where( donation => 
                EF.Functions.ILike(donation.Title, likeString) ||
                EF.Functions.ILike(donation.Organization.Name, likeString) ||                
                donation.DonationRequestCategories.Any( cdr => EF.Functions.ILike(cdr.Category.Name, likeString)) ||
                donation.DonationRequestItems.Any( dri =>
                        EF.Functions.ILike(dri.Name, likeString)) ||
                donation.DonationRequestItems.Any( dri =>
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
        /// <returns>Paged DonationRequests of matching criteria.</returns>
        public PagedResult<DonationRequest> SearchDonationRequest(string queryString, int page, int pageSize)
        {
          return SearchDonationRequestQuery(queryString).GetPaged(page, pageSize);
        }
        
        /// <summary>
        ///    Searches for a query string amongst multiple tables and multiples columns asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Task of Paged DonationRequests of matching criteria.</returns>
        public async Task<PagedResult<DonationRequest>> SearchDonationRequestAsync(string queryString, int page, int pageSize) {
           return await SearchDonationRequestQuery(queryString).GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

    }
    
}
