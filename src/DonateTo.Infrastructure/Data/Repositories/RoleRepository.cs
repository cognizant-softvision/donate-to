using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class RoleRepository : EntityFrameworkRepository<Role, DonateToDbContext>
    {
        public RoleRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
