using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.Services
{
    public class AddressService : BaseService<Address, BaseFilterModel>
    {
        public AddressService(
            IRepository<Address> addressRepository,
            IUnitOfWork unitOfWork) : base(addressRepository, unitOfWork)
        {
        }
    }
}