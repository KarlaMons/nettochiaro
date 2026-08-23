# Project Memory

## Current State

- **Project**: JetHR 2026 RAL-to-net calculator.
- **Phase**: Execution; the clean React + TypeScript + Vite foundation is in place.
- **Last Completed Work Unit**: IT-01 — Vite application scaffold.
- **Next Step**: Wait for approval of the next work unit before adding fiscal logic, product UI, Docker, or deployment.

## Scope and Decisions

- The obsolete 2025 planning-first Next.js scaffold has been superseded.
- The app is client-only at this stage, with no backend, persistence, authentication, Docker, tax formulas, or final product UI.
- Root-level Vite source uses strict TypeScript, React, ESLint, Vitest, jsdom, and Testing Library.
- Production browser types are isolated from test and Node tooling types through separate strict TypeScript projects.
- Local development is pinned to Node.js 24.15.0 and npm 11.17.0; package engines also accept supported Node.js 26+ runtimes.
- `CLAUDE.md` remains the engineering governance source. `AGENTS.md` and `README.md` are intentionally unchanged in IT-01.

## Blockers and Pending Decisions

- None for the completed IT-01 foundation.
- Fiscal requirements and subsequent implementation units remain subject to explicit approval.

## Key Files

- `design/design_summary.md`
- `implementation/task_tracker.md`
- `docs/work_log.md`
- `package.json`
- `tsconfig.app.json`, `tsconfig.test.json`, and `tsconfig.node.json`
- `src/`
