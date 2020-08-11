using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AddedNameToAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Address",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Address");
        }
    }
}
