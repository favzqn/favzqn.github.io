---
title: 'Prior Authorization API'
kind: 'Healthcare backend · engineering challenge'
description: 'Prior authorization service for a health plan: offices submit CPT/HCPCS requests against coverage and eligibility rules, reviewers claim and decide per procedure, and every step is audited for HIPAA compliance. FastAPI + PostgreSQL, 25 tests, annotated evidence suite.'
image: 'priorauth-redaction.png'
tech: ['Python', 'FastAPI', 'SQLAlchemy 2', 'PostgreSQL', 'pytest', 'Playwright', 'OpenAPI']
featured: true
priority: 4
year: '2026'
role: 'Solo — take-home challenge'
metrics:
  - { value: '25', label: 'pytest tests, real Postgres' }
  - { value: '11', label: 'endpoints, 4 roles' }
  - { value: '14', label: 'annotated evidence captures' }
  - { value: '1', label: 'error contract, everywhere' }
---

## The Challenge

Oxbridge Health's Utilization Management team needed a prior authorization backend — the service a doctor's office calls before a patient gets a procedure. The brief was deliberately full of operational texture:

- Offices submit requests for **their** linked patients only, with CPT/HCPCS procedures, an ICD-10 diagnosis, a planned date of service, and an optional clinical note
- Patients must have **active coverage on the date of service**; past dates go to retro review (out of scope); nothing more than a year out
- **More than 30 units on one procedure is almost always a typo** — and when a submission is rejected, offices "can't tell why. Tell them exactly what to fix"
- Reviewers pull from a queue, own the request until they decide it, and **must never review a patient they treat** (some reviewers are physicians who see that patient themselves)
- Decisions are **per procedure**, with a required reason on every denial, submitted for the whole request at once — and final
- Members see outcomes; clinical notes and reviewer reasoning are **never** visible to them
- Audits happen. Last year an audit found a request marked "approved" with **no record of who approved it**

Stack call was mine: Python + FastAPI + SQLAlchemy + PostgreSQL, runnable locally in five commands.

## What I Built

**Submission with surgical error reporting.** One `POST /v1/requests` runs every rule — practice↔patient link, coverage window on the DOS, past/too-far dates, unit caps, code formats — and returns *all* violations in a single 422 with field paths like `procedures.0.units`. Pydantic body errors are mapped to the same `{"errors": [{field, message}]}` shape, so an office integrator learns exactly one contract.

**Claiming that can't race.** `POST /v1/requests/{ref}/claim` is a single conditional `UPDATE … WHERE status='submitted' AND assigned IS NULL`. Two reviewers picking the same request: exactly one wins, the loser gets 409, the owner's retry is idempotent. Conflict-of-interest checks (reviewer treats this patient) run at claim *and* at admin reassignment — otherwise an admin could route around the block.

**Final-by-construction decisions.** Per-procedure approve/deny, denial reasons enforced, every procedure must be covered, no update endpoint exists — re-deciding returns 409. Appeals can be a separate resource when the business wants them.

**Audit in the same transaction.** Every mutation writes an `audit_events` row (actor, role, action, detail, timestamp) inside the commit that performs it. A decision literally cannot persist without its "who approved it" row. The admin-only `/audit` endpoint returns the ordered trail: submitted → claimed → decided, each with actor ids.

**Visibility in one serializer.** A single role-aware `request_view` strips `clinical_note`, `denial_reason`, and reviewer identity for members — not template-level filtering, so a future endpoint can't leak by omission. Cross-tenant fetches return 404, not 403: no existence oracle across patients' requests.

## Decisions That Mattered

The brief said "make a call and write it down, as you would on the job." The calls I logged in the README:

