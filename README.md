# Nasser Construction Website

AdonisJS + Inertia + React application.

## Running with Docker

The project ships with a multi-stage `Dockerfile` and a `docker-compose.yml` that provisions the app and a PostgreSQL 16 database.

### Prerequisites

- Docker and Docker Compose
- A `.env` file at the project root (copy from `.env.example` if available)
- GNU Make (optional, but recommended — on Windows use Git Bash or WSL)

### First-time setup

```sh
make build   # build the image (runs both frontend builds and Tuyau registry generation)
make up      # start the app and database
make seed    # seed the database once (not run automatically)
```

The app is exposed on `http://localhost:3333`.

### Everyday commands

| Command          | What it does                                           |
| ---------------- | ------------------------------------------------------ |
| `make up`        | Start all services in the background                   |
| `make down`      | Stop and remove containers                             |
| `make restart`   | Restart the app container                              |
| `make logs`      | Tail the app container logs                            |
| `make shell`     | Open a shell inside the app container                  |
| `make migrate`   | Run pending database migrations                        |
| `make rollback`  | Roll back the last batch of migrations                 |
| `make seed`      | Run database seeders                                   |
| `make fresh`     | Drop tables, re-run migrations and seeders             |

Run `make help` to list them from the terminal.

### Migrations vs seeds

- **Migrations** run automatically on every container start (via `docker-entrypoint.sh`).
- **Seeds do not run automatically.** Run them manually with `make seed` after the first `make up`, or whenever you need to refresh seed data. This avoids surprising writes to production data on every restart.

### Running ad-hoc Ace commands

```sh
docker compose exec app node ace <command>
```

## Local development without Docker

Requires Node.js 24+ and Bun.

```sh
bun install
node ace serve --hmr
```

## Notes

- Detailed rationale for the current Docker setup lives in `DOCKER_FIXES.md`.
- The custom Ace command `node ace tuyau:registry` (in `commands/generate_tuyau_registry.ts`) replicates parts of `@tuyau/core`'s internal generator. See that file's header for the tracked upstream version.
