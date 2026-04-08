# FrontendDevLead — History

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

- Architecture: components organized under src/components/{common,features}, pages under src/pages, store under src/store with slices, types under src/types.
- Patterns: RTK slices per domain, hooks in src/hooks, React Hook Form wrappers under src/components/forms. Keep UI components presentational and wire logic via hooks/thunks.
- Preferences: TypeScript strict mode, small reusable primitives, prefer hooks for domain logic, minimal coupling to UI libs.
- Key files created:
  - frontend/src/components/common/Button.tsx
  - frontend/src/components/common/Input.tsx
  - frontend/src/components/forms/FormWrapper.tsx
  - frontend/src/components/forms/FormField.tsx
  - frontend/src/components/forms/FormButton.tsx
  - frontend/src/store/index.ts
  - frontend/src/store/slices/converterSlice.ts
  - frontend/src/store/slices/generatorSlice.ts
  - frontend/src/hooks/useUnitConversion.ts

*(Session-specific insights captured here)*

### API integration learnings (2026-04-08)

- API client design: centralized axios client with interceptors, type-safe request wrapper, and abort-signal support for cancellable requests.
- Redux: use createAsyncThunk with thunkAPI.signal to cancel inflight requests; keep slices focused (converter/generator) with selectors and small reducers.
- Forms: React Hook Form for validation, minimal presentational components, validate before dispatching thunks.
- Error strategy: global interceptor for logging, local error state in slices, UI-level toasts for user-facing errors.
