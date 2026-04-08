-- Create tables for SquadProject

-- Table: UnitConversion
-- Stores unit conversion factors
CREATE TABLE UnitConversion (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FromUnit NVARCHAR(50) NOT NULL,
    ToUnit NVARCHAR(50) NOT NULL,
    Factor FLOAT NOT NULL,
    CONSTRAINT UQ_UnitConversion UNIQUE (FromUnit, ToUnit)
);

-- Table: Person
-- Stores person data for random generator
CREATE TABLE Person (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(50),
    Age INT
);

-- Table: Address
-- Stores addresses linked to persons
CREATE TABLE Address (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PersonId INT NOT NULL,
    Street NVARCHAR(200) NOT NULL,
    City NVARCHAR(100) NOT NULL,
    State NVARCHAR(50) NOT NULL,
    ZipCode NVARCHAR(20) NOT NULL,
    Country NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_Address_Person FOREIGN KEY (PersonId) REFERENCES Person(Id)
);
