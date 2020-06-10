using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace DonateTo.IdentityServer.Data.Migrations.IdentityServer.ConfigurationDb
{
    public partial class seedrootuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            var user = new User
            {
                FirstName = "SuperGroot",
                LastName = "SuperGroot",
                Email = "SuperGroot@SuperGroot.com",
                NormalizedEmail = "SUPERGROOT@SUPERGROOT.COM",
                UserName = "SuperGroot@SuperGroot.com",
                NormalizedUserName = "SUPERGROOT@SUPERGROOT.COM",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D")
            };            

            var password = new PasswordHasher<User>();
            var hashed = password.HashPassword(user, "NotARootPass69");
            user.PasswordHash = hashed;

            migrationBuilder.InsertData(
                "User",
                columns: new string[] {"FirstName","LastName","Email",
                            "NormalizedEmail","UserName",
                            "NormalizedUserName","PhoneNumber",
                            "EmailConfirmed","PhoneNumberConfirmed","SecurityStamp","PasswordHash"
                            ,"TwoFactorEnabled", "LockoutEnabled","AccessFailedCount",
                            "IsEnabled", "CreatedDate", "UpdateDate"},
                values: new object[] {user.FirstName,user.LastName,user.Email,
                    user.NormalizedEmail,user.UserName,user.NormalizedUserName,
                    user.PhoneNumber,user.EmailConfirmed,user.PhoneNumberConfirmed,
                    user.SecurityStamp, user.PasswordHash, false, false, 0, true, DateTime.Now, DateTime.Now }
                );
            migrationBuilder.Sql(@$"Insert into ""UserRole"" (""UserId"", ""RoleId"") values (
            (select ""Id"" from ""User"" where ""Email""='{user.Email}' limit 1), 
            (select ""Id"" from ""Role"" where ""Name""='Superadmin' limit 1));");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
