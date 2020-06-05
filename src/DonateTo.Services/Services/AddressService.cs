using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class AddressService : BaseService<Address>
    {
        public AddressService(IRepository<Address> addressRepository) : base(addressRepository)
        { }
    }
}