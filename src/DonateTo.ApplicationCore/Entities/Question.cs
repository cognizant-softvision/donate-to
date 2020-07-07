using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class Question : EntityBase
    {
        public string Key { get; set; }
        public string Label { get; set; }
        public bool Required { get; set; }
        public int? Order { get; set; }
        public string ControlType { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public IEnumerable<QuestionOption> Options { get; set; }
    }
}
