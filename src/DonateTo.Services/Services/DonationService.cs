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
        public DonationService(IRepository<Donation> donationRepository)
        {
            this._donationRepository = donationRepository;
        }
        /// <summary>
        /// <In
        /// </summary>
        /// <param name="donation"></param>
        /// <returns></returns>
        public async Task<Donation> CreateAsync(Donation donation) {
            return await _donationRepository.AddAsync(donation);
        }

        /// <summary>
        ///     Create an donation.
        /// </summary>
        /// <param name="donation">Donation entity.</param>
        /// <returns>Donation.</returns>
        public Donation Create(Donation donation) {
            return _donationRepository.Add(donation);
        }

        /// <summary>
        ///     Get an donation by id.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Donation.</returns>
        public Donation Get(int id) {
            return _donationRepository.Get(id);
        }

        /// <summary>
        ///     Get an donation by id async.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Donation.</returns>
        public async Task<Donation> GetAsync(int id){
            return await _donationRepository.GetAsync(id);
        }

        /// <summary>
        ///   Update an donation async.
        /// </summary>
        /// <param name="donation">Donation entity.</param>
        /// <returns>Task.</returns>
        public async Task UpdateAsync(Donation donation) {
            await _donationRepository.UpdateAsync(donation);
        }
        
        /// <summary>
        ///     Update an donation.
        /// </summary>
        /// <param name="donation">Donation.</param>
        public void Update(Donation donation) {
             _donationRepository.Update(donation);
        }
        
        /// <summary>
        ///     Delete an donation async.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Task.</returns>
        public async Task DeleteAsync(int id) {
            await _donationRepository.DeleteAsync(new Donation{Id=id});
        }
        
        /// <summary>
        ///     Delete an donation.
        /// </summary>
        /// <param name="id">Donation id.</param>
        public void Delete(int id) {
             _donationRepository.Delete(new Donation{Id=id});
        }
        
        /// <summary>
        ///     Get a list of donations.
        /// </summary>
        /// <returns>IEnumerable of Donation.</returns>
        public PagedResult<Donation> GetPaged(int page, int pageSize) {
            return _donationRepository.GetPaged(page, pageSize);
        }

        /// <summary>
        ///     Get a list of donations async.
        /// </summary>
        /// <returns>IEnumerable of Donation.</returns>
        public async Task<PagedResult<Donation>> GetPagedAsync(int page, int pageSize)  {
            return await _donationRepository.GetPagedAsync(page, pageSize);
        }
    }
}
