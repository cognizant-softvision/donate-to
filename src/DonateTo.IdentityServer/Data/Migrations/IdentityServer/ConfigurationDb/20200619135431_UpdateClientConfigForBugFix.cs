using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.IdentityServer.Data.Migrations.IdentityServer.ConfigurationDb
{
    public partial class UpdateClientConfigForBugFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"UPDATE public.""Client"" SET ""AlwaysIncludeUserClaimsInIdToken"" = true", true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"UPDATE public.""Client"" SET ""AlwaysIncludeUserClaimsInIdToken"" = false", true);
        }
    }
}
