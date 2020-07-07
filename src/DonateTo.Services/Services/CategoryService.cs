using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.Services
{
    public class UnitService : BaseService<Unit, BaseFilterModel>
    {
        public UnitService(
            IRepository<Unit> unitRepository,
            IUnitOfWork unitOfWork) : base(unitRepository, unitOfWork) 
        {
        }
    }
}