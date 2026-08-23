---
description: Inicializa un nuevo proyecto desde la plantilla FactorIA. Activa el modo planificacion.
---

# Project Initialization — Planning Mode

You are initializing a new project from the FactorIA-APP-TEMPLATE.

CLAUDE.md is already loaded and governs your behavior. Do not repeat its rules — follow them.

Complete Planning Mode by following these steps in order:

1. **Understand**: Read the project description (START_PROJECT_PROMPT.md or conversation). Analyze purpose, users, roles, integrations, constraints.

2. **Ask**: Identify blocking questions and assumptions. Write to planning/questions.md. Wait for user answers on blocking items.

3. **Requirements & Scope**: Define functional/non-functional requirements (planning/requirements.md), scope boundaries (planning/scope.md), and risks (planning/risks.md).

4. **Design**: Create design docs with priority-based depth:
   - HIGH detail: data_model.md, api_contracts.md (read before every journey)
   - MEDIUM detail: ui_wireframes.md, architecture.md (read occasionally)
   - LIGHT detail: style_guide.md, stack_selection.md
   - Include credential level mapping (Level 1/2/3) in architecture.md
   - Write nfr.md in docs/

5. **Decompose**: Break all work into Infrastructure Tasks (IT) and User Journeys (UJ) in implementation/user_journeys.md. Group related UJs into milestones (3-6 related journeys that form a functional unit). Populate implementation/task_tracker.md with milestone boundaries.

6. **Skills & MCPs (by concrete need)**: Only when the project has a concrete capability or integration need (a specific third-party service, database, payments, browser automation for verification, etc.), evaluate whether a skill or MCP helps. Do not run this as a ritual on projects with no such need. Do not invent candidates to fill a table.
   - **Where to look**, in this order: (a) the skills already available in this Claude Code session; (b) the MCP servers already configured in the environment (`~/.claude.json`, project `.mcp.json`); (c) the official catalogs of tools not yet installed — for MCPs, the `modelcontextprotocol/servers` repository, the official MCP registry, and Anthropic's documented integrations; for skills, the available skill marketplaces/registries (the Anthropic skills catalog and installable plugins) — to find an existing skill or server that covers the need even if the user does not have it yet.
   - **How to decide**: a tool qualifies only if it maps to a concrete project need and removes real work or enables something the plain stack cannot do easily.
   - **If it is already available** (installed skill or configured MCP): document it in skills/inventory.md, mcps/inventory.md and design_summary.md, noting what it is used for.
   - **If a useful skill or MCP exists but is NOT installed**: propose it in the plan — name, what it does, why it helps, and what it requires (an MCP often needs an API key or config; skills usually need nothing) — and let the user decide whether to install it. Record it as "proposed (pending user install)" in the relevant inventory (skills/inventory.md or mcps/inventory.md). Never install anything that requires the user's credentials without explicit approval.
   - **If nothing qualifies** (a common and valid outcome): write "None needed" with one line of reasoning.

7. **Decisions**: Record all significant decisions in docs/decision_log.md.

8. **Memory & Summary**: Update docs/project_memory.md with current state. Generate design/design_summary.md — a compact (~50 line) reference with stack, module map, entity list, key patterns, and credential map. It must include the Verification Commands for the chosen stack (start backend, start frontend, run tests, lint, build) — these are the commands used to verify every journey during execution.

9. **Present**: Show structured summary with IT list, UJ list (grouped by milestone, in execution order), estimated sessions, open questions, top risks. Wait for user approval.

**Quality check before presenting:**
- Every feature maps to an IT or UJ
- Every UJ has a frontend page in the navigation
- API contracts cover every journey's needs
- Data model covers every journey's storage
- Admin panel has dedicated journeys (if it applies to this project type — see CLAUDE.md rule 4; for UI-less projects, config management is documented and a health endpoint exists)
- Every credential is assigned a level

**If planning needs multiple sessions:** Complete current step fully, update project_memory.md with progress, resume with /session-start next session.

No code until user approves.
