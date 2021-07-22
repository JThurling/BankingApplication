namespace Core.BankAccount
{
    public class Transfers : BaseEntity
    {
        public uint From { get; set; }

        public uint To { get; set; }

        public string CurrencyCode { get; set; }

        public decimal Amount { get; set; }

        public bool IsSuccessful { get; set; }
    }
}
