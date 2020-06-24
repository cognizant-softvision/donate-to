using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.IdentityServer.Data.Migrations.IdentityServer.ConfigurationDb
{
    public partial class UpdateClientConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DELETE FROM public.""ClientGrantType""", true);
            migrationBuilder.Sql(@"DELETE FROM public.""ClientScope""", true);
            migrationBuilder.Sql(@"DELETE FROM public.""ClientRedirectUri""", true);
            migrationBuilder.Sql(@"DELETE FROM public.""ClientCorsOrigin""", true);
            migrationBuilder.Sql(@"DELETE FROM public.""ClientPostLogoutRedirectUri""", true);
            migrationBuilder.Sql(@"DELETE FROM public.""Client""", true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
