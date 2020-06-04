using MimeKit;

namespace DonateTo.Mailer.Entities
{
    public class MailAddress : MailboxAddress
    {
        ///<inheritdoc cref="MailboxAddress"/>
        public MailAddress(string address) : base(address)
        {
        }

        ///<inheritdoc cref="MailboxAddress"/>
        public MailAddress(string alias, string address) : base(alias, address)
        {
        }
    }
}
