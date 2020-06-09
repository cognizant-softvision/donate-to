using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class CityService : ICityService
    {
        private readonly IRepository<City> _cityRepository;

        public CityService(
            IRepository<City> cityRepository)
        {
            _cityRepository = cityRepository;
        }

        public City Create(City entity)
        {
            throw new NotImplementedException();
        }

        public Task<City> CreateAsync(City entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(long id)
        {
            throw new NotImplementedException();
        }

        public City FirstOrDefault(Expression<Func<City, bool>> filter)
        {
            return _cityRepository.FirstOrDefault(filter);
        }

        public IEnumerable<City> Get(Expression<Func<City, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public City Get(long id)
        {
            return _cityRepository.Get(id);
        }

        public Task<IEnumerable<City>> GetAsync(Expression<Func<City, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public async Task<City> GetAsync(long id)
        {
            return await _cityRepository.GetAsync(id).ConfigureAwait(false);
        }

        public PagedResult<City> GetPaged(int page, int pageSize)
        {
            return _cityRepository.GetPaged(page, pageSize);
        }

        public async Task<PagedResult<City>> GetPagedAsync(int page, int pageSize)
        {
            return await _cityRepository.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        public async Task<IEnumerable<City>> GetCitiesByStateAsync(long stateId)
        {
            return await _cityRepository.GetAsync(city => city.StateId == stateId).ConfigureAwait(false);
        }

        public City Update(City entity, long id)
        {
            throw new NotImplementedException();
        }

        public Task<City> UpdateAsync(City entity, long id)
        {
            throw new NotImplementedException();
        }
    }
}
