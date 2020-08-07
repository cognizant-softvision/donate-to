using AutoMapper;
using AutoMapper.Extensions.ExpressionMapping;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.ApplicationCore.Common;
using DonateTo.Services.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Models.Filtering;
using LinqKit;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace DonateTo.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Role> _roleRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        private const string _nullEntityException = "Entity is null.";
        private const string _matchingIdException = "Entity id and id parameter does not match.";
        private const string _keyNotFoundException = "Given key does not match any Entity.";

        public UserService(
            IRepository<User> userRepository,
            IRepository<Role> roleRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
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
        public void UpdateUserOrganizations(long userId, IEnumerable<long> organizationsIds, string username)
        {
            var user = _userRepository.Get(userId);
            user.UpdateBy = username;

            user.UserOrganizations = FilterUserOrganizations(user.UserOrganizations, userId, organizationsIds);

            if (!user.UserRoles.Any(r => r.Role.Name == Roles.Organization))
            {
                user.UserRoles.Add(new UserRole()
                {
                    RoleId = _roleRepository.FirstOrDefault(r => r.Name == Roles.Organization).Id
                });
            }
            else 
            {
                // When there's no organization assigned removes that given role 
                // and assigns the donor role in case it was not present at the moment
                if (!user.UserOrganizations.Any()) 
                {
                    var ur = user.UserRoles.FirstOrDefault(usr => usr.Role.Name == Roles.Organization);
                    user.UserRoles.Remove(ur);

                    if (!user.UserRoles.Any(r => r.Role.Name == Roles.Donor))
                    {
                        user.UserRoles.Add(new UserRole()
                        {
                            RoleId = _roleRepository.FirstOrDefault(r => r.Name == Roles.Donor).Id
                        });
                    }
                }
            }

            _userRepository.Update(user);
            _unitOfWork.Save();
        }

        ///<inheritdoc cref="IUserService"/>
        public async Task UpdateUserOrganizationsAsync(long userId, IEnumerable<long> organizationsIds, string username)
        {
            var user = await _userRepository.GetAsync(userId).ConfigureAwait(false);
            user.UpdateBy = username;

            user.UserOrganizations = FilterUserOrganizations(user.UserOrganizations, userId, organizationsIds);

            if (!user.UserRoles.Any(r => r.Role.Name == Roles.Organization))
            {
                user.UserRoles.Add(new UserRole()
                {
                    RoleId = _roleRepository.FirstOrDefault(r => r.Name == Roles.Organization).Id
                });
            }
            else
            {
                // When there's no organization assigned removes that given role 
                // and assigns the donor role in case it was not present at the moment
                if (!user.UserOrganizations.Any())
                {
                    var ur = user.UserRoles.FirstOrDefault(usr => usr.Role.Name == Roles.Organization);
                    user.UserRoles.Remove(ur);

                    if (!user.UserRoles.Any(r => r.Role.Name == Roles.Donor))
                    {
                        user.UserRoles.Add(new UserRole()
                        {
                            RoleId = _roleRepository.FirstOrDefault(r => r.Name == Roles.Donor).Id
                        });
                    }
                }
            }

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

            var entity = await GetUserAsync(id).ConfigureAwait(false);
            MapModelUserToEntity(model, entity);            

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

        ///<inheritdoc cref="IUserService"/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1307:Specify StringComparison", Justification = "<Pending>")]
        public PagedResult<UserModel> GetPagedFiltered(UserFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return (_userRepository.GetPaged(filter.PageNumber, filter.PageSize, predicate, GetSort(filter))).Map<User, UserModel>(_mapper);
        }

        ///<inheritdoc cref="IUserService"/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1307:Specify StringComparison", Justification = "<Pending>")]
        public async Task<PagedResult<UserModel>> GetPagedFilteredAsync(UserFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return (await _userRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false)).Map<User, UserModel>(_mapper);
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

        /// <summary>
        /// Returns sort string from filter model
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1308:Normalize strings to uppercase", Justification = "<Pending>")]
        private string GetSort(UserFilterModel filter)
        {
            var properties = typeof(UserFilterModel).GetProperties();

            var sort = !string.IsNullOrEmpty(filter.OrderBy)
                && properties.Any(p => p.Name.ToUpperInvariant() == filter.OrderBy.ToUpperInvariant() 
                && p.GetCustomAttributes(typeof(NotMappedAttribute), true).Length > 1) ?
                $"{ char.ToUpperInvariant(filter.OrderBy[0]) + filter.OrderBy.Substring(1).ToLowerInvariant() } " :
                "Id ";

            sort += !string.IsNullOrEmpty(filter.OrderDirection)
                && new[] { SortDirection.Desc, SortDirection.Descend, SortDirection.Descending }.Any(order => filter.OrderDirection == order) ?
                    SortDirection.Desc :
                    SortDirection.Asc;

            return sort;
        }

        /// <summary>
        /// Return predicate for given filter
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        private Expression<Func<User, bool>> GetPredicate(UserFilterModel filter)
        {
            var predicate = PredicateBuilder.New<User>(true);

            if (filter.UpdateDateBegin != null && filter.UpdateDateBegin != DateTime.MinValue)
            {
                predicate = predicate.Or(p => p.UpdateDate >= filter.UpdateDateBegin);
            }

            if (filter.UpdateDateEnd != null && filter.UpdateDateEnd != DateTime.MinValue)
            {
                predicate = predicate.Or(p => p.UpdateDate <= filter.UpdateDateEnd);
            }

            if (filter.OrganizationId != 0) 
            {
                predicate = predicate.And(p => p.UserOrganizations.Any(uo => uo.OrganizationId == filter.OrganizationId));
            }

            //EF function is the way used to compare string avoiding EF core translation issue with
            //case sensitive comparer mentioned here https://github.com/dotnet/efcore/issues/1222#issuecomment-611113142
            //Also, due to EF core restriction EF functions cannot be extracted to an extension method
            if (!string.IsNullOrEmpty(filter.FullName))
            {
                predicate = predicate.And(p =>
                                    EF.Functions.ILike(p.FirstName, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.FullName)) ||
                                    EF.Functions.ILike(p.LastName, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.FullName)));
            }

            if (!string.IsNullOrEmpty(filter.Email))
            {
                predicate = predicate.And(p => EF.Functions.ILike(p.Email, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.Email)));
            }

            if (!string.IsNullOrEmpty(filter.Organization))
            {
                predicate = predicate.And(p => p.UserOrganizations.Any(uo => 
                    EF.Functions.ILike(uo.Organization.Name, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.Organization))));
            }

            return predicate;
        }

        private async Task<User> GetUserAsync(long id)
        {
            return await _userRepository.GetAsync(id).ConfigureAwait(false);
        }

        private void MapModelUserToEntity(UserModel userModel, User user)
        {
            user.FirstName = userModel.FirstName;
            user.LastName = userModel.LastName;
            user.IdentityNumber = userModel.IdentityNumber;
            user.PhoneNumber = userModel.PhoneNumber;            
        }
        #endregion
    }
}