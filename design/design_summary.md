# Design Summary

## Approved Foundation

- Product: JetHR RAL-to-net calculator for the Italian 2026 tax year.
- Runtime: client-only React application built with Vite and strict TypeScript.
- Testing: Vitest, jsdom, and Testing Library.
- Persistence, authentication, backend APIs, and runtime credentials: none in the current scope.
- Deployment and Docker are deferred to a later approved infrastructure task.

## Current Module Map

- `src/main.tsx`: browser entry point.
- `src/App.tsx`: neutral application placeholder until the product UI journey is approved.
- `src/styles.css`: minimal global scaffold styles.
- `src/test/setup.ts`: shared browser-test matchers and cleanup.
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
- React escapes rendered text by default; no raw HTML rendering is used.
