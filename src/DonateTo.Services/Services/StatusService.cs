using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.Services
{
    public class StatusService : BaseService<Status, BaseFilterModel>
    {
        public StatusService(
            IRepository<Status> statusRepository,
            IUnitOfWork unitOfWork) : base(statusRepository, unitOfWork)
        {
        }
    }
}