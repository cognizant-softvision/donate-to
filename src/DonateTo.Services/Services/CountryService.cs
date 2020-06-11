using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class CountryService : BaseService<Country>
    {
        public CountryService(
            IRepository<Country> countryRepository,
            IUnitOfWork unitOfWork) : base(countryRepository, unitOfWork)
        {
        }
    }
}
