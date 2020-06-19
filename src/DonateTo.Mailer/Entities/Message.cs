using MimeKit;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace DonateTo.Mailer.Entities
{
    public class Message : MimeMessage
    {
        /// <summary>
        /// Creates a new message with an HTML body
        /// </summary>
        /// <param name="to">To address</param>
        /// <param name="subject">Mail Subject</param>
        /// <param name="body">HTML body</param>
        /// <param name="from">From address</param>
        public Message(string to, string subject, MessageBody body, string from = "")
        {
            To.Add(new MailAddress(to));

            Subject = subject;
            Body = body.ToMessageBody();

            if (!string.IsNullOrEmpty(from))
            {
                From.Add(new MailAddress(from));
            }
        }

        /// <summary>
        /// Creates a new message with an HTML body
        /// </summary>
        /// <param name="to">To addresses list</param>
        /// <param name="subject">Mail Subject</param>
        /// <param name="body">HTML body</param>
        /// <param name="sendAsBcc">Send Message as Bcc</param>
        /// <param name="from">From address</param>
        public Message(IEnumerable<string> to, string subject, MessageBody body, bool sendAsBcc = false, string from = "")
        {
            if (sendAsBcc)
            {
                Bcc.AddRange(to.Select(m => new MailAddress(m)));
            }
            else
            {
                To.AddRange(to.Select(m => new MailAddress(m)));
            }

            Subject = subject;
            Body = body.ToMessageBody();
            
            if (!string.IsNullOrEmpty(from)) 
            {
                From.Add(new MailAddress(from));
            }
        }

        /// <summary>
        /// Creates a new message with a text body
        /// </summary>
        /// <param name="to">To address</param>
        /// <param name="subject">Mail Subject</param>
        /// <param name="text">Mail text</param>
        /// <param name="from">From address</param>
        public Message(string to, string subject, string text, string from = "")
        {
            To.Add(new MailAddress(to));

            Subject = subject;
            Body = new MessageText(text);

            if (!string.IsNullOrEmpty(from))
            {
                From.Add(new MailAddress(from));
            }
        }

        /// <summary>
        /// Creates a new message with a text body
        /// </summary>
        /// <param name="to">To addresses list</param>
        /// <param name="subject">Mail Subject</param>
        /// <param name="text">Mail text</param>
        /// <param name="sendAsBcc">Send Message as Bcc</param>
        /// <param name="from">From address</param>
        public Message(IEnumerable<string> to, string subject, string text, bool sendAsBcc = false, string from = "")
        {
            if (sendAsBcc)
            {
                Bcc.AddRange(to.Select(m => new MailAddress(m)));
            }
            else
            {
                To.AddRange(to.Select(m => new MailAddress(m)));
            }

            Subject = subject;
            Body = new MessageText(text);

            if (!string.IsNullOrEmpty(from))
            {
                From.Add(new MailAddress(from));
            }
        }
    }
}
