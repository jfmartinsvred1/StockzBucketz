using Newtonsoft.Json;
using stockz_bucketz_api.Models;

namespace stockz_bucketz_api.Services
{
    public class ApiBrapiService
    {
        private HttpClient _httpClient;

        public ApiBrapiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<StockBrapi>> Get()
        {
            var response = await _httpClient.GetAsync("https://brapi.dev/api/quote/list?token=e1N2Rv5dStx9u6xCzsveoN?search=ibo");

            var data = await response.Content.ReadAsStringAsync();
            var reponseBrapiObj = JsonConvert.DeserializeObject<ResponseBrapi>(data);
            var stocks = reponseBrapiObj.Stocks;
            return stocks;
        }
    }
}
