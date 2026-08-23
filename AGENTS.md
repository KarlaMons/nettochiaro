# Repository Guidelines

## Project Structure & Module Organization

This repository is currently a planning-first Next.js scaffold. Product requirements live in `planning/`; architecture, fiscal rules, API, and UI decisions belong in `design/`. Track delivery in `implementation/task_tracker.md` and `implementation/user_journeys.md`, and record progress under `docs/`. Runtime code will use root-level `app/`, `components/`, and `lib/tax/`; unit tests belong in `tests/` and browser flows in `e2e/`. Deployment assets are grouped under `deployment/`, with local orchestration in `docker-compose.yml`.

Before implementing, read `docs/project_memory.md`, `implementation/task_tracker.md`, and `design/design_summary.md`. Do not begin application code until planning is complete and approved.

## Build, Test, and Development Commands

Executable scripts are introduced in IT-01 and documented in `design/design_summary.md`. Use:

- `docker compose up --build` — build and start the local stack.
- `docker compose down` — stop local services.
- `npm test`, `npm run test:e2e`, `npm run lint`, `npm run typecheck`, and `npm run build` — verify calculations, user flow, style, types, and production output.

Do not claim a change works without running the relevant verification command and recording the result in `docs/work_log.md`.

## Coding Style & Naming Conventions

Use strict TypeScript, ESLint, and the formatter configured during IT-01. Keep fiscal rules in pure modules; UI components must not duplicate formulas. Use `camelCase` for values/functions, `PascalCase` for components/types, and `UPPER_SNAKE_CASE` for versioned constants. Name work units `IT-XX` and `UJ-XX`. Do not hardcode secrets or silently alter 2025 thresholds.

## Testing Guidelines

Use Vitest for pure formulas/components and Playwright for browser journeys. Test every statutory boundary, cent rounding, reconciliation, low-income credits, invalid input, keyboard flow, and mobile layout. Keep the EUR 30,000 reference case synchronized with `design/calculation_rules.md`. A journey is complete only after its documented commands pass.

## Commit & Pull Request Guidelines

Use imperative, work-unit-prefixed commits, for example `IT-02: implement 2025 tax engine` or `UJ-03: explain calculation rules`. Pull requests should identify the work unit, summarize fiscal and security impact, list commands run, cite any changed official source, and include desktop/mobile screenshots for UI changes. Update the task tracker and work log before review.
