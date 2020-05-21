using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AddAddressModelAndUnitType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactEmail",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "ContactName",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "ContactPhone",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "ContactPosition",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "ResponsableIdentityNumber",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "ResponsableInformation",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Address");

            migrationBuilder.AddColumn<long>(
                name: "UnitTypeId",
                table: "Unit",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ContactId",
                table: "Organization",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CityId",
                table: "Address",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ContactId",
                table: "Address",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CountryId",
                table: "Address",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Floor",
                table: "Address",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "OrganizationId",
                table: "Address",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StateId",
                table: "Address",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Contact",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdateBy = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    IdentityNumber = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Position = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Country",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdateBy = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    SortName = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    PhoneCode = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Country", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UnitType",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdateBy = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "State",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdateBy = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    CountryId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_State", x => x.Id);
                    table.ForeignKey(
                        name: "FK_State_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Country",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "City",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdateBy = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    StateId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_City", x => x.Id);
                    table.ForeignKey(
                        name: "FK_City_State_StateId",
                        column: x => x.StateId,
                        principalTable: "State",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Unit_UnitTypeId",
                table: "Unit",
                column: "UnitTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Organization_ContactId",
                table: "Organization",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_CityId",
                table: "Address",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_ContactId",
                table: "Address",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_CountryId",
                table: "Address",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_OrganizationId",
                table: "Address",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_StateId",
                table: "Address",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_City_StateId",
                table: "City",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_State_CountryId",
                table: "State",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_City_CityId",
                table: "Address",
                column: "CityId",
                principalTable: "City",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Contact_ContactId",
                table: "Address",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Country_CountryId",
                table: "Address",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Organization_OrganizationId",
                table: "Address",
                column: "OrganizationId",
                principalTable: "Organization",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_State_StateId",
                table: "Address",
                column: "StateId",
                principalTable: "State",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Organization_Contact_ContactId",
                table: "Organization",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Unit_UnitType_UnitTypeId",
                table: "Unit",
                column: "UnitTypeId",
                principalTable: "UnitType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_City_CityId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Address_Contact_ContactId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Address_Country_CountryId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Address_Organization_OrganizationId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Address_State_StateId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Organization_Contact_ContactId",
                table: "Organization");

            migrationBuilder.DropForeignKey(
                name: "FK_Unit_UnitType_UnitTypeId",
                table: "Unit");

            migrationBuilder.DropTable(
                name: "City");

            migrationBuilder.DropTable(
                name: "Contact");

            migrationBuilder.DropTable(
                name: "UnitType");

            migrationBuilder.DropTable(
                name: "State");

            migrationBuilder.DropTable(
                name: "Country");

            migrationBuilder.DropIndex(
                name: "IX_Unit_UnitTypeId",
                table: "Unit");

            migrationBuilder.DropIndex(
                name: "IX_Organization_ContactId",
                table: "Organization");

            migrationBuilder.DropIndex(
                name: "IX_Address_CityId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_ContactId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_CountryId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_OrganizationId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_StateId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "UnitTypeId",
                table: "Unit");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "Floor",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "Address");

            migrationBuilder.AddColumn<string>(
                name: "ContactEmail",
                table: "Organization",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactName",
                table: "Organization",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactPhone",
                table: "Organization",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactPosition",
                table: "Organization",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Address",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Address",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResponsableIdentityNumber",
                table: "Address",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResponsableInformation",
                table: "Address",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Address",
                type: "text",
                nullable: true);
        }
    }
}
