using System.ComponentModel.DataAnnotations;

namespace stockz_bucketz_api.Models
{
    public class Stock
    {
        public Stock(string idUser, string code, int amount, double value, double mediumPrice, double earnings, double unitPrice)
        {
            IdUser = idUser;
            Code = code;
            Amount = amount;
            Value = value;
            MediumPrice = mediumPrice;
            Earnings = earnings;
            UnitPrice = unitPrice;
            Cost = mediumPrice * amount;
        }

        [Key]
        public int Id { get; set; }
        public string IdUser { get; set; }
        public double UnitPrice { get; set; }
        public string Code { get; set; }
        public int Amount { get; set; }
        public double Value { get; set; }
        public double Cost { get; set; }
        public double MediumPrice { get; set; }
        public double Earnings { get; set; }

        public void AddNew(int amount, double unitPrice, double oldCost, int amountOld)
        {
            var buyCost = amount * unitPrice;
            var newCost = buyCost + oldCost;
            var newAmount = amount + amountOld;
            var average = newCost / newAmount;

            this.Amount = newAmount;
            this.MediumPrice = average;
            this.Cost = newCost;
        }
    }
}
