using System.ComponentModel.DataAnnotations;

namespace stockz_bucketz_api.Models
{
    public class SaveStocks
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateOfSave { get; set; }= DateTime.Now;


    }
}
