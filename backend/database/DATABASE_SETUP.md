# Database Setup Guide

This guide explains how to set up the SquadProject SQL Server database.

## Prerequisites
- SQL Server (local, Docker, or cloud)
- SQL client tools (Azure Data Studio, SSMS, or sqlcmd)
- .NET SDK (for EF Core migrations)

## Setup Paths

### 1. Using EF Core Migrations (Recommended)
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 2. Using Manual SQL Scripts
- Run scripts in `scripts/` in order:
  1. `create-database.sql`
  2. `create-tables.sql`
  3. `seed-data.sql`

### 3. Using Docker SQL Server
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Your_password123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

## Connection String
```
Server=localhost;Database=SquadProject;User Id=sa;Password=Your_password123;TrustServerCertificate=True;
```

## Verification
- Connect and run:
```sql
SELECT name FROM sys.databases WHERE name = 'SquadProject';
SELECT COUNT(*) FROM sys.tables;
```

## Troubleshooting
- Check SQL Server is running and accessible
- Verify firewall and port 1433
- Ensure correct credentials
- For Docker, use `localhost,1433` as server
