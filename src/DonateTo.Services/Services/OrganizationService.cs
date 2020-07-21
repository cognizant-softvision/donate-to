using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class OrganizationService : BaseService<Organization, OrganizationFilterModel>, IOrganizationService
    {
        private readonly IRepository<Organization> _organizationRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrganizationService(
            IRepository<Organization> organizationRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper) : base(organizationRepository, unitOfWork)
        {
            _organizationRepository = organizationRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IEnumerable<Organization> GetByUserId(long userId)
        {
            return _organizationRepository.Get(o => o.UserOrganizations
            .Any(uo => uo.UserId
            .Equals(userId)));
        }

        public async Task<IEnumerable<Organization>> GetByUserIdAsync(long userId)
        {
            return await _organizationRepository.GetAsync(o => o.UserOrganizations
            .Any(uo => uo.UserId
            .Equals(userId))).ConfigureAwait(false);
        }

        public override PagedResult<Organization> GetPagedFiltered(OrganizationFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return _organizationRepository.GetPaged(filter.PageNumber, filter.PageSize, predicate, GetSort(filter));
        }

        public override async Task<PagedResult<Organization>> GetPagedFilteredAsync(OrganizationFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return await _organizationRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1307:Specify StringComparison", Justification = "<Pending>")]
        protected override Expression<Func<Organization, bool>> GetPredicate(OrganizationFilterModel filter)
        {
            var predicate = base.GetPredicate(filter);

            if (!string.IsNullOrEmpty(filter.Name))
            {
                predicate = predicate.And(p => p.Name.Contains(filter.Name));
            }

            if (!string.IsNullOrEmpty(filter.Description))
            {
                predicate = predicate.And(p => p.Description.Contains(filter.Description));
            }

            if (!string.IsNullOrEmpty(filter.ContactName))
            {
                predicate = predicate.And(p => p.Contact.FirstName.Contains(filter.ContactName)
                                        || p.Contact.LastName.Contains(filter.ContactName));
            }

            return predicate;
        }
    }
}