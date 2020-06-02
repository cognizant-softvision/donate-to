using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;

namespace DonateTo.Services
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository _addressRepository;

        public AddressService(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public IEnumerable<Address> Get(Expression<Func<Address, bool>> filter = null)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Address>> GetAsync(Expression<Func<Address, bool>> filter = null)
        {
            throw new NotImplementedException();
        }

        public PagedResult<Address> GetPaged(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<Address>> GetPagedAsync(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Address Get(long id)
        {
            throw new NotImplementedException();
        }

        public Task<Address> GetAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Address Create(Address entity)
        {
            throw new NotImplementedException();
        }

        public Task<Address> CreateAsync(Address entity)
        {
            throw new NotImplementedException();
        }

        public Address Update(Address entity, long id)
        {
            throw new NotImplementedException();
        }

        public Task<Address> UpdateAsync(Address entity, long id)
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

        public Address FirstOrDefault(Expression<Func<Address, bool>> filter = null)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Address> GetByOrganizationId(long organizationId)
        {
            return _addressRepository.GetByOrganizationId(organizationId);
        }

        public async Task<IEnumerable<Address>> GetByOrganizationIdAsync(long organizationId)
        {
            return await _addressRepository.GetByOrganizationIdAsync(organizationId).ConfigureAwait(false);
        }
    }
}