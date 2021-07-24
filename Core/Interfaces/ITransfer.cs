using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.BankAccount;

namespace Core.Interfaces
{
    public interface ITransfer
    {
        Task<Transfers> TransferMoney(Transfers transfers);
        Task<List<Transfers>> GetTransferList();
        Task<Transfers> GetTransferRecord(Guid id);
    }
}
