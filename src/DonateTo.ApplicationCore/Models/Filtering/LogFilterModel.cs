namespace DonateTo.ApplicationCore.Models.Filtering
{
    public class LogFilterModel : BaseFilterModel
    {
        public string Message { get; set; }
        public string LogEvent { get; set; }
        public string TimeStampBegin { get; set; }
        public string TimeStampEnd { get; set; }

    }
}

