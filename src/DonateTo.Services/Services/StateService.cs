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
    public class StateService : IStateService
    {
        private readonly IRepository<State> _stateRepository;

        public StateService(
            IRepository<State> stateRepository)
        {
            _stateRepository = stateRepository;
        }

        public State Create(State entity)
        {
            throw new NotImplementedException();
        }

        public Task<State> CreateAsync(State entity)
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

        public State FirstOrDefault(Expression<Func<State, bool>> filter)
        {
            return _stateRepository.FirstOrDefault(filter);
        }

        public IEnumerable<State> Get(Expression<Func<State, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public State Get(long id)
        {
            return _stateRepository.Get(id);
        }

        public Task<IEnumerable<State>> GetAsync(Expression<Func<State, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public async Task<State> GetAsync(long id)
        {
            return await _stateRepository.GetAsync(id).ConfigureAwait(false);
        }

        public PagedResult<State> GetPaged(int page, int pageSize)
        {
            return _stateRepository.GetPaged(page, pageSize);
        }

        public async Task<PagedResult<State>> GetPagedAsync(int page, int pageSize)
        {
            return await _stateRepository.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        public async Task<IEnumerable<State>> GetStatesByCountryAsync(long countryId)
        {
            return await _stateRepository.GetAsync(state => state.CountryId == countryId).ConfigureAwait(false);
        }

        public State Update(State entity, long id)
        {
            throw new NotImplementedException();
        }

        public Task<State> UpdateAsync(State entity, long id)
        {
            throw new NotImplementedException();
        }
    }
}
