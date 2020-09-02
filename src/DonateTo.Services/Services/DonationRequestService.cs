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
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services 
{
    public class DonationRequestService: BaseService<DonationRequest, DonationRequestFilterModel>, IDonationRequestService
    {
        private readonly IMailSender _mailSender;
        private readonly IDonationRequestRepository _donationRequestRepository;
        private readonly IRepository<UserOrganization> _userOrganizationRepository;
        private readonly IOrganizationService _organizationService;
        private readonly IUnitOfWork _unitOfWork;

        public DonationRequestService(
            IMailSender mailSender,
            IOrganizationService organizationService,
            IDonationRequestRepository donationRequestRepository,
            IRepository<UserOrganization> userOrganizationRepository,
            IUnitOfWork unitOfWork) : base(donationRequestRepository, unitOfWork)
        {
            _mailSender = mailSender;
            _donationRequestRepository = donationRequestRepository;
            _userOrganizationRepository = userOrganizationRepository;
            _organizationService = organizationService;
            _unitOfWork = unitOfWork;
        }

        public async Task<PagedResult<DonationRequest>> GetPagedFilteredByOrganizationAsync(DonationRequestFilterModel filter, long userId)
        {
            // Get the organizations I am assocciated to
            var associatedOrganizations = await _userOrganizationRepository.GetAsync(x => x.UserId == userId).ConfigureAwait(false);

            // Get the donation requests
            if(associatedOrganizations != null)
            {
                var predicateWithOrganizationIds = GetPredicateWithOrganizationIds(filter, associatedOrganizations.ToList());
                return await _donationRequestRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicateWithOrganizationIds, GetSort(filter)).ConfigureAwait(false);
            }

            var predicate = GetPredicate(filter);

            return await _donationRequestRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
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

        ///<inheritdoc cref="IDonationService"/>
        public async Task SendDeleteRequestMailToOrganizationUsersAsync(DonationRequest donationRequest, IEnumerable<UserModel> users, string client)
        {
            if (donationRequest.Organization == null)
            {
                donationRequest.Organization = _organizationService.Get(donationRequest.OrganizationId);
            }

            var messages = new List<Message>();
            var body = @"<p>Hi {0}!</p>
                            <p>A new Donation Request has been cancelled to {1}</p>
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

                messages.Add(new Message(to, "Cancelled donation request!", bodyMessage));
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

            if (!string.IsNullOrEmpty(filter.OrganizationName))
            {
                predicate = predicate.And(p =>
                                EF.Functions.ILike(p.Organization.Name, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.OrganizationName)));
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
                    predicate = predicate.And(p => p.CreatedDate < outDate.AddDays(1));
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
                    predicate = predicate.And(p => p.FinishDate < outDate.AddDays(1));
                }
            }

            return predicate;
        }

        protected Expression<Func<DonationRequest, bool>> GetPredicateWithOrganizationIds(DonationRequestFilterModel filter, List<UserOrganization> associatedOrganizations)
        {
            var predicate = GetPredicate(filter);

            if (associatedOrganizations != null)
            {
                foreach (var id in associatedOrganizations)
                {
                    predicate = predicate.And(p => p.OrganizationId == id.OrganizationId);
                }
                
            }

            return predicate;
        }

        public async Task SoftDelete(long donationRequestId)
        {
            await _donationRequestRepository.SoftDeleteDonationRequest(donationRequestId).ConfigureAwait(false);
        }
    }
}
