using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Mailer.Entities;
using DonateTo.Mailer.Interfaces;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class DonationService: BaseService<Donation, DonationFilterModel>, IDonationService
    {
        private readonly IMailSender _mailSender;
        private readonly IDonationRepository _donationRepository;

        public DonationService(
            IMailSender mailSender,
            IDonationRepository donationRepository,
            IDonationRequestRepository donationRequestRepository,
            IUnitOfWork unitOfWork) : base(donationRepository, unitOfWork)
        {
            _mailSender = mailSender;
            _donationRepository = donationRepository;
        }

        ///<inheritdoc cref="IDonationService"/>
        public async Task SendNewDonationMailAsync(Donation donation, UserModel user, string client)
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
        
        ///<inheritdoc cref="IDonationService"/>
        public async Task SendDonationStatusChangeMailAsync(Donation donation, UserModel user, string client)
        {
            var body = @"<p>Hi {0}!</p>
                            <p>Your donation status has changed to: {1}.</p>
                            <p>Check it <a href='{2}'>here</a></p>";

            var bodyMessage = new MessageBody()
            {
                HtmlBody = string.Format(CultureInfo.InvariantCulture, body,
                                            user.FullName,
                                            donation.Status.Name,
                                            client)
            };

            var to = new List<string>
            {
                user.Email
            };

            var message = new Message(to, "Donation status changed!", bodyMessage);

            await _mailSender.SendAsync(message).ConfigureAwait(false);
        }

        public async Task SendDeletedDonationMailAsync(UserModel user, string client)
        {
            var body = @"<p>Hi {0}!</p>
                            <p>A Donation has been cancelled.</p>
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

            var message = new Message(to, "Cancelled donation!", bodyMessage);

            await _mailSender.SendAsync(message).ConfigureAwait(false);
        }

        ///<inheritdoc cref="BaseService{Donation, DonationFilterModel}"/>
        public override PagedResult<Donation> GetPagedFiltered(DonationFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return _donationRepository.GetPaged(filter.PageNumber, filter.PageSize, predicate, GetSort(filter));
        }

        ///<inheritdoc cref="BaseService{Donation, DonationFilterModel}"/>
        public override async Task<PagedResult<Donation>> GetPagedFilteredAsync(DonationFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return await _donationRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
        }

        ///<inheritdoc cref="BaseService{Donation, DonationFilterModel}"/>
        protected override Expression<Func<Donation, bool>> GetPredicate(DonationFilterModel filter)
        {
            var predicate = base.GetPredicate(filter);

            //EF function is the way used to compare string avoiding EF core translation issue with
            //case sensitive comparer mentioned here https://github.com/dotnet/efcore/issues/1222#issuecomment-611113142
            //Also, due to EF core restriction EF functions cannot be extracted to an extension method
            if (!string.IsNullOrEmpty(filter.ItemName))
            {
                predicate = predicate.And(p => p.DonationItems.Any(item =>
                    EF.Functions.ILike(item.DonationRequestItem.Name, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.ItemName))));
            }

            if (!string.IsNullOrEmpty(filter.DonationRequestId))
            {
                if (int.TryParse(filter.DonationRequestId, out var outDonationRequestId))
                {
                    predicate = predicate.And(p => p.DonationRequestId == outDonationRequestId);
                }
            }

            return predicate;
        }

        public async Task SoftDelete(Donation donation)
        {
            await _donationRepository.SoftDeleteDonation(donation).ConfigureAwait(false);
        }

        public IEnumerable<User> GetDonorsByDonationRequestItemId(long donationRequestItemId)
        {
            return _donationRepository.GetDonors(donationRequestItemId);
        }


    }
}
