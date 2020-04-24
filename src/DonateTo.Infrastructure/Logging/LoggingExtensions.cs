﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Extensions.Logging;

namespace DonateTo.Infrastructure.Logging
{
    public static class LoggingExtensions
    {
        public static IServiceCollection AddLoggingToPipeline(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("PostgreSQL");
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.PostgreSQL(connectionString, "Logs")
                .WriteTo.Providers(new LoggerProviderCollection())
                .CreateLogger();

            var loggerFactory = services.BuildServiceProvider().GetRequiredService<ILoggerFactory>();
            loggerFactory.AddSerilog(Log.Logger);

            return services;
        }
    }
}
