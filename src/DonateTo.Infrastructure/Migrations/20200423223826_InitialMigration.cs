using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Entity",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    Street = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    Appartment = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    AdditionalInformation = table.Column<string>(nullable: true),
                    ResponsableInformation = table.Column<string>(nullable: true),
                    ResponsableIdentityNumber = table.Column<string>(nullable: true),
                    IsDefault = table.Column<bool>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Observation = table.Column<string>(nullable: true),
                    DayOfWeek = table.Column<int>(nullable: true),
                    TimeStart = table.Column<int>(nullable: true),
                    TimeEnd = table.Column<int>(nullable: true),
                    DonationRequestId = table.Column<long>(nullable: true),
                    AddressId = table.Column<long>(nullable: true),
                    StatusId = table.Column<long>(nullable: true),
                    PickUpDate = table.Column<DateTime>(nullable: true),
                    Quantity = table.Column<decimal>(nullable: true),
                    DonationItem_Observation = table.Column<string>(nullable: true),
                    DonationId = table.Column<long>(nullable: true),
                    DonationRequestItemId = table.Column<long>(nullable: true),
                    UnitId = table.Column<long>(nullable: true),
                    DonationItem_StatusId = table.Column<long>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    DonationRequest_Observation = table.Column<string>(nullable: true),
                    Priority = table.Column<int>(nullable: true),
                    OrganizationId = table.Column<long>(nullable: true),
                    DonationRequest_AddressId = table.Column<long>(nullable: true),
                    DonationRequest_StatusId = table.Column<long>(nullable: true),
                    UserId = table.Column<long>(nullable: true),
                    FinishDate = table.Column<DateTime>(nullable: true),
                    DonationRequestItem_Title = table.Column<string>(nullable: true),
                    DonationRequestItem_Observation = table.Column<string>(nullable: true),
                    CurrentQuantity = table.Column<decimal>(nullable: true),
                    FinishQuantity = table.Column<decimal>(nullable: true),
                    DonationRequestItem_DonationRequestId = table.Column<long>(nullable: true),
                    Organization_Name = table.Column<string>(nullable: true),
                    Organization_Description = table.Column<string>(nullable: true),
                    ContactName = table.Column<string>(nullable: true),
                    ContactPhone = table.Column<string>(nullable: true),
                    ContactPosition = table.Column<string>(nullable: true),
                    ContactEmail = table.Column<string>(nullable: true),
                    Role_Name = table.Column<string>(nullable: true),
                    Role_Description = table.Column<string>(nullable: true),
                    Status_Name = table.Column<string>(nullable: true),
                    Status_Description = table.Column<string>(nullable: true),
                    Unit_Name = table.Column<string>(nullable: true),
                    Unit_Description = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    User_Email = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    IdentityNumber = table.Column<string>(nullable: true),
                    IsEnabled = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_DonationRequestId",
                        column: x => x.DonationRequestId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_DonationId",
                        column: x => x.DonationId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_DonationRequestItemId",
                        column: x => x.DonationRequestItemId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_DonationItem_StatusId",
                        column: x => x.DonationItem_StatusId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_DonationRequest_AddressId",
                        column: x => x.DonationRequest_AddressId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_DonationRequest_StatusId",
                        column: x => x.DonationRequest_StatusId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_UserId",
                        column: x => x.UserId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entity_Entity_DonationRequestItem_DonationRequestId",
                        column: x => x.DonationRequestItem_DonationRequestId,
                        principalTable: "Entity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Entity_AddressId",
                table: "Entity",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_DonationRequestId",
                table: "Entity",
                column: "DonationRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_StatusId",
                table: "Entity",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_DonationId",
                table: "Entity",
                column: "DonationId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_DonationRequestItemId",
                table: "Entity",
                column: "DonationRequestItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_DonationItem_StatusId",
                table: "Entity",
                column: "DonationItem_StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_UnitId",
                table: "Entity",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_DonationRequest_AddressId",
                table: "Entity",
                column: "DonationRequest_AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_OrganizationId",
                table: "Entity",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_DonationRequest_StatusId",
                table: "Entity",
                column: "DonationRequest_StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_UserId",
                table: "Entity",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Entity_DonationRequestItem_DonationRequestId",
                table: "Entity",
                column: "DonationRequestItem_DonationRequestId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Entity");
        }
    }
}
