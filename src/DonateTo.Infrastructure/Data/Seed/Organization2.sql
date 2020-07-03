DELETE FROM public."DonationRequestItem" WHERE "DonationRequestId" IN (SELECT "Id" FROM public."DonationRequest" WHERE "OrganizationId" > 1);

DELETE FROM public."DonationRequest" WHERE "OrganizationId" > 1;

DELETE FROM public."Address" Where "Id" > 1;

DELETE FROM public."Contact" WHERE "Id" > 1;

DELETE FROM public."Organization" WHERE "Id" > 1;


INSERT INTO public."Contact" 
("FirstName", "LastName", "Email", "IdentityNumber", "PhoneNumber", "Position", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
('Brian', 'Humphries', 'abcdefghi@cognizant.com', '12345678', '44444444', 'CEO', 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;

INSERT INTO public."Organization"
("Name", "Description", "ContactId", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
('Cognizant', 'Passion for building stronger businesses.', (SELECT "Id" FROM public."Contact" WHERE "FirstName" = 'Brian' AND  "LastName" = 'Humphries'), 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;

INSERT INTO public."Address"
("Street", "PostalCode", "Floor", "Appartment", "AdditionalInformation", "IsDefault", "CountryId", "StateId", "CityId", "ContactId",  "OrganizationId", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
('Tucuman 3720', '1189', '5', NULL, NULL, TRUE, 10, 214, 71320, 
	(SELECT "Id" FROM public. "Contact" WHERE "FirstName" = 'Brian' AND  "LastName" = 'Humphries'),
	(SELECT "Id" FROM public."Organization" WHERE "Name" = 'Cognizant'), 
	'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;