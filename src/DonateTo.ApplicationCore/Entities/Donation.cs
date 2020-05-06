﻿using System;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class Donation : EntityBase
    {
        public string Observation { get; set; }
        public int DayOfWeek { get; set; }
        public int TimeStart { get; set; }
        public int TimeEnd { get; set; }
        public long DonationRequestId { get; set; }
        public DonationRequest DonationRequest { get; set; }
        public long AddressId { get; set; }
        public Address Address { get; set; }        
        public long StatusId { get; set; }
        public Status Status { get; set; }
        public DateTime PickUpDate { get; set; }
        public IEnumerable<DonationItem> DonationItems { get; set; }
    }
}