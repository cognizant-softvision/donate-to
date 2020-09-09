using AutoMapper;
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
        private readonly IMapper _mapper;

        public AddressService(
            IAddressRepository addressRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork) : base(addressRepository, unitOfWork)
        {
            _addressRepository = addressRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task SoftDeleteAddress(long addressId)
        {
            await _addressRepository.SoftDeleteAddress(addressId).ConfigureAwait(false);
        }

    }
}