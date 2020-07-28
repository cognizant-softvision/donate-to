using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Mailer.Entities;
using DonateTo.Mailer.Interfaces;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services 
{
    public class DonationRequestService: BaseService<DonationRequest, DonationRequestFilterModel>, IDonationRequestService
    {
        private readonly IMailSender _mailSender;
        private readonly IRepository<DonationRequest> _donationRequestRepository;
        private readonly IOrganizationService _organizationService;

        public DonationRequestService(
            IMailSender mailSender,
            IOrganizationService organizationService,
            IRepository<DonationRequest> donationRequestRepository, 
            IUnitOfWork unitOfWork) : base(donationRequestRepository, unitOfWork)
        {
            _mailSender = mailSender;
            _donationRequestRepository = donationRequestRepository;
            _organizationService = organizationService;
        }

        ///<inheritdoc cref="IDonationService"/>
        public async Task SendNewRequestMailToOrganizationUsersAsync(DonationRequest donationRequest, IEnumerable<UserModel> users, string client)
        {
            if (donationRequest.Organization == null) 
            {
                donationRequest.Organization = _organizationService.Get(donationRequest.OrganizationId);
            }

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

        ///<inheritdoc cref="BaseService{DonationRequest, DonationRequestFilterModel}"/>
        public override PagedResult<DonationRequest> GetPagedFiltered(DonationRequestFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return _donationRequestRepository.GetPaged(filter.PageNumber, filter.PageSize, predicate, GetSort(filter));
        }

        ///<inheritdoc cref="BaseService{DonationRequest, DonationRequestFilterModel}"/>
        public override async Task<PagedResult<DonationRequest>> GetPagedFilteredAsync(DonationRequestFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return await _donationRequestRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
        }

        ///<inheritdoc cref="BaseService{DonationRequest, DonationRequestFilterModel}"/>
        protected override Expression<Func<DonationRequest, bool>> GetPredicate(DonationRequestFilterModel filter)
        {
            var predicate = base.GetPredicate(filter);

            //EF function is the way used to compare string avoiding EF core translation issue with
            //case sensitive comparer mentioned here https://github.com/dotnet/efcore/issues/1222#issuecomment-611113142
            //Also, due to EF core restriction EF functions cannot be extracted to an extension method
            if (!string.IsNullOrEmpty(filter.Title))
            {
                predicate = predicate.And(p =>
                                EF.Functions.ILike(p.Title, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.Title)));
            }

            if (!string.IsNullOrEmpty(filter.Observation))
            {
                predicate = predicate.And(p =>
                                EF.Functions.ILike(p.Observation, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.Observation)));
            }

            if (!string.IsNullOrEmpty(filter.CreatedDateBegin))
            {
                if (DateTime.TryParse(filter.CreatedDateBegin, out var outDate))
                {
                    predicate = predicate.And(p => p.CreatedDate >= outDate);
                }
            }

            if (!string.IsNullOrEmpty(filter.CreatedDateEnd))
            {
                if (DateTime.TryParse(filter.CreatedDateEnd, out var outDate))
                {
                    predicate = predicate.And(p => p.CreatedDate <= outDate);
                }
            }

            if (!string.IsNullOrEmpty(filter.FinishDateBegin))
            {
                if (DateTime.TryParse(filter.FinishDateBegin, out var outDate))
                {
                    predicate = predicate.And(p => p.FinishDate >= outDate);
                }
            }

            if (!string.IsNullOrEmpty(filter.FinishDateEnd))
            {
                if (DateTime.TryParse(filter.FinishDateEnd, out var outDate))
                {
                    predicate = predicate.And(p => p.FinishDate <= outDate);
                }
            }

            return predicate;
        }
    }
}
