using AutoMapper;
using Core.BankAccount;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace BankApplication.Controllers
{
    public class TestController : BaseApiController
    {
        private readonly IMapper _mapper;

        public TestController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAccount()
        {
            var bankDto = new BankAccountDto
            {
                AccountType = "Personal",
                AddressLine1 = "100 lane something",
                Balance = (decimal) 20.50,
                City = "Alberton",
                CurrencyCode = "GBP",
                FullName = "Jacques",
                PostalCode = "0FX UFA"
            };

            var mappedItem = _mapper.Map<BankAccount>(bankDto);

            return Ok(mappedItem);
        }
    }
}
