# Design Summary

## Approved Foundation

- Product: JetHR RAL-to-net calculator for the Italian 2026 tax year.
- Runtime: client-only React application built with Vite and strict TypeScript; Node.js 24.15.x is the pinned development line.
- Testing: Vitest, jsdom, and Testing Library.
- Persistence, authentication, backend APIs, and runtime credentials: none in the current scope.
- Deployment and Docker are deferred to a later approved infrastructure task.

## Current Module Map

- `src/main.tsx`: browser entry point.
- `src/App.tsx`: accessible Italian calculator journey with guarded RAL input, 13/14-payment selection, result KPIs, composition, disclosures, assumptions, sources, and disclaimer.
- `src/styles.css`: mobile-first sober visual system with responsive cards, tabular figures, visible focus states, and color-independent composition labels.
- `src/test/setup.ts`: shared browser-test matchers and cleanup.
- `tsconfig.app.json`, `tsconfig.test.json`, and `tsconfig.node.json`: isolated production-browser, test, and tooling type environments.
- `src/types/salary.ts`: explicit public input/result types for salary calculations.
- `src/engine/taxRules2026.ts`: immutable 2026 constants, progressive brackets, supported ranges, scenario, precision policy, and rule-specific official-source provenance.
- `src/engine/`: pure modules for employee contributions, gross IRPEF, employee deduction, tax-wedge deduction, Lombardia regional tax, Milano municipal tax, and the aggregate salary calculation.
- `src/engine/buildCalculationBreakdown.ts`: pure presentation adapter that derives ordered formula/source descriptors from engine results and centralized 2026 rules; React contains no fiscal formulas.
- `src/utils/`: strict Italian-number parsing and display-only EUR currency formatting.

## IT-02 Fiscal Contract

- Supported scenario: standard private non-manager permanent full-time employee for the full 2026 year, resident in Milano/Lombardia. Statutory employee and tax-wedge deductions are included; personal/additional relief, dependents, other deductions, and trattamento integrativo are excluded.
- Public calculation input: finite gross annual salary from EUR 25,000 through EUR 100,000 inclusive and 13 or 14 monthly payments.
- Contributions: 9.19% of RAL plus 1% of the portion above EUR 56,224.
- National tax: progressive IRPEF of 23% through EUR 28,000, 33% through EUR 50,000, and 43% above; employee and tax-wedge deductions use the approved IT-02 formulas.
- Local tax: progressive Lombardia rates of 1.23%, 1.58%, 1.72%, and 1.73%; Milano applies 0.8% to the entire taxable income only above its EUR 23,000 exemption threshold.
- Calculations intentionally retain full JavaScript ratio precision instead of the official first-four-decimal employee-deduction convention, without internal currency rounding. `formatCurrency` applies two-decimal `it-IT` EUR formatting only at the display boundary.
- Each fiscal rule family has frozen traceability metadata for official authority, title/instrument/page where applicable, URL, effective year, and verification date.
- UJ-01 exposes the annual calculation through a client-only UI. Results remain hidden until a valid submit and are invalidated on any RAL or payment edit; a persistent concise live region announces successful recalculation. Malformed, non-positive, and out-of-range input never reaches the engine. Docker, deployment, authentication, persistence, and backend APIs remain out of scope.

## Verification Commands

- Development server: `npm run dev`
- Unit/component tests: `npm test`
- Test watch mode: `npm run test:watch`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Production build: `npm run build`

## Security Posture

- Static browser application with no secrets, sensitive-data storage, external inputs, protected routes, database, uploads, or server responses in IT-01.
- Dependencies are installed from the public npm registry and committed through `package-lock.json`.
- `package.json` accepts Node.js `^24.15.0 || >=26.0.0`, matching jsdom 30's supported even-numbered runtime lines; `.nvmrc` pins local development to 24.15.0 and `.npmrc` enforces the engine constraints.
- React escapes rendered text by default; no raw HTML rendering is used.
- IT-02 adds no network, persistence, credential, protected-route, upload, or raw-HTML surface. The calculation boundary rejects non-number inputs, non-finite RAL values, out-of-range RAL values, and unsupported payment counts; the parser rejects malformed or ambiguous numeric text.
- UJ-01 keeps all processing local, validates and associates form errors before calculation, uses React's escaped text rendering, and opens official links with `rel="noreferrer"`. No secrets, storage, API calls, authentication, database, uploads, or raw HTML were introduced.
