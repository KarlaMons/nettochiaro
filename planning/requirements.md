# Requirements

## Functional Requirements

- **FR-01 — Salary input:** Accept a RAL from EUR 5,000 to EUR 120,000 and 12, 13, or 14 payments; default to 13.
- **FR-02 — Explicit calculation:** Calculate only after the user presses **Calcola** and show accessible inline validation for invalid values.
- **FR-03 — Headline output:** Show annual net, average monthly net, and total employee taxes and contributions in Italian currency format.
- **FR-04 — Full reconciliation:** Itemize RAL, INPS contributions, taxable income, gross IRPEF, employment deduction, 2025 tax-wedge benefit/deduction, net IRPEF, Lombardy surtax, Milan surtax, integrative treatment, and final net.
- **FR-05 — Domain explanation:** For each item, state what it is, why it applies, its base and formula, and its official source.
- **FR-06 — Assumptions and limits:** Keep the standard-case assumptions, tax year, exclusions, and non-advisory disclaimer visible.
- **FR-07 — Worked example:** Include a step-by-step EUR 30,000 / 13-payment example consistent with the engine.
- **FR-08 — Responsive result:** Support the complete flow on mobile and desktop without horizontal scrolling or hidden values.
- **FR-09 — Health check:** Expose `GET /api/health` for deployment monitoring.
- **FR-10 — Source access:** Link directly to the official national, INPS, regional, and municipal sources used.

## Non-Functional Requirements

See `docs/nfr.md` for detailed non-functional requirements.

## User Roles

- **Visitor:** Public, anonymous user who can calculate and inspect methodology. No data is saved.
- **Operator:** Deploys the container and monitors health through EasyPanel; has no application UI or special account.
