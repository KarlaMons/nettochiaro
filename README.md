# NettoChiaro

Italian 2025 RAL-to-net salary calculator prototype for Jet HR. It estimates annual and average monthly net pay for one explicit standard case and exposes every contribution, tax, deduction, credit, formula, and official source behind the result.

## Quick Start

The project is in planning. Review `docs/superpowers/specs/2026-08-23-nettochiaro-design.md` and the compact `design/design_summary.md`. After written-spec approval, create the implementation plan; application commands become available during IT-01.

## Structure

- `CLAUDE.md` and `AGENTS.md` — governance and contributor rules
- `planning/` — Requirements, scope, questions, risks
- `design/` — Architecture, data model, API contracts, UI wireframes
- `implementation/` — Task tracker and journey definitions
- `docs/` — Project memory, work log, decisions
- `deployment/` — Docker, EasyPanel, deployment scripts
- `app/`, `components/`, `lib/tax/` — planned Next.js application structure
- `tests/` — Automated tests

## Commands

| Command | Purpose |
|---------|---------|
| `/init-project` | Refresh project planning |
| `/start-execution` | Begin building after plan approval |
| `/session-start` | Resume work at start of session |
| `/review` | Independent quality review |
| `/iterate` | Post-delivery changes |
