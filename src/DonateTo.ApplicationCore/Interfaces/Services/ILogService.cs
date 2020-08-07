﻿using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface ILogService : IGetPagedFilteredService<Log, LogFilterModel>
    {
        
    }
}

