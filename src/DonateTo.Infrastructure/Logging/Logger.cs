using Serilog;
using System;

namespace DonateTo.Infrastructure.Logging
{
    public static class Logger
    {
        /// <summary>
        /// Write a log event with the Debug level.
        /// </summary>
        /// <param name="template">Message template describing the event.</param>
        public static void Debug(string template)
        {
            Log.Logger.Debug(template);
        }

        /// <summary>
        /// Write a log event with the Debug level.
        /// </summary>
        /// <param name="template">Message template describing the event.</param>
        /// <param name="ex">Exception of the event.</param>
        public static void Debug(string template, Exception ex)
        {
            Log.Logger.Debug(template, ex);
        }

        /// <summary>
        /// Write a log event with the Information level.
        /// </summary>
        /// <param name="template">Message template describing the event.</param>
        public static void Information(string template)
        {
            Log.Logger.Information(template);
        }

        /// <summary>
        /// Write a log event with the Error level.
        /// </summary>
        /// <param name="template">Message template describing the event.</param>
        /// <param name="ex">Exception of the event.</param>
        public static void Error(string template, Exception ex)
        {
            Log.Logger.Error(template, ex);
        }
    }
}