# Contexto del proyecto (Nasser Construction Website)

## Stack

- Backend: AdonisJS v7 (TypeScript, ESM)
- Frontend: Inertia.js + React (Vite)
- UI: Ant Design + TailwindCSS
- Estado/datos: TanStack React Query
- DB: PostgreSQL (Lucid ORM)
- Auth: sesión (guard `web`)
- Tipado de API: Tuyau (registry generado por hooks)

## Estructura principal

- Backend
  - app/controllers: controladores HTTP (admin + público)
  - app/models: modelos Lucid
  - app/validators: validación (VineJS)
  - app/middleware: auth/guest/inertia, etc.
  - database/migrations: esquema de DB
  - database/seeders: datos iniciales (incluye un usuario admin; ver seeder)
  - start/routes.ts: definición de rutas
- Frontend (Inertia)
  - inertia/app: bootstrap del cliente (Inertia + React Query + Ant Design)
  - inertia/pages: páginas (público + editor/admin)
  - inertia/components, layouts, utils: UI y utilidades compartidas

## Rutas (alto nivel)

- Público:
  - GET /, /about, /project/:id
- Auth (guest):
  - GET /login, POST /login, redirect /admin -> /login
- Admin (auth):
  - POST /logout
  - Endpoints CRUD y updates para secciones del home (hero, about_us, services, projects, testimonials, cta, footer, why_chooses, settings)

## Variables de entorno (mínimas)

- PORT, HOST, NODE_ENV
- APP_KEY, APP_URL, LOG_LEVEL
- DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE

## Comandos útiles

- Desarrollo local (sin Docker):
  - bun install
  - bun run dev (alias de `node ace serve --hmr`)
- Build / producción:
  - bun run build
  - bun run start
- Calidad:
  - bun run lint
  - bun run typecheck
  - bun run test

## Docker

- docker-compose levanta:
  - app (puerto 3333)
  - db (Postgres 16, puerto 5432)
- Makefile expone atajos: build, up, down, logs, shell, migrate, rollback, seed, fresh
- Persistencia de uploads: volumen `uploads_data` montado en `storage/uploads`

## Convenciones del repo

- Mensajes de commit: Conventional Commits (`feat: ...`, `fix: ...`, etc.) en inglés (ver .cursorrules).
- TypeScript/ESM: imports por alias `#controllers/*`, `#models/*`, etc. (definidos en package.json `imports`).
- Antes de entregar cambios de código: ejecutar lint + typecheck.
