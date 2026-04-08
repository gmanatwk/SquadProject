# TestQALead — History

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
- TestQALead is the quality gate for all code artifacts

## Learnings

- Architectural notes: controllers should remain thin; business logic centralized in services to facilitate unit testing and mocking.
- Test priorities: implement unit tests for services and utility functions first, followed by controller tests and API contract validation, then integration tests covering DB interactions.
- Observations: frontend structure follows standard React + RTK patterns; add dependency inversion for easier mocking where necessary.
- Risks: DB-dependent features and integration with external services are highest risk for flakiness; prioritize fixtures and TestContainers.
- Next steps: add test skeletons, CI coverage gating, and coordinate with DevOps to provide test DB in CI.
