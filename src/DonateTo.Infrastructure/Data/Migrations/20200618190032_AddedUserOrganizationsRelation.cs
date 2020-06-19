using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AddedUserOrganizationsRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_Unit_UnitId",
                table: "DonationItem");

            migrationBuilder.AlterColumn<long>(
                name: "UnitId",
                table: "DonationItem",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "UserOrganization",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false),
                    OrganizationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOrganization", x => new { x.UserId, x.OrganizationId });
                    table.ForeignKey(
                        name: "FK_UserOrganization_Organization_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organization",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserOrganization_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserOrganization_OrganizationId",
                table: "UserOrganization",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_Unit_UnitId",
                table: "DonationItem",
                column: "UnitId",
                principalTable: "Unit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_Unit_UnitId",
                table: "DonationItem");

            migrationBuilder.DropTable(
                name: "UserOrganization");

            migrationBuilder.AlterColumn<long>(
                name: "UnitId",
                table: "DonationItem",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_Unit_UnitId",
                table: "DonationItem",
                column: "UnitId",
                principalTable: "Unit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
