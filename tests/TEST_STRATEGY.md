Test Strategy for SquadProject

Overview
- Test Pyramid: Unit tests at base, Integration tests middle, End-to-end tests at top.
- Focus on fast, deterministic unit tests; integration tests for contracts and DB; E2E for critical flows.

Targets by layer
- Frontend: Components, hooks, Redux slices, forms, pages (React Testing Library & Jest)
- Backend: Controllers, Services, Repositories, Mappers (xUnit + Moq + Integration tests)
- Database: Integration tests using TestContainers or local SQL Server; sample data builders
- Infrastructure: Terraform plan validation and smoke tests in staging

Coverage targets
- Frontend: >=80% statement/branch/function
- Backend: >=70% statement/branch/function

Quality Gates
1. Unit tests passing, coverage thresholds met
2. Contract tests passing for public APIs (OpenAPI validation)
3. Integration tests (DB + API) passing in pipeline
4. E2E smoke tests in staging

Acceptance criteria
- PRs must include tests for new functionality, or a written justification
- No critical linting errors
- CI must enforce coverage and contract validation

Notes
- Use test data builders and fixtures to keep tests deterministic
- Mark long-running integration/E2E tests to run in separate pipeline stages
