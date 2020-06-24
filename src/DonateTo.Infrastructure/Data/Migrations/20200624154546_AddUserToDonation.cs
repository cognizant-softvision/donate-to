using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AddUserToDonation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Donation",
                nullable: false,
                defaultValue: 1L);

            migrationBuilder.CreateIndex(
                name: "IX_Donation_UserId",
                table: "Donation",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_User_UserId",
                table: "Donation",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donation_User_UserId",
                table: "Donation");

            migrationBuilder.DropIndex(
                name: "IX_Donation_UserId",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Donation");
        }
    }
}
