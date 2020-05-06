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
    public class DonationService: BaseService<Donation>
    {
        public DonationService(IRepository<Donation> donationRepository):base(donationRepository)
        {
        }
    }
}
