# Stack Selection

## Selections

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Runtime | Node.js 24 LTS | Current LTS base with strong Next.js support |
| Application | Next.js 16.3.2 App Router | One typed project for static content, interactive UI, health route, metadata, and standalone Docker output |
| Frontend | React 19.2.8 + TypeScript strict + Tailwind CSS | Accessible component model with concise, maintainable styling |
| Validation | Zod 4.4.3 | Shared explicit input contract |
| Unit tests | Vitest 4.1.11 + Testing Library | Fast pure-function and component verification |
| E2E tests | Playwright | Real browser, keyboard, responsive, and flow verification |
| Database / ORM | None | No persisted product data |
| Authentication | None | Public calculator with no protected state |
| AI Provider | None | Runtime AI would weaken determinism and domain control for this exercise |
| Deployment | Multi-stage Docker + EasyPanel | Single reproducible private-repo deployment with health monitoring |

## Alternatives Considered

- **React/Vite + Express**: Rejected because two processes add no value for one page and one health endpoint.
- **Python/FastAPI + React**: Rejected because a second language increases surface area without improving the deterministic formula engine.
- **Generative explanation**: Rejected after brief review; the evaluator needs to see understood, source-backed logic, not model-generated fiscal prose.
- **Static HTML only**: Rejected because typed domain modules and automated boundary tests materially improve correctness and explainability.
- **Multiple tax years/locations**: Deferred to keep the prototype defensible and complete for one standard case.
