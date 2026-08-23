# Design Summary

## Stack

- Next.js 16.3.2 App Router, React 19.2.8, strict TypeScript, Tailwind CSS, Node.js 24
- Tests: Vitest + Testing Library; Playwright E2E
- Persistence/auth/runtime APIs: none
- Deployment: standalone non-root Docker on EasyPanel from private GitHub `main`

## Module Map

- `app/`: one `/` page plus `GET /api/health`
- `components/`: form, KPI/allocation, breakdown, rule explanations, methodology
- `lib/tax/`: immutable rules, pure calculators, money helpers, orchestrator, types
- Rule source of truth: `design/calculation_rules.md`
- `tests/` and `e2e/`: unit/component and Playwright flows

## Entity Overview

- `CalculationInput` — RAL EUR 5k–120k; mensilità 12/13/14; `SalaryProjection` — full reconciled result
- `TaxRule` — stable ID, rationale, formula, official source, caveat

## Key Patterns

- Fixed case: tax year 2025, permanent private employee, Milan, 365 days, no other income/relief
- Deterministic browser calculation; no RAL persistence or transmission
- Shared progressive brackets; monetary cents centralized; required ratios truncate to 4 decimals
- Every result row maps to definition + rationale + formula + source + simplification
- Monthly value is annual average, never a simulated payslip

## Verification Commands

- Start app: `npm run dev`
- Unit/components: `npm test`
- E2E: `npm run test:e2e`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Container: `docker compose up --build`; health: `curl -f http://localhost:3000/api/health`

## Credential Map

- Level 1: none
- Level 2: `NODE_ENV`, `PORT`, optional `NEXT_PUBLIC_SITE_URL`
- Level 3: none; no admin panel

## Installed Skills & MCPs

- Selected: next-best-practices, playwright-e2e-testing, verification-before-completion
- No MCP/plugin needed; official sources are build-time links only
