using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> SaveAsync();

        int Save();
    }
}
