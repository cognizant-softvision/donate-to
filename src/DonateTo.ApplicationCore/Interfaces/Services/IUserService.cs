using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService : IBaseService<User>
    {
        Task<PagedResult<User>> GetPagedUsersByOrganizationAsync(long organizationId, int page, int pageSize);
    }
}
