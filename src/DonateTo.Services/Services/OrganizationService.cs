using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class OrganizationService : BaseService<Organization>
    {
        private readonly IRepository<Organization> _organizationRepository;

        public OrganizationService(IRepository<Organization> organizationRepository) : base(organizationRepository)
        {
            _organizationRepository = organizationRepository;
        }
    }
}