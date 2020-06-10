using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class UnitService : BaseService<Unit>
    {
        public UnitService(
            IRepository<Unit> unitRepository,
            IUnitOfWork unitOfWork) : base(unitRepository, unitOfWork) 
        {
        }
    }
}