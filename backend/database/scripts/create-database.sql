-- Create SquadProject database
CREATE DATABASE SquadProject
ON PRIMARY (
    NAME = SquadProject_Data,
    FILENAME = 'C:\\SqlData\\SquadProject_Data.mdf',
    SIZE = 20MB,
    MAXSIZE = 200MB,
    FILEGROWTH = 5MB
)
LOG ON (
    NAME = SquadProject_Log,
    FILENAME = 'C:\\SqlData\\SquadProject_Log.ldf',
    SIZE = 10MB,
    MAXSIZE = 100MB,
    FILEGROWTH = 2MB
)
COLLATE SQL_Latin1_General_CP1_CI_AS;

ALTER DATABASE SquadProject SET RECOVERY SIMPLE;
ALTER DATABASE SquadProject SET COMPATIBILITY_LEVEL = 150;
