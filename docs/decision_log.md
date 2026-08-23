# Decision Log

Architectural and design decisions with rationale. Created when decisions are made during planning or implementation.

## Decisions

### DEC-01: Fix One 2025 Standard Case

- **Date**: 2026-08-23
- **Context**: Italian payroll has many contract, location, and personal variants.
- **Decision**: Support a full-year private permanent employee resident in Milan with no other income or relief, under 2025 rules.
- **Rationale**: A narrow model can be researched, tested, and defended end to end.
- **Alternatives Considered**: Multiple locations, years, and personal inputs were rejected as premature breadth.

### DEC-02: Use Deterministic Logic and No Runtime AI

- **Date**: 2026-08-23
- **Context**: The exercise values understanding and control of domain logic.
- **Decision**: Calculate and explain using reviewed TypeScript functions and static source-backed content.
- **Rationale**: Generative text could obscure implementation or introduce unsupported fiscal claims.
- **Alternatives Considered**: Optional AI explanation and salary chat were rejected.

### DEC-03: Build One Next.js Application

- **Date**: 2026-08-23
- **Context**: The product needs one interactive page and one deployment health route.
- **Decision**: Use Next.js App Router, React, strict TypeScript, and Tailwind CSS in one container.
- **Rationale**: One codebase minimizes deployment complexity while preserving typed modularity.
- **Alternatives Considered**: React/Express and React/FastAPI split stacks.

### DEC-04: Keep Salary Data Ephemeral

- **Date**: 2026-08-23
- **Context**: RAL can be sensitive and persistence adds no prototype value.
- **Decision**: Calculate in the browser; use no database, local storage, analytics, accounts, or admin panel.
- **Rationale**: This minimizes privacy and security surface while meeting the brief.
- **Alternatives Considered**: Saved history and shareable links were excluded.

### DEC-05: Treat Monthly Net as an Annual Average

- **Date**: 2026-08-23
- **Context**: Real withholding differs across ordinary pay, additional payments, and surtax timing.
- **Decision**: Divide annual net by 12, 13, or 14 and label it “netto mensile medio”.
- **Rationale**: It answers the brief without pretending to reproduce payslips.
- **Alternatives Considered**: Month-by-month payroll simulation was excluded.

### DEC-06: Show Complete Domain Rationale in the Product

- **Date**: 2026-08-23
- **Context**: Reviewers must see why every rule applies.
- **Decision**: Map every breakdown item to a definition, rationale, formula, official source, and simplification.
- **Rationale**: This demonstrates domain research directly when only a live link is delivered.
- **Alternatives Considered**: Results-only and summary-only interfaces.

### DEC-07: Deliver Live from a Private Repository

- **Date**: 2026-08-23
- **Context**: The user wants to share only the functioning site.
- **Decision**: Deploy `main` from private GitHub to EasyPanel and provide the HTTPS URL.
- **Rationale**: Review is frictionless while source remains private.
- **Alternatives Considered**: Public repository, private registry, and manual upload.
