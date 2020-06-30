using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
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

        public override IQueryable<User> Get(Expression<Func<User, bool>> filter)
        {
            return GetHydratedUser().Where(filter);
        }

        public override async Task<IQueryable<User>> GetAsync(Expression<Func<User, bool>> filter)
        {
            var users = GetHydratedUser();

            if (filter != null)
            {
                users = users.Where(filter);
            }

            return (await users.ToListAsync().ConfigureAwait(false)).AsQueryable();
        }

        #region private
        private IQueryable<User> GetHydratedUser()
        {
            return DbContext.Set<User>()
                .Include(u => u.UserOrganizations).ThenInclude(uo => uo.Organization)
                .Include(u => u.UserRoles).ThenInclude(ur => ur.Role);
        }
        #endregion
    }
}
