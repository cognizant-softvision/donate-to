using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class OrganizationService : BaseService<Organization>
    {
        public OrganizationService(IRepository<Organization> organizationRepository) : base(organizationRepository)
        { }
    }
}