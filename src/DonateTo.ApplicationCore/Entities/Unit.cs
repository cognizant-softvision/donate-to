namespace DonateTo.ApplicationCore.Entities
{
    public class Unit : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public long UnitTypeId { get; set; }
        public UnitType UnitType { get; set; }
    }
}
