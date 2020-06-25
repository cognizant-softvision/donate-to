using AutoMapper;
using AutoMapper.Extensions.ExpressionMapping;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Services.Extensions;
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
        private readonly IMapper _mapper;

        private const string _nullEntityException = "Entity is null.";
        private const string _matchingIdException = "Entity id and id parameter does not match.";
        private const string _keyNotFoundException = "Given key does not match any Entity.";

        public UserService(
            IRepository<User> userRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        ///<inheritdoc cref="IUserService"/>
        public User FirstOrDefault(Expression<Func<User, bool>> filter)
        {
            return _userRepository.FirstOrDefault(filter);
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task<User> FirstOrDefaultAsync(Expression<Func<User, bool>> filter)
        {
            return await _userRepository.FirstOrDefaultAsync(filter).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IUserService"/>
        public UserModel FirstOrDefault(Expression<Func<UserModel, bool>> filter)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<User, bool>>>(filter);
            return _mapper.Map<User, UserModel>(_userRepository.FirstOrDefault(filterDest));
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task<UserModel> FirstOrDefaultAsync(Expression<Func<UserModel, bool>> filter)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<User, bool>>>(filter);
            return _mapper.Map<User, UserModel>(await _userRepository.FirstOrDefaultAsync(filterDest).ConfigureAwait(false));
        }

        ///<inheritdoc cref="IUserService"/>
        public IEnumerable<UserModel> Get(Expression<Func<UserModel, bool>> filter)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<User, bool>>>(filter);
            return _userRepository.Get(filterDest).Select(u => _mapper.Map<User, UserModel>(u));
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task<IEnumerable<UserModel>> GetAsync(Expression<Func<UserModel, bool>> filter)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<User, bool>>>(filter);
            return (await _userRepository.GetAsync(filterDest).ConfigureAwait(false)).Select(u => _mapper.Map<User, UserModel>(u));
        }

        ///<inheritdoc cref="IUserService"/>
        public UserModel Get(long id)
        {
            return _mapper.Map<User, UserModel>(_userRepository.Get(id));
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task<UserModel> GetAsync(long id)
        {
            return _mapper.Map<User, UserModel>(await _userRepository.GetAsync(id).ConfigureAwait(false));
        }

        ///<inheritdoc cref="IUserService"/>
        public PagedResult<UserModel> GetPaged(int page, int pageSize, Expression<Func<UserModel, bool>> filter = null)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<User, bool>>>(filter);
            return _userRepository.GetPaged(page, pageSize, filterDest).Map<User, UserModel>(_mapper);
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task<PagedResult<UserModel>> GetPagedAsync(int page, int pageSize, Expression<Func<UserModel, bool>> filter = null)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<User, bool>>>(filter);
            return (await _userRepository.GetPagedAsync(page, pageSize, filterDest).ConfigureAwait(false)).Map<User, UserModel>(_mapper);
        }

        ///<inheritdoc cref="IUserService"/>
        public IEnumerable<UserModel> GetByOrganizationId(long organizationId)
        {
            return _userRepository.Get(u => u.UserOrganizations
            .Any(uo => uo.OrganizationId
            .Equals(organizationId))).Select(u => _mapper.Map<User, UserModel>(u));
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task<IEnumerable<UserModel>> GetByOrganizationIdAsync(long organizationId)
        {
            return (await _userRepository.GetAsync(u => u.UserOrganizations
            .Any(uo => uo.OrganizationId
            .Equals(organizationId))).ConfigureAwait(false)).Select(u => _mapper.Map<User, UserModel>(u));
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

        ///<inheritdoc cref="IUserService"/>
        public virtual async Task<UserModel> UpdateAsync(UserModel model, long id, string username = null)
        {
            if (model == null)
            {
                throw new ArgumentNullException(typeof(UserModel).ToString(), _nullEntityException);
            }
            else if (model.Id != id)
            {
                throw new InvalidOperationException(_matchingIdException);
            }

            var entity = _mapper.Map<UserModel, User>(model);

            entity.UpdateBy = username;
            entity.UpdateDate = DateTime.UtcNow;

            entity = await _userRepository.UpdateAsync(entity).ConfigureAwait(false);
            await _unitOfWork.SaveAsync().ConfigureAwait(false);

            return _mapper.Map<User, UserModel>(entity);
        }

        ///<inheritdoc cref="IUserService"/>
        public virtual UserModel Update(UserModel model, long id, string username = null)
        {
            if (model == null)
            {
                throw new ArgumentNullException(typeof(UserModel).ToString(), _nullEntityException);
            }
            else if (model.Id != id)
            {
                throw new InvalidOperationException(_matchingIdException);
            }

            var entity = _mapper.Map<UserModel, User>(model);

            entity.UpdateBy = username;
            entity.UpdateDate = DateTime.UtcNow;

            entity = _userRepository.Update(entity);
            _unitOfWork.Save();

            return _mapper.Map<User, UserModel>(entity);
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