using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class StateService : BaseService<State, BaseFilterModel>, IStateService
    {
        private readonly IRepository<State> _stateRepository;

        public StateService(
            IRepository<State> stateRepository,
            IUnitOfWork unitOfWork) : base(stateRepository, unitOfWork)
        {
            _stateRepository = stateRepository;
        }

        public async Task<IEnumerable<State>> GetStatesByCountryAsync(long countryId)
        {
            return await _stateRepository.GetAsync(state => state.CountryId == countryId).ConfigureAwait(false);
        }
    }
}   
