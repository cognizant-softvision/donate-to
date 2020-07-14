using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class UpdatedQuestion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "Question",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Weight",
                table: "Question",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
