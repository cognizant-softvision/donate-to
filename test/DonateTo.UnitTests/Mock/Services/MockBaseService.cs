using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using Moq;

namespace DonateTo.UnitTests.Mock.Services
{
    public class MockBaseService<TEntity> : Mock<IBaseService<TEntity, BaseFilterModel>> where TEntity : class
    {
    }
}
