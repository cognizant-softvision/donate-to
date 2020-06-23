using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.Mailer.Entities;
using DonateTo.Mailer.Interfaces;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class DonationRequestService: BaseService<DonationRequest>, IDonationRequestService
    {
        private readonly IMailSender _mailSender;

        public DonationRequestService(
            IMailSender mailSender,
            IRepository<DonationRequest> donationRequestRepository, 
            IUnitOfWork unitOfWork) : base(donationRequestRepository, unitOfWork)
        {
            _mailSender = mailSender;
        }

        ///<inheritdoc cref="IDonationService"/>
        public async Task SendNewRequestMailToOrganizationUsersAsync(DonationRequest donationRequest, IEnumerable<User> users, string client)
        {
            var messages = new List<Message>();
            var body = @"<p>Hi {0}!</p>
                            <p>A new Donation Request has been added to {1}</p>
                            <p>Check it <a href='{2}'>here</a></p>";

            foreach (var user in users)
            {
                var bodyMessage = new MessageBody()
                {
                    HtmlBody = string.Format(CultureInfo.InvariantCulture, body,
                                             user.FullName,
                                             donationRequest.Organization.Name,
                                             client)
                };
                
                var to = new List<string>();
                to.Add(user.Email);

                messages.Add(new Message(to, "New donation request!", bodyMessage));
            } 

            await _mailSender.SendMultipleAsync(messages).ConfigureAwait(false);
        }
    }
}
