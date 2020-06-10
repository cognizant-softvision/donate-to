using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class DonationService: BaseService<Donation>, IDonationService
    {
        private readonly IRepository<Donation> _donationRepository;
        private readonly IDonationItemRepository _donationItemRepository;
        private readonly IRepository<Address> _addressRepository;
        private readonly IRepository<Contact> _contactRepository;
        private readonly IUnitOfWork _unitOfWork;

        public DonationService(
            IRepository<Donation> donationRepository,
            IDonationItemRepository donationItemRepository,
            IRepository<Address> addressRepository,
            IRepository<Contact> contactRepository,
            IUnitOfWork unitOfWork) : base(donationRepository, unitOfWork)
        {
            _donationRepository = donationRepository;
            _donationItemRepository = donationItemRepository;
            _addressRepository = addressRepository;
            _contactRepository = contactRepository;
            _unitOfWork = unitOfWork;
        }

        ///<inheritdoc cref="IDonationService"/>
        public async Task<Donation> CreateHydratedAsync(Donation donation)
        {
            donation.Address.Contact = await _contactRepository.AddAsync(donation.Address.Contact).ConfigureAwait(false);
            donation.Address = await _addressRepository.AddAsync(donation.Address).ConfigureAwait(false);
            donation.DonationItems = await _donationItemRepository.AddAllAsync(donation.DonationItems).ConfigureAwait(false);
            donation = await _donationRepository.AddAsync(donation).ConfigureAwait(false);

            await _unitOfWork.SaveAsync().ConfigureAwait(false);
            return donation;
        }
    }
}
