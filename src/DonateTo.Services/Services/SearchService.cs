using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.Infrastructure.Data.Repositories;
using DonateTo.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;

namespace DonateTo.Services
{
    public class SearchService: ISearchService
    {
        private readonly IRepository<DonationRequest> _donationRepository;
        private readonly ISearchRepository _searchRepository;
        public SearchService(IRepository<DonationRequest> donationRepository, ISearchRepository searchRepository)
        {
            this._searchRepository = searchRepository;
        }

        ///<inheritdoc cref="ISearchService"/>
        public PagedResult<DonationRequest> SearchDonationRequest(string queryString, int page, int pageSize) {
            return this._searchRepository.SearchDonationRequest(queryString, page, pageSize);
        }

        ///<inheritdoc cref="ISearchService"/>
        public async Task<PagedResult<DonationRequest>> SearchDonationRequestAsync(string queryString, int page, int pageSize) {
             return await this._searchRepository.SearchDonationRequestAsync(queryString, page, pageSize).ConfigureAwait(false);

        }
    }
}
