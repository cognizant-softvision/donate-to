using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using Serilog.Extensions.Logging;
using System;

namespace DonateTo.Infrastructure.Logging
{
    public static class LoggingExtensions
    {
        /// <summary>
        /// Add a Logger to the logging pipeline.
        /// </summary>
        /// <param name="services">IServiceCollection.</param>
        /// <param name="configuration">IConfiguration.</param>
        /// <returns></returns>
        public static IServiceCollection AddLoggingToPipeline(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("PostgreSQL");
            var autoCreateTable = configuration.GetValue<bool>("Logging:Serilog:AutoCreateTable");

            using (var provider = new LoggerProviderCollection())
            {
                Log.Logger = new LoggerConfiguration()
                    .Enrich.FromLogContext()
                    .MinimumLevel.Debug()
                    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
                    .WriteTo.PostgreSQL(connectionString, "\"Log\"", needAutoCreateTable: autoCreateTable)
                    .WriteTo.Providers(provider)
                    .WriteTo.Console()
                    .CreateLogger();

                var loggerFactory = services.BuildServiceProvider().GetRequiredService<ILoggerFactory>();
                loggerFactory.AddSerilog(Log.Logger);
            }

            return services;
        }
    }
}
