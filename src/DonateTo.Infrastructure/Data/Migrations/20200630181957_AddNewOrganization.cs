using Microsoft.EntityFrameworkCore.Migrations;
using System.IO;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AddNewOrganization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/Organization2.sql"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
