Tests README

Running tests locally
- Frontend: cd frontend && npm install && npm test
- Backend: cd backend && dotnet test

Coverage
- Frontend: npm run test -- --coverage
- Backend: dotnet test /p:CollectCoverage=true

CI Integration
- Contract tests validate OpenAPI contract file: tests/contracts/unit-conversion-api.contract.json
- Pipelines must fail on coverage regressions

Notes
- Integration tests require a running SQL Server instance or TestContainers in CI
- See TEST_STRATEGY.md for targets and quality gates
