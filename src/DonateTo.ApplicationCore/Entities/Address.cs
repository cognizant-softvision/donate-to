namespace DonateTo.ApplicationCore.Entities
{
    public class Address : EntityBase
    {
        public string Street { get; set; }
        public string PostalCode { get; set; }
        public string Floor { get; set; }
        public string Appartment { get; set; }
        public string AdditionalInformation { get; set; }
        public bool IsDefault { get; set; }
        public long CountryId { get; set; }
        public long StateId { get; set; }
        public long CityId { get; set; }
        public long ContactId { get; set; }
        public long? OrganizationId { get; set; }
        public City City { get; set; }
        public State State { get; set; }
        public Country Country { get; set; }
        public Contact Contact { get; set; }
    }
}
