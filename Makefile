# ── Project settings ───────────────────────────────────────────────
FRONTEND_DIR   := apps/frontend
BACKEND_DIR    := apps/backend
DOCKER_COMPOSE := docker compose
BUN            := bun

.PHONY: all help start stop restart logs \
        frontend-dev backend-dev \
        backend-build backend-run \
        lint fmt test clean

# ── Help ───────────────────────────────────────────────────────────────
help:
	@echo "Available commands:"
	@echo "  make start          – Spin up Docker services (Postgres + .NET API)"
	@echo "  make stop           – Stop Docker services"
	@echo "  make restart        – Stop then start"
	@echo "  make logs           – Tail logs of both containers"
	@echo "  make frontend-dev   – Run Next dev server (http://localhost:3000)"
	@echo "  make backend-dev    – Run the .NET API locally (no Docker)"
	@echo "  make backend-build  – Build the .NET API Docker image"
	@echo "  make lint           – Run Biome linting"
	@echo "  make fmt            – Run Biome formatter"
	@echo "  make test           – Placeholder for future test suite"
	@echo "  make clean          – Remove Docker containers, images & node_modules"

# ── Core Docker workflow ───────────────────────────────────────────────
start:
	$(DOCKER_COMPOSE) up -d   # brings up db + api

stop:
	$(DOCKER_COMPOSE) down

restart: stop start

logs:
	$(DOCKER_COMPOSE) logs -f

# ── Front‑end ─────────────────────────────────────────────────────────────
frontend-dev:
	cd $(FRONTEND_DIR) && $(BUN) dev

# ── Back‑end (Docker) ───────────────────────────────────────────────────
backend-build:
	$(DOCKER_COMPOSE) build api   # builds the Docker image for the .NET API

backend-run:
	$(DOCKER_COMPOSE) up -d api   # run only the API (db must already be up)

# ── Back‑end (local) ───────────────────────────────────────────────────
backend-dev:
	# Runs the API directly with the local .NET SDK (good for IDE debugging)
	cd $(BACKEND_DIR) && dotnet run --project Backend.csproj

# ── Lint / format ───────────────────────────────────────────────────────
lint:
	$(BUN) biome check

fmt:
	$(BUN) biome format --write

# ── Test placeholder ───────────────────────────────────────────────────
test:
	@echo "Add your test runner here (e.g. jest, vitest, dotnet test, etc.)"

# ── Clean up ───────────────────────────────────────────────────────────
clean:
	# Stop everything
	$(DOCKER_COMPOSE) down -v
	# Remove the built API image (optional)
	$(DOCKER_COMPOSE) rm -f api
	# Remove node_modules (if you ever want a fresh install)
	rm -rf node_modules
