using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class UserOrganizationRepository : EntityFrameworkRepository<UserOrganization, DonateToDbContext>
    {
        public UserOrganizationRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
