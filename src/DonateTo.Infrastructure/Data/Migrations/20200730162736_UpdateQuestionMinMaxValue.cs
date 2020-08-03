﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class UpdateQuestionMinMaxValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "MaximumRelative",
                table: "QuestionOption",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MinimumRelative",
                table: "QuestionOption",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Max",
                table: "Question",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Min",
                table: "Question",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaximumRelative",
                table: "QuestionOption");

            migrationBuilder.DropColumn(
                name: "MinimumRelative",
                table: "QuestionOption");

            migrationBuilder.DropColumn(
                name: "Max",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "Min",
                table: "Question");
        }
    }
}
