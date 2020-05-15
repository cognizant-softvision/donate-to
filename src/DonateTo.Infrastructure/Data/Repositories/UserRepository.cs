using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class UserRepository : EntityFrameworkRepository<User, DonateToDbContext>
    {
        private readonly DonateToDbContext _dbContext;

        public UserRepository(DonateToDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        private IQueryable<User> GetUsers()
        {
            return _dbContext.Set<User>().Include( u => u.FirstName).Include( u => u.LastName).Include( u => u.IdentityNumber)
                .Include( u => u.IsEnabled).Include( u => u.CreatedBy).Include( u => u.CreatedDate).Include( u => u.UpdateBy)
                .Include( u => u.UpdateDate);
        }

        private IQueryable<User> SearchUserQuery(string queryString)
        {
            var likeString = $"%{queryString}%";
            return GetUsers().Where(user =>
               EF.Functions.ILike(user.FirstName, likeString) ||
               EF.Functions.ILike(user.LastName, likeString));
        }

        //private IQueryable<User> AddOrganizationQuery(long userId, long identityNumber)
        //{
        //    var user = GetUsers().First(u => u.Id == userId);
        //    user.IdentityNumber = identityNumber;

        //}

        /// <summary>
        ///    Searches a user asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <returns>Task of List Users of matching criteria.</returns>
        public async Task<List<User>> SearchUserAsync(string queryString)
        {
            return await SearchUserQuery(queryString).ToListAsync().ConfigureAwait(false);
        }

        /// <summary>
        ///    Associate Organization to user asynchronously.
        /// </summary>
        /// <param name="queryString"> String to search <param>
        /// <returns>Task of List Users of matching criteria.</returns>
        //public async Task<List<User>> AssociateOrganizationAsync(long organizationId)
        //{
        //    return await AddOrganizationQuery(queryString).ToListAsync().ConfigureAwait(false);
        //}
    }
}
