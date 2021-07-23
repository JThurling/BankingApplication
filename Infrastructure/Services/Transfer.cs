using System.Collections.Generic;
using System.Threading.Tasks;
using Core.BankAccount;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Infrastructure.Services
{
    public class Transfer : ITransfer
    {
        private readonly BankContext _context;

        public Transfer(BankContext context)
        {
            _context = context;
        }

        public Transfer()
        {

        }

        public async Task<bool> TransferMoney(Transfers transfer)
        {
            var acc1 = await _context.BankAccounts.FirstOrDefaultAsync(acc => acc.AccountNumber == transfer.From);
            var acc2 = await _context.BankAccounts.FirstOrDefaultAsync(acc => acc.AccountNumber == transfer.To);


            if (acc1 == null || acc2 == null) return false;

            decimal converted = getConvertedAmount(acc1, acc2, transfer.Amount);

            if (converted < acc1.Balance)
            {
                acc1.Balance -= converted;
                acc2.Balance += transfer.Amount;
                _context.BankAccounts.Update(acc1);
                _context.BankAccounts.Update(acc2);
            }

            var tr = new Transfers
            {
                Amount = transfer.Amount,
                CurrencyCode = transfer.CurrencyCode,
                From = acc1.AccountNumber,
                To = acc2.AccountNumber,
                IsSuccessful = converted < acc1.Balance,
                SortCode = acc2.SortCode
            };

            _context.Transfers.Add(tr);

            var result = await _context.SaveChangesAsync();

            if (result <= 0) return false;

            return true;
        }

        public decimal getConvertedAmount(BankAccount acc1, BankAccount acc2, decimal amount)
        {
            if (acc2.CurrencyCode == "GBP")
            {
                if (acc1.CurrencyCode == "ZAR") return amount * (decimal) 20.28;
                if (acc1.CurrencyCode == "USD") return amount * (decimal) 1.37;
            }
            else if (acc2.CurrencyCode == "USD")
            {
                if (acc1.CurrencyCode == "GBP") return amount * (decimal) 0.73;
                if (acc1.CurrencyCode == "ZAR") return amount * (decimal) 14.78;
            }
            else
            {
                if (acc1.CurrencyCode == "GBP") return amount * (decimal) 0.049;
                if (acc1.CurrencyCode == "USD") return amount * (decimal) 0.068;
            }

            return amount;
        }
    }
}
