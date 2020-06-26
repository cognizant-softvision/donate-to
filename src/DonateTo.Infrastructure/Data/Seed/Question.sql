INSERT INTO public."Question" ("Id", "Key", "Label", "Required", "Order", "ControlType", "Type", "Value", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'brave', 'Bravery Rating', null, 3, 'dropdown', null, null, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(2, 'age', 'Age', null, 1, 'textbox', 'number', null, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(3, 'gender', 'Gender', null, 2, 'radiobutton', 'gender', null, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(4, 'vehicle', 'Vehicle', null, 4, 'checkbox', 'vehicle', null, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))
ON CONFLICT DO NOTHING;

INSERT INTO public."QuestionOption" ("Id", "Key", "Value", "QuestionId", "CreatedBy", "CreatedDate", "UpdateBy", "UpdateDate")
VALUES
(1, 'solid', 'Solid', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(2, 'great', 'Great', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(3, 'good', 'Good', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(4, 'unproven', 'Unproven', 1, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(5, 'male', 'Male', 3, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(6, 'female', 'Female', 3, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(7, 'other', 'Other', 3, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(8, 'car', 'Car', 4, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(9, 'boat', 'Boat', 4, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc')),
(10, 'bicycle', 'Bicycle', 4, 'DataSeed', (SELECT now() at time zone 'utc'), 'DataSeed', (SELECT now() at time zone 'utc'))

ON CONFLICT DO NOTHING;