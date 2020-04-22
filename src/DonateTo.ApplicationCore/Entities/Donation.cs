﻿using System;

namespace DonateTo.ApplicationCore.Entities
{
    public class Donation : Entity
    {
        public string Observation { get; set; }
        public int DayOfWeek { get; set; }
        public int TimeStart { get; set; }
        public int TimeEnd { get; set; }
        public DonationRequest DonationRequest { get; set; }
        public Address Address { get; set; }
        public Status Status { get; set; }
        public DateTime PickUpDate { get; set; }
    }
}