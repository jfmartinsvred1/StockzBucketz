using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using stockz_bucketz_api.Interfaces;
using stockz_bucketz_api.Models;
using stockz_bucketz_api.Services;

namespace stockz_bucketz_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StockController : ControllerBase
    {
        public IStockDao _dao;

        public StockController(IStockDao dao)
        {
            _dao = dao;
        }


        [HttpGet]
        public async Task<ICollection<Stock>> GetByUserId([FromQuery] string id)
        {
            var stocks = await _dao.GetByUserId(id);
            return stocks;
        }
        [HttpGet("All")]
        public async Task<ICollection<StockBrapi>> GetStocks()
        {
            var stocks = await _dao.GetAllStocks();
            return stocks;
        }
        [HttpPost]
        public async Task<IActionResult> AddStock(Transaction stock)
        {
            await _dao.Add(stock);
            return Ok();

        }
        [HttpDelete]
        public async Task<IActionResult> DeleteStock([FromQuery]int id)
        {
            await _dao.Delete(id);
            return NoContent();
        }

    }
}
