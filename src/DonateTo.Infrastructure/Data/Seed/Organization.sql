INSERT INTO Contact VALUES (
    (1, 'Ines', 'Casares', 'ines@softvision.com', '12345678', '44444444', 'Head Studio', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
) ON CONFLICT DO NOTHING

INSERT INTO Organization VALUES (
    (1, 'Cognizant Softvision', 'Better together', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
) ON CONFLICT DO NOTHING

INSERT INTO [Address] VALUES (
    (1 'Zufriategui 627', '1638', '5', 'A', 'No additional information', 1, 10, 208, 65654, 1, 1,'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
) ON CONFLICT DO NOTHING