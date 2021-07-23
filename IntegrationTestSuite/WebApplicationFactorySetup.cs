using Infrastructure.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace IntegrationTestSuite
{
    public class WebApplicationFactorySetup<TStartUp> : WebApplicationFactory<TStartUp> where TStartUp : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Create a new service provider.
                var serviceProvider = new ServiceCollection().AddEntityFrameworkInMemoryDatabase().BuildServiceProvider();

                // Add a database context (AppDbContext) using an in-memory database for testing.
                services.AddDbContext<BankContext>(options =>
                {
                    options.UseMySql("Data Source=localhost; Database=banking; Uid=appuser; Pwd=rG~VD>7(DMD5a6=%").UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                    options.UseInternalServiceProvider(serviceProvider);
                });

                // Build the service provider.
                var sp = services.BuildServiceProvider();

                // Create a scope to obtain a reference to the database contexts
                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var appDb = scopedServices.GetRequiredService<BankContext>();

                    var logger = scopedServices.GetRequiredService<ILogger<WebApplicationFactorySetup<TStartUp>>>();
                    // Ensure the database is created.
                    appDb.Database.EnsureCreated();
                }
            });
        }
    }
}
