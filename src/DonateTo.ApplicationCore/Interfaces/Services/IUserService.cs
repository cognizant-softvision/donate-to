using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> CreateAsync(User todoItem);

        User Create(User todoItem);

        User Get(int id);

        Task<User> GetAsync(int id);

        Task UpdateAsync(User todoItem);
        
        void Update(User todoItem);
        
        Task DeleteAsync(int id);
        
        void Delete(int id);
        
        IEnumerable<User> Get();

        Task<IEnumerable<User>> GetAsync();
    }
}
