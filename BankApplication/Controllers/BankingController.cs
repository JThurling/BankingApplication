using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Core.BankAccount;
using Core.DTO;
using Core.Interfaces;
using Core.Specs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace BankApplication.Controllers
{
    public class BankingController : BaseApiController
    {
        private readonly IBankingAccount _bankingAccount;
        private readonly IMapper _mapper;
        private readonly ISearch _search;
        private readonly IWebHostEnvironment _environment;
        private readonly IConfiguration _configuration;

        public BankingController(IBankingAccount bankingAccount
            , IMapper mapper, ISearch search
            , IWebHostEnvironment environment,
            IConfiguration configuration)
        {
            _bankingAccount = bankingAccount;
            _mapper = mapper;
            _search = search;
            _environment = environment;
            _configuration = configuration;
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
            var files = Request.Form.Files.Any() ? Request.Form.Files : new FormFileCollection();

            if (!files.Any())
            {
                files = null;
            }

            List<string> references = new List<string>();
            if (files != null)
            {
                references = saveFiles(files);
            }

            var mappedBankAccount = _mapper.Map<BankAccount>(bankAccountDto);

            var result = await _bankingAccount.Create(mappedBankAccount, references);
            if (!result) return BadRequest("There has been an error");
            return Ok(true);
        }

        public List<string> saveFiles(IFormFileCollection formFileCollection)
        {
            List<string> list = new List<string>();
            foreach (var file in formFileCollection)
            {
                if (file.Length > 0)
                {
                    string filePath = Path.Combine(_environment.WebRootPath,
                        file.FileName.Replace(' ', '-'));
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                        list.Add(Path.Combine(_configuration["ApiUrl"], file.FileName.Replace(' ', '-')));
                    }
                }
            }

            return list;
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
