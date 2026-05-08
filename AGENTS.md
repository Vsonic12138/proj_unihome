# Repository Guidelines

## Quickstart
This repository is a monolithic website application: localized Next.js frontend, Payload CMS admin, and Payload API run in the same Next.js server.

- Frontend: Next.js 15 App Router
- CMS: Payload CMS v3
- Database: PostgreSQL 16 via `@payloadcms/db-postgres`
- Language: TypeScript
- Styling: Tailwind CSS v4

Default route surfaces:

- Frontend pages: `/{locale}/*`
- Payload Admin: `/admin`
- Payload API: `/api/*`

The frontend always uses locale-prefixed routes. `/admin`, `/api`, `/_next`, and static asset paths are excluded from locale routing by `src/middleware.ts`.

## Architecture
- This is not a split frontend/CMS deployment. Frontend pages, Payload admin, and Payload API are served by one Next.js app.
- Production traffic is typically: Nginx -> `127.0.0.1:3005` -> `proj_unihome_app` -> `proj_unihome_postgres`.
- i18n is implemented with `next-intl`; active locales are `zh`, `en`, and `ja`.
- Translation dictionaries live in `messages/{en,zh,ja}` and are also used by some CMS seed scripts.

## Repo Map
- `src/app/`: App Router routes and pages, including localized routes under `src/app/[locale]`
- `src/components/`: reusable frontend UI components
- `src/i18n/`: locale config and request wiring
- `src/payload/`: collections, globals, blocks, admin customizations
- `messages/`: frontend translation JSON and seed data source
- `scripts/payload/`: CMS checks, seed, publish, snapshot, migration, and ops scripts
- `ops/`: Docker, deployment scripts, deployment templates, env examples
- `docs/`: current project docs
- `docs/archive/`: archived docs and historical materials
- `backups/`: generated CMS snapshots and database backups; do not edit unless the task is explicitly backup/restore related

## Required Env
App and CMS boot require:

- `PAYLOAD_SECRET`
- `DATABASE_URI` or `DATABASE_URL`

Common optional variables:

- `NEXT_PUBLIC_SERVER_URL`: important for production `next/image` loading of `/media/**`
- `PAYLOAD_SCHEMA_PUSH=false`: preferred safeguard for scripts/environments where schema push should not happen implicitly
- `PREVIEW_SECRET`: used in production deployment setup

Reference templates:

- `.env.example`
- `ops/env/.env.local.mailpit.example`
- `ops/env/.env.production.example`

## Local Development
Typical local setup in this repo is WSL2 + Docker Desktop, but the hard requirement is a working Docker Engine with `docker compose`.

Minimum local prerequisites:

- Node.js
- npm
- Docker
- Docker Compose

Recommended startup flow:

```bash
npm install
npm run docker:up:dev:db
npm run dev
```

Default local endpoints:

- Frontend: `http://localhost:3000`
- CMS: `http://localhost:3000/admin`
- API: `http://localhost:3000/api`
- Mailpit: `http://localhost:8025`

Important local DB note:

- `ops/docker/compose.dev.yml` defines local PostgreSQL and Mailpit containers
- The repo template exposes PostgreSQL on host `5432`
- The current local `.env` in this workspace uses `15432`; do not assume `5432` without checking the active env file

## Core Commands
Primary developer commands:

- `npm run dev`: start local development server
- `npm run build`: production build
- `npm run start`: run the built app locally
- `npm run lint`: primary automated verification command in this repo
- `npm run generate:types`: regenerate Payload TypeScript types after editing schema/config under `src/payload/**`
- `npm run docker:up:dev:db`: start local PostgreSQL + Mailpit services

There is currently no dedicated automated test suite configured beyond linting. Minimum verification is `npm run lint` plus manual checks on affected routes, CMS-backed pages, or APIs.

## CMS Ops
Current major Payload collections:

- `users`
- `mediaFolders`
- `media`
- `pages`
- `productSeries`
- `products`
- `faq`
- `caseStudies`
- `tickets`

Current major globals:

- `siteSettings`
- `navigation`
- `footer`

Prefer existing scripts in `scripts/payload/` over one-off scripts. They encode existing data flow and reduce content drift risk.

Common CMS commands:

