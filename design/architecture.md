# System Architecture

## Overview

NettoChiaro is a stateless Next.js application. A server-rendered shell supplies metadata and source content; a focused client component owns form state and invokes a framework-independent TypeScript calculation engine. No salary input leaves the browser. The only server endpoint is a minimal health check for EasyPanel.

## Components

- **Application shell**: Next.js App Router server components for layout, metadata, static methodology, and sources.
- **Calculator UI**: React client component with local form/result state and semantic, accessible controls.
- **Tax engine**: Pure TypeScript modules for contributions, progressive taxes, deductions, credits, surtaxes, rounding, and reconciliation.
- **Health API**: Node.js route handler at `GET /api/health`.
- **Database**: None; inputs and results are not persisted.
- **Authentication**: None; every feature is public and read-only.

## Data Flow

1. Visitor enters RAL and payment count; the form validates the supported range.
2. On **Calcola**, the client calls the pure engine with the fixed 2025 rule set.
3. The engine returns a complete `SalaryProjection`, including intermediate bases and applied rules.
4. Presentational components render headline values, allocation, breakdown, and rule explanations from that object.
5. Refreshing or closing the page discards the calculation.

## Calculation Boundaries

- Rates and thresholds are versioned as immutable 2025 constants, separate from formulas.
- A progressive-bracket helper is shared by IRPEF and Lombardy surtax.
- Monetary outputs are rounded half-up to cents at documented component boundaries.
- Detraction ratios explicitly truncate to four decimal places where required.
- The result includes a reconciliation invariant so displayed components reproduce final net exactly.

## Credential Level Mapping

- **Level 1 (.env)**: None required.
- **Level 2 (deployment)**: `NODE_ENV=production`, `PORT=3000`, optional `NEXT_PUBLIC_SITE_URL` for canonical metadata.
- **Level 3 (admin panel)**: None. No admin panel is warranted because there are no users, integrations, secrets, or mutable application data.

## Integration Points

- **Build/deploy only**: private GitHub repository connected to EasyPanel.
- **Runtime**: no third-party service. Official tax sources are ordinary external links and are never fetched during calculation.

## Deployment Topology

One multi-stage Docker image uses Next.js `output: "standalone"`, copies static assets, runs as a non-root user, listens on `0.0.0.0:3000`, and exposes `/api/health`. EasyPanel terminates HTTPS, performs health checks, restarts failures, and deploys from `main`.
