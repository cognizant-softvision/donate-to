using DonateTo.ApplicationCore.Interfaces;
using Moq;
using System.Threading.Tasks;

namespace DonateTo.UnitTests.Mock.Repositories
{
    public class MockUnitOfWork : Mock<IUnitOfWork>
    {
        public MockUnitOfWork MockSave(int result)
        {
            Setup(x => x.Save()).Returns(result);
            return this;
        }

        public MockUnitOfWork MockSaveAsync(int result)
        {
            Setup(x => x.SaveAsync()).Returns(Task.FromResult(result));
            return this;
        }
    }
}
