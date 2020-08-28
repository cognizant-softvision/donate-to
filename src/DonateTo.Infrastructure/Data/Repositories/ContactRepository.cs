using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class ContactRepository : EntityFrameworkRepository<Contact, DonateToDbContext>
    {
        public ContactRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
