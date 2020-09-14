using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;
using AutoMapper;
using DonateTo.Services.Extensions;
using DonateTo.ApplicationCore.Models;

namespace DonateTo.Services
{
    public class SearchService: ISearchService
    {
        private readonly ISearchRepository _searchRepository;
        private readonly IMapper _mapper;

        public SearchService(ISearchRepository searchRepository, IMapper mapper)
        {
            _searchRepository = searchRepository;
            _mapper = mapper;
        }

        ///<inheritdoc cref="ISearchService"/>
        public PagedResult<DonationRequest> SearchDonationRequest(string queryString, int page, int pageSize)
        {
            return _searchRepository.SearchDonationRequest(queryString, page, pageSize);
        }

        ///<inheritdoc cref="ISearchService"/>
        public async Task<PagedResult<DonationRequest>> SearchDonationRequestAsync(string queryString, int page, int pageSize)
        {
             return await _searchRepository.SearchDonationRequestAsync(queryString, page, pageSize).ConfigureAwait(false);
        }

        ///<inheritdoc cref="ISearchService"/>
        public async Task<PagedResult<Organization>> SearchOrganizationAsync(string queryString, int page, int pageSize)
        {
            return await _searchRepository.SearchOrganizationAsync(queryString, page, pageSize).ConfigureAwait(false);
        }

        ///<inheritdoc cref="ISearchService"/>
        public async Task<PagedResult<UserModel>> SearchUserAsync(string queryString, int page, int pageSize)
        {
            return (await _searchRepository.SearchUserAsync(queryString, page, pageSize).ConfigureAwait(false)).Map<User, UserModel>(_mapper);
        }
    }
}
