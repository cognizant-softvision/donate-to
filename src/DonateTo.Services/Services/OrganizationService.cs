using AutoMapper;
using DonateTo.ApplicationCore.Common;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class OrganizationService : BaseService<Organization, OrganizationFilterModel>, IOrganizationService
    {
        private readonly IRepository<Organization> _organizationRepository;
        private readonly IRepository<Role> _roleRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrganizationService(
            IRepository<Organization> organizationRepository,
            IRepository<Role> roleRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper) : base(organizationRepository, unitOfWork)
        {
            _organizationRepository = organizationRepository;
            _roleRepository = roleRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        ///<inheritdoc cref="IOrganizationService"/>
        public IEnumerable<Organization> GetByUserId(long userId)
        {
            return _organizationRepository.Get(o => o.UserOrganizations
            .Any(uo => uo.UserId
            .Equals(userId)));
        }

        ///<inheritdoc cref="IOrganizationService"/>
        public async Task<IEnumerable<Organization>> GetByUserIdAsync(long userId)
        {
            return await _organizationRepository.GetAsync(o => o.UserOrganizations
            .Any(uo => uo.UserId
            .Equals(userId))).ConfigureAwait(false);
        }

        ///<inheritdoc cref="BaseService{Organization, OrganizationFilterModel}"/>
        public override PagedResult<Organization> GetPagedFiltered(OrganizationFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return _organizationRepository.GetPaged(filter.PageNumber, filter.PageSize, predicate, GetSort(filter));
        }

        ///<inheritdoc cref="BaseService{Organization, OrganizationFilterModel}"/>
        public override async Task<PagedResult<Organization>> GetPagedFilteredAsync(OrganizationFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            var roles = _roleRepository.Get(r => r.UserRoles.Any(u => u.UserId == filter.UserId)).ToList();

            if (roles.Count == 1 && roles.Any(r => r.Name == Roles.Donor))
            {
                return new PagedResult<Organization>();
            }
            else if (!roles.Any(r => r.Name == Roles.Admin || r.Name == Roles.Superadmin))
            {
                predicate = predicate.And(p => p.UserOrganizations.Any(uo => uo.UserId == filter.UserId));
            }
            
            return await _organizationRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
        }

        ///<inheritdoc cref="BaseService{DonationRequest, DonationRequestFilterModel}"/>
        protected override Expression<Func<Organization, bool>> GetPredicate(OrganizationFilterModel filter)
        {
            var predicate = base.GetPredicate(filter);

            //EF function is the way used to compare string avoiding EF core translation issue with
            //case sensitive comparer mentioned here https://github.com/dotnet/efcore/issues/1222#issuecomment-611113142
            //Also, due to EF core restriction EF functions cannot be extracted to an extension method

            if (!string.IsNullOrEmpty(filter.Name))
            {
                predicate = predicate.And(p =>
                                EF.Functions.ILike(p.Name, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.Name)));
            }

            if (!string.IsNullOrEmpty(filter.Description))
            {
                predicate = predicate.And(p =>
                                EF.Functions.ILike(p.Description, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.Description)));
            }

            if (!string.IsNullOrEmpty(filter.ContactName))
            {
                predicate = predicate.And(p =>
                                    EF.Functions.ILike(p.Contact.FirstName, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.ContactName)) ||
                                    EF.Functions.ILike(p.Contact.LastName, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.ContactName)));
            }

            return predicate;
        }
    }
}