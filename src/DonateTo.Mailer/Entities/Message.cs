using MimeKit;
using System.Collections.Generic;

namespace DonateTo.Mailer.Entities
{
    public class Message : MimeMessage
    {
        /// <summary>
        /// Creates a new message with an HTML body
        /// </summary>
        /// <param name="subject">Mail Subject</param>
        /// <param name="body">HTML body</param>
        /// <param name="to">To address</param>
        /// <param name="sendAsBcc">Send mail as BCC</param>
        /// <param name="from">From address</param>
        public Message(string subject, MessageBody body, IEnumerable<string> to, bool sendAsBcc = false, string from = "")
        {
            if (sendAsBcc)
            {
                foreach (var mail in to)
                {
                    Bcc.Add(new MailAddress(mail));
                }
            }
            else
            {
                foreach (var mail in to)
                {
                    To.Add(new MailAddress(mail));
                }
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
        /// <param name="subject">Mail Subject</param>
        /// <param name="text">Mail text</param>
        /// <param name="to">To address</param>
        /// <param name="sendAsBcc">Send mail as BCC</param>
        /// <param name="from">From address</param>
        public Message(string subject, string text, IEnumerable<string> to, bool sendAsBcc = false, string from = "")
        {
            if (sendAsBcc)
            {
                foreach (var mail in to)
                {
                    Bcc.Add(new MailAddress(mail));
                }
            }
            else
            {
                foreach (var mail in to)
                {
                    To.Add(new MailAddress(mail));
                }
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
