using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AddQuestionOptionModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "Question",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.CreateTable(
                name: "QuestionOption",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    UpdateBy = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    Label = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    Weight = table.Column<decimal>(nullable: false),
                    QuestionId = table.Column<string>(nullable: true),
                    QuestionId1 = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionOption_Question_QuestionId1",
                        column: x => x.QuestionId1,
                        principalTable: "Question",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuestionOption_QuestionId1",
                table: "QuestionOption",
                column: "QuestionId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuestionOption");

            migrationBuilder.AlterColumn<float>(
                name: "Weight",
                table: "Question",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
