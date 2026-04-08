# Work Routing

How to decide who handles what.

## Squad Routing

## Roles to Agents

| Domain | Primary Agent | Secondary | When |
|--------|---------------|-----------|------|
| **Architecture & Decisions** | LeadArchitect | All (consult) | Scope, API design, major decisions |
| **React Components, Forms, State** | FrontendDevLead | TestQALead | UI implementation, RTK setup, React Hook Form |
| **ASP.NET APIs, MCP Host, Database** | BackendDevLead | TestQALead | Endpoint design, business logic, data models |
| **Terraform, CI/CD, Deployments** | DevOpsInfraLead | BackendDevLead | Infrastructure as code, GitHub Actions workflows |
| **Test Strategy, Quality, Edge Cases** | TestQALead | All (review) | Unit/integration tests, QA sign-off, reviewer gate |
| **Memory & Session State** | Scribe | — | Decisions, logs, cross-agent context |
| **Work Queue & Board** | Ralph | — | GitHub issues, PRs, backlog management |

## Default Handoff

- **Code work** → Primary agent completes implementation → TestQALead reviews for acceptance → approved/rejected → Scribe logs → Ralph updates board
- **Architecture decisions** → LeadArchitect proposes → Team consult → Scribe records decision → agents implement
- **Infrastructure** → DevOpsInfraLead codes Terraform → BackendDevLead validates app integration → TestQALead tests deployment → Scribe logs

## Reviewer Gate

**TestQALead is the quality gate.** All work artifacts (code, configs, designs) require TestQALead approval before merge.
- **Approval:** Work proceeds to Scribe for logging
- **Rejection:** Original author is locked out. LeadArchitect assigns a different agent or escalates Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| {domain 1} | {Name} | {example tasks} |
| {domain 2} | {Name} | {example tasks} |
| {domain 3} | {Name} | {example tasks} |
| Code review | {Name} | Review PRs, check quality, suggest improvements |
| Testing | {Name} | Write tests, find edge cases, verify fixes |
| Scope & priorities | {Name} | What to build next, trade-offs, decisions |
| Session logging | Scribe | Automatic — never needs routing |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Lead |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, the **Lead** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.
