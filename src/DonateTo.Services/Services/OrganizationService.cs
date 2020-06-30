using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Services.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class OrganizationService : BaseService<Organization>, IOrganizationService
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

        public async Task<PagedResult<OrganizationModel>> GetPagedAsync(int pageNumber, int pageSize, IEnumerable<FilterModel> filters, SortModel sort) 
        {
            return (await _organizationRepository.GetPagedAsync(pageNumber, pageSize, filters, sort).ConfigureAwait(false)).Map<Organization, OrganizationModel>(_mapper);
        }
    }
}