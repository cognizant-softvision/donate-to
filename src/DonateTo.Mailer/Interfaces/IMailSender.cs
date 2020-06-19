using DonateTo.Mailer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.Mailer.Interfaces
{
    public interface IMailSender
    {
        /// <summary>
        /// Send given message
        /// </summary>
        /// <param name="message">Message</param>
        void Send(Message message);

        /// <summary>
        /// Send given message async
        /// </summary>
        /// <param name="message">Message</param>
        /// <returns></returns>
        Task SendAsync(Message message);

        /// <summary>
        /// Send given messages async
        /// </summary>
        /// <param name="messages">Messages</param>
        /// <returns></returns>
        Task SendMultipleAsync(IEnumerable<Message> messages);
    }
}
