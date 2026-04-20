# Pull the Bun binary from the official image — avoids a manual install script.
# Pinned to minor for reproducibility. For stricter guarantees, replace with a
# digest, e.g. `oven/bun:1.2@sha256:<digest>`.
FROM oven/bun:1.2-debian AS bun-stage

# Pinned to Node 24 to match the engines field in package.json.
# For stricter reproducibility, pin to patch + digest, e.g.
# `node:24.5.0-bookworm-slim@sha256:<digest>`.
FROM node:24-bookworm-slim AS base
COPY --from=bun-stage /usr/local/bin/bun /usr/local/bin/bun

# ----------------------------
# Stage 1: Install all dependencies
# ----------------------------
FROM base AS deps
WORKDIR /app
# Copy both files so bun can use the lockfile for a reproducible install.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ----------------------------
# Stage 2: Build the application
# ----------------------------
FROM deps AS build
WORKDIR /app
COPY . .

# Dummy env vars so AdonisJS can boot during Tuyau registry generation.
# They never reach the production stage.
ENV NODE_ENV=development \
    PORT=3333 \
    HOST=localhost \
    LOG_LEVEL=error \
    APP_KEY=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
    APP_URL=http://localhost:3333 \
    SESSION_DRIVER=cookie \
    DB_HOST=localhost \
    DB_PORT=5432 \
    DB_USER=root \
    DB_PASSWORD=root \
    DB_DATABASE=app

# Create minimal placeholder registry stubs so the first build does not fail
# on the missing file. They are replaced by node ace tuyau:registry below.
RUN sh docker/create_registry_placeholder.sh

# First build: generates AdonisJS indexes (.adonisjs/server/*).
# The frontend bundle uses the placeholder registry here — intentional.
RUN node ace build

# With indexes in place the app can boot; generate the real Tuyau registry.
RUN node ace tuyau:registry

# Clean artifacts from the first build so the second build starts fresh and
# cannot leak bundles produced with the placeholder registry.
RUN rm -rf build public/assets

# Second build: recompile the frontend with the real registry.
RUN node ace build

# ----------------------------
# Stage 3: Production runtime
# ----------------------------
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

# --chown ensures files end up owned by the unprivileged `node` user that ships
# with the official Node image (UID 1000). We keep install + chmod as root, then
# drop privileges before ENTRYPOINT.
COPY --chown=node:node --from=build /app/build ./
COPY --chown=node:node --from=build /app/bun.lock ./
RUN bun install --production --frozen-lockfile && chown -R node:node node_modules

COPY --chown=node:node docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Ensure the uploads directory exists with node ownership before the volume is
# mounted; otherwise Docker creates it as root and the app cannot write to it.
RUN mkdir -p public/uploads && chown -R node:node public

USER node

EXPOSE 3333

# Node 24 has global fetch. The healthcheck hits the app root and expects 2xx.
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "fetch('http://localhost:3333/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# exec form: node becomes PID 1 and receives signals correctly.
ENTRYPOINT ["./docker-entrypoint.sh"]
