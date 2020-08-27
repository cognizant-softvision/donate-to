using Microsoft.EntityFrameworkCore.Migrations;
using System.IO;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class UpdateControlTypeName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(File.ReadAllText("./Data/Seed/ControlType2.sql"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
