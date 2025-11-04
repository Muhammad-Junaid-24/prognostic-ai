# Prognostic AI

Monorepo containing the Prognostic AI platform: a TypeScript-based backend API (`api-prognostic`) and a React frontend (`web-app-prognostic`). This README gives an overview, architecture orientation, and step-by-step developer setup and run instructions.

---

## Table of contents

- Project overview
- Architecture
- Prerequisites
- Quickstart (dev)
- Database migrations & seeds
- Environment variables
- Useful scripts
- Folder structure
- Contributing
- Troubleshooting
- License

---

## Project overview

Prognostic AI is a two-part application:

- `api-prognostic`: Backend API and jobs, written in TypeScript. Uses Hapi, Sequelize (MySQL), Redis/Bull for jobs, and various integrations (Stripe, SendGrid/Brevo, OpenAI/Anthropic, etc.).
- `web-app-prognostic`: Frontend React application (Create React App + Tailwind) providing the UI for the platform.

The backend includes migration scripts (Sequelize), cron/jobs, and email/scheduler workers.

## Architecture

- API: TypeScript + Hapi server, Sequelize ORM (MySQL), Redis for queues, background jobs (Bull), and integrations.
- Frontend: React app (Create React App) with Redux Toolkit, Ant Design, and Tailwind.
- Database migrations are managed with `sequelize-cli` configured in `src/config/sequelize-config.js` (see `api-prognostic` package scripts).

## Prerequisites

- Node.js (LTS recommended; tested with Node 18+) and npm
- MySQL (or compatible DB) for the API
- Redis for job queues (Bull)
- Optional: Docker if you prefer running MySQL/Redis in containers

## Quickstart (development)

Open two terminals (one for API, one for web).

1. API

```powershell
cd api-prognostic
npm install
# start dev server (nodemon + ts-node)
npm run start
```

The API project provides these scripts (from `api-prognostic/package.json`):

- `start` — starts the TypeScript server via `nodemon src/server.ts`
- `build` — runs `tsc` to build TypeScript
- `migrate` — runs `sequelize-cli db:migrate` (see db config)
- `seed` — runs `sequelize-cli db:seed:all`
- `rollback` — runs `sequelize-cli db:migrate:undo`

2. Web (frontend)

```powershell
cd web-app-prognostic
npm install
npm run start
```

Frontend scripts (from `web-app-prognostic/package.json`):

- `start` — `react-scripts start` (dev server)
- `build` — `react-scripts build` (production build)
- `test` — `react-scripts test`

## Database migrations & seeds

Run migrations from the `api-prognostic` folder (Sequelize CLI is configured in `src/config/sequelize-config.js`):

```powershell
cd api-prognostic
npm run migrate
# to rollback last migration
npm run rollback
# to seed data
npm run seed
```

If you plan to run migrations locally you'll need a running MySQL instance and the proper DB connection environment variables (see below).

## Environment variables

The API expects environment variables for DB, Redis, authentication, and third-party integrations. Create a `.env` file in `api-prognostic/` (or set envs in your environment). Common variables used by projects in this repo include (examples; check each usage in `src/config` and `src/services`):

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASS
- DB_NAME
- REDIS_URL (or REDIS_HOST, REDIS_PORT)
- JWT_SECRET
- STRIPE_SECRET_KEY
- SENDGRID_API_KEY or BREVO_API_KEY
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- NODE_ENV (development|production)

Keep secrets out of source control. Add `.env` to `.gitignore` if not already.

## Useful commands

From repo root you can operate in each subproject:

API

```powershell
cd api-prognostic
npm install
npm run start    # dev
npm run build    # compile TS
npm run migrate  # run db migrations
```

Web

```powershell
cd web-app-prognostic
npm install
npm run start    # dev
npm run build    # production build
```

## Folder structure (top-level)

- `api-prognostic/` - backend API (TypeScript)
  - `src/` - source code
  - `migrations/` - sequelize migrations
  - `models/` - sequelize models
  - `package.json` - scripts & dependencies
- `web-app-prognostic/` - React frontend
  - `src/` - frontend code
  - `public/` - static assets
  - `package.json`

## Contributing

- Follow the existing code style and TypeScript patterns.
- Add tests for new API endpoints where appropriate.
- When updating DB schema, add a migration under `api-prognostic/migrations`.

## Troubleshooting

- "DB connection refused" — ensure MySQL is running and env vars are set correctly.
- "Redis connection error" — ensure Redis is running and `REDIS_URL` or host/port are correct.
- Migration issues — verify the `sequelize-config.js` points at the same DB settings used by your `.env`.

## Next steps / suggestions

- Add a `docker-compose.yml` to quickly spin up MySQL and Redis for local development.
- Add a root-level script to install dependencies in both packages in one command.
- Add example `.env.example` files for both the API and frontend.
