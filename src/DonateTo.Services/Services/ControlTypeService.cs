using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.Services.Services
{
    public class ControlTypeService : BaseService<ControlType, BaseFilterModel>
    {
        public ControlTypeService(
            IRepository<ControlType> controlTypeRepository,
            IUnitOfWork unitOfWork) : base(controlTypeRepository, unitOfWork)
        {
        }
    }
}
