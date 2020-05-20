INSERT INTO public."Contact" 
("Id", "FirstName", "LastName", "Email", "IdentityNumber", "PhoneNumber", "Position", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'Ines', 'Casares', 'ines@softvision.com', '12345678', '44444444', 'Head Studio', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;

INSERT INTO public."Organization"
("Id", "Name", "Description", "ContactId", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'Cognizant Softvision', 'Better together', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;

INSERT INTO public."Address"
("Id", "Street", "PostalCode", "Floor", "Appartment", "AdditionalInformation", "IsDefault", "CountryId", "StateId", "CityId", "ContactId",  "OrganizationId", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'Zufriategui 627', '1638', '5', NULL, NULL, TRUE, 10, 208, 65654, 1, 1,'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;