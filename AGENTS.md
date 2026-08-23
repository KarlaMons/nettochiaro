# Repository Guidelines

## Project Structure & Module Organization

The product is a client-only Vite/React calculator. Runtime code lives in `src/`: fiscal constants and formulas are confined to `src/engine/`, public types to `src/types/`, formatting/parsing to `src/utils/`, and rendering to `src/App.tsx`. Co-locate Vitest files as `*.test.ts(x)`. Product and fiscal decisions live in `design/`; execution state is tracked in `implementation/task_tracker.md`, `docs/work_log.md`, and `docs/project_memory.md`. Delivery uses root `Dockerfile`, `nginx.conf`, and `.dockerignore`.

Before changes, read `CLAUDE.md`, `docs/project_memory.md`, `implementation/task_tracker.md`, and `design/design_summary.md`. Planning must be approved before implementation.

## Build, Test, and Development Commands

- `npm ci` — install the lockfile exactly.
- `npm run dev` — start Vite locally.
- `npm test` — run unit, integration, and component tests.
- `npm run typecheck`, `npm run lint`, `npm run build` — verify types, style, and production output.
- `npm audit --audit-level=high` — check high-severity dependency findings.
- `docker build -t ral-netto-calculator .` and `docker run --rm -p 8080:80 ral-netto-calculator` — verify delivery configuration.

Run test, lint, typecheck, and build before completion. When Docker configuration changes, also build and smoke-test the image and `/healthz`; record actual results in `docs/work_log.md`.

## Coding Style & Naming Conventions

Use strict TypeScript, configured ESLint, `camelCase` values/functions, `PascalCase` components/types, and `UPPER_SNAKE_CASE` constants. UI code must never duplicate fiscal formulas: formulas and source metadata belong only in `src/engine/`. Do not add unsupported fiscal cases, silently alter thresholds, or introduce AI/API-based calculation.

## Testing Guidelines

Use Vitest and Testing Library. Any fiscal-rule change requires tests for exact boundaries, full-precision reconciliation, the 30.000-euro reference, invalid input, and 13/14 invariance. Keep contributions distinct from taxes and describe monthly values as annual averages, not payslips.

## Commit & Pull Request Guidelines

Use imperative work-unit commits, for example `IT-03: prepare documented Docker delivery` or `UJ-02: add regional selection`. Pull requests must name the work unit, fiscal/security impact, official sources changed, commands run, and UI screenshots when relevant. Update tracker, work log, and project memory before review.

## Fiscal Rules & Deployment Safety

Never hardcode secrets or deploy/push without authorization. Preserve the static, no-credentials architecture unless a newly approved plan changes it.
