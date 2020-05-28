using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DonateTo.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DonateTo.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Organization> _organizationRepository;
        private readonly IRepository<Role> _roleRepository;

        public UserService (
            IRepository<User> userRepository,
            IRepository<Organization> organizationRepository,
            IRepository<Role> roleRepository)
        {
            _userRepository = userRepository;
            _organizationRepository = organizationRepository;
            _roleRepository = roleRepository;
        }

        public async Task<User> AssociateUserToOrganization(long userId, long organizationId)
        {
            var user = await _userRepository.Get(u => u.Id == userId).Include(u => u.UserRoles).FirstOrDefaultAsync().ConfigureAwait(false);
            var organization = await _organizationRepository.GetAsync(organizationId).ConfigureAwait(false);

            if (user == null || organization == null)
            {
                throw new ArgumentException("The user or organization does not exist.");
            }

            user.OrganizationId = organization.Id;
            await _userRepository.UpdateAsync(user).ConfigureAwait(false);
            return await ChangeRoleToAdmin(user, userId).ConfigureAwait(false);
        }

        public async Task<User> ChangeRoleToAdmin(User user, long userId)
        {
            var adminRole = await _roleRepository.Get(r => r.Name == "Admin").FirstOrDefaultAsync().ConfigureAwait(false);

            user.UserRoles.Add(new UserRole(){
                UserId = user.Id,
                RoleId = adminRole.Id
            });

            return await _userRepository.UpdateAsync(user).ConfigureAwait(false);
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
