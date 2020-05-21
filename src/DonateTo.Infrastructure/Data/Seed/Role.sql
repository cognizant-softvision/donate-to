INSERT INTO public."Role" ("Id", "Name", "NormalizedName", "ConcurrencyStamp", "Description", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'Superadmin', 'SUPERADMIN', NULL, 'All access rights', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(2, 'Admin', 'ADMIN	', NULL, 'Administrator access rights', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(3, 'Organization', 'ORGANIZATION', NULL, 'Organization access rights', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(4, 'Donor', 'DONOR', NULL, 'Donor access rights', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;