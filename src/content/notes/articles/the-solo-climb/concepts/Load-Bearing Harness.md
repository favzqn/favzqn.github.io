---
type: concept
title: "Load-Bearing Harness"
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
  - "[[Internalised Harness]]"
  - "[[Harness Failure Patterns]]"
  - "[[The Solo Climb]]"
sources:
  - ".raw/articles/The Solo Climb - Ajey Gore.md"
---

# Load-Bearing Harness

The set of systems that answer one question with confidence: *is this change correct enough to ship?*

---

## Definition

"Load-bearing" means: when an agent opens a PR at 11pm on a Friday and the senior engineer is asleep, the harness either holds or it doesn't. There is no review meeting. No second pair of eyes. No Monday standup.

If the change is wrong and the harness doesn't catch it, it goes to production and the user finds the bug first.

## What Is NOT Load-Bearing

- A test suite that passes 90% of the time
- A spec document nobody operates from
- A staging environment the team has stopped trusting
- A CI build whose green light has lost meaning

These didn't hold the human team either — they got papered over by review meetings and manual QA. The agent removes the paper.

## The Gear List

1. **Specs operated from** — input to agents, source for evals, reviewed on failure
2. **Trusted test suite** — green = ship, red = don't
3. **Eval suite** — "did this solve the right problem?"
4. **Sandboxed agent environment** — bounded, observable, reversible
5. **Gates that gate** — no soft gates
6. **Agent-of-agent review** — automated quality scaling
7. **Observability** — five or six signals the senior actually reads

## The "Strong Enough" Test

*If the senior engineer goes on holiday for two weeks and agents keep shipping, do you trust what comes out the other side?*

- Yes → harness is strong enough
- "Mostly, but..." → not strong enough; the "but" is the gap
- No → the climb is not ready

---

## Cross-References

- [[Internalised Harness]] — what happens when the harness moves inward
- [[Harness Failure Patterns]] — the five ways load-bearing harnesses snap
- [[The Solo Climb]] — Gore's full argument
- [[Systems Thinking]] — the harness is a system, not a checklist (from The Personal MBA)
