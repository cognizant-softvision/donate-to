using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class UserRepository : EntityFrameworkRepository<User, DonateToDbContext>
    {
        public UserRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        public override User Get(long id)
        {
            return GetHydratedUser().FirstOrDefault(u => u.Id.Equals(id));
        }

        public async override Task<User> GetAsync(long id)
        {
            return await GetHydratedUser().FirstOrDefaultAsync(u => u.Id.Equals(id)).ConfigureAwait(false); ;
        }

        #region private
        private IQueryable<User> GetHydratedUser()
        {
            return DbContext.Set<User>()
                .Include(u => u.UserOrganizations).ThenInclude(uo => uo.Organization);
        }
        #endregion
    }
}
