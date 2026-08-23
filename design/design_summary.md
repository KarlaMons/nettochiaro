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
- Fiscal rules and final UI are explicitly out of scope for IT-01.

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
