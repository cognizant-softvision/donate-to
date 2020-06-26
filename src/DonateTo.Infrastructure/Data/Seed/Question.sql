INSERT INTO public."Question" ("Id", "Key", "Label", "Required", "Order", "ControlType", "Type", "Value", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'brave', 'Bravery Rating', null, 3, 'dropdown', null, null, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(2, 'firstName', 'First name', true, 1, 'textbox', null, null, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(3, 'emailAddress', 'Email', null, 2, 'dropdown', 'email', null, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;

INSERT INTO public."QuestionOption" ("Id", "Key", "Value", "QuestionId", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'solid', 'Solid', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(2, 'great', 'Great', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(3, 'good', 'Good', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(4, 'unproven', 'Unproven', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))

ON CONFLICT DO NOTHING;