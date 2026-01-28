# Flight-Service (Airline backend)

A Node.js service that provides backend operations for an airline booking system (flights, airplanes, airports, cities, seats and fares). This repository contains the Flight-Service API with models, controllers, services, repositories, migrations, seeders and route definitions.

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Quick start](#quick-start)
- [Database (migrations & seeds)](#database-migrations--seeds)
- [Configuration](#configuration)
- [Running the app](#running-the-app)
- [API overview](#api-overview)
- [Testing](#testing)
- [Troubleshooting & tips](#troubleshooting--tips)
- [Contributing & next steps](#contributing--next-steps)
- [License](#license)

---

## Overview

This service implements core domain logic for an airline application. It provides endpoints to manage and query:

- Airplanes and their metadata
- Cities and Airports
- Flights (schedules, availability)
- Seats and bookings
- Class fares

The codebase follows a layered structure (controllers -> services -> repositories -> models) to keep concerns separated and make it easier to test and maintain.

## Tech stack

- Node.js (>=14 recommended)
- Express.js (HTTP server)
- Sequelize (ORM) with migrations & seeders
- SQLite/MySQL/Postgres (configurable via `src/config/config.json` — see Configuration)
- JavaScript (CommonJS modules)

## Project structure

Top-level important files and folders:

- `src/app.js` — App entrypoint (Express app and server startup)
- `src/config/` — Configuration files (`config.json`, `server-config.js`)
- `src/controllers/` — HTTP controllers (routing handlers)
- `src/services/` — Business logic and orchestration
- `src/repositories/` — Database access and CRUD helpers
- `src/models/` — Sequelize models definitions
- `src/routes/` — Route registration for resources
- `src/middlewares/` — Request middlewares and validation
- `src/migrations/` — Sequelize migrations
- `src/seeders/` — Seed data to populate a dev DB
- `src/utils/` — Utilities, error handling and helpers

Example key files:

- `src/controllers/flights-controller.js` — flights endpoints (search, create, list etc.)
- `src/models/flights.js` — Sequelize model for flights
- `package.json` — project dependencies and scripts

## Quick start

Prerequisites

- Node.js (14+)
- npm (or yarn)
- A SQL database supported by Sequelize (SQLite is simplest for dev)

Install dependencies

```powershell
npm install
```

Configuration

- Edit `src/config/config.json` to set your database credentials and environment settings.
- Optionally adjust server settings in `src/config/server-config.js`.

If you don't want to setup an external DB for quick testing, create an SQLite file and set dialect to `sqlite` in `src/config/config.json` (development section), or use the file included in `src/backup/flights_bak` as a reference.

## Database (migrations & seeds)

This repository uses Sequelize migrations and seeders located under `src/migrations/` and `src/seeders/`.

Run migrations (using Sequelize CLI):

```powershell
npx sequelize-cli db:migrate --config src/config/config.json
```

Run all seeders:

```powershell
npx sequelize-cli db:seed:all --config src/config/config.json
```

Note: The project may not have `sequelize-cli` as a dev dependency — install it globally or add it to `devDependencies` if you plan to run migrations often:

```powershell
npm install --save-dev sequelize-cli
```

## Configuration

Look at `src/config/config.json`. Typical env vars (not exhaustive):

- `DB_HOST` — database host
- `DB_USER` — database user
- `DB_PASS` — database password
- `DB_NAME` — database name
- `DB_DIALECT` — `postgres` | `mysql` | `sqlite` etc.
- `PORT` — server port

If you prefer environment variables, update `server-config.js` or modify `config.json` to load from `process.env`.

## Running the app

Development (simple):

```powershell
node src/app.js
```

If you use nodemon for auto-reload during development:

```powershell
npx nodemon src/app.js
```

(Consider adding npm scripts in `package.json` such as `start`, `dev`, `migrate`, `seed`.)

Example `package.json` scripts you can add:

```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js",
  "migrate": "npx sequelize-cli db:migrate --config src/config/config.json",
  "seed": "npx sequelize-cli db:seed:all --config src/config/config.json"
}
```

## API overview

Routes are registered in `src/routes/`. Primary resource groups include:

- `/api/airplanes` — airplane CRUD and queries
- `/api/cities` — city CRUD
- `/api/airports` — airport CRUD and lookups
- `/api/flights` — flight creation, listing, searching
- `/api/seats` — seats availability, booking
- `/api/class-fares` — fares by class

Each controller maps to a service in `src/services/` which orchestrates repository calls and business rules.

Tip: Open `src/routes/index.js` to see route prefixes and which routers are mounted.

## Testing

This project doesn't currently include an automated test suite in the repo root. Recommended starter tests:

- Unit tests for services and repositories (mocking DB) using Jest or Mocha
- Integration tests that run against a test database (SQLite in-memory) for migrations and models

Example dev dependencies to add:

```powershell
npm install --save-dev jest supertest sqlite3
```

## Troubleshooting & tips

- Common startup issues are missing DB credentials or wrong dialect in `config.json`.
- If Sequelize throws model/association errors, ensure migrations were run in the correct order. The `src/migrations/` folder timestamps indicate sequence.
- If you get `SequelizeConnectionError`, verify your database server is reachable and `src/config/config.json` matches credentials.

## Contributing & next steps

If you want to extend the project, here are safe, small tasks you can do next:

- Add npm scripts to `package.json` for `start`, `dev`, `migrate`, `seed`.
- Add a `.env.example` and update `server-config.js` to read from `process.env`.
- Add basic Jest tests (happy path for services) and a GitHub Action to run them on pushes.
- Create a Postman collection or OpenAPI spec for the API.

## License

This project does not contain a license file. Add a `LICENSE` (for example MIT) if you plan to make it public.

---

If you'd like, I can:

- Add `README.md` (done) and update `package.json` with recommended scripts.
- Generate a sample `.env.example` and modify `src/config/server-config.js` to load env vars.
- Create a Postman collection or an OpenAPI spec describing the endpoints.

Tell me which follow-up you'd like and I will implement it next.
