using Microsoft.EntityFrameworkCore.Migrations;
using System.IO;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class RunDataSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/Country.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/State.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/City1.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/City2.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/City3.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/City4.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/City5.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/City6.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/City7.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/City8.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/Status.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/Category.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/Unit.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/Organization.sql"));
            migrationBuilder.Sql(File.ReadAllText("../DonateTo.Infrastructure/Data/Seed/Role.sql"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
