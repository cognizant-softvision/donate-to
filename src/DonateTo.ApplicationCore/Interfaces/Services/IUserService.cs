using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService : IBaseService<User>
    {
        /// <summary>
        /// Gets a list of user in a specific organization by page and page size async.
        /// </summary>
        /// <param name="organizationId">Id of the looking organization</param>
        /// <param name="page">Number of the page to be obtained.</param>
        /// <param name="pageSize">Max number of rows in a specific page</param>
        /// <returns></returns>
        Task<PagedResult<User>> GetPagedUsersByOrganizationAsync(long organizationId, int page, int pageSize);
    }
}
