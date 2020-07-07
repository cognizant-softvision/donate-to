using AutoBogus;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public DonationRequestServiceTest(IMapper mapper)
        {
            _mailServerSettings = new MailServerSettings();
            _mapper = mapper;
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
            var organizationRepository = new MockBaseRepository<Organization>();
            var requestRepository = new MockBaseRepository<DonationRequest>().MockGet(result);
            var unitOfWork = new MockUnitOfWork().MockSaveAsync(0);
            var organizationService = new OrganizationService(organizationRepository.Object, unitOfWork.Object, _mapper);
            var requestService = new DonationRequestService(new MailSender(_mailServerSettings), organizationService, requestRepository.Object, unitOfWork.Object);

            // Act
            var donationRequest = requestService.GetAsync(requestId);

            // Assert
            Assert.NotNull(donationRequest);
        }
    }
}
