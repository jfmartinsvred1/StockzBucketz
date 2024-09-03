using System.ComponentModel.DataAnnotations;

namespace stockz_bucketz_api.Models
{
    public class Transaction
    {
        [Key]
        public int IdTransaction { get; set; }
        public string IdUser { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]  
        public double UnitPrice { get; set; }
    }
}
