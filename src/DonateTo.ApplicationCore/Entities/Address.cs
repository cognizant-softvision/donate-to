namespace DonateTo.ApplicationCore.Entities
{
    public class Address : Entity
    {
        public string Street { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Appartment { get; set; }
        public string Email { get; set; }
        public string AdditionalInformation { get; set; }
        public string ResponsableInformation { get; set; }
        public string ResponsableIdentityNumber { get; set; }
        public bool IsDefault { get; set; }
    }
}
