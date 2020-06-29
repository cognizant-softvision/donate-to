using DonateTo.ApplicationCore.Interfaces.Services;
using Moq;

namespace DonateTo.UnitTests.Mock.Services
{
    public class MockBaseService<TEntity> : Mock<IBaseService<TEntity>> where TEntity : class
    {
    }
}
