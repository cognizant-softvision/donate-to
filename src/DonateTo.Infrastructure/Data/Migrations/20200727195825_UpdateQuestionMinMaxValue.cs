using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class UpdateQuestionMinMaxValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaximumRelative",
                table: "QuestionOption",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinimumRelative",
                table: "QuestionOption",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Max",
                table: "Question",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Min",
                table: "Question",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaximumRelative",
                table: "QuestionOption");

            migrationBuilder.DropColumn(
                name: "MinimumRelative",
                table: "QuestionOption");

            migrationBuilder.DropColumn(
                name: "Max",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "Min",
                table: "Question");
        }
    }
}
