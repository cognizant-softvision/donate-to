using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.Services.Services
{
    public class ContactService : BaseService<Contact, BaseFilterModel>, IContactService
    {
        public ContactService(
            IRepository<Contact> contactRepository,
            IUnitOfWork unitOfWork) : base(contactRepository, unitOfWork)
        {
        }
    }
}
