using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class OrganizationRepository : EntityFrameworkRepository<Organization, DonateToDbContext>
    {
        public OrganizationRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
