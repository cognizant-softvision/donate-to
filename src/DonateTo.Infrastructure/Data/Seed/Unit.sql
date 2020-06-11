INSERT INTO public."UnitType" ("Id", "Name", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'Length', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(2, 'Capacity', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(3, 'Area', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(4, 'Volume', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(5, 'Mass', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(6, 'Quantity', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;

INSERT INTO public."Unit" ("Id", "Name", "Description", "Code", "UnitTypeId", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'Meter', 'Meter', 'm', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(2, 'Centimeter', 'centimeter', 'cm', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(3, 'Inch', 'Inch', 'in', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(4, 'Foot', 'Foot', 'ft', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(5, 'Fluid Ounce', 'Fluid Ounce', 'fl oz', 2, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(6, 'Gallon', 'Gallon', 'gal', 2, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(7, 'Square Meter', 'Square Meter', 'm2', 3, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(8, 'Square Centimeter', 'Square Centimeter', 'cm2', 3, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(9, 'Square Foot', 'Square Foot', 'sqft', 3, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(10, 'Square Inch', 'Square Inch', 'sqin', 3, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(11, 'Cubic Centimeter', 'Cubic Centimeter', 'cm3', 4, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(12, 'Cubic Meter', 'Cubic Meter', 'm3', 4, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(13, 'Cubic Inch', 'Cubic Inch', 'cui', 4, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(14, 'Gram', 'Gram', 'g', 5, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(15, 'Kilogram', 'Kilogram', 'kg', 5, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(16, 'Pound', 'Pound', 'lb', 5, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(17, 'Ounce', 'Ounce', 'oz', 5, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(18, 'Stone', 'Stone', 'st', 5, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(19, 'Units', 'Units', 'u', 6, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(20, 'Mililitre', 'Mililitre', 'ml', 2, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(21, 'Litre', 'Litre', 'l', 2, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;