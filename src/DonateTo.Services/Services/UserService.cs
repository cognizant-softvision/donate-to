using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DonateTo.Infrastructure.Data.Extensions;

namespace DonateTo.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService (
            IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public User Create(User entity)
        {
            throw new NotImplementedException();
        }

        public Task<User> CreateAsync(User entity)
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

        public User FirstOrDefault(Expression<Func<User, bool>> filter)
        {
            return _userRepository.FirstOrDefault(filter);
        }

        public IEnumerable<User> Get(Expression<Func<User, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public User Get(long id)
        {
            return _userRepository.Get(id);
        }

        public Task<IEnumerable<User>> GetAsync(Expression<Func<User, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetAsync(long id)
        {
            return await _userRepository.GetAsync(id).ConfigureAwait(false);
        }

        public PagedResult<User> GetPaged(int page, int pageSize)
        {
            return _userRepository.GetPaged(page, pageSize);
        }

        public async Task<PagedResult<User>> GetPagedAsync(int page, int pageSize)
        {
            return await _userRepository.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        public async Task<PagedResult<User>> GetPagedUsersByOrganizationAsync(long organizationId, int page, int pageSize)
        {
            throw new NotImplementedException();
            //TODO: Uncomment the return line when x.organizationId is implemented
            //return await _userRepository.GetPagedAsync(x => x.organizationId == organizationId, page, pageSize).ConfigureAwait(false);
        }

        public User Update(User entity, long id)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateAsync(User entity, long id)
        {
            throw new NotImplementedException();
        }
    }
}
