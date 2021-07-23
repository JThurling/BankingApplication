using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using BankApplication;
using Core.BankAccount;
using Core.DTO;
using Infrastructure.Services;
using Xunit;

namespace IntegrationTestSuite.ControllerTests
{
    public class BankingControllerTests : IClassFixture<WebApplicationFactorySetup<Startup>>
    {
        private readonly WebApplicationFactorySetup<Startup> _factorySetup;
        private HttpClient _httpClient;
        private BankAccountDto _bankAccountDto;
        private BankAccountDto _updateBankAccountDto;

        public BankingControllerTests(WebApplicationFactorySetup<Startup> factorySetup)
        {
            _factorySetup = factorySetup;
            _httpClient = new HttpClient();
            _bankAccountDto = new BankAccountDto
            {
                AccountType = AccountType.Company,
                AddressLine1 = "100 lane something",
                Balance = (decimal) 20.50,
                City = "Alberton",
                CurrencyCode = "GBP",
                FullName = "Jacques",
                PostalCode = "0FX UFA"
            };
            _updateBankAccountDto = new BankAccountDto
            {
                AccountType = AccountType.Personal,
                AddressLine1 = "100 lane something",
                Balance = (decimal) 100.23,
                City = "Alberton",
                CurrencyCode = "GBP",
                FullName = "Jacques",
                PostalCode = "0FX UFA"
            };
        }

        [Fact]
        public async Task CreateNewBankAccount_Successful_ReturnTrue()
        {
            var httpResponse = await _httpClient.PostAsync("https://localhost:5001/api/banking/",
                new StringContent(JsonSerializer.Serialize(_bankAccountDto), Encoding.UTF8, "application/json"));

            httpResponse.EnsureSuccessStatusCode();
            Assert.Contains("true", httpResponse.Content.ReadAsStringAsync().Result);
        }

        [Fact]
        public async Task DeleteBankAccount_Successful_ReturnTrue()
        {

            var request = new HttpRequestMessage(HttpMethod.Delete, "https://localhost:5001/api/banking/174da1f2-99e2-4374-95af-fd264bb061b9");
            var httpResponse = await _httpClient.SendAsync(request);
            httpResponse.EnsureSuccessStatusCode();
            Assert.Contains("true", httpResponse.Content.ReadAsStringAsync().Result);
        }

        [Fact]
        public async Task UpdateBankAccount_Successful_ReturnTrue()
        {
            var httpResponse = await _httpClient.PostAsync("https://localhost:5001/api/banking/174da1f2-99e2-4374-95af-fd264bb061b9",
                new StringContent(JsonSerializer.Serialize(_updateBankAccountDto), Encoding.UTF8, "application/json"));

            httpResponse.EnsureSuccessStatusCode();
            Assert.Contains("true", httpResponse.Content.ReadAsStringAsync().Result);
        }
    }
}
