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
    public class DonationService: BaseService<Donation>, IDonationService
    {
        private readonly IMailSender _mailSender;

        public DonationService(
            IMailSender mailSender,
            IRepository<Donation> donationRepository,
            IUnitOfWork unitOfWork) : base(donationRepository, unitOfWork)
        {
            _mailSender = mailSender;
        }

        ///<inheritdoc cref="IDonationService"/>
        public async Task SendNewDonationMailAsync(Donation donation, User user, string client)
        {
            var body = @"<p>Hi {0}!</p>
                            <p>Thanks for your recent Donation.</p>
                            <p>Check it <a href='{1}'>here</a></p>";

            var bodyMessage = new MessageBody()
            {
                HtmlBody = string.Format(CultureInfo.InvariantCulture, body,
                                            user.FullName,
                                            client)
            };

            var to = new List<string>
            {
                user.Email
            };

            var message = new Message(to, "You've made a new donation!", bodyMessage);

            await _mailSender.SendAsync(message).ConfigureAwait(false);
        }
    }
}
