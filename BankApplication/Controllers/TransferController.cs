using System;
using System.Threading.Tasks;
using Core.BankAccount;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BankApplication.Controllers
{
    public class TransferController : BaseApiController
    {
        private readonly ITransfer _transfer;

        public TransferController(ITransfer transfer)
        {
            _transfer = transfer;
        }

        [HttpPost]
        public async Task<IActionResult> TransferFunds(Transfers transfers)
        {
            var transfer = await _transfer.TransferMoney(transfers);
            if (transfer == null) return BadRequest(new {message = "There has been an error with the transaction"});
            return Ok(transfers);
        }

        [HttpGet]
        public async Task<IActionResult> GetTransferList()
            => Ok(await _transfer.GetTransferList());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransferRecord(Guid id)
            => Ok(await _transfer.GetTransferRecord(id));
    }
}
