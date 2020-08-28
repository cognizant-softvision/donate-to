using DonateTo.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequest : EntityBase, IIsDeleted
    {
        public string Title { get; set; }
        public string Observation { get; set; }
        public int Priority { get; set; }
        public long OrganizationId { get; set; }
        public Organization Organization { get; set; }
        public long AddressId { get; set; }
        public Address Address { get; set; }
        public long StatusId { get; set; }
        public Status Status { get; set; }
        public long OwnerId { get; set; }
        public User Owner { get; set; }
        public DateTime? FinishDate { get; set; }
        public IEnumerable<DonationRequestItem> DonationRequestItems { get; set; }
        public IEnumerable<Donation> Donations { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public IEnumerable<DonationRequestCategory> DonationRequestCategories { get; set; }
    }
}
