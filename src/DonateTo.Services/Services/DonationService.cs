using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.Infrastructure.Data.Repositories;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class DonationService: IDonationService
    {
        private readonly IRepository<Donation> _donationRepository;
        private readonly ISearchRepository _searchRepository;
        public DonationService(IRepository<Donation> donationRepository, ISearchRepository searchRepository)
        {
            this._donationRepository = donationRepository;
            this._searchRepository = searchRepository;
        }
        /// <summary>
        /// <In
        /// </summary>
        /// <param name="donation"></param>
        /// <returns></returns>
        public async Task<Donation> CreateAsync(Donation donation) {
            return await this._donationRepository.AddAsync(donation);
        }

        /// <summary>
        ///     Create an donation.
        /// </summary>
        /// <param name="donation">Donation entity.</param>
        /// <returns>Donation.</returns>
        public Donation Create(Donation donation) {
            return this._donationRepository.Add(donation);
        }

        /// <summary>
        ///     Get an donation by id.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Donation.</returns>
        public Donation Get(int id) {
            return this._donationRepository.Get(id);
        }

        /// <summary>
        ///     Get an donation by id async.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Donation.</returns>
        public async Task<Donation> GetAsync(int id){
            return await this._donationRepository.GetAsync(id);
        }

        /// <summary>
        ///   Update an donation async.
        /// </summary>
        /// <param name="donation">Donation entity.</param>
        /// <returns>Task.</returns>
        public async Task UpdateAsync(Donation donation) {
            await this._donationRepository.UpdateAsync(donation);
        }
        
        /// <summary>
        ///     Update an donation.
        /// </summary>
        /// <param name="donation">Donation.</param>
        public void Update(Donation donation) {
            this._donationRepository.Update(donation);
        }
        
        /// <summary>
        ///     Delete an donation async.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Task.</returns>
        public async Task DeleteAsync(int id) {
            await this._donationRepository.DeleteAsync(new Donation{Id=id});
        }
        
        /// <summary>
        ///     Delete an donation.
        /// </summary>
        /// <param name="id">Donation id.</param>
        public void Delete(int id) {
            this._donationRepository.Delete(new Donation{Id=id});
        }
        
        /// <summary>
        ///     Get a list of donations.
        /// </summary>
        /// <returns>IEnumerable of Donation.</returns>
        public PagedResult<Donation> GetPaged(int page, int pageSize) {
            return this._donationRepository.GetPaged(page, pageSize);
        }

        /// <summary>
        ///     Get a list of donations async.
        /// </summary>
        /// <returns>IEnumerable of Donation.</returns>
        public async Task<PagedResult<Donation>> GetPagedAsync(int page, int pageSize)  {
            return await this._donationRepository.GetPagedAsync(page, pageSize);
        }

        /// <summary>
        ///     Searches for a query string amongst multiple tables and multiples columns synchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Paged Donations of matching criteria.</returns>
        public PagedResult<Donation> SearchDonation(string queryString, int page, int pageSize) {
            return this._searchRepository.SearchDonation(queryString, page, pageSize);
        }

        /// <summary>
        ///    Searches for a query string amongst multiple tables and multiples columns asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <param name="page"> Curent results page <param>
        /// <param name="pageSize"> Size of results page <param>
        /// <returns>Task of Paged Donations of matching criteria.</returns>
        public Task<PagedResult<Donation>> SearchDonationAsync(string queryString, int page, int pageSize) {
             return this._searchRepository.SearchDonationAsync(queryString, page, pageSize);

        }
    }
}
