using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AlterUserToOwnerForDonationAndRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("UserId", "DonationRequest", "OwnerId");
            migrationBuilder.RenameColumn("UserId", "Donation", "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("OwnerId", "Donation", "UserId");
            migrationBuilder.RenameColumn("OwnerId", "DonationRequest", "UserId");
        }
    }
}
