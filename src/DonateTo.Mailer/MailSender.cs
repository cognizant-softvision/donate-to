using DonateTo.Mailer.Entities;
using DonateTo.Mailer.Interfaces;
using MailKit.Net.Smtp;
using System.Threading.Tasks;

namespace DonateTo.Mailer
{
    public class MailSender : IMailSender
    {
        private readonly MailServerSettings _mailSettings;
        public MailSender(MailServerSettings mailSettings)
        {
            _mailSettings = mailSettings;
        }

        ///<inheritdoc cref="IMailSender"/>
        public void Send(Message message)
        {
            using (var client = new SmtpClient())
            {
                if (message.From.Count == 0)
                {
                    message.From.Add(new MailAddress(_mailSettings.FromAlias, _mailSettings.FromAddress));
                }

                client.Connect(_mailSettings.Server, _mailSettings.Port, _mailSettings.SSLEnabled);
                client.Authenticate(_mailSettings.Username, _mailSettings.Password);
                client.Send(message);
                client.Disconnect(true);
            }
        }

        ///<inheritdoc cref="IMailSender"/>
        public async Task SendAsync(Message message)
        {
            using (var client = new SmtpClient())
            {
                if (message.From.Count == 0)
                {
                    message.From.Add(new MailAddress(_mailSettings.FromAlias, _mailSettings.FromAddress));
                }

                client.Connect(_mailSettings.Server, _mailSettings.Port, _mailSettings.SSLEnabled);
                client.Authenticate(_mailSettings.Username, _mailSettings.Password);
                await client.SendAsync(message);
                client.Disconnect(true);
            }
        }
    }
}
