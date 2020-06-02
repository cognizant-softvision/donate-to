using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class AddressService : BaseService<Address>
    {
        private readonly IRepository<Address> _addressRepository;

        public AddressService(IRepository<Address> addressRepository):base(addressRepository)
        {
            _addressRepository = addressRepository;
        }
    }
}