- **>30 units → hard reject**, not clamp or warn. "Almost always a typo" + "tell them exactly what to fix" means refuse and name the field
- **Denial reason goes to the submitting office, never to the member.** The office needs to know what to fix next time; the member gets outcomes only. Free-form internal deliberation would be a separate field if ever required
- **Business dates are UTC calendar dates.** "Nationwide, Maine to Hawaii" rules out per-office local-time logic; all timestamps serialize as UTC
- **Role is read from the database on every request**, not trusted from the JWT — a stale token claim can't grant a revoked role
- **One office user maps to one practice** (MVP; multi-practice is a join table when it's real)
- **`create_all` + idempotent seed, no Alembic yet** — nothing has shipped, so no migrations exist. Swapping is a documented one-line upgrade path, not gold-plating

## Evidence

The repo ships a capture pipeline (`capture_evidence.py` → annotated HTML → Playwright screenshots): 14 scenarios of *real* HTTP round-trips against a live server, each with a "why it matters" callout tied to a requirement. Selected proofs:

<div class="shot-row">
  <a href="/projects/priorauth-errors.png" target="_blank" rel="noopener">
    <img src="/projects/priorauth-errors.png" alt="Five validation errors returned in a single 422 response with field paths" loading="lazy" />
    <span class="img-caption">One broken submit, five violations, one response — field paths point at exact inputs</span>
  </a>
  <a href="/projects/priorauth-redaction.png" target="_blank" rel="noopener">
    <img src="/projects/priorauth-redaction.png" alt="Same request viewed by office (with clinical note) and member (without)" loading="lazy" />
    <span class="img-caption">Same request: office sees the note, member's payload never contains it</span>
  </a>
</div>

<div class="shot-row">
  <a href="/projects/priorauth-audit.png" target="_blank" rel="noopener">
    <img src="/projects/priorauth-audit.png" alt="Audit trail showing submitted, claimed, and decided events with actor ids" loading="lazy" />
    <span class="img-caption">Audit trail: submitted → claimed → decided, actor ids on every step; office gets 403</span>
  </a>
  <a href="/projects/priorauth-coi.png" target="_blank" rel="noopener">
    <img src="/projects/priorauth-coi.png" alt="Conflict-of-interest block when a reviewer tries to claim a patient they treat" loading="lazy" />
    <span class="img-caption">Reviewer blocked from the patient they treat — checked at claim and admin assign</span>
  </a>
</div>

Full set (16 screenshots, raw JSON, browsable HTML report) lives in `docs/evidence/` in the repository, including the 25-test pytest run and the Swagger UI that doubles as partner documentation.

## How I Used AI

Built with an AI coding agent end-to-end — schema, routes, tests, README, the evidence pipeline. That's the honest headline; the value was in the review loop. AI got things wrong, and every bug was caught by *running* the code:

1. Relative imports written for the wrong package depth — import error on first run
2. SQLAlchemy 2.x API drift on `update().synchronize_session` — attribute vs execution options
3. **`session.refresh()` silently discarded a decision write** — it re-loaded the row before pending changes flushed, overwriting `status='decided'` back to `in_review`. The decision tests caught it; the fix was deleting the refreshes
4. A `min_length` on the diagnosis field short-circuited validation in pydantic, so offices got *one* error instead of all of them — moved format checks into the collect-all path
5. The evidence script's HCPCS scenario hit a 500: `code_system VARCHAR(4)`, and "HCPCS" is five characters. Every test used CPT, so the column width passed review. Fixed to `VARCHAR(10)` with a regression test

I wrote the transaction boundaries, the 404-not-403 rule, the COI placement, and the final decision log myself. Verification: 25 pytest tests against real Postgres, an end-to-end smoke script, and the evidence capture — all green.

## Limitations (documented, not hidden)

- No pagination on list endpoints — fine at seed scale, keyset pagination when data grows
- No idempotency-key on submit yet — add when the first partner integration reports duplicate submissions from retries
- Notifications (the wishlist item) skipped — a notification queue is a different service boundary
- One practice per office user; no rate limiting or TLS config — infrastructure concerns, not API concerns
- Repository is private (take-home submission) — walk-through available on request

**Shows:** FastAPI service design, PostgreSQL transactional integrity, role-based access modeling, API error-contract design, test automation, evidence-driven verification, honest AI-assisted development
