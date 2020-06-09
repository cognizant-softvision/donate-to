using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface ICityService : IBaseService<City>
    {
        /// <summary>
        /// Gets a list of cities in a state async.
        /// </summary>
        /// <param name="stateId">Id of the looking cities</param>
        /// <returns></returns>
        Task<IEnumerable<City>> GetCitiesByStateAsync(long stateId);
    }
}
