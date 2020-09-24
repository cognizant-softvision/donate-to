using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.Mailer.Entities;
using DonateTo.Mailer.Interfaces;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;

namespace DonateTo.Services.Services
{
    public class DonationRequestItemService : BaseService<DonationRequestItem, BaseFilterModel>, IDonationRequestItemService
    {
        private readonly IMailSender _mailSender;
        private readonly IDonationRequestItemRepository _donationRequestItemRepository;

        public DonationRequestItemService(
            IMailSender mailSender,
            IDonationRequestItemRepository donationRequestItemRepository,
            IUnitOfWork unitOfWork) : base(donationRequestItemRepository, unitOfWork)
        {
            _mailSender = mailSender;
            _donationRequestItemRepository = donationRequestItemRepository;
        }

        public async Task SoftDelete(long donationRequestItemId)
        {
            await _donationRequestItemRepository.SoftDeleteDonationRequestItem(donationRequestItemId).ConfigureAwait(false);
        }

        public async Task SendDeletedDonationRequestItemMailAsync(DonationRequestItem donationRequestItem, IEnumerable<User> users, string client)
        {
            var messages = new List<Message>();
            var body = @"<p>Hi {0}!</p>
                            <p>A Donation Item has been cancelled.</p>
                            <p>Check it <a href='{1}'>here</a></p>";

            foreach (var user in users)
            {
                var bodyMessage = new MessageBody()
                {
                    HtmlBody = string.Format(CultureInfo.InvariantCulture, body,
                                             user.FullName,
                                             donationRequestItem.Name,
                                             client)
                };

                var to = new List<string>();
                to.Add(user.Email);

                messages.Add(new Message(to, "Cancelled donation request!", bodyMessage));
            }

            await _mailSender.SendMultipleAsync(messages).ConfigureAwait(false);
        }
    }
}
