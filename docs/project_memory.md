# Project Memory

## Current State

- **Project**: JetHR 2026 RAL-to-net calculator.
- **Phase**: Delivery-ready locally; the foundation, deterministic 2026 engine, UJ-01 interface, and documented Docker delivery are complete.
- **Last Completed Work Unit**: IT-03 — documented Docker delivery.
- **Next Step**: User-managed review and optional external EasyPanel deployment; no deployment or push has been performed.

## Scope and Decisions

- The obsolete 2025 planning-first Next.js scaffold has been superseded.
- The app is client-only, with no backend, persistence, authentication, or external runtime requests; a multi-stage Docker image serves only static assets through Nginx.
- Root-level Vite source uses strict TypeScript, React, ESLint, Vitest, jsdom, and Testing Library.
- The pure 2026 engine supports RAL from EUR 25,000 through EUR 100,000 inclusive and 13 or 14 monthly payments for the approved standard Milano/Lombardia employee scenario.
- Fiscal constants and frozen rule-specific official-source provenance are centralized in `src/engine/taxRules2026.ts`; employee-deduction ratios intentionally retain full precision instead of the official first-four-decimal convention, and monetary values are formatted to two decimals only for display.
- The supported scenario includes statutory employee and tax-wedge deductions but excludes personal/additional relief, dependents, other deductions, and trattamento integrativo. Italian-number grouping separators must be internally consistent.
- UJ-01 is an Italian, mobile-first and keyboard-accessible single-page flow. It preserves the RAL as editable text, calculates only after valid submit, and renders annual/monthly KPIs, an accessible salary-composition bar, an adapter-driven formula reconciliation, assumptions, official sources, and the approved warning.
- Fiscal formulas and source selection for UI disclosure live in the pure `buildCalculationBreakdown` adapter rather than React components.
- The hardened interaction contract invalidates stale results on either input change, uses one persistent concise status region, gives each formula disclosure a unique accessible name, restores focus when assumptions close, derives bracket prose from centralized arrays, and shares Italian percentage formatting across visible and accessible text.
- Production browser types are isolated from test and Node tooling types through separate strict TypeScript projects.
- Local development is pinned to Node.js 24.15.0, Node 24 type declarations, and npm 11.17.0; strict package engines also accept supported Node.js 26+ runtimes.
- Docker builds with Node.js 24.15.0 Alpine, then copies only `dist/` into pinned stable Nginx 1.30.4 Alpine. Runtime health, SPA fallback, cache/security headers, and absence of Node/npm were verified locally.
- `README.md`, `docs/CALCULATION_SPEC.md`, and `docs/VALIDATION.md` give the reviewer complete Italian product, formula, source, limitation, verification, and EasyPanel context.
- `CLAUDE.md` remains the engineering governance source; `AGENTS.md` now reflects the current Vite/engine/Docker repository.

## Blockers and Pending Decisions

- No implementation blockers.
- The public demo URL remains `Da aggiungere dopo il deployment`; external deployment is intentionally not performed in IT-03.

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
- `src/utils/formatPercentage.ts`
- `README.md`
- `docs/CALCULATION_SPEC.md`, `docs/VALIDATION.md`, and `docs/security_checklist.md`
- `Dockerfile`, `nginx.conf`, and `.dockerignore`
