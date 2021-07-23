using System;
using System.Threading.Tasks;
using Core.BankAccount;
using Infrastructure.Services;
using NUnit.Framework;

namespace UnitTestingSuite
{
    [TestFixture]
    public class ConvertTest
    {
        private Transfer _transfer;
        [SetUp]
        public void Setup()
        {
            _transfer = new Transfer();
        }

        [Test]
        public async Task ConvertUSDtoGBP_IsSuccessful()
        {
            var result = _transfer.getConvertedAmount(
                new BankAccount {CurrencyCode = "GBP", Balance = 100},
                new BankAccount {CurrencyCode = "USD", Balance = 100},
                10
            );

            Assert.AreEqual(7.3, result);
        }

        [Test]
        public async Task ConvertZARtoUSD_IsSuccessful()
        {
            var result = _transfer.getConvertedAmount(
                new BankAccount {CurrencyCode = "USD", Balance = 100},
                new BankAccount {CurrencyCode = "ZAR", Balance = 100},
                (decimal) 14.78
            );

            Assert.AreEqual(1.01, Math.Round(result, 2, MidpointRounding.ToEven));
        }

        [Test]
        public async Task ConvertGBPtoZAR_IsSuccessful()
        {
            var result = _transfer.getConvertedAmount(
                new BankAccount {CurrencyCode = "ZAR", Balance = 100},
                new BankAccount {CurrencyCode = "GBP", Balance = 100},
                10
            );

            Assert.AreEqual(202.8, result);
        }

        [Test]
        public async Task ConvertZARtoZAR_IsSuccessful()
        {
            var result = _transfer.getConvertedAmount(
                new BankAccount {CurrencyCode = "ZAR", Balance = 100},
                new BankAccount {CurrencyCode = "ZAR", Balance = 100},
                10
            );

            Assert.AreEqual(10, result);
        }
    }
}
