INSERT INTO [Status] VALUES(
    (1, 'Draft', 'Draft', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
    (2, 'Pending', 'Pending', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
    (3, 'Completed', 'Completed', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
)