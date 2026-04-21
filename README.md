# Nicknames App

A simple yet robust application for managing nicknames associated with full names.

## Features
- **Nickname CRUD**: Create, read, update, and delete nicknames for any given full name.
- **Random Generation**: Generate a random nickname for a specific full name.
- **Multi‑tenancy**: Organization‑based data isolation.
- **Role‑Based Access Control (RBAC)**:
    - **Generator**: Can generate nicknames.
    - **Viewer**: Can view all nicknames in the organization.
    - **Editor**: Can create new names and nicknames.
    - **Admin**: Can invite new users to the organization.
- **Authentication**: OAuth2 supporting database and social logins.

## Tech Stack
- **Frontend / Edge API**: Next.js (v16) with Bun as the package manager.
- **Backend API**: .NET 10 (C#) Web API.
- **Database**: PostgreSQL running in Docker for local development.
- **Infrastructure**: Docker Compose orchestrates the PostgreSQL container and the .NET API container.
- **Build / Dev Tools**: Makefile provides convenient alias commands, Biome for linting/formatting.

## Prerequisites
- Docker & Docker Compose
- .NET 10 SDK (https://dotnet.microsoft.com/download)
- Bun (or Node.js) – install with `npm i -g bun` or follow https://bun.sh
- Make (usually pre‑installed on macOS/Linux)

## Quick Start (Local Development)
```bash
# 1. Clone the repo
git clone https://github.com/ghoti143/nicknames.git
cd nicknames

# 2. Install frontend dependencies
cd apps/frontend && bun install && cd -

# 3. Spin up Docker services (Postgres + .NET API)
make start

# 4. Run the Next.js dev server (frontend)
make frontend-dev
```
- Frontend available at **http://localhost:3000**
- Backend API available at **http://localhost:8888/api/nicknames** (adjust `NEXT_PUBLIC_API_URL` if needed)

## Useful Make Commands
- `make start`    – Bring up PostgreSQL and .NET API containers.
- `make stop`    – Shut down all Docker containers.
- `make restart`   – Restart the Docker services.
- `make logs`    – Tail logs from both containers.
- `make frontend-dev` – Run `bun dev` for the Next.js app.
- `make backend-dev` – Run the .NET API locally (no Docker, good for IDE debugging).
- `make backend-build` – Build the .NET API Docker image.
- `make backend-run` – Start only the API container (DB must already be up).
- `make lint`    – Run Biome linting.
- `make fmt`    – Run Biome formatter.
- `make test`   – Placeholder for future test suite.
- `make clean`   – Tear down Docker containers, remove images, and delete `node_modules`.

## Next Steps
- **Add tests**:
    - Backend: `dotnet test` with a test project (e.g., xUnit, NUnit).
    - Frontend: set up Jest/Vitest and write component/unit tests.
- Integrate CI/CD pipelines to run linting, formatting checks, and tests on each PR.
- Consider generating TypeScript types from the .NET API OpenAPI spec for type‑safe client code.
- Extend the Docker Compose setup for integration testing (e.g., spin up a test Postgres instance).

## Architecture Overview
```
/nicknames
├─ apps
│  ├─ frontend   ← Next.js app (Edge API)
│  └─ backend    ← .NET 10 Web API
├─ docker-compose.yml   ← orchestrates PostgreSQL and .NET API containers
└─ Makefile              ← helper commands for dev workflow
```

Happy hacking!