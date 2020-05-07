using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Extensions.Logging;

namespace DonateTo.Infrastructure.Logging
{
    public static class LoggingExtensions
    {
        /// <summary>
        ///     Add a Logger to the logging pipeline.
        /// </summary>
        /// <param name="services">IServiceCollection.</param>
        /// <param name="configuration">IConfiguration.</param>
        /// <returns></returns>
        public static IServiceCollection AddLoggingToPipeline(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("PostgreSQL");

            using (var provider = new LoggerProviderCollection())
            {
                Log.Logger = new LoggerConfiguration()
                      .MinimumLevel.Debug()
                      .WriteTo.PostgreSQL(connectionString, "Logs")
                      .WriteTo.Providers(provider)
                      .CreateLogger();

                var loggerFactory = services.BuildServiceProvider().GetRequiredService<ILoggerFactory>();
                loggerFactory.AddSerilog(Log.Logger);
            }

            return services;
        }
    }
}
