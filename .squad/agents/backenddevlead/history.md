# BackendDevLead — History

## Core Context

- **Team:** LeadArchitect (Lead), FrontendDevLead, BackendDevLead, DevOpsInfraLead, TestQALead, Scribe, Ralph
- **Project:** SquadProject — Unit conversion + random generator web app
- **Tech Stack:**
  - Frontend: React 18+, TypeScript, Redux Toolkit, React Hook Form
  - Backend: ASP.NET Core (latest), MCP host
  - Database: SQL Server
  - Infrastructure: Terraform, GitHub Actions for CI/CD
- **User:** George V. Mavroudes
- **Created:** 2026-04-08

## Key Decisions

- Naming convention: Role-based names

## Learnings

- Created EF Core entity scaffolding under backend\SquadProject.Api\Data\Entities and configurations under Data\Configurations.
- Added ApplicationDbContext at backend\SquadProject.Api\Data\ApplicationDbContext.cs and scaffolded controllers and services under Controllers and Services.
- Placed MCP host stub at backend\SquadProject.Api\MCP\MCPHostService.cs and added decisions and skill notes under .squad.
- Key file paths:
  - backend\SquadProject.Api\Data\Entities
  - backend\SquadProject.Api\Data\Configurations
  - backend\SquadProject.Api\Controllers
  - backend\SquadProject.Api\Services
  - backend\SquadProject.Api\MCP

## New learnings from service implementation

- Implemented in-memory unit dictionary with base units (meter, kilogram, liter, m/s) and factors; temperature uses formula-based conversion.
- Chose to keep data in-memory for now to avoid database migrations; added clear points to migrate to Unit repository if needed.
- Random generator uses Random.Shared and seeded name/address lists for realistic output; validation for ranges and counts added.
- Added global exception middleware and custom exceptions for clearer API errors.

*(Session-specific insights captured here)*
