using System.Collections.Generic;

namespace DonateTo.Infrastructure.Data.Pagination
{
    public class PagedResult<T> : PagedResultBase where T : class
    {
        private IList<T> results;

        public IList<T> GetResults()
        {
            return results;
        }

        public void SetResults(IList<T> value)
        {
            results = value;
        }

        public PagedResult()
        {
            SetResults(new List<T>());
        }
    }
}
