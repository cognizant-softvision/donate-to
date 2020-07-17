using System;
using System.IO;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AddControlTypeEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ControlType",
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
                    table.PrimaryKey("PK_ControlType", x => x.Id);
                });

            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/ControlType.sql"));

            migrationBuilder.DropColumn(
                name: "ControlType",
                table: "Question");

            migrationBuilder.AddColumn<long>(
                name: "ControlTypeId",
                table: "Question",
                nullable: false,
                defaultValue: 1L);

            migrationBuilder.CreateIndex(
                name: "IX_Question_ControlTypeId",
                table: "Question",
                column: "ControlTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Question_ControlType_ControlTypeId",
                table: "Question",
                column: "ControlTypeId",
                principalTable: "ControlType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Question_ControlType_ControlTypeId",
                table: "Question");

            migrationBuilder.DropTable(
                name: "ControlType");

            migrationBuilder.DropIndex(
                name: "IX_Question_ControlTypeId",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "ControlTypeId",
                table: "Question");

            migrationBuilder.AddColumn<string>(
                name: "ControlType",
                table: "Question",
                type: "text",
                nullable: true);
        }
    }
}
