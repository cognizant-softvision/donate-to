using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Organization> _organizationRepository;

        public UserService (
            IRepository<User> userRepository,
            IRepository<Organization> organizationRepository
            )
        {
            _userRepository = userRepository;
            _organizationRepository = organizationRepository;
        }

        public async Task<ActionResult<User>> AssociateUserToOrganization(long userId, long organizationId)
        {
            var user = _userRepository.Get(userId);
            var organization = _organizationRepository.Get(organizationId);

            if (user == null || organization == null)
            {
                throw new ArgumentException("User is null or Organization doesn't exists.");
            }

            user.Organization = organization;
            user.OrganizationId = organization.Id;
            user.
            return _userRepository.Update(user);
            // Save
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
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAsync(Expression<Func<User, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetAsync(long id)
        {
            throw new NotImplementedException();
        }

        public PagedResult<User> GetPaged(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<User>> GetPagedAsync(int page, int pageSize)
        {
            throw new NotImplementedException();
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
