using System;

namespace Core.BankAccount
{
    public class Transfers : BaseEntity
    {
        public uint From { get; set; }

        public uint To { get; set; }

        public string CurrencyCode { get; set; }

        public decimal Amount { get; set; }

        public string SortCode { get; set; }

        public DateTime DateOfTransfer { get; set; } = DateTime.Now;

        public bool IsSuccessful { get; set; }
    }
}
