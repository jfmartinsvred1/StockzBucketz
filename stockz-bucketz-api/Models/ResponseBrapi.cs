using stockz_bucketz_api.Services;

namespace stockz_bucketz_api.Models
{
    public class ResponseBrapi
    {
        public List<IndexesBrapi> Indexes { get; set; }
        public List<StockBrapi> Stocks { get; set; }
    }
}
