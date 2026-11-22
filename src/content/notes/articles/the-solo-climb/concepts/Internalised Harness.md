---
type: concept
title: "Internalised Harness"
created: 2026-05-28
updated: 2026-05-28
tags:
  - ai-engineering
  - testing
  - software-architecture
  - safety
status: developing
complexity: intermediate
domain: technology
aliases:
  - "Honnold's Law"
related:
  - "[[Load-Bearing Harness]]"
  - "[[The Solo Climb]]"
  - "[[Wu Wei]]"
sources:
  - ".raw/articles/The Solo Climb - Ajey Gore.md"
---

# Internalised Harness

The principle that external safety systems should be internalised before they are removed — not eliminated when they disappear.

---

## The Concept

Alex Honnold didn't remove the rope. He spent years climbing El Capitan with full protection — memorising every hold, every transition, every sequence — until the safety was built into his body and preparation rather than clipped to his belt. The harness didn't disappear. It moved inward.

## In Engineering

For AI-agent teams, the internalised harness means:

- The test suite becomes the agent's guardrail (external) → then the team internalises what "correct" means so thoroughly that specs, evals, and gates do the work (internal)
- Code review by humans (external) → agent-of-agent review with automated quality gates (internal)
- Manual QA passes (external) → eval suites that check "did this solve the right problem?" (internal)

## The Misread

Everyone watched Free Solo and took the wrong lesson: *you can climb without protection if you're good enough.* The actual lesson: *to climb without external protection, you first have to build internal protection so thorough that nothing can catch you unprepared.*

## Key Insight

The teams that genuinely run at 100x didn't remove the harness. They built a different kind first.

---

## Cross-References

- [[Load-Bearing Harness]] — the specific systems that make internalisation possible
- [[The Solo Climb]] — Gore's full argument
- [[Wu Wei]] — internalised skill that looks effortless = action through non-action (from Tao Te Ching)
- [[The Flow State]] — when the harness is fully internalised, the climber enters flow (from Flow)
- [[Neuroplasticity]] — internalisation is literally brain rewiring (from The Body Keeps the Score)
