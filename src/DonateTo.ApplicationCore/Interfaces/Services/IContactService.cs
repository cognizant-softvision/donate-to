using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Text;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IContactService : IBaseService<Contact, BaseFilterModel>
    {
    }
}
