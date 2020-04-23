using Serilog;
using System;

namespace DonateTo.Infrastructure.Logging
{
    public sealed class Logger
    {
        public static void Debug(string template)
        {
            Log.Logger.Debug(template);
        }

        public static void Debug(string template, Exception ex)
        {
            Log.Logger.Debug(template, ex);
        }

        public static void Information(string template)
        {
            Log.Logger.Information(template);
        }

        public static void Error(string template, Exception ex)
        {
            Log.Logger.Error(template, ex);
        }
    }
}