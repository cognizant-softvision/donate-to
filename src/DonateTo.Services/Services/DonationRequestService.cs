using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.Mailer.Entities;
using DonateTo.Mailer.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class DonationRequestService: BaseService<DonationRequest>
    {
        private readonly IBaseService<Organization> _organizationService;
        private readonly IMailSender _mailSender;

        public DonationRequestService(
            IBaseService<Organization> organizationService,
            IMailSender mailSender,
            IRepository<DonationRequest> donationRequestRepository, 
            IUnitOfWork unitOfWork) : base(donationRequestRepository, unitOfWork)
        {
            _organizationService = organizationService;
            _mailSender = mailSender;
        }

        public override async Task<DonationRequest> CreateAsync(DonationRequest request)
        {
            var donationRequest = await base.CreateAsync(request).ConfigureAwait(false);

            if (donationRequest.Id != 0) 
            {
                SendMailToOrganizationUsers(donationRequest.Organization);
            }

            return donationRequest;
        }

        #region private
        private void SendMailToOrganizationUsers(Organization organization)
        {
            var organizationUsers = _organizationService.Get(o => o.Id == organization.Id)
                                .SelectMany(o => o.UserOrganizations
                                    .Select(u => u.User)).ToList();

            var bodyMessage = new MessageBody()
            {
                HtmlBody = $"<p>Hi!</p><p>A new Donation Request has been added to { organization.Name }</p>"
            };

            var message = new Message("New donation request!", bodyMessage, 

            await _mailSender.SendAsync(message);
        }

        #endregion
    }
}
