using AutoBogus;
using DonateTo.ApplicationCore.Entities;
using DonateTo.Services;
using DonateTo.UnitTests.Mock.Repositories;
using Xunit;

namespace DonateTo.UnitTests.Services
{
    public class DonationRequestServiceTest
    {
        [Fact]
        public void GivenDonationService_WhenGet_ThenShouldGetDonation()
        {
            // Arrange
            var result = new AutoFaker<DonationRequest>().Generate();
            var repository = new MockBaseRepository<DonationRequest>().MockGet(result);
            var unitOfWork = new MockUnitOfWork().MockSaveOneRowAsync();
            var service = new DonationRequestService(repository.Object, unitOfWork.Object);

            // Act
            var requested = service.GetAsync(1);

            // Assert
            Assert.NotNull(requested);
        }
    }
}
