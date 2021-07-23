using System.Threading.Tasks;
using Core.BankAccount;

namespace Core.Interfaces
{
    public interface ITransfer
    {
        Task<bool> TransferMoney(Transfers transfers);
    }
}
