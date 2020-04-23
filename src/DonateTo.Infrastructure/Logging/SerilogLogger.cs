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

        public static void Debug(Exception ex, string template)
        {
            Log.Logger.Debug(ex, template);
        }
    }
}