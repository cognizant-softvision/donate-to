using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class AddressService : BaseService<Address, BaseFilterModel>, IAddressService
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AddressService(
            IAddressRepository addressRepository,
            IUnitOfWork unitOfWork) : base(addressRepository, unitOfWork)
        {
            _addressRepository = addressRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task SoftDelete(Address address)
        {
            await _addressRepository.SoftDeleteAddress(address).ConfigureAwait(false);
        }
    }
}