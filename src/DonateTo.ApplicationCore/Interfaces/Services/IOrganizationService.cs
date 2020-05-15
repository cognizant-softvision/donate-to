using DonateTo.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IOrganizationService: IBaseService<Organization>
    {
        /// <summary>
        /// Searches for a query string amongst multiple tables and multiples columns synchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Paged Donations of matching criteria.</returns>
        // PagedResult<DonationRequest> SearchDonationRequest(string queryString, int page, int pageSize);
    }
}
