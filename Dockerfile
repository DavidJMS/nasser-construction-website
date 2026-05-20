# Pull the Bun binary from the official image — avoids a manual install script.
# Pinned to minor for reproducibility. For stricter guarantees, replace with a
# digest, e.g. `oven/bun:1.2@sha256:<digest>`.
FROM oven/bun:1.2-debian AS bun-stage

# Pinned to Node 24 to match the engines field in package.json.
# For stricter reproducibility, pin to patch + digest, e.g.
# `node:24-bookworm-slim@sha256:<digest>`.
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

# Copy .env so AdonisJS can boot during Tuyau registry generation.
# This file is only used in the build stage and never reaches the production image.
COPY .env .env

# Generate the Tuyau registry by briefly starting the dev server.
# NODE_ENV must be overridden to "development" here: app_provider only calls
# emitRoutes() when !inProduction, which triggers the routesScanned IPC
# message that generateRegistry() hooks onto. With NODE_ENV=production the
# IPC message is never sent and the loop below hangs forever.
RUN NODE_ENV=development node ace serve & PID=$!; \
    TIMEOUT=90; ELAPSED=0; \
    while [ ! -f .adonisjs/client/registry/index.ts ]; do \
      sleep 1; ELAPSED=$((ELAPSED+1)); \
      if [ "$ELAPSED" -ge "$TIMEOUT" ]; then \
        echo "ERROR: Tuyau registry not generated after ${TIMEOUT}s" >&2; \
        kill $PID 2>/dev/null; exit 1; \
      fi; \
    done; \
    kill $PID

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
# NOTE: Drive is configured to use storage/uploads (see config/drive.ts).
RUN mkdir -p storage/uploads && chown -R node:node storage

USER node

EXPOSE 3333

# Node 24 has global fetch. The healthcheck hits the app root and expects 2xx.
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "fetch('http://localhost:3333/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# exec form: node becomes PID 1 and receives signals correctly.
# The entrypoint script runs: migration → seed → server.
ENTRYPOINT ["./docker-entrypoint.sh"]
