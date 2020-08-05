using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class QuestionResult
    {
        public int DonationRequestId { get; set; }
        public IEnumerable<QuestionAnswer> QuestionAnswers { get; set; }
    }
}