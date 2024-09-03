using System.ComponentModel.DataAnnotations;

namespace stockz_bucketz_api.Models
{
    public class StockBrapi
    {
        [Key]
        public string Stock { get; set; }
        public string? Name { get; set; }
        public double Close { get; set; }
        public double? Change { get; set; }
        public double? Volume { get; set; }
        public long? Market_Cap { get; set; }
        public string? Logo { get; set; }
        public string? Sector { get; set; }
        public string? Type { get; set; }
    }
}
