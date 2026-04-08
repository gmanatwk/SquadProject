# Manual SQL Scripts Guide

## When to Use
- No .NET/EF Core environment
- Manual DB setup or troubleshooting

## Script Naming
- `create-database.sql` — Creates DB
- `create-tables.sql` — Schema
- `seed-data.sql` — Test data

## How to Run
- Use Azure Data Studio, SSMS, or `sqlcmd`:
```bash
sqlcmd -S localhost -U sa -P Your_password123 -i create-database.sql
```
- Run scripts in order: create-database, create-tables, seed-data
