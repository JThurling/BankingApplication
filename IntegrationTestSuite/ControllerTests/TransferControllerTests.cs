using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using BankApplication;
using Core.BankAccount;
using Core.DTO;
using Xunit;

namespace IntegrationTestSuite.ControllerTests
{
    public class TransferControllerTests : IClassFixture<WebApplicationFactorySetup<Startup>>
    {
        private readonly WebApplicationFactorySetup<Startup> _factorySetup;
        private HttpClient _httpClient;

        public TransferControllerTests(WebApplicationFactorySetup<Startup> factorySetup)
        {
            _factorySetup = factorySetup;
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task CreateNewTransfer()
        {
            var httpResponse = await _httpClient.PostAsync("https://localhost:5001/api/transfer/",
                new StringContent(JsonSerializer.Serialize(new Transfers
                {
                    Amount = 100,
                    CurrencyCode = "ZAR",
                    From = 80589303,
                    To = 95487191,
                    SortCode = "26-35-23"
                }), Encoding.UTF8, "application/json"));

            httpResponse.EnsureSuccessStatusCode();
        }
    }
}
