using DonateTo.Mailer.Entities;
using System.Threading.Tasks;

namespace DonateTo.Mailer.Interfaces
{
    public interface IMailSender
    {
        /// <summary>
        /// Send given message
        /// </summary>
        /// <param name="settings">Mail Server settings</param>
        /// <param name="message">Message</param>
        void Send(Message message);

        /// <summary>
        /// Send given message async
        /// </summary>
        /// <param name="settings">Mail Server settings</param>
        /// <param name="message">Message</param>
        /// <returns></returns>
        Task SendAsync(Message message);
    }
}
