using System.ComponentModel.DataAnnotations;
using Core.BankAccount;

namespace Core.DTO
{
    public class BankAccountDto
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string AccountType { get; set; }

        [Required]
        public string AddressLine1 { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string PostalCode { get; set; }

        [Required]
        public string CurrencyCode { get; set; }

        [Required]
        public decimal Balance { get; set; }
    }
}
