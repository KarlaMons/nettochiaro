# Work Log

## 2026-08-23 — IT-01: Vite React TypeScript Scaffold

- **Status**: Completed.
- **Scope**: Replaced the superseded 2025 Next.js planning scaffold with the approved root-level 2026 Vite foundation. Tax formulas, final product UI, Docker, deployment, `AGENTS.md`, and `README.md` were not changed.
- **Implementation**: Added React, strict TypeScript, Vite, flat ESLint configuration, Vitest with jsdom and Testing Library, a neutral accessible placeholder, locked npm dependencies, and minimal current governance records.
- **Security**: Passed the applicable static-app checklist. No secrets, sensitive logging, external inputs, raw HTML, backend routes, authentication/authorization surface, database access, or file uploads are present. Dependencies came from the npm registry; `npm audit --audit-level=high` reported zero vulnerabilities. Server-only checklist items are not applicable to this client-only scaffold.
- **Verification**: `npm run typecheck` passed; `npm run lint` passed; `npm test` passed (1 file, 1 test); `npm run build` passed with Vite 8.2.2.

### IT-01 quality-review hardening

- Isolated browser production types from Vitest and Node.js tooling types with dedicated strict TypeScript configurations.
- Declared supported engines for jsdom 30 (`^24.15.0 || >=26.0.0`), pinned local Node.js to 24.15.0, and declared npm 11.17.0 as the package manager.
- Reverification: `npm run typecheck`, `npm run lint`, `npm test` (1 file, 1 test), and `npm run build` all passed; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed.

### IT-01 supported-runtime enforcement

- Enabled npm strict engine checks and aligned `@types/node` with the pinned Node.js 24 development runtime.
- Reverification: `npm run typecheck`, `npm run lint`, `npm test` (1 file, 1 test), and `npm run build` all passed; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed.

## 2026-08-23 — IT-02: Deterministic 2026 Salary Engine

- **Status**: Completed.
- **Scope**: Added the approved annual full-precision engine for a standard private non-manager permanent full-time employee in Milano/Lombardia, with supported RAL from EUR 25,000 through EUR 100,000 and 13 or 14 monthly payments. The final product UI, Docker, deployment, `README.md`, and `AGENTS.md` were not changed.
- **TDD evidence**: The first test run failed because all eight new engine/utility modules were absent. After implementation and correction of two over-specified test literals, all nine test files and 53 tests passed.
- **Implementation**: Centralized immutable 2026 constants, progressive brackets, scenario metadata, and precision policy in `src/engine/taxRules2026.ts`; added pure contributions, gross IRPEF, employee deduction, tax-wedge deduction, local-tax, and aggregate salary modules; added explicit public types, strict Italian-number parsing, and display-only EUR formatting.
- **Precision and reconciliation**: No production formula rounds or truncates intermediate values. The EUR 30,000 reference result retains the approved repeating-ratio precision, and tests verify that annual net plus total withholdings reconciles to RAL within floating-point tolerance.
- **Security checklist**: Passed all applicable items. Public calculation inputs are type/range checked at runtime, and malformed or ambiguous number text is rejected. No secrets, sensitive logs, external requests, raw HTML, protected routes, authentication/authorization, database queries, API responses, or uploads were introduced. Dependencies remain from the npm registry; server-only checklist items are not applicable.
- **Verification**: `npm test` passed (9 files, 53 tests); `npm run typecheck` passed; `npm run lint` passed; `npm run build` passed with Vite 8.2.2; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed.

### IT-02 boundary-coverage review

- Added direct coverage for inclusive RAL limits and runtime non-number inputs; employee-deduction strict boundaries at EUR 15,001, EUR 25,000, and EUR 25,001; and tax-wedge strict boundaries at EUR 20,000, EUR 20,001, and EUR 32,001.
- Extracted the existing net-IRPEF zero cap into the pure `calculateNetIrpef` helper and tested both its subtraction and capped branches without changing the formula.
- Strengthened the 13-versus-14 payment invariant to compare every annual calculation field for exact equality while proving that only the payment count and monthly average differ.
- TDD evidence: the expanded suite initially failed only because `calculateNetIrpef` did not exist; after extraction, all 10 test files and 65 tests passed.
- Reverification: `npm test` passed (10 files, 65 tests); `npm run typecheck`, `npm run lint`, and `npm run build` passed; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed.

### IT-02 fiscal-provenance review

- Replaced generic provenance with six frozen rule-specific records covering employee contributions, IRPEF, employee deduction, tax-wedge deduction, Lombardia regional tax, and Milano municipal tax. Each record identifies its official authority, title/instrument/page where applicable, URL, 2026 effective year, and `2026-08-23` verification date.
- Clarified that the supported scenario includes the statutory employee and tax-wedge deductions while excluding personal/additional relief, dependents, other deductions, and trattamento integrativo.
- Documented the deliberate prototype precision policy: employee-deduction ratios retain full precision instead of applying the official first-four-decimal convention.
- Hardened Italian-number parsing so a grouped number may use dots, normal spaces, or non-breaking spaces, but cannot mix separator styles.
- TDD evidence: all six new assertions initially failed against generic metadata and permissive mixed-separator parsing; after implementation, all 11 test files and 71 tests passed.
- Reverification: `npm test` passed (11 files, 71 tests); `npm run typecheck`, `npm run lint`, and `npm run build` passed; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed.
