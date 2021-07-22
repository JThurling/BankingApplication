using System.Security.Cryptography;
using System.Security.Principal;

namespace Core.BankAccount
{
    public class BankAccount : BaseEntity
    {
        public string FullName { get; set; }

        public string AccountType { get; set; }

        public uint AccountNumber { get; set; }

        public string SortCode { get; set; }

        public string AddressLine1 { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }

        public string CurrencyCode { get; set; }

        public decimal Balance { get; set; }
    }

    public enum AccountType {
        Personal,
        Company,
        Other
    }
}
