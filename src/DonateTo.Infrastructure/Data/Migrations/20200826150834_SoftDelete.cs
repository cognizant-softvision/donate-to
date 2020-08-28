using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class SoftDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "QuestionOption",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Question",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Organization",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "DonationRequestItem",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "DonationRequest",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "DonationItem",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Donation",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Address",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "QuestionOption");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "DonationRequestItem");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "DonationRequest");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "DonationItem");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Address");
        }
    }
}
