using Microsoft.EntityFrameworkCore.Migrations;
using System.IO;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class UpdateStatusName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/Status2.sql"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
