using AutoBogus;
using DonateTo.ApplicationCore.Entities;
using DonateTo.Mailer;
using DonateTo.Mailer.Entities;
using DonateTo.Services;
using DonateTo.UnitTests.Mock.Repositories;
using Xunit;

namespace DonateTo.UnitTests.Services
{
    public class DonationRequestServiceTest
    {
        private readonly MailServerSettings _mailServerSettings;

        public DonationRequestServiceTest()
        {
            _mailServerSettings = new MailServerSettings();
        }

        /// <summary>
        /// Get Donation Test
        /// </summary>
        [Fact]
        public void GivenDonationService_WhenGetMethodIsCalled_ThenShouldGetDonation()
        {
            // Arrange
            long requestId = 1;
            var result = new DonationRequest() { Id = requestId };
            var userRepository = new MockBaseRepository<User>();
            var requestRepository = new MockBaseRepository<DonationRequest>().MockGet(result);
            var unitOfWork = new MockUnitOfWork().MockSaveAsync(0);
            var userService = new UserService(userRepository.Object, unitOfWork.Object);
            var requestService = new DonationRequestService(userService, new MailSender(_mailServerSettings), requestRepository.Object, unitOfWork.Object);

            // Act
            var donationRequest = requestService.GetAsync(requestId);

            // Assert
            Assert.NotNull(donationRequest);
        }
    }
}
