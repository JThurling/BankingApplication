using System.Threading.Tasks;
namespace Core.Interfaces
{
    public interface IBankingAccount
    {
        Task<bool> Create(BankAccount.BankAccount bankAccount);
        Task<bool> Update(BankAccount.BankAccount bankAccount);
        Task<bool> Delete(BankAccount.BankAccount bankAccount);
    }
}
