---
type: source
title: "The Solo Climb"
author: "Ajey Gore"
date_published: 2026-05-27
source_type: article
url: "https://ajeygore.in/content/the-solo-climb"
confidence: high
created: 2026-05-28
updated: 2026-05-28
tags:
  - ai-engineering
  - software-architecture
  - testing
  - devops
  - ai-agents
  - engineering-leadership
status: mature
related:
  - "[[Deep Work]]"
  - "[[The Personal MBA]]"
sources:
  - ".raw/articles/The Solo Climb - Ajey Gore.md"
key_claims:
  - "The 100x engineering shape (solo senior + agents) is real but requires a load-bearing harness first"
  - "Alex Honnold didn't remove the harness — he internalised it"
  - "Software risk doesn't register like physical risk because the feedback loop is too slow"
  - "A harness that warns but doesn't stop is not a harness — it's a notification"
  - "The harness question comes before the agent question and the headcount question"
---

# The Solo Climb

*The Solo Climb* by Ajey Gore (May 27, 2026). An essay on engineering harnesses for AI-agent-driven teams, using Alex Honnold's Free Solo climb as a structural metaphor.

---

## Summary

Gore argues that the new "100x engineering" shape — a solo senior engineer augmented by AI agents doing the work of eight — is real and powerful, but only if the team first builds a load-bearing harness. The metaphor: Alex Honnold didn't remove the rope, he internalised it. Most teams attempting the 100x shape are trying to free-solo without doing the years of roped climbing first.

### The Honnold Lesson

Honnold spent years rehearsing El Capitan with full protection — memorising every hold, every transition, every sequence. He didn't remove external safety until he'd built internal safety so thorough that nothing on the wall could surprise him. The harness didn't disappear; it moved inward.

### What "Load-Bearing" Means

A harness answers one question: *is this change correct enough to ship?* Load-bearing means when an agent opens a PR at 11pm on a Friday and the senior is asleep, the harness either holds or it doesn't. No review meeting. No second pair of eyes.

### The Invisible Load

Software risk doesn't feel like climbing risk. The feedback loop is too slow — a bug ships, a user finds it weeks later, it becomes a ticket, gets debugged, gets fixed in a nobody-reviews PR. Distributed and invisible at each step. The cost is real but deferred. Teams skip the harness because nothing bad happens *today*.

### Where Harnesses Snap

Five failure patterns:

1. **Theatre** — tests exist but nobody trusts them; CI passes but people manually verify anyway
2. **Gaps** — flaky tests marked as expected, evals that only run on main, disabled contract tests
3. **Happy-path only** — extensive on understood cases, thin on feared ones (concurrency, partial failure, migrations)
4. **No eval for "what good means"** — tests check return values, not whether the feature solved the user's problem
5. **No safe failure mode** — a harness that warns but doesn't stop is a notification, not a harness

### The Gear List

- **Specs that are operated from** — input to agents, source for evals, artefact reviewed on failure
- **A test suite the team trusts to ship on** — green means ship, red means don't
- **An eval suite** — above unit tests, closer to the user
- **A sandboxed agent environment** — bounded, observable, reversible
- **Gates that actually gate** — no soft gates, no "let it through this time"
- **Agent-of-agent review** — one writes, another reviews, a third tests
- **Observability the senior actually reads** — five or six signals, not dashboards

### The "Strong Enough" Test

*If the senior engineer goes on holiday for two weeks and agents keep shipping, do you trust what comes out the other side?* If "mostly, but..." — the harness isn't strong enough. The "but" is the gap that becomes the incident.

---

## Key Themes

1. **Internalise Before You Remove** — Honnold's preparation, not his courage, is the lesson
2. **The Harness Is the Enabler** — it's not the recovery plan; it's what makes speed possible
3. **Invisible Load** — software risk is deferred and distributed; that's why teams skip the harness
4. **Agent-of-Agent Review** — the missing layer most teams haven't built
5. **Gates Must Actually Gate** — soft gates are holes; holes get exploited statistically
6. **The Harness Question First** — before agents, before headcount, ask "what holds?"

---

## Cross-References

- **[[Deep Work]]**: Gore's "solo senior" is the ultimate deep worker — one person with full context, no coordination overhead, making all the judgment calls. Newport's deep work hypothesis predicts exactly this shape.
- **[[The Personal MBA]]**: Kaufman's "Five Parts of Every Business" framework applies — the harness is the systems/conversion layer that turns agent output into delivered value.
- **[[Influence]]**: The "harness as theatre" pattern is a form of social proof — everyone runs the tests because everyone runs the tests, not because anyone trusts them.
- **[[Flow]]**: The harness enables flow state for the solo senior — removing the anxiety of "did the agent break something?" allows the concentration that Csikszentmihalyi describes.
