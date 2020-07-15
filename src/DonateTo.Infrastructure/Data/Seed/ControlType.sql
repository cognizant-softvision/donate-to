INSERT INTO public."ControlType" ("Name", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES 
('Textbox', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
('Radio', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
('Checkbox', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
('Dropdown', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))