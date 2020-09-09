using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class QuestionAnswer
    {
        public int IdQuestion { get; set; }
        public IEnumerable<string> Value { get; set; }

    }
}