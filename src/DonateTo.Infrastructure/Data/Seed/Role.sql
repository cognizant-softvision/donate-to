INSERT INTO [Role] VALUES
(
    (1, 'Superadmin', 'Superadmin', NULL, 'All access rights', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
    (2, 'Admin', 'Administrator', NULL, 'Administrator access rights', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
    (3, 'Organization', 'Organization', NULL, 'Organization access rights', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
    (4, 'Donor', 'Donor', NULL, 'Donor access rights', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
) ON CONFLICT DO NOTHING