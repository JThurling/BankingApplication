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
        }
    }
}
