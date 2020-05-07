using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService (
            IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public User Create(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> CreateAsync(User user)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public User FirstOrDefault(Expression<Func<User, bool>> filter)
        {
            return _userRepository.FirstOrDefault(filter);
        }

        public User Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> Get(Expression<Func<User, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAsync(Expression<Func<User, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public void Update(User user)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(User user)
        {
            throw new NotImplementedException();
        }
    }
}
