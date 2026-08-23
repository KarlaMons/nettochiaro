# Project Memory

## Current State

- **Project**: JetHR 2026 RAL-to-net calculator.
- **Phase**: Execution; the foundation, deterministic 2026 salary engine, and complete UJ-01 calculator interface are in place.
- **Last Completed Work Unit**: UJ-01 — transparent RAL-to-net calculator.
- **Next Step**: Await the next approved work unit; Docker and deployment remain deferred.

## Scope and Decisions

- The obsolete 2025 planning-first Next.js scaffold has been superseded.
- The app is client-only, with no backend, persistence, authentication, Docker, or external runtime requests.
- Root-level Vite source uses strict TypeScript, React, ESLint, Vitest, jsdom, and Testing Library.
- The pure 2026 engine supports RAL from EUR 25,000 through EUR 100,000 inclusive and 13 or 14 monthly payments for the approved standard Milano/Lombardia employee scenario.
- Fiscal constants and frozen rule-specific official-source provenance are centralized in `src/engine/taxRules2026.ts`; employee-deduction ratios intentionally retain full precision instead of the official first-four-decimal convention, and monetary values are formatted to two decimals only for display.
- The supported scenario includes statutory employee and tax-wedge deductions but excludes personal/additional relief, dependents, other deductions, and trattamento integrativo. Italian-number grouping separators must be internally consistent.
- UJ-01 is an Italian, mobile-first and keyboard-accessible single-page flow. It preserves the RAL as editable text, calculates only after valid submit, and renders annual/monthly KPIs, an accessible salary-composition bar, an adapter-driven formula reconciliation, assumptions, official sources, and the approved warning.
- Fiscal formulas and source selection for UI disclosure live in the pure `buildCalculationBreakdown` adapter rather than React components.
- Production browser types are isolated from test and Node tooling types through separate strict TypeScript projects.
- Local development is pinned to Node.js 24.15.0, Node 24 type declarations, and npm 11.17.0; strict package engines also accept supported Node.js 26+ runtimes.
- `CLAUDE.md` remains the engineering governance source. `AGENTS.md` and `README.md` are intentionally unchanged in IT-01.

## Blockers and Pending Decisions

- None for UJ-01.
- Docker, deployment, and subsequent implementation units remain subject to explicit approval.

## Key Files

- `design/design_summary.md`
- `implementation/task_tracker.md`
- `docs/work_log.md`
- `package.json`
- `tsconfig.app.json`, `tsconfig.test.json`, and `tsconfig.node.json`
- `src/engine/`
- `src/engine/buildCalculationBreakdown.ts`
- `src/App.tsx`, `src/styles.css`, and `index.html`
- `src/types/salary.ts`
- `src/utils/`
