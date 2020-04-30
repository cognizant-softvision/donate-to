using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IDonationService
    {
        /// <summary>
        ///     Create an donation async.
        /// </summary>
        /// <param name="donation">Donation entity.</param>
        /// <returns>Donation entity.</returns>
        Task<Donation> CreateAsync(Donation donation);

        /// <summary>
        ///     Create an donation.
        /// </summary>
        /// <param name="donation">Donation entity.</param>
        /// <returns>Donation.</returns>
        Donation Create(Donation donation);

        /// <summary>
        ///     Get an donation by id.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Donation.</returns>
        Donation Get(int id);

        /// <summary>
        ///     Get an donation by id async.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Donation.</returns>
        Task<Donation> GetAsync(int id);

        /// <summary>
        ///     Update an donation async.
        /// </summary>
        /// <param name="donation">Donation entity.</param>
        /// <returns>Task.</returns>
        Task UpdateAsync(Donation donation);
        
        /// <summary>
        ///     Update an donation.
        /// </summary>
        /// <param name="donation">Donation.</param>
        void Update(Donation donation);
        
        /// <summary>
        ///     Delete an donation async.
        /// </summary>
        /// <param name="id">Donation id.</param>
        /// <returns>Task.</returns>
        Task DeleteAsync(int id);
        
        /// <summary>
        ///     Delete an donation.
        /// </summary>
        /// <param name="id">Donation id.</param>
        void Delete(int id);
        
        /// <summary>
        ///     Get a list of donations.
        /// </summary>
        /// <returns>IEnumerable of Donation.</returns>
        PagedResult<Donation> GetPaged(int page, int pageSize);

        /// <summary>
        ///     Get a list of donations async.
        /// </summary>
        /// <returns>IEnumerable of Donation.</returns>
        Task<PagedResult<Donation>> GetPagedAsync(int page, int pageSize);
    }
}
