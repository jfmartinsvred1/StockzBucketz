using stockz_bucketz_api.Models;

namespace stockz_bucketz_api.Interfaces
{
    public interface IStockDao
    {
        Task Add(Transaction stock);
        Task<ICollection<Stock>> GetByUserId(string id);
        Task UpdateUnitPrice(string userId);
        Task<List<StockBrapi>> GetAllStocks();
        Task Delete(int id);
    }
}
