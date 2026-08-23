# Project Memory

## Current State

- **Project**: JetHR 2026 RAL-to-net calculator.
- **Phase**: Execution; the React + TypeScript + Vite foundation and deterministic 2026 salary engine are in place.
- **Last Completed Work Unit**: IT-02 — deterministic 2026 salary engine.
- **Next Step**: Wait for approval of the product UI work unit; Docker and deployment remain deferred.

## Scope and Decisions

- The obsolete 2025 planning-first Next.js scaffold has been superseded.
- The app is client-only at this stage, with no backend, persistence, authentication, Docker, or final product UI.
- Root-level Vite source uses strict TypeScript, React, ESLint, Vitest, jsdom, and Testing Library.
- The pure 2026 engine supports RAL from EUR 25,000 through EUR 100,000 inclusive and 13 or 14 monthly payments for the approved standard Milano/Lombardia employee scenario.
- Fiscal constants and source provenance are centralized in `src/engine/taxRules2026.ts`; internal monetary values retain full precision and are formatted to two decimals only for display.
- Production browser types are isolated from test and Node tooling types through separate strict TypeScript projects.
- Local development is pinned to Node.js 24.15.0, Node 24 type declarations, and npm 11.17.0; strict package engines also accept supported Node.js 26+ runtimes.
- `CLAUDE.md` remains the engineering governance source. `AGENTS.md` and `README.md` are intentionally unchanged in IT-01.

## Blockers and Pending Decisions

- None for the completed IT-01 foundation.
- Product UI, browser journeys, Docker, deployment, and subsequent implementation units remain subject to explicit approval.

## Key Files

- `design/design_summary.md`
- `implementation/task_tracker.md`
- `docs/work_log.md`
- `package.json`
- `tsconfig.app.json`, `tsconfig.test.json`, and `tsconfig.node.json`
- `src/engine/`
- `src/types/salary.ts`
- `src/utils/`
