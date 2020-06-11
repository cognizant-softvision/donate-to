using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IStateService : IBaseService<State>
    {
        /// <summary>
        /// Gets a list of states in a country async.
        /// </summary>
        /// <param name="countryId">Id of the looking states</param>
        /// <returns></returns>
        Task<IEnumerable<State>> GetStatesByCountryAsync(long countryId);
    }
}
