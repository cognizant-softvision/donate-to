using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class StatusService : BaseService<Status>
    {
        private readonly IRepository<Status> _statusRepository;

        public StatusService(IRepository<Status> statusRepository) : base(statusRepository)
        {
            _statusRepository = statusRepository;
        }
    }
}