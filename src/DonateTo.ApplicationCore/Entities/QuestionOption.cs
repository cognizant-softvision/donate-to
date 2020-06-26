namespace DonateTo.ApplicationCore.Entities
{
    public class QuestionOption : EntityBase
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public long QuestionId { get; set; }
    }
}
