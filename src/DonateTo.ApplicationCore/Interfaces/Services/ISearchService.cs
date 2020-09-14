using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.ApplicationCore.Entities;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface ISearchService
    {
        /// <summary>
        ///Searches for a query string amongst multiple tables and multiples columns synchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Paged Donations of matching criteria.</returns>
        PagedResult<DonationRequest> SearchDonationRequest(string queryString, int page, int pageSize);

        /// <summary>
        ///Searches for a query string amongst multiple tables and multiples columns asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Task of Paged Donations of matching criteria.</returns>
        Task<PagedResult<DonationRequest>> SearchDonationRequestAsync(string queryString, int page, int pageSize);

        /// <summary>
        ///Searches for a query string amongst multiple tables and multiples columns asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Task of Paged Organizations of matching criteria.</returns>
        Task<PagedResult<Organization>> SearchOrganizationAsync(string queryString, int page, int pageSize);

        /// <summary>
        ///Searches for a query string amongst multiple tables and multiples columns asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Task of Paged Users of matching criteria.</returns>
        Task<PagedResult<User>> SearchUserAsync(string queryString, int page, int pageSize);
    }
}
