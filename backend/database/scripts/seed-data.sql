-- Seed data for SquadProject
-- Unit Conversions
INSERT INTO UnitConversion (FromUnit, ToUnit, Factor) VALUES
('meter', 'centimeter', 100.0),
('kilogram', 'gram', 1000.0),
('celsius', 'fahrenheit', 1.8);

-- Persons
INSERT INTO Person (FirstName, LastName, Email) VALUES
('Alice', 'Smith', 'alice.smith@example.com'),
('Bob', 'Johnson', 'bob.johnson@example.com');

-- Addresses
INSERT INTO Address (PersonId, Street, City, State, Zip) VALUES
(1, '123 Main St', 'Springfield', 'IL', '62701'),
(2, '456 Oak Ave', 'Lincoln', 'NE', '68508');
