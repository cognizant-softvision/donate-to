using Microsoft.EntityFrameworkCore.Migrations;

namespace DonateTo.Infrastructure.Migrations
{
    public partial class AddedFTSIndexes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
                    migrationBuilder.Sql( @"
                    CREATE EXTENSION pg_trgm;
                    CREATE EXTENSION btree_gin;
                    
                    CREATE INDEX ""IX_fts_organization"" ON ""Organization"" USING gin(""Name"" gin_trgm_ops);
                    CREATE INDEX ""IX_fts_donationsrequest"" ON ""DonationRequest"" USING gin(""Title"" gin_trgm_ops);
                    CREATE INDEX ""IX_fts_donationrequestitem"" ON ""DonationRequestItem"" USING gin(""Name"" gin_trgm_ops);
                    CREATE INDEX ""IX_fts_categorie"" ON ""Category"" USING gin(""Name"" gin_trgm_ops);            
                    "
                    );

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql( @"
            DROP  EXTENSION pg_trgm;
            DROP  EXTENSION btree_gin;

            DROP INDEX ""IX_fts_organizations"" ON ""Organizations"";
            DROP INDEX ""IX_fts_donationsrequest"" ON ""DonationRequests"";
            DROP INDEX ""IX_fts_donationrequestitems"" ON ""DonationRequestItems"";
            DROP INDEX ""IX_fts_donationitems"" ON ""DonationItems"";
            DROP INDEX ""IX_fts_categories"" ON ""Categories"";
            "
            );
        }
    }
}
