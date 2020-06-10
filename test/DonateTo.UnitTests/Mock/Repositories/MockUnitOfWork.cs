using DonateTo.ApplicationCore.Interfaces;
using Moq;
using System.Threading.Tasks;

namespace DonateTo.UnitTests.Mock.Repositories
{
    public class MockUnitOfWork : Mock<IUnitOfWork>
    {
        public MockUnitOfWork MockSaveNoRows()
        {
            Setup(x => x.Save()).Returns(0);
            return this;
        }

        public MockUnitOfWork MockSaveNoRowsAsync()
        {
            Setup(x => x.SaveAsync()).Returns(Task.FromResult(0));
            return this;
        }

        public MockUnitOfWork MockSaveOneRow()
        {
            Setup(x => x.Save()).Returns(1);
            return this;
        }

        public MockUnitOfWork MockSaveOneRowAsync()
        {
            Setup(x => x.SaveAsync()).Returns(Task.FromResult(1));
            return this;
        }

        public MockUnitOfWork MockSaveMultipleRows()
        {
            Setup(x => x.Save()).Returns(10);
            return this;
        }

        public MockUnitOfWork MockSaveMultipleRowsAsync()
        {
            Setup(x => x.SaveAsync()).Returns(Task.FromResult(10));
            return this;
        }
    }
}
