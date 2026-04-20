# Nicknames App

A simple yet robust application for managing nicknames associated with full names.

## Features
- **Nickname CRUD**: Create, read, update, and delete nicknames for any given full name.
- **Random Generation**: Generate a random nickname for a specific full name.
- **Multi-tenancy**: Organization-based data isolation.
- **Role-Based Access Control (RBAC)**:
    - **Generator**: Can generate nicknames.
    - **Viewer**: Can view all nicknames in the organization.
    - **Editor**: Can create new names and nicknames.
    - **Admin**: Can invite new users to the organization.
- **Authentication**: OAuth2 supporting database and social logins.

## Tech Stack
- **Frontend/Edge API**: Next.js
- **Backend API**: Python (Django)
- **Database**: PostgreSQL
- **Package Management**: `uv` (Python)
- **Typing**: `mypy`
- **Infrastructure**: Docker (for local development and deployment)

## Getting Started
*(Detailed setup instructions will be added as the project evolves)*

1. Clone the repository.
2. Run Docker containers: `docker-compose up -d`.
3. Run migrations and seed the database: `docker-compose exec backend python manage.py migrate && docker-compose exec backend python manage.py seed_data`.

## Architecture
This project is a monorepo with clear separation between the frontend and backend services.
- `/frontend`: Next.js application and edge functions.
- `/backend`: Django API, ORM models, and business logic.
- `/docker`: Dockerfiles and orchestration configurations.
