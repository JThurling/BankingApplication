using System;
using System.Threading.Tasks;
namespace Core.Interfaces
{
    public interface IBankingAccount
    {
        Task<bool> Create(BankAccount.BankAccount bankAccount);
        Task<bool> Update(BankAccount.BankAccount bankAccount, Guid id);
        Task<bool> Delete(Guid id);
    }
}
