using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class CorrectedNavigationProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donation_Address_AddressId",
                table: "Donation");

            migrationBuilder.DropForeignKey(
                name: "FK_Donation_DonationRequest_DonationRequestId",
                table: "Donation");

            migrationBuilder.DropForeignKey(
                name: "FK_Donation_Status_StatusId",
                table: "Donation");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_Donation_DonationId",
                table: "DonationItem");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_DonationRequestItem_DonationRequestItemId",
                table: "DonationItem");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_Status_StatusId",
                table: "DonationItem");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequest_Address_AddressId",
                table: "DonationRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequest_Organization_OrganizationId",
                table: "DonationRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequest_Status_StatusId",
                table: "DonationRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequest_User_UserId",
                table: "DonationRequest");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "DonationRequestItem");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "DonationRequestItem",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "DonationRequest",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "StatusId",
                table: "DonationRequest",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "OrganizationId",
                table: "DonationRequest",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "AddressId",
                table: "DonationRequest",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "StatusId",
                table: "DonationItem",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "DonationRequestItemId",
                table: "DonationItem",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "DonationId",
                table: "DonationItem",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "StatusId",
                table: "Donation",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "DonationRequestId",
                table: "Donation",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "AddressId",
                table: "Donation",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "DonationRequestCategory",
                columns: table => new
                {
                    DonationRequestId = table.Column<long>(nullable: false),
                    CategoryId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonationRequestCategory", x => new { x.CategoryId, x.DonationRequestId });
                    table.ForeignKey(
                        name: "FK_DonationRequestCategory_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DonationRequestCategory_DonationRequest_DonationRequestId",
                        column: x => x.DonationRequestId,
                        principalTable: "DonationRequest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DonationRequestItemCategory",
                columns: table => new
                {
                    DonationRequestItemId = table.Column<long>(nullable: false),
                    CategoryId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonationRequestItemCategory", x => new { x.CategoryId, x.DonationRequestItemId });
                    table.ForeignKey(
                        name: "FK_DonationRequestItemCategory_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DonationRequestItemCategory_DonationRequestItem_DonationReq~",
                        column: x => x.DonationRequestItemId,
                        principalTable: "DonationRequestItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DonationRequestCategory_DonationRequestId",
                table: "DonationRequestCategory",
                column: "DonationRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_DonationRequestItemCategory_DonationRequestItemId",
                table: "DonationRequestItemCategory",
                column: "DonationRequestItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_Address_AddressId",
                table: "Donation",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_DonationRequest_DonationRequestId",
                table: "Donation",
                column: "DonationRequestId",
                principalTable: "DonationRequest",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_Status_StatusId",
                table: "Donation",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_Donation_DonationId",
                table: "DonationItem",
                column: "DonationId",
                principalTable: "Donation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_DonationRequestItem_DonationRequestItemId",
                table: "DonationItem",
                column: "DonationRequestItemId",
                principalTable: "DonationRequestItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_Status_StatusId",
                table: "DonationItem",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequest_Address_AddressId",
                table: "DonationRequest",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequest_Organization_OrganizationId",
                table: "DonationRequest",
                column: "OrganizationId",
                principalTable: "Organization",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequest_Status_StatusId",
                table: "DonationRequest",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequest_User_UserId",
                table: "DonationRequest",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donation_Address_AddressId",
                table: "Donation");

            migrationBuilder.DropForeignKey(
                name: "FK_Donation_DonationRequest_DonationRequestId",
                table: "Donation");

            migrationBuilder.DropForeignKey(
                name: "FK_Donation_Status_StatusId",
                table: "Donation");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_Donation_DonationId",
                table: "DonationItem");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_DonationRequestItem_DonationRequestItemId",
                table: "DonationItem");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_Status_StatusId",
                table: "DonationItem");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequest_Address_AddressId",
                table: "DonationRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequest_Organization_OrganizationId",
                table: "DonationRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequest_Status_StatusId",
                table: "DonationRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequest_User_UserId",
                table: "DonationRequest");

            migrationBuilder.DropTable(
                name: "DonationRequestCategory");

            migrationBuilder.DropTable(
                name: "DonationRequestItemCategory");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "DonationRequestItem");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "DonationRequestItem",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "DonationRequest",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "StatusId",
                table: "DonationRequest",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "OrganizationId",
                table: "DonationRequest",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "AddressId",
                table: "DonationRequest",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "StatusId",
                table: "DonationItem",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "DonationRequestItemId",
                table: "DonationItem",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "DonationId",
                table: "DonationItem",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "StatusId",
                table: "Donation",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "DonationRequestId",
                table: "Donation",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "AddressId",
                table: "Donation",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_Address_AddressId",
                table: "Donation",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_DonationRequest_DonationRequestId",
                table: "Donation",
                column: "DonationRequestId",
                principalTable: "DonationRequest",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_Status_StatusId",
                table: "Donation",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_Donation_DonationId",
                table: "DonationItem",
                column: "DonationId",
                principalTable: "Donation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_DonationRequestItem_DonationRequestItemId",
                table: "DonationItem",
                column: "DonationRequestItemId",
                principalTable: "DonationRequestItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_Status_StatusId",
                table: "DonationItem",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequest_Address_AddressId",
                table: "DonationRequest",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequest_Organization_OrganizationId",
                table: "DonationRequest",
                column: "OrganizationId",
                principalTable: "Organization",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequest_Status_StatusId",
                table: "DonationRequest",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequest_User_UserId",
                table: "DonationRequest",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
