using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> CreateAsync(User user);

        User Create(User user);

        User Get(int id);

        Task<User> GetAsync(int id);

        Task UpdateAsync(User user);
        
        void Update(User user);
        
        Task DeleteAsync(int id);
        
        void Delete(int id);
        
        IEnumerable<User> Get();

        Task<IEnumerable<User>> GetAsync();
    }
}
