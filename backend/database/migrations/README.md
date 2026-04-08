# EF Core Migrations Guide

## Overview
EF Core migrations manage schema changes over time.

## Creating a Migration
```bash
dotnet ef migrations add {DescriptiveName}
dotnet ef database update
```

## Rollback
```bash
dotnet ef database update {PreviousMigration}
```

## Naming Convention
- Use descriptive names: `AddUserTable`, `UpdateAddressSchema`

## How It Works
- Migrations are tracked in this folder and applied in order.
