# SquadProject

A full-stack web application using React (TypeScript), ASP.NET Core, SQL Server, Terraform, and GitHub Actions.

## Structure
- **frontend/**: React app (TypeScript, Redux Toolkit, React Hook Form)
- **backend/**: ASP.NET Core API (MCP host, EF Core, SQL Server)
- **infra/**: Terraform modules, GitHub Actions workflows
- **.squad/**: Team, decisions, skills

## Getting Started
See ADR in `.squad/decisions/inbox/leadarchitect-project-structure.md` for rationale and structure.

## Running the whole stack

This repository includes helper scripts to run the full stack (backend, frontend, and any required services) either locally or in Docker.

Run the full stack locally (PowerShell):

```powershell
# from repository root
.\run_all.ps1
```

Run the full stack with Docker Compose:

```powershell
# from repository root
.\run_all_docker.ps1
# or
docker-compose up --build
```

Build-only helpers:

```powershell
.\build_all.ps1   # build backend + frontend
.\build_all_docker.ps1  # build container images
```

Component-specific README files contain detailed instructions for running, developing, and testing each layer. See:

- Backend: [backend/SquadProject.Api/README.md](backend/SquadProject.Api/README.md)
- Frontend: [frontend/README.md](frontend/README.md)
- Infrastructure: [infra/README.md](infra/README.md)
- Tests & Strategy: [tests/README.md](tests/README.md)

For component-level development (e.g., running just the API or frontend), open the relevant README above. The top-level README focuses only on running the entire stack.
