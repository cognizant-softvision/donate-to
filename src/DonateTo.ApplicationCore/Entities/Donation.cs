using DonateTo.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class Donation : EntityBase, IIsDeleted
    {
        public string Observation { get; set; }
        public long DonationRequestId { get; set; }
        public DonationRequest DonationRequest { get; set; }
        public long AddressId { get; set; }
        public Address Address { get; set; }
        public long StatusId { get; set; }
        public Status Status { get; set; }
        public long OwnerId { get; set; }
        public User Owner { get; set; }
        public DateTime PickUpDate { get; set; }
        public IEnumerable<DonationItem> DonationItems { get; set; }
        public IEnumerable<Availability> Availabilities { get; set; }
        public bool IsDeleted { get; set; }
    }
}