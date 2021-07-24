using System;
using System.Net.Mime;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using AutoMapper;
using Core.BankAccount;
using Core.DTO;
using Core.Interfaces;
using Core.Specs;
using Microsoft.AspNetCore.Mvc;

namespace BankApplication.Controllers
{
    public class BankingController : BaseApiController
    {
        private readonly IBankingAccount _bankingAccount;
        private readonly IMapper _mapper;
        private readonly ISearch _search;

        public BankingController(IBankingAccount bankingAccount, IMapper mapper, ISearch search)
        {
            _bankingAccount = bankingAccount;
            _mapper = mapper;
            _search = search;
        }

        [HttpGet]
        public async Task<IActionResult> GetBankAccounts([FromQuery]BankingSpecs specs)
        {
            var bankAccounts = await _search.GetAccounts(specs);
            return Ok(bankAccounts);
        }

        [HttpGet("{accountNumber}")]
        public async Task<IActionResult> GetBankAccount(int accountNumber)
        {
            var bankAccounts = await _bankingAccount.GetAccount(accountNumber);
            return Ok(bankAccounts);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewBankAccount([FromForm] BankAccountDto bankAccountDto)
        {
            var mappedBankAccount = _mapper.Map<BankAccount>(bankAccountDto);

            var result = await _bankingAccount.Create(mappedBankAccount);
            if (!result) return BadRequest("There has been an error");
            return Ok(true);
        }

        [HttpPost("deposit/{id}")]
        public async Task<IActionResult> UpdateBankAccount([FromBody] BankAccountDto bankAccountDto, Guid id)
        {
            var mappedBankAccount = _mapper.Map<BankAccount>(bankAccountDto);

            var result = await _bankingAccount.Update(mappedBankAccount, id);
            if (result == null) return BadRequest("There has been an error");
            return Ok(result);
        }

        [HttpPost("personal/{id}")]
        public async Task<IActionResult> UpdateFormBankAccount([FromForm] BankAccountDto bankAccountDto, Guid id)
        {
            var mappedBankAccount = _mapper.Map<BankAccount>(bankAccountDto);

            var result = await _bankingAccount.Update(mappedBankAccount, id);
            if (result == null) return BadRequest("There has been an error");
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> UpdateBankAccount(Guid id)
        {
            var result = await _bankingAccount.Delete(id);
            if (!result) return BadRequest("There has been an error");
            return Ok(true);
        }
    }
}
