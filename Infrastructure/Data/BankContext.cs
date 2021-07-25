using System;
using System.Collections.Generic;
using Core.BankAccount;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class BankContext : DbContext
    {
        public BankContext(DbContextOptions<BankContext> options) : base(options)
        { }

        public DbSet<BankAccount> BankAccounts { get; set; }

        public DbSet<Files> Files { get; set; }
        public DbSet<Transfers> Transfers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BankAccount>()
                .HasData(new List<BankAccount>
                {
                    new BankAccount
                    {
                        AccountNumber = 76024596,
                        AccountType = "Personal",
                        AddressLine1 = "16 Wood Ave, Longbeach",
                        Balance = 1000.00m,
                        City = "Miami",
                        CurrencyCode = "USD",
                        PostalCode = "12345",
                        FullName = "John Atkins",
                        SortCode = "26-70-32"
                    },
                    new BankAccount
                    {
                        AccountNumber = 18227293,
                        AccountType = "Company",
                        AddressLine1 = "16 Wood Ave, Essex",
                        Balance = 1000.00m,
                        City = "London",
                        CurrencyCode = "GBP",
                        PostalCode = "OXFN 109",
                        FullName = "Richard Man",
                        SortCode = "26-70-32"
                    },
                    new BankAccount
                    {
                        AccountNumber = 11341209,
                        AccountType = "Personal",
                        AddressLine1 = "16 Wood Ave, Longman",
                        Balance = 1000.00m,
                        City = "Norwich",
                        CurrencyCode = "USD",
                        PostalCode = "12345",
                        FullName = "John Blade",
                        SortCode = "26-70-32"
                    }
                });

            modelBuilder.Entity<Transfers>()
                .HasData(new List<Transfers>
                {
                    new Transfers
                    {
                        Amount = 150.00m,
                        CurrencyCode = "USD",
                        DateOfTransfer = DateTime.Now,
                        From = 76024596,
                        IsSuccessful = true,
                        SortCode = "26-70-32",
                        To = 11341209
                    },
                    new Transfers
                    {
                        Amount = 150.00m,
                        CurrencyCode = "GBP",
                        DateOfTransfer = DateTime.Now,
                        From = 11341209,
                        IsSuccessful = false,
                        SortCode = "26-70-32",
                        To = 18227293
                    }
                });
        }
    }
}
