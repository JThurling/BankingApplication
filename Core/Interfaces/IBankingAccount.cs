using System;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Core.Interfaces
{
    public interface IBankingAccount
    {
        Task<bool> Create(BankAccount.BankAccount bankAccount);
        Task<bool> Update(BankAccount.BankAccount bankAccount, Guid id);
        Task<bool> Delete(Guid id);
        Task<List<BankAccount.BankAccount>> GetMany();
        Task<BankAccount.BankAccount> GetAccount(int accountNumber);
    }
}
