using DonateTo.ApplicationCore.Entities;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Repositories
{
    public interface IOrganizationRepository: IRepository<Organization>
    {
        Task SoftDeleteOrganization(Organization organization);
        Task SoftDeleteAddress(Address address);
    }
}
