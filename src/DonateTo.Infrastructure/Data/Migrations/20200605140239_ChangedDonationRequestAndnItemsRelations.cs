﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class ChangedDonationRequestAndnItemsRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DonationItem_Unit_UnitId",
                table: "DonationItem");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "DonationRequestItem");

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "TimeEnd",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "TimeStart",
                table: "Donation");

            migrationBuilder.AddColumn<long>(
                name: "UnitId",
                table: "DonationRequestItem",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<DateTime>(
                name: "FinishDate",
                table: "DonationRequest",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<long>(
                name: "UnitId",
                table: "DonationItem",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Availability",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdateBy = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    DayOfWeek = table.Column<int>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false),
                    DonationId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Availability", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Availability_Donation_DonationId",
                        column: x => x.DonationId,
                        principalTable: "Donation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DonationRequestItem_UnitId",
                table: "DonationRequestItem",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Availability_DonationId",
                table: "Availability",
                column: "DonationId");

            migrationBuilder.AddForeignKey(
                name: "FK_DonationItem_Unit_UnitId",
                table: "DonationItem",
                column: "UnitId",
                principalTable: "Unit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DonationRequestItem_Unit_UnitId",
                table: "DonationRequestItem",
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

            migrationBuilder.DropForeignKey(
                name: "FK_DonationRequestItem_Unit_UnitId",
                table: "DonationRequestItem");

            migrationBuilder.DropTable(
                name: "Availability");

            migrationBuilder.DropIndex(
                name: "IX_DonationRequestItem_UnitId",
                table: "DonationRequestItem");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "DonationRequestItem");

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "DonationRequestItem",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "FinishDate",
                table: "DonationRequest",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "UnitId",
                table: "DonationItem",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "Donation",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TimeEnd",
                table: "Donation",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TimeStart",
                table: "Donation",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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