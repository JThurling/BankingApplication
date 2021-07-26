using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Core.BankAccount;
using Core.Interfaces;
using Core.Specs;
using Infrastructure.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class BankingAccount : IBankingAccount, ISearch
    {
        private readonly BankContext _context;
        private readonly IWebHost _host;

        public BankingAccount(BankContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(BankAccount bankAccount, List<string> references)
        {
            bankAccount.AccountNumber = GenerateAccountNumber();
            bankAccount.SortCode = GenerateSortCode();

            List<Files> files = new List<Files>();
            var doesExistCheck = _context.BankAccounts.FirstOrDefault(ba
                => ba.AccountNumber == bankAccount.AccountNumber ||
                   ba.AddressLine1.Trim().ToLower() == bankAccount.AddressLine1.Trim().ToLower());
            if (doesExistCheck != null) return false;
            if (references.Count > 0)
            {
                foreach(var reference in references)
                {
                    files.Add(new Files{FileReferences = reference});
                }

                bankAccount.FilesList = files;
            }
            await _context.BankAccounts.AddAsync(bankAccount);
            var result = await _context.SaveChangesAsync();

            if (result <= 0) return false;
            return true;
        }

        private uint GenerateAccountNumber()
        {
            var randomNum = new Random();

            var num = randomNum.Next(10000000, 99999999);
            return (uint) num;
        }

        private string GenerateSortCode()
        {
            var randomNum = new Random();

            var num1 = randomNum.Next(10, 99);
            var num2 = randomNum.Next(10, 99);

            return $"26-{num1}-{num2}";
        }

        public async Task<BankAccount> Update(BankAccount bankAccount, Guid id)
        {
            var ba = await _context.BankAccounts.FirstOrDefaultAsync(ba
                => ba.Id == id);

            int result = 0;
            if (ba != null)
            {
                ba.Balance = bankAccount.Balance;
                ba.City = bankAccount.City;
                ba.AddressLine1 = bankAccount.AddressLine1;
                ba.CurrencyCode = bankAccount.CurrencyCode;
                ba.FullName = bankAccount.FullName;
                ba.PostalCode = bankAccount.PostalCode;
                ba.AccountType = bankAccount.AccountType;

                _context.BankAccounts.Update(ba);
                result = await _context.SaveChangesAsync();
            }

            if (result <= 0) return null;
            return ba;
        }

        public async Task<bool> Delete(Guid id)
        {
            var ba = await _context.BankAccounts.FirstOrDefaultAsync(ba
                => ba.Id == id);

            int result = 0;
            if (ba != null)
            {
                _context.BankAccounts.Remove(ba);
                result = await _context.SaveChangesAsync();
            }

            if (result <= 0) return false;
            return true;
        }

        public async Task<List<BankAccount>> GetMany()
        {
            var list = await _context.BankAccounts.ToListAsync();

            return list;
        }

        public async Task<BankAccount> GetAccount(int accountNumber)
        {
            var account = await _context.BankAccounts.Include(f => f.FilesList).FirstOrDefaultAsync(f
                => f.AccountNumber == accountNumber);

            return account;
        }

        public async Task<List<BankAccount>> GetAccounts(BankingSpecs bankingSpecs)
        {
            var list = await _context.BankAccounts
                .Include(f => f.FilesList)
                .Where(sq =>
                    (string.IsNullOrEmpty(bankingSpecs.Search)
                     || sq.FullName.Contains(bankingSpecs.Search)
                     || sq.City.Contains(bankingSpecs.Search)
                     || sq.AddressLine1.Contains(bankingSpecs.Search)
                     || sq.FullName.Contains(bankingSpecs.Search)) &&
                    (bankingSpecs.Account == 0 || sq.AccountNumber == bankingSpecs.Account))
                .Skip(bankingSpecs.Skip)
                .Take(bankingSpecs.Take)
                .ToListAsync();

            return list;
        }
    }
}
