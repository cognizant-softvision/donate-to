namespace DonateTo.Mailer.Entities
{
    public class MailServerSettings
    {
        public string Server { get; set; }
        public int Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool SSLEnabled { get; set; }
        public string FromAlias { get; set; }
        public string FromAddress { get; set; }
        public bool DefaultCredentials { get; set; }
    }
}
