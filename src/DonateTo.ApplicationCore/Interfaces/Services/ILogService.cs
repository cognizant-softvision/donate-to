using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface ILogService : IGetService<Log, LogFilterModel>
    {
        
    }
}

