---
type: concept
title: "Harness Failure Patterns"
created: 2026-05-28
updated: 2026-05-28
tags:
  - ai-engineering
  - testing
  - devops
  - software-architecture
status: developing
complexity: intermediate
domain: technology
related:
  - "[[Load-Bearing Harness]]"
  - "[[The Solo Climb]]"
sources:
  - ".raw/articles/The Solo Climb - Ajey Gore.md"
---

# Harness Failure Patterns

Five ways engineering harnesses break when stressed by AI-agent-driven velocity.

---

## The Five Patterns

### 1. Theatre
Tests exist. They pass. Nobody trusts them. The CI build runs. People still manually verify because the green light has lost its meaning. This is the PR-rubber-stamp pattern wearing a new costume.

### 2. Gaps the Team Has Stopped Naming
The flaky integration test marked as expected. The eval that only runs on main. The contract test disabled "temporarily" six months ago. Every gap was once a known issue → became background noise → became invisible. The agent ships through the gap.

### 3. Happy-Path Only
Extensive on cases the team understands, thin on cases they fear. Concurrency. Partial failure. Migrations under load. The agent will write code that hits the uncovered cases because it doesn't know which ones the team has been avoiding.

### 4. No Eval for "What Good Means"
Tests tell you the function returned the right value. They cannot tell you the feature solved the user's problem. A real harness includes the eval layer above unit tests.

### 5. No Safe Failure Mode
When the harness catches something, what happens? If the answer is "the alert goes to a channel nobody watches and the change ships anyway" — that's not a harness. It's a notification. A real harness requires the software equivalent of a circuit breaker.

> A harness that warns but doesn't stop is not a harness. It's a notification.

## Key Insight

None of these failures are about the agent. All of them existed in the human-only world. The agent just exercised them faster than the team had a way to respond.

---

## Cross-References

- [[Load-Bearing Harness]] — what a working harness looks like
- [[The Solo Climb]] — Gore's full analysis
- [[The Tests We Skipped]] — Gore's companion essay on testing culture
