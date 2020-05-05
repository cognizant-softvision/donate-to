﻿using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces
{
    /// <summary>
    ///     Extensible Interface to implement posible serches
    /// </summary>
    public interface ISearchRepository 
    {
        /// <summary>
        ///     Searches for a query string amongst multiple tables and multiples columns synchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Paged Donations of matching criteria.</returns>
        PagedResult<Donation> SearchDonation(string queryString, int page, int pageSize);

        /// <summary>
        ///    Searches for a query string amongst multiple tables and multiples columns asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Task of Paged Donations of matching criteria.</returns>
        Task<PagedResult<Donation>> SearchDonationAsync(string queryString, int page, int pageSize);
       
    }
}
