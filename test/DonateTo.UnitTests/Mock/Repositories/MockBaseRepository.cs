using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Pagination;
using Moq;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.UnitTests.Mock.Repositories
{
    public class MockBaseRepository<TEntity> : Mock<IRepository<TEntity>> where TEntity : class
    {

        public MockBaseRepository<TEntity> MockGet(TEntity result)
        {
            Setup(x => x.Get(It.IsAny<int>()))
                .Returns(result);

            return this;
        }

        public MockBaseRepository<TEntity> MockGet(IQueryable<TEntity> result)
        {
            Setup(x => x.Get(It.IsAny<Expression<Func<TEntity, bool>>>()))
                .Returns(result);

            return this;
        }

        public MockBaseRepository<TEntity> MockGetAsync(Task<TEntity> result)
        {
            Setup(x => x.GetAsync(It.IsAny<int>()))
                .Returns(result);

            return this;
        }

        public MockBaseRepository<TEntity> MockGetAsync(Task<IQueryable<TEntity>> result)
        {
            Setup(x => x.GetAsync(It.IsAny<Expression<Func<TEntity, bool>>>()))
                .Returns(result);

            return this;
        }

        public MockBaseRepository<TEntity> MockFirstOrDefault(TEntity result)
        {
            Setup(x => x.FirstOrDefault(It.IsAny<Expression<Func<TEntity, bool>>>()))
                .Returns(result);

            return this;
        }

        public MockBaseRepository<TEntity> MockFirstOrDefaultAsync(Task<TEntity> result)
        {
            Setup(x => x.FirstOrDefaultAsync(It.IsAny<Expression<Func<TEntity, bool>>>()))
                .Returns(result);

            return this;
        }
        
        public MockBaseRepository<TEntity> MockGetPaged(PagedResult<TEntity> result)
        {
            Setup(x => x.GetPaged(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<Expression<Func<TEntity, bool>>>(), ""))
                .Returns(result);

            return this;
        }

        public MockBaseRepository<TEntity> MockGetPagedAsync(Task<PagedResult<TEntity>> result)
        {
            Setup(x => x.GetPagedAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<Expression<Func<TEntity, bool>>>(), ""))
                .Returns(result);

            return this;
        }

        public MockBaseRepository<TEntity> MockAdd(TEntity result)
        {
            Setup(x => x.Add(It.IsAny<TEntity>())).Returns(result);
            return this;
        }

        public MockBaseRepository<TEntity> MockAddAsync(Task<TEntity> result)
        {
            Setup(x => x.AddAsync(It.IsAny<TEntity>())).Returns(result);
            return this;
        }

        public MockBaseRepository<TEntity> MockUpdate(TEntity result)
        {
            Setup(x => x.Update(It.IsAny<TEntity>())).Returns(result);
            return this;
        }

        public MockBaseRepository<TEntity> MockUpdateAsync(Task<TEntity> result)
        {
            Setup(x => x.UpdateAsync(It.IsAny<TEntity>())).Returns(result);
            return this;
        }

        public MockBaseRepository<TEntity> MockDelete()
        {
            Setup(x => x.Delete(It.IsAny<int>()));
            return this;
        }

        public MockBaseRepository<TEntity> MockDeleteAsync()
        {
            Setup(x => x.DeleteAsync(It.IsAny<int>()));
            return this;
        }
    }
}
