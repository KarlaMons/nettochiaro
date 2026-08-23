# Questions & Assumptions

## Blocking Questions

Questions that must be answered before planning can proceed.

- None. The product brief and design direction are approved.

## Non-Blocking Questions

Questions that can be deferred but should be resolved before implementation.

- **Q1 — Production domain:** Which hostname will point to the EasyPanel service? Resolve before deployment.
- **Q2 — Repository connection:** Which private GitHub repository and EasyPanel project will be used? Resolve before deployment.

## Assumptions

Assumptions made during planning. Flag if any are incorrect.

- **A1:** Product name is `NettoChiaro`, presented as an original prototype for Jet HR.
- **A2:** Tax year is fixed to 2025; rules are not fetched or updated automatically.
- **A3:** The standard employee is private-sector, permanently employed, resident in Milan for 365 days, and has no other income or relief.
- **A4:** The public app stores no inputs and requires no authentication, database, analytics, or admin panel.
- **A5:** Delivery is a live EasyPanel URL backed by a private GitHub repository.
