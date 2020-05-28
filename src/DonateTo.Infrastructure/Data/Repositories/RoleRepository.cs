using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class RoleRepository : EntityFrameworkRepository<Role, DonateToDbContext>
    {
        public RoleRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        private IQueryable<Role> GetRoles()
        {
            return DbContext.Set<Role>().Include(r => r.Description).Include(r => r.CreatedBy).Include(r => r.CreatedDate)
                .Include(r => r.UpdateBy).Include(r => r.UpdateDate).Include(r => r.Name).Include(r => r.NormalizedName);
        }

        public async Task<Role> GetRole(string role)
        {
            return await GetRoles().FirstOrDefaultAsync(r => r.Name.ToLower().Equals(role.ToLower())).ConfigureAwait(false);
        }
    }
}
