using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.Services
{
    public class CountryService : BaseService<Country, BaseFilterModel>
    {
        public CountryService(
            IRepository<Country> countryRepository,
            IUnitOfWork unitOfWork) : base(countryRepository, unitOfWork)
        {
        }
    }
}
