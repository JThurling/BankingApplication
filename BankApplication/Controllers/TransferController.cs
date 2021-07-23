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
            if (!transfer) return BadRequest(new {message = "There has been an error"});
            return Ok();
        }
    }
}
