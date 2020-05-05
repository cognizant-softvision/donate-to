using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.Infrastructure.Data.Repositories;
using DonateTo.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;

namespace DonateTo.Services
{
    public class DonationRequestService: BaseService<DonationRequest>
    {
        private readonly IRepository<DonationRequest> _donationRequestRepository;
        public DonationRequestService(IRepository<DonationRequest> donationRequestRepository): base(donationRequestRepository)
        {
            this._donationRequestRepository = donationRequestRepository;
        }        

    }
}
