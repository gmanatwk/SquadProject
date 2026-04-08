# Squad Ceremonies

## Before-Work Ceremonies

### Architecture Sync
- **When:** Before major API design, infrastructure changes, or multi-domain work
- **Condition:** `contains(request, "design", "architect", "plan", "infrastructure")`
- **Participants:** LeadArchitect (lead), FrontendDevLead, BackendDevLead, DevOpsInfraLead, TestQALead
- **Output:** Shared decision (recorded by Scribe) + implementation checklist

## After-Work Ceremonies

### Code Review Sign-Off
- **When:** After implementation, before merge
- **Condition:** `work_mode == "implementation" && artifact_type == "code"`
- **Participants:** TestQALead (lead), original author (present for questions)
- **Output:** Approval/rejection verdict + feedback

## Manual Ceremonies

### Retrospective
- **Trigger:** User says "retro", "retrospective", "run retro"
- **Facilitator:** LeadArchitect
- **Participants:** All agents
- **Duration:** ~30 min

### Planning Session
- **Trigger:** User says "planning", "plan", "sprint planning"
- **Facilitator:** LeadArchitect
- **Participants:** All agents
- **Output:** Work items prioritized, dependencies mapped

---

**Cooldown:** No auto-triggered ceremony runs twice in the same session turn.

> Team meetings that happen before or after work. Each squad configures their own.

## Design Review

| Field | Value |
|-------|-------|
| **Trigger** | auto |
| **When** | before |
| **Condition** | multi-agent task involving 2+ agents modifying shared systems |
| **Facilitator** | lead |
| **Participants** | all-relevant |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. Review the task and requirements
2. Agree on interfaces and contracts between components
3. Identify risks and edge cases
4. Assign action items

---

## Retrospective

| Field | Value |
|-------|-------|
| **Trigger** | auto |
| **When** | after |
| **Condition** | build failure, test failure, or reviewer rejection |
| **Facilitator** | lead |
| **Participants** | all-involved |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. What happened? (facts only)
2. Root cause analysis
3. What should change?
4. Action items for next iteration
