using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class Seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "BankAccounts",
                columns: new[] { "Id", "AccountNumber", "AccountType", "AddressLine1", "Balance", "City", "CurrencyCode", "FullName", "PostalCode", "SortCode" },
                values: new object[,]
                {
                    { new Guid("22ba5f5a-ea83-4f19-8770-460e03345b5b"), 76024596u, "Personal", "16 Wood Ave, Longbeach", 1000.00m, "Miami", "USD", "John Atkins", "12345", "26-70-32" },
                    { new Guid("68c1832a-a5a0-4f41-9016-72bbe00fb330"), 18227293u, "Company", "16 Wood Ave, Essex", 1000.00m, "London", "GBP", "Richard Man", "OXFN 109", "26-70-32" },
                    { new Guid("a3ef7f9d-460b-4e9b-9896-132526762c24"), 11341209u, "Personal", "16 Wood Ave, Longman", 1000.00m, "Norwich", "USD", "John Blade", "12345", "26-70-32" }
                });

            migrationBuilder.InsertData(
                table: "Transfers",
                columns: new[] { "Id", "Amount", "CurrencyCode", "DateOfTransfer", "From", "IsSuccessful", "SortCode", "To" },
                values: new object[,]
                {
                    { new Guid("322e31db-abe5-401b-9d47-8e364a43f89e"), 150.00m, "USD", new DateTime(2021, 7, 25, 14, 51, 12, 144, DateTimeKind.Local).AddTicks(2414), 76024596u, true, "26-70-32", 11341209u },
                    { new Guid("74f94028-ecf3-4ed7-afd5-e64ce6db9118"), 150.00m, "GBP", new DateTime(2021, 7, 25, 14, 51, 12, 144, DateTimeKind.Local).AddTicks(3972), 11341209u, false, "26-70-32", 18227293u }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BankAccounts",
                keyColumn: "Id",
                keyValue: new Guid("22ba5f5a-ea83-4f19-8770-460e03345b5b"));

            migrationBuilder.DeleteData(
                table: "BankAccounts",
                keyColumn: "Id",
                keyValue: new Guid("68c1832a-a5a0-4f41-9016-72bbe00fb330"));

            migrationBuilder.DeleteData(
                table: "BankAccounts",
                keyColumn: "Id",
                keyValue: new Guid("a3ef7f9d-460b-4e9b-9896-132526762c24"));

            migrationBuilder.DeleteData(
                table: "Transfers",
                keyColumn: "Id",
                keyValue: new Guid("322e31db-abe5-401b-9d47-8e364a43f89e"));

            migrationBuilder.DeleteData(
                table: "Transfers",
                keyColumn: "Id",
                keyValue: new Guid("74f94028-ecf3-4ed7-afd5-e64ce6db9118"));
        }
    }
}
