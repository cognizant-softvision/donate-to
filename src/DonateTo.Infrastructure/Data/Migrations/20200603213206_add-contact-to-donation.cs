using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class addcontacttodonation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ContactId",
                table: "Donation",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Donation_ContactId",
                table: "Donation",
                column: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_Contact_ContactId",
                table: "Donation",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donation_Contact_ContactId",
                table: "Donation");

            migrationBuilder.DropIndex(
                name: "IX_Donation_ContactId",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "Donation");
        }
    }
}
