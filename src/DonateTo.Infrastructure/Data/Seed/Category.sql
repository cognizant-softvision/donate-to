INSERT INTO public."Category" ("Id", "Name", "Description", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'Medicin', 'Medicin', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(2, 'Food', 'Food', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(3, 'Utility', 'Utility', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;