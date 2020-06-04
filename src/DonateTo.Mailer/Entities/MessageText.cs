using MimeKit;

namespace DonateTo.Mailer.Entities
{
    public class MessageText : TextPart
    {
        public MessageText() 
        {
        }

        public MessageText(string text) 
        {
            Text = text;
        }
    }
}
