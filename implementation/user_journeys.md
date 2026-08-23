# Infrastructure Tasks & User Journeys

## Purpose

This file defines all work units for the project. Infrastructure Tasks (IT) are foundational work done first. User Journeys (UJ) are complete end-to-end user actions — the primary unit of implementation.

## Tasks & Journeys

## M0 — Foundation

### IT-01: Next.js Project Scaffold

- **Purpose**: Establish the typed application and quality toolchain before feature work.
- **Components**: Next.js App Router, strict TypeScript, Tailwind CSS, ESLint, Vitest, Testing Library, Playwright, package scripts, environment example.
- **Acceptance Criteria**: Development server renders the branded shell; lint, typecheck, tests, and production build exit successfully.
- **Security**: Trusted pinned dependencies; no secrets or unnecessary runtime packages.

### IT-02: Versioned 2025 Tax Engine

- **Purpose**: Encode the supported fiscal domain independently of UI.
- **Components**: Money helpers, progressive brackets, 2025 constants, contribution/tax/deduction/credit functions, rule catalog, `calculateSalary` orchestrator.
- **Acceptance Criteria**: Every statutory boundary and the EUR 30,000 reference case pass; reconciliation delta is zero; functions have no I/O or framework dependency.
- **Security**: Validate inputs; never evaluate dynamic formulas or render HTML from rule content.

### IT-03: Container and Operational Foundation

- **Purpose**: Make the prototype reproducibly deployable to EasyPanel.
- **Components**: `GET /api/health`, standalone Next build, multi-stage non-root Dockerfile, Docker Compose, `.dockerignore`, deployment guide.
- **Acceptance Criteria**: Container builds, becomes healthy, serves `/`, and restarts cleanly with no volume or secret.
- **Security**: Non-root runtime, production-only dependencies, minimal health response, no environment leakage.

## M1 — Transparent Salary Projection

### UJ-01: Calculate a Standard Salary Projection

- **Description**: A visitor enters RAL, chooses 12/13/14 payments, presses **Calcola**, and receives annual and average monthly net.
- **Backend**: None; pure tax engine invoked in browser.
- **Frontend**: `/` calculator form, fixed assumptions, validation, submit/result state.
- **Acceptance Criteria**: Valid input produces deterministic Italian-formatted results; invalid input receives a specific accessible error; selected payments only change monthly average.
- **Security**: Range and decimal validation; no persistence or network request containing RAL.
- **Tests**: Engine unit cases, form validation, Playwright valid/invalid flows.

### UJ-02: Inspect Every Step from RAL to Net

- **Description**: A visitor can reconcile the result through contributions, taxable income, taxes, deductions, surtaxes, and credits.
- **Backend**: None.
- **Frontend**: KPI cards, allocation bar with text legend, ordered breakdown, signs/categories, reconciliation display.
- **Acceptance Criteria**: Displayed rows reproduce final net to the cent; taxes and contributions remain distinct; credits are positive; chart information is also text.
- **Security**: Render only typed engine output.
- **Tests**: Component totals/signs and E2E checks for the EUR 30,000 result.

### UJ-03: Understand Why Each Rule Applies

- **Description**: A visitor can understand the rationale, formula, source, and simplification behind each result component.
- **Backend**: None.
- **Frontend**: Expandable rule explanations, methodology, worked example, limitations, official links, 2025 badge and disclaimer.
- **Acceptance Criteria**: Every breakdown row maps to one explanation and official source; the worked example matches the live engine; no runtime generative text appears.
- **Security**: Static trusted content; external links use safe target/rel behavior.
- **Tests**: Rule-catalog completeness and E2E source-link/accordion checks.

### UJ-04: Use the Calculator Accessibly on Any Screen

- **Description**: Keyboard, screen-reader, mobile, and desktop visitors can complete and inspect the same calculation.
- **Backend**: None.
- **Frontend**: Semantic structure, focus management, live result announcement, reduced motion, responsive cards and stacked mobile breakdown.
- **Acceptance Criteria**: WCAG 2.2 AA interaction rules pass; no horizontal scroll at 320 px; all actions work by keyboard.
- **Security**: Error UI does not expose internal exception details.
- **Tests**: axe accessibility checks and Playwright desktop/mobile/keyboard scenarios.

## Milestone Reviews

- Run `/review` after IT-01 through IT-03.
- Run `/review` after UJ-01 through UJ-04.
- Run a final review, security checklist, container smoke test, and desktop/mobile visual review before delivery.
