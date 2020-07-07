using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class CityService : BaseService<City, BaseFilterModel>, ICityService 
    {
        private readonly IRepository<City> _cityRepository;

        public CityService(
            IRepository<City> cityRepository,
            IUnitOfWork unitOfWork) : base(cityRepository, unitOfWork)
        {
            _cityRepository = cityRepository;
        }

        public async Task<IEnumerable<City>> GetCitiesByStateAsync(long stateId)
        {
            return await _cityRepository.GetAsync(city => city.StateId == stateId).ConfigureAwait(false);
        }
    }
}
