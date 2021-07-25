using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Specs;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IBankingAccount
    {
        Task<bool> Create(BankAccount.BankAccount mappedBankAccount, List<string> bankAccount);
        Task<BankAccount.BankAccount> Update(BankAccount.BankAccount bankAccount, Guid id);
        Task<bool> Delete(Guid id);
        Task<List<BankAccount.BankAccount>> GetMany();
        Task<BankAccount.BankAccount> GetAccount(int accountNumber);
    }

    public interface ISearch
    {
        Task<List<BankAccount.BankAccount>> GetAccounts(BankingSpecs bankingSpecs);
    }
}
