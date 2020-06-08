using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class StatusService : BaseService<Status>
    {
        public StatusService(
            IRepository<Status> statusRepository,
            IUnitOfWork unitOfWork) : base(statusRepository, unitOfWork)
        {
        }
    }
}