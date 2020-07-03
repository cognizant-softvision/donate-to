using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.IdentityServer.Data.Migrations.IdentityServer.ConfigurationDb
{
    public partial class UpdateClientScope : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO public.""ClientScope"" VALUES (3, 'offline_access', 
            (SELECT ""Id"" FROM public.""Client"" WHERE ""ClientId"" = 'DonateTo.WebApplication' limit 1))", true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DELETE FROM public.""ClientScope"" WHERE ""Id"" = 3", true);
        }
    }
}
