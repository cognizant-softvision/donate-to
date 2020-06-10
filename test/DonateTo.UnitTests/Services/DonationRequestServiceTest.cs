using AutoBogus;
using DonateTo.ApplicationCore.Entities;
using DonateTo.Services;
using DonateTo.UnitTests.Mock.Repositories;
using Xunit;

namespace DonateTo.UnitTests.Services
{
    public class DonationRequestServiceTest
    {
        /// <summary>
        /// Get Donation Test
        /// </summary>
        [Fact]
        public void GivenDonationService_WhenGetMethodIsCalled_ThenShouldGetDonation()
        {
            // Arrange
            long requestId = 1;
            var result = new DonationRequest() { Id = requestId };
            var repository = new MockBaseRepository<DonationRequest>().MockGet(result);
            var unitOfWork = new MockUnitOfWork().MockSaveAsync(0);
            var service = new DonationRequestService(repository.Object, unitOfWork.Object);

            // Act
            var donationRequest = service.GetAsync(requestId);

            // Assert
            Assert.NotNull(donationRequest);
        }
    }
}
