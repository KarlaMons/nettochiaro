# Design Summary

## Approved Foundation

- Product: JetHR RAL-to-net calculator for the Italian 2026 tax year.
- Runtime: client-only React application built with Vite and strict TypeScript; Node.js 24.15.x is the pinned development line.
- Testing: Vitest, jsdom, and Testing Library.
- Persistence, authentication, backend APIs, and runtime credentials: none in the current scope.
- Deployment and Docker are deferred to a later approved infrastructure task.

## Current Module Map

- `src/main.tsx`: browser entry point.
- `src/App.tsx`: neutral application placeholder until the product UI journey is approved.
- `src/styles.css`: minimal global scaffold styles.
- `src/test/setup.ts`: shared browser-test matchers and cleanup.
- `tsconfig.app.json`, `tsconfig.test.json`, and `tsconfig.node.json`: isolated production-browser, test, and tooling type environments.
- `src/types/salary.ts`: explicit public input/result types for salary calculations.
- `src/engine/taxRules2026.ts`: immutable 2026 constants, progressive brackets, supported ranges, scenario, precision policy, and source provenance.
- `src/engine/`: pure modules for employee contributions, gross IRPEF, employee deduction, tax-wedge deduction, Lombardia regional tax, Milano municipal tax, and the aggregate salary calculation.
- `src/utils/`: strict Italian-number parsing and display-only EUR currency formatting.

## IT-02 Fiscal Contract

- Supported scenario: standard private non-manager permanent full-time employee for the full 2026 year, resident in Milano/Lombardia, without dependents, other income, deductions, or additional relief.
- Public calculation input: finite gross annual salary from EUR 25,000 through EUR 100,000 inclusive and 13 or 14 monthly payments.
- Contributions: 9.19% of RAL plus 1% of the portion above EUR 56,224.
- National tax: progressive IRPEF of 23% through EUR 28,000, 33% through EUR 50,000, and 43% above; employee and tax-wedge deductions use the approved IT-02 formulas.
- Local tax: progressive Lombardia rates of 1.23%, 1.58%, 1.72%, and 1.73%; Milano applies 0.8% to the entire taxable income only above its EUR 23,000 exemption threshold.
- Calculations retain full JavaScript number precision without internal currency rounding. `formatCurrency` applies two-decimal `it-IT` EUR formatting only at the display boundary.
- The final product UI, Docker, deployment, authentication, persistence, and backend APIs remain out of scope.

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
