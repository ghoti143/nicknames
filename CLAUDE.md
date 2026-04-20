# Project Context: Nicknames App

## Core Goal
An app to manage nicknames associated with full names, featuring organization-level isolation and role-based permissions.

## Technical Requirements
- **Frontend**: Next.js (Frontend + Edge API).
- **Backend**: Python/Django.
- **DB**: PostgreSQL.
- **Auth**: OAuth2 (Local + Social).
- **Python Tooling**: `uv` for package management, `mypy` for static typing.
- **Infrastructure**: Docker-based local environment.
- **Database Mgmt**: Django ORM migrations + seed scripts.

## Domain Model & Permissions
- **Orgs**: Data isolation per organization.
- **Permissions**:
    - `Generate`: Can trigger random nickname generation.
    - `View`: Can read all nicknames in their org.
    - `Create`: Can add new names/nicknames.
    - `Invite`: Can manage organization membership.

## Development Guidelines
- **Monorepo**: Keep `/frontend` and `/backend` strictly separated.
- **DX**: Ensure `docker-compose up` and a seed script provide a fully working local environment.
- **Typing**: All Python code must be typed and pass `mypy` checks.
