---
type: concept
title: "Agent-of-Agent Review"
created: 2026-05-28
updated: 2026-05-28
tags:
  - ai-engineering
  - ai-agents
  - software-architecture
  - automation
status: developing
complexity: intermediate
domain: technology
related:
  - "[[Load-Bearing Harness]]"
  - "[[The Solo Climb]]"
sources:
  - ".raw/articles/The Solo Climb - Ajey Gore.md"
---

# Agent-of-Agent Review

An automated layer designed to scale technical judgment at the same velocity as the code being generated: one agent writes, another reviews, a third runs the tests.

---

## The Concept

In the 100x engineering shape, the senior engineer cannot review every PR by hand. The volume of agent-generated code exceeds human review capacity. Agent-of-agent review is the layer that makes the climb scalable.

## How It Works

1. **Agent 1 writes** — generates the code change
2. **Agent 2 reviews** — checks for correctness, style, security
3. **Agent 3 tests** — runs the eval suite, checks "did this solve the right problem?"

None of them are the senior engineer, who is doing the work that survives: designing the system, holding judgment, owning the outcome.

## Why It's Missing

Most teams haven't built this layer because they're still pretending the senior engineer can review every PR by hand. This worked (barely) at human velocity. It breaks at agent velocity.

## Key Insight

Agent-of-agent review isn't about replacing a human. It's about scaling technical judgment at the same velocity as code generation.

---

## Cross-References

- [[Load-Bearing Harness]] — agent-of-agent review is a core gear item
- [[The Solo Climb]] — Gore's gear list
- [[The Anatomy of an AI-Native Org]] — Gore's companion essay on org structure
