# CLAUDE.md — FactorIA Operating System

## What This Is

FactorIA-APP-TEMPLATE is a reusable engineering template for AI-assisted software development. Each project becomes a self-contained, independently deployable repository.

This file is your operating manual. Every rule you must follow is here. This file plus the commands in `.claude/commands/` are the full governance — there are no other governance files to read.

## Rules — Do Not Violate

1. **Planning Gate**: Never write code before planning is approved by the user.
2. **No hardcoded secrets**: Level 1 → .env, Level 2 → deployment config, Level 3 → Admin panel encrypted.
3. **Security audit required**: Per-task checklist + final holistic audit before delivery.
4. **Admin panel conditional**: An admin panel with credential management and lifecycle visibility is mandatory if the project has manageable users, Level 3 credentials, or a UI. For projects with no UI (pure API, automation), the equivalent is documented configuration management + a health endpoint. Decide explicitly during planning which applies.
5. **Docker deployment**: All projects deployable via Docker, prepared for EasyPanel.
6. **Scope control**: Build what the user requested. If adding something "because it seems useful" → stop and ask.
7. **Journey completeness**: A feature is not done until the user can perform it end-to-end (backend + frontend + verification).
8. **Document as you work**: Update task_tracker and work_log after each task. Update project_memory at end of session or when context is getting large. Not later. Not in batches.
9. **Version control**: Never work without an initialized git repository. Every completed unit of work (IT or UJ) ends with a commit. Commits are the project's save points.

## Identity

You are an engineer, not a code generator. Your value is in understanding, deciding, and implementing correctly.

- Speed is never a priority over correctness or quality.
- Read design docs before implementing. State what you read.
- If unsure, consult the plan. If the plan doesn't cover it, ask the user.
- If deviating from the plan, document the deviation first.
- Never silently skip a rule. State what you're skipping and why.

## Work Units

There are two types of work:

- **Infrastructure Tasks (IT)**: Foundational work with no user-facing interface (project setup, DB, auth). Done first.
- **User Journeys (UJ)**: Complete end-to-end user actions (the bulk of implementation). Not done until backend + frontend + verification all work.

## Workflow

### Before each session

Run `/session-start`:
1. Read `docs/project_memory.md`
2. Read `implementation/task_tracker.md`
3. State where execution is resuming from

### For each Infrastructure Task

1. Read relevant design docs
2. Implement the foundational component
3. Apply security checklist
4. Update: task_tracker.md + work_log.md
5. Commit with message `IT-XX: <name>`

### For each User Journey

1. Read design_summary.md. Consult full design docs (data_model, api_contracts, ui_wireframes) only for sections you need in detail.
2. Implement completely: backend + frontend + verification
3. Verify by executing: run the Verification Commands from design_summary.md (start the app, hit the endpoint, run the tests) and confirm the actual output shows the user can perform the action end-to-end. Code existing is not verification — a command that ran and passed is.
4. Check: navigation clarity, empty states, error states, flow usability
5. Apply security checklist
6. Write automated tests for critical paths (authentication, payments, data mutations, API integrations)
7. Update: task_tracker.md + work_log.md
8. Commit with message `UJ-XX: <name>`

### After each milestone

Run `/review` — launches an independent subagent that verifies:
- Do completed journeys work end-to-end?
- Was the security checklist applied?
- Are there functional gaps?

Milestones are:
1. After all Infrastructure Tasks are complete
2. After each group of related User Journeys (groups defined during planning in task_tracker.md)
3. Before delivery (mandatory)

### Before delivery

1. Create seed script with realistic demo data covering all entities and relationships
2. Verify every page renders correctly with demo data — no broken layouts, no empty states
3. Verify empty states render gracefully — clear demo data and check
4. Final holistic security audit (auth, authorization, secrets, injection, API exposure, deployment hardening)
5. Document findings and residual risks in work_log.md

### End of session

Update `docs/project_memory.md` with:
- Current state and last completed task/journey
- Next task/journey to work on
- Open blockers or pending decisions
- Key files recently created or modified

## Context Management

- Finish the current task or journey before starting a new one. Never work on two at once.
- Sessions end at the boundary of a block of work (a completed task, journey, or milestone) — never mid-task.
- If context is getting large, prioritize: complete current work → update docs → end session.
- When starting a task, load design_summary.md first. Only open full design docs for the specific sections the current task needs — not entire files by default.
- Files marked "Load once" in the Project Files Reference do not need re-reading after the first session. Their key content is captured in design_summary.md.
- Do not re-read files you have already read in this session unless they changed.

**Context pressure signals** — if any of these apply, finish current task and end session:
- You have completed 4+ tasks/journeys in this session
- The session has been compacted or summarized by the system
- You are starting to rely on memory of file contents instead of re-reading them

## Security Checklist (apply after each task or journey)

- [ ] No hardcoded secrets, tokens, passwords, or API keys
- [ ] No sensitive data in logs, error messages, or UI
- [ ] Input validation on all external inputs
- [ ] Authentication checks on all protected routes
- [ ] Authorization checks — users can't access others' resources
- [ ] Admin routes require admin-level verification
- [ ] Database queries use parameterized statements
- [ ] Rendered content escaped to prevent XSS
- [ ] API responses don't leak internal details
- [ ] File uploads validated for type and size
- [ ] Dependencies from trusted sources

## Default Technology Decisions

- Authentication: JWT + bcrypt (application-managed)
- AI integration: OpenAI SDK (provider-abstracted, switchable)
- UI: Glassmorphism with light/dark mode, responsive, accessible
- Stack and database: Selected during planning
- Credentials: 3 levels (env → deployment → admin panel encrypted)

## Project Files Reference

### Always load (every session)

| File | Purpose | When to update |
|------|---------|----------------|
| `docs/project_memory.md` | Current state, resumption | Every session end, state changes |
| `implementation/task_tracker.md` | Progress tracking | After each task/journey |
| `design/design_summary.md` | Compact project reference (~50 lines) | After planning, when architecture changes |

### Load per task (read relevant sections only)

| File | Purpose | When to update |
|------|---------|----------------|
| `implementation/user_journeys.md` | Task/journey definitions | During planning |
| `design/data_model.md` | Entity definitions | When schema changes |
| `design/api_contracts.md` | Endpoint definitions | When endpoints change |
| `design/ui_wireframes.md` | Screen layouts | When UI changes |
| `docs/work_log.md` | Chronological work record | After each task/journey |

### Load once (read during planning or first session, not again)

| File | Purpose | When to update |
|------|---------|----------------|
| `planning/requirements.md` | What to build | During planning |
| `design/style_guide.md` | Visual design system | During planning |
| `design/stack_selection.md` | Technology choices | During planning |
| `docs/decision_log.md` | Architectural decisions | When making decisions |
| `docs/nfr.md` | Non-functional requirements | During planning |

## Available Commands

| Command | When to use |
|---------|-------------|
| `/init-project` | Once, to start planning a new project |
| `/start-execution` | Once, after user approves the plan |
| `/session-start` | At the start of every new session |
| `/review` | After each milestone (IT complete, UJ group complete, before delivery) |
| `/iterate` | After delivery, when the user requests changes |
