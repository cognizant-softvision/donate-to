using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.EntityFrameworkCore.Internal;
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
            _unitOfWork = unitOfWork;
        }

        public User Create(User entity, string username)
        {
            throw new NotImplementedException();
        }

        public Task<User> CreateAsync(User entity, string username)
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

        public async Task<IEnumerable<User>> GetAsync(Expression<Func<User, bool>> filter)
        {
            return await _userRepository.GetAsync().ConfigureAwait(false);
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

        ///<inheritdoc cref="IUserService"/>
        public IEnumerable<User> GetByOrganizationId(long organizationId)
        {
            return _userRepository.Get(u => u.UserOrganizations
            .Any(uo => uo.OrganizationId
            .Equals(organizationId)));
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task<IEnumerable<User>> GetByOrganizationIdAsync(long organizationId)
        {
            return await _userRepository.GetAsync(u => u.UserOrganizations
            .Any(uo => uo.OrganizationId
            .Equals(organizationId))).ConfigureAwait(false);
        }

        public User Update(User entity, long id, string username)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateAsync(User entity, long id, string username)
        {
            throw new NotImplementedException();
        }

        ///<inheritdoc cref="IUserService"/>
        public void UpdateUserOrganizations(long userId, IEnumerable<long> organizationsId, string username)
        {
            var user = _userRepository.Get(userId);
            user.UpdateBy = username;

            user.UserOrganizations = FilterUserOrganizations(user.UserOrganizations, userId, organizationsId);

            _userRepository.Update(user);
            _unitOfWork.Save();
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task UpdateUserOrganizationsAsync(long userId, IEnumerable<long> organizationsId, string username)
        {
            var user = await _userRepository.GetAsync(userId).ConfigureAwait(false);
            user.UpdateBy = username;

            user.UserOrganizations = FilterUserOrganizations(user.UserOrganizations, userId, organizationsId);

            await _userRepository.UpdateAsync(user).ConfigureAwait(false);
            await _unitOfWork.SaveAsync().ConfigureAwait(false);
        }

        #region private
        private ICollection<UserOrganization> FilterUserOrganizations(ICollection<UserOrganization> userOrganizations, long userId, IEnumerable<long> organizationsId)
        {
            List<UserOrganization> newOrganizations = new List<UserOrganization>();
            var currentOrganizations = userOrganizations.ToList();

            if (currentOrganizations.Any())
            {
                newOrganizations.AddRange(
                    organizationsId.Where(id => !currentOrganizations
                    .Any(co => co.OrganizationId == id))
                    .Select(id => new UserOrganization { UserId = userId, OrganizationId = id }));

                var removedOrganizations = userOrganizations
                    .Where(userOrganization => !organizationsId
                    .Contains(userOrganization.OrganizationId));

                foreach (var userOrganization in removedOrganizations)
                {
                    currentOrganizations.Remove(userOrganization);
                }
            }
            else
            {
                newOrganizations = organizationsId
               .Select(o => new UserOrganization { UserId = userId, OrganizationId = o }).ToList();
            }

            if (newOrganizations.Any())
            {
                currentOrganizations.AddRange(newOrganizations);
            }

            return currentOrganizations;
        }
        #endregion
    }
}