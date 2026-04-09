# SquadProject API (Backend)

## 1. Project Overview

This is the ASP.NET Core backend for SquadProject. It provides:
- **REST API for unit conversion** (length, weight, volume, speed, temperature)
- **Random data generators**: GUID, numbers, Person, Address
- **Database integration** with SQL Server (via EF Core)
- **MCP host** for extended capabilities
- **Tech stack**: ASP.NET Core 8 (LTS), EF Core, SQL Server

## 2. Directory Structure

- `Controllers/` — REST endpoints ([UnitConversionController](Controllers/UnitConversionController.cs), [RandomGeneratorController](Controllers/RandomGeneratorController.cs))
- `Services/` — Business logic ([UnitConversionService](Services/UnitConversionService.cs), [RandomGeneratorService](Services/RandomGeneratorService.cs))
- `Data/` — EF Core DbContext, entities, configurations ([ApplicationDbContext](Data/ApplicationDbContext.cs))
- `Models/` — DTOs for requests/responses
- `Middleware/` — Custom middleware (exception handling, logging)
- `MCP/` — MCP host implementation ([MCPHostService](MCP/MCPHostService.cs))
- `Migrations/` — EF Core database migrations
- `Tests/` — xUnit integration tests

## 3. Prerequisites

- [.NET SDK 8.0 (LTS)](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (local, Docker, or cloud)
- [Git](https://git-scm.com/)
- [Visual Studio](https://visualstudio.microsoft.com/), [VS Code](https://code.visualstudio.com/), or [JetBrains Rider](https://www.jetbrains.com/rider/) (optional)

## 4. Installation

```bash
# Restore NuGet packages
dotnet restore
```

## 5. Database Setup

- Configure the connection string in `appsettings.json`:
  ```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SquadProjectDb;User Id=sa;Password=your_password;"
  }
  ```
- For local SQL Server, use [SQL Server Express](https://aka.ms/sqlexpress) or Docker:
  ```bash
  docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Your_password123" -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
  ```
- Run migrations:
  ```bash
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```
- (Optional) Seed data if implemented.

## 6. Building

```bash
dotnet build
```
- Output: `bin/Debug/net8.0/` or `bin/Release/net8.0/`
- Use `-c Release` for production builds
- Build validation: errors/warnings shown in output

## 7. Running the API

```bash
dotnet run
```
- Default port: 5000 (HTTP), 5001 (HTTPS)
- Base URL: [http://localhost:5000](http://localhost:5000)
- Swagger UI: [http://localhost:5000/swagger](http://localhost:5000/swagger)
- Health check: `/health` (if configured)

## 8. API Endpoints

| Method | Endpoint                        | Description             |
|--------|----------------------------------|-------------------------|
| POST   | /api/unitconversion/convert      | Convert units           |
| GET    | /api/unitconversion/units        | Get supported units     |
| GET    | /api/randomgenerator/guid        | Generate GUID           |
| POST   | /api/randomgenerator/numbers     | Generate random numbers |
| GET    | /api/randomgenerator/person      | Generate random person  |
| GET    | /api/randomgenerator/address     | Generate random address |

See [API_ENDPOINTS.md](../API_ENDPOINTS.md) for details.

## 9. Testing

```bash
dotnet test
```
- Test projects: `*.Tests`
- Coverage reports: see output or use `coverlet`
- Coverage target: >70%

## 10. Key Dependencies

- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- Swashbuckle.AspNetCore (Swagger/OpenAPI)
- xUnit, Moq (testing)
- (If used) MCP-related packages

## 11. Configuration

- `appsettings.json` — development settings
- `appsettings.Production.json` — production settings
- Environment variables override config files
- `ConnectionStrings:DefaultConnection` — database
- Logging: configure in `appsettings.*.json`
- CORS: allow frontend communication (see `Program.cs`)

### Local development notes

- A default `appsettings.json` is present at [backend/SquadProject.Api/appsettings.json](appsettings.json) and provides a local `ConnectionStrings:DefaultConnection` fallback for development.
- The project exposes a strongly-typed `BackendSettings` model at [backend/SquadProject.Api/Configuration/BackendSettings.cs](Configuration/BackendSettings.cs). The app prefers environment variables (or CI/CD secrets) and falls back to `appsettings.json` values when running locally.
- A `launchSettings.json` is provided at [backend/SquadProject.Api/Properties/launchSettings.json](Properties/launchSettings.json) with an example development profile and example environment variables. Use Visual Studio or `dotnet run` to start the app.

## 12. Environment Variables

- `ASPNETCORE_ENVIRONMENT` (Development, Production, Staging)
- `ConnectionStrings:DefaultConnection` (database URL)
- `ASPNETCORE_URLS` (port binding)

## 13. Logging & Monitoring

- Uses `ILogger` in services/controllers
- Log levels: Information, Warning, Error
- (Optional) Application Insights integration

## 14. Error Handling

- Custom exception middleware
- Standardized error responses (JSON)
- HTTP status codes (400, 404, 500, etc.)
- Errors logged

## 15. Troubleshooting

- **Database connection errors**: check connection string, ensure SQL Server is running
- **Migrations pending**: run `dotnet ef database update`
- **Port in use**: change in `appsettings.json` or set `ASPNETCORE_URLS`
- **Build failures**: run `dotnet restore`
- **Tests failing**: ensure DB is migrated, dependencies installed

## 16. Development Workflow

1. Add models in `Data/Entities/`
2. Update `ApplicationDbContext`
3. Add service interface/implementation
4. Add controller endpoints
5. Write integration tests
6. Add migrations if schema changed

## 17. Contributing

- Follow code style/conventions
- Use async/await (all services async-ready)
- Register services in `Program.cs` (dependency injection)
- Maintain >70% test coverage

## 18. Links & Resources

- [Main project README](../../README.md)
- [Frontend documentation](../../frontend/README.md)
- [Test strategy](../../tests/TEST_STRATEGY.md)
- [API endpoint details](../API_ENDPOINTS.md)
