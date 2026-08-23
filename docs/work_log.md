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

## 2026-08-23 — UJ-01: Transparent Salary Calculator

- **Status**: Completed.
- **Scope**: Replaced the scaffold placeholder with the approved Italian RAL-to-net journey. Docker, deployment, `README.md`, and `AGENTS.md` remain unchanged.
- **TDD evidence**: New component and adapter suites first failed against the placeholder and missing adapter. Implementation then made the focused suites pass; a static check exposed an unsupported `Intl` option spelling, which was corrected before full verification.
- **Implementation**: Added a mobile-first accessible calculator with editable Italian RAL text, 13/14-payment radio controls, pre-engine validation and focused errors, submit-triggered results, four KPIs, an accessible salary-composition bar, formula disclosures, assumptions, official sources, and the approved warning. Updated title and description metadata.
- **Architecture**: Added the pure `buildCalculationBreakdown` presentation adapter. It derives ordered values, signs, explanations, formula text, thresholds, year, and official source mappings from engine results and centralized 2026 constants; React only renders typed descriptors.
- **Accessibility and responsive review**: Uses semantic header/main/footer, labeled form and fieldset, associated hints/errors, `aria-invalid`, a polite results announcement, disclosure state/control relationships, focus transfer to assumptions, visible focus styles, 44px-or-larger controls, mobile stacking at 320/375px, tabular numerals, and a text legend that does not rely on color.
- **Security checklist**: Passed all applicable items; see `docs/security_checklist.md`. Validation tests explicitly prove invalid values do not call the salary engine.
- **Verification**: `npm test` passed (12 files, 83 tests); `npm run typecheck`, `npm run lint`, and `npm run build` passed; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed.

### UJ-01 interaction hardening

- Invalidated rendered results and cleared their announcement immediately when either RAL or monthly-payment input changes; recalculation is required before results return.
- Replaced the large nested live result tree with one persistent screen-reader-only status region that mounts on first paint and receives a concise success message.
- Made assumptions a coherent two-way disclosure, including dynamic trigger text and focus restoration from its close control; formula disclosures now include the calculation-row label in each accessible name.
- Derived both national and regional bracket descriptions, including their final open bounds, from centralized rule arrays. Added one shared Italian percentage formatter for visible legends and the composition bar’s accessible summary.
- TDD evidence: the new regressions initially failed for the missing formatter, stale results, absent persistent status, duplicate disclosure names, incomplete bracket prose, and focus behavior; all passed after implementation.
- Reverification: `npm test` passed (13 files, 88 tests); `npm run typecheck`, `npm run lint`, and `npm run build` passed; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed.

## 2026-08-23 — IT-03: Documented Docker Delivery

- **Status**: Completed locally; no push, public deployment, domain, certificate, or external service mutation was performed.
- **Scope**: Replaced obsolete repository guidance with an Italian reviewer README, complete calculation specification, truthful validation report, current contributor guidance, and EasyPanel runbook. Fiscal formulas and UI were not changed.
- **Delivery**: Added a multi-stage image using Node.js 24.15.0 Alpine for `npm ci`/build and stable Nginx 1.30.4 Alpine as the static-only runtime. Nginx listens on port 80, provides exact `/healthz`, SPA fallback, gzip, no-cache HTML, immutable hashed assets, hidden version, and restrictive compatible security headers.
- **Docker evidence**: `docker build -t ral-netto-calculator .` passed and produced final image `sha256:68b122db66961852cf2566a0510cf5c76fe17c274ee5eafecc80136f3d907421`. Runtime inspection found no Node/npm and `nginx -t` passed. Container `ral-netto-calculator-it03-final` on free host port 18080 became healthy; root, deep-link fallback, health endpoint, security/cache headers, and unknown-asset 404 passed curl checks. That exact container was then stopped and removed.
- **Security**: Final applicable checklist passed. There are no credentials or dynamic services; the runtime contains only Nginx/static files. CSP, MIME, frame, referrer, permissions, caching, health response, and lack of server-version disclosure were verified. Server-side auth/database/upload items remain not applicable.
- **Verification**: `npm test` passed (13 files, 88 tests); `npm run typecheck`, `npm run lint`, and `npm run build` passed; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed. Full command-level evidence and residual differences are in `docs/VALIDATION.md`.

### IT-03 730 reference-period clarification

- Clarified that Modello 730/2026 is filed in 2026 for 2025 income and is used only as official evidence of the employee-deduction formula and first-four-decimal ratio convention. The unchanged formula is carried into the approved 2026 projection, whereas the new 33% IRPEF rate is independently sourced to Law 199/2025 effective in 2026.
- Added type-safe `referenceTaxPeriod` and applicability-note provenance for the employee-deduction source, plus regression assertions. Fiscal constants and formulas were not changed.
- Verification: `npm test` passed (13 files, 88 tests); `npm run typecheck`, `npm run lint`, and `npm run build` passed; `npm audit --audit-level=high` reported zero vulnerabilities; `git diff --check` passed.