- `npm run cms:check:db`: verify app -> PostgreSQL connectivity
- `npm run cms:check:pages`: check `pages` collection state
- `npm run cms:check:home`: verify Chinese home page (`slug: home`) exists
- `npm run cms:check:products`: check product data availability
- `npm run cms:seed:base`: seed base content from `messages/*.json` into globals, pages, products, and related CMS structures
- `npm run cms:seed:images`: seed demo media into `media`
- `npm run cms:seed:cases`: seed demo case study content
- `npm run cms:seed:knowledge-base`: seed FAQ and developer knowledge base demo content
- `npm run cms:publish:all`: publish all draft pages, products, and case studies
- `npm run cms:publish:pages`: publish draft pages only
- `npm run cms:publish:products`: publish draft products only
- `npm run cms:publish:cases`: publish draft case studies only
- `npm run cms:snapshot:export`: export CMS JSON snapshot into `backups/`
- `npm run cms:snapshot:restore`: restore CMS content from latest snapshot in `backups/`
- `npm run cms:backup:local`: create a local database dump and CMS snapshot

Public ticket submission currently goes through:

- `POST /api/public/tickets`

Requests are validated, written into the `tickets` collection, and may trigger email notification depending on environment configuration.

## Database & Backup
- Database is PostgreSQL in all environments.
- App boot accepts either `DATABASE_URI` or `DATABASE_URL`.
- Local dev DB container is `proj_unihome_postgres` using image `postgres:16`.
- Production app connects to the database via Docker service name `postgres`.

Local backup entry point:

- `npm run cms:backup:local`

Server backup entry points:

```bash
cd /opt/proj_unihome/deploy
bash backup.sh run
INCLUDE_MEDIA=true bash backup.sh run
```

Restore note:

- In first deployment or recovery scenarios, `bash deploy.sh init` will automatically restore database/media if the expected backup artifacts exist in the deployment bundle.

## Deployment
Recommended production workflow:

1. Build deploy bundle locally.
2. Upload bundle to server.
3. Run server deployment in `init` or `update` mode.

Deployment bundle profiles:

- `init`: first deploy / disaster recovery bundle; may include app image, postgres image, DB dump, CMS snapshot, and media backup
- `update`: routine update bundle; updates app only and does not restore DB/media

Primary deployment commands:

- `npm run deploy:bundle:init`: build full deployment bundle locally
- `npm run deploy:bundle:update`: build lightweight update bundle locally
- `npm run deploy:aliyun:bootstrap`: prepare Aliyun ECS with Docker, Nginx, and server directories
- `npm run deploy:aliyun:init`: build/upload/deploy full init bundle remotely
- `npm run deploy:aliyun:update`: build/upload/deploy update bundle remotely

Production server layout convention:

- Root: `/opt/proj_unihome`
- Key directories: `deploy/`, `shared/`, `media/`, `postgres-data/`, `backups/`

Production env file convention:

- Canonical env file on server: `shared/.env.production`

If the task is only CMS content editing, do not assume a code redeploy is needed.

## High-Risk Files
Read these together before changing routing, locale behavior, or CMS integration:

- `payload.config.ts`
- `next.config.mjs`
- `src/middleware.ts`

Other high-risk areas:

- `src/i18n/**`: request and locale behavior
- `src/payload/**`: schema and CMS admin behavior; often requires `npm run generate:types`
- `messages/**`: may affect both frontend copy and CMS seed output
- `ops/deploy/**`: production packaging and remote deployment behavior
- `scripts/payload/**`: operational data changes, publication flow, snapshots, migrations

## Coding & Verification
- Use TypeScript for new app code.
- Follow existing 2-space indentation.
- Components and Payload schema files use `PascalCase` filenames.
- Utility/support files use `camelCase` or framework-conventional names like `page.tsx` and `request.ts`.
- Tailwind formatting is handled by `prettier-plugin-tailwindcss`; do not hand-group classes against repo formatting behavior.
- After Payload schema/content-model changes, regenerate types with `npm run generate:types`.
- Before claiming work is complete, at minimum run `npm run lint` unless the task clearly does not touch runnable code.
- For frontend/content changes, manually verify affected localized routes and CMS-backed pages.

## Commit Rules
- Commit style in this repo is versioned Conventional Commits:
  - `Vx.y.z type(scope): summary`
  - Example: `V1.26.4 fix(mail): ...`
- Keep the summary imperative and scope specific.
- When preparing a release-style commit, the repo convention is to bump `package.json` version with `npm run version:patch` or `npm run version:minor` alongside the commit when appropriate.
- Do not create or edit backup snapshot files as part of normal feature work.

## Docs Map
Current docs entry points:

- `docs/README.md`: docs index
- `docs/overview.md`: architecture and repo structure
- `docs/development.md`: local development workflow and commands
- `docs/deployment.md`: production deployment model and commands
- `docs/database.md`: database connection, backup, and restore notes
- `docs/cms.md`: Payload structure and CMS operations

Historical materials are under `docs/archive/`.
