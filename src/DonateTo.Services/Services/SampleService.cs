using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.Infrastructure.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Services.Services
{
    public class SampleService : IBaseService<SampleModel>
    {
        public SampleModel Create(SampleModel entity)
        {
            return entity;
        }

        public Task<SampleModel> CreateAsync(SampleModel entity)
        {
            return Task.FromResult(entity);
        }

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(long id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<SampleModel> Get()
        {
            throw new NotImplementedException();
        }

        public SampleModel Get(long id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SampleModel>> GetAsync()
        {
            Logger.Debug("Testing Logger");
            var listModel = new List<SampleModel>
            {
                new SampleModel() { Id = 1, Name = "Sample 1" },
                new SampleModel() { Id = 2, Name = "Sample 2" }
            };
            var result = listModel.AsEnumerable();

            return Task.FromResult(result);
        }

        public Task<SampleModel> GetAsync(long id)
        {
            throw new NotImplementedException();
        }

        public SampleModel Update(SampleModel entity, long id)
        {
            throw new NotImplementedException();
        }

        public Task<SampleModel> UpdateAsync(SampleModel entity, long id)
        {
            throw new NotImplementedException();
        }
    }
}
