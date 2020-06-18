using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(
            IRepository<User> userRepository, IUnitOfWork unitOfWork)
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

        public PagedResult<User> GetPaged(int page, int pageSize, Expression<Func<User, bool>> filter = null)
        {
            return _userRepository.GetPaged(page, pageSize, filter);
        }

        public async Task<PagedResult<User>> GetPagedAsync(int page, int pageSize, Expression<Func<User, bool>> filter = null)
        {
            return await _userRepository.GetPagedAsync(page, pageSize, filter).ConfigureAwait(false);
        }

        public IEnumerable<UserOrganization> GetUserOrganizations(long userId)
        {
            return _userRepository.Get(userId).UserOrganizations;
        }

        public async Task<IEnumerable<UserOrganization>> GetUserOrganizationsAsync(long userId)
        {
            var user = await _userRepository.GetAsync(userId).ConfigureAwait(false);

            return user.UserOrganizations;
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