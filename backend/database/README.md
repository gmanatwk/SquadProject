# Database Folder Overview

This folder contains all resources for managing the SQL Server database for SquadProject.

## Structure

- `migrations/` — EF Core migration scripts and docs
- `scripts/` — Manual SQL scripts for DB creation, schema, and seeding
- `DATABASE_SETUP.md` — Step-by-step setup guide

## Tech Stack
- SQL Server
- Entity Framework Core (EF Core)

## Connection String Example
```
Server=localhost;Database=SquadProject;User Id=sa;Password=Your_password123;TrustServerCertificate=True;
```

## Quick Start
See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for setup instructions.

---

- [Manual Scripts Guide](./scripts/README.md)
- [Migrations Guide](./migrations/README.md)
