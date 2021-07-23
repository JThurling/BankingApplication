﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Core.BankAccount;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class BankingAccount : IBankingAccount
    {
        private readonly BankContext _context;

        public BankingAccount(BankContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(BankAccount bankAccount)
        {
            bankAccount.AccountNumber = GenerateAccountNumber();
            bankAccount.SortCode = GenerateSortCode();

            var doesExistCheck = _context.BankAccounts.FirstOrDefault(ba => ba.AccountNumber == bankAccount.AccountNumber);
            if (doesExistCheck != null) return false;
            await _context.BankAccounts.AddAsync(bankAccount);
            var result = await _context.SaveChangesAsync();

            if (result <= 0) return false;
            return true;
        }

        private uint GenerateAccountNumber()
        {
            var randomNum = new Random();

            var num = randomNum.Next(10000000, 99999999);
            return (uint)num;
        }

        private string GenerateSortCode()
        {
            var randomNum = new Random();

            var num1 = randomNum.Next(10, 99);
            var num2 = randomNum.Next(10, 99);

            return $"26-{num1}-{num2}";
        }

        public async Task<bool> Update(BankAccount bankAccount, Guid id)
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
            if (result <= 0) return false;
            return true;
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
    }
}