---
title: 'IncidentScope'
description: 'Public service reliability intelligence platform: collects incident history from public status pages, preserves raw payloads, normalizes into PostgreSQL, and ships analytical dashboards plus pipeline observability'
image: 'incidentscope-overview.png'
tech:
  [
    'Python',
    'PostgreSQL',
    'Next.js',
    'TypeScript',
    'httpx',
    'Alembic',
    'Recharts',
    'Playwright',
    'GitHub Actions'
  ]
live: ''
featured: true
priority: 2
---

## The Problem

Engineering teams depend on dozens of third-party SaaS services, but the only public record of how reliable those services actually are lives scattered across status pages. Provider status pages show the current state and the latest handful of incidents — they are not analyzable. There is no way to ask "which services report the most incidents?", "how long do reported incidents typically last?", or "are incidents getting more frequent?" without manually copying data out of fifty different pages.

Existing uptime monitors answer a different question: they probe _your_ connection to a service. They say nothing about the incident history a provider has published, and they cannot reconstruct it after the fact. Meanwhile the Statuspage API that hosts these pages returns at most the **50 most recent incidents** — so anyone who starts collecting later simply has no history.

IncidentScope is a data product for exactly this gap: collect what providers publicly report, keep it honest, and make it queryable.

## What I Built

An end-to-end pipeline and dashboard, from public API to production-style analytics.

**The pipeline:**

1. **Collect**: every 6 hours (GitHub Actions) a Python worker fetches `summary`, `components`, `incidents`, and `scheduled-maintenances` from each configured status page — HTTPS-only registry, bounded retries with exponential backoff and `Retry-After`, per-endpoint timing
2. **Preserve**: each source record is stored as raw JSONB, versioned by SHA-256 — normalization bugs can always be re-derived from source bytes
3. **Normalize**: incidents, updates, and components upsert into canonical tables guarded by database unique constraints; unknown future statuses are kept raw instead of crashing or being discarded
4. **Observe**: every run appends component-status snapshots, executes 11 data-quality checks (freshness, uniqueness, timestamp validity, referential integrity, volume anomaly…), and records PASS/WARN/FAIL results
5. **Serve**: a Next.js dashboard queries PostgreSQL server-side — overview KPIs, trend and distribution charts, service comparison, incident explorer with filters and pagination, incident timelines, component reliability, and a pipeline-health page

![IncidentScope reliability overview: KPIs, incident trend, impact and duration distributions](/projects/incidentscope-overview.png)

<div class="shot-row">
  <a href="/projects/incidentscope-incidents.png" target="_blank" rel="noopener">
    <img src="/projects/incidentscope-incidents.png" alt="Incident explorer with search, service, impact, and status filters" loading="lazy" />
    <span class="img-caption">Incident explorer: filters, pagination, honest duration labels</span>
  </a>
  <a href="/projects/incidentscope-incident-detail.png" target="_blank" rel="noopener">
    <img src="/projects/incidentscope-incident-detail.png" alt="Incident detail with chronological update timeline and data provenance" loading="lazy" />
    <span class="img-caption">Incident detail: update timeline + data provenance</span>
  </a>
</div>

## Technical Decisions

- **Absence is not resolution.** The incidents endpoint returns only the latest 50 records. A record that disappears from a later response is never updated, never deleted, never marked resolved — only explicit source `status` and `resolved_at` values resolve an incident. This single rule prevents the most dangerous class of data corruption a pipeline like this can have
- **Raw first, transform second.** Each page commits its raw payloads in one transaction and its normalized staging rows in another. A normalization bug rolls back staging only; source data survives. A failing page never rolls back a successful one — three pages configured, one fails, the run is `partially_succeeded` and the data lands
- **Idempotency enforced by the database, not hope.** Unique constraints on `(page, source id)` pairs plus payload-hash change detection: re-running ingestion inserts zero duplicates, and unchanged payload bodies are never re-stored while every fetch observation is still recorded
- **Analytics as views.** Facts and dimensions are SQL views over staging — they cannot drift from source data and need no sync job. Only component snapshots are a real table, because each row is an observed event
- **One definition of health.** `pipeline_health()` is a PostgreSQL function, so the CLI (`python -m app.ingestion health`) and the dashboard report the same healthy/degraded/stale/failed state from the same freshness threshold
- **The dashboard cannot flatter the data.** Empty states distinguish "no data collected" from "no results", medians always show their sample count, unresolved incidents show "observed age" instead of a fake duration, and every chart states what it counts — the phrase "verified downtime" appears nowhere

<div class="shot-row">
  <a href="/projects/incidentscope-pipeline.png" target="_blank" rel="noopener">
    <img src="/projects/incidentscope-pipeline.png" alt="Pipeline health page with run history and data-quality check results" loading="lazy" />
    <span class="img-caption">Pipeline health: run history, 11 quality checks, freshness</span>
  </a>
  <a href="/projects/incidentscope-services.png" target="_blank" rel="noopener">
    <img src="/projects/incidentscope-services.png" alt="Service comparison table with sortable incident statistics" loading="lazy" />
    <span class="img-caption">Service comparison: sortable, median with sample size</span>
  </a>
</div>

## Result

- **Real data from day one**: 3 Atlassian status pages collected every 6 hours — currently 134 reported incidents, 521 incident updates, and 67 components with append-only snapshot history
- **Verified correctness**: 48 pytest tests (unit + integration against a real PostgreSQL — idempotent re-ingestion, partial source failure, disappearance handling, corrupted-data detection) plus 8 Playwright end-to-end flows, all green; ruff, ESLint, strict TypeScript, and a production build in CI
- **Observable by design**: every run records pages attempted/succeeded/failed, records received/new/updated, duplicates blocked, per-endpoint errors, and quality-check results — the dashboard shows all of it, and a stale pipeline reports `stale`, not green
- **Honest scope**: the About page and README state plainly what the product does _not_ measure — no uptime scores, no SLA claims, no independently verified downtime. Provider-reported is a constraint of the data, and the UI never hides it

<div class="shot-row">
  <a href="/projects/incidentscope-components.png" target="_blank" rel="noopener">
    <img src="/projects/incidentscope-components.png" alt="Component reliability view with status distribution and hierarchy" loading="lazy" />
    <span class="img-caption">Component reliability: observations, not uptime percentages</span>
  </a>
  <a href="/projects/incidentscope-dark.png" target="_blank" rel="noopener">
    <img src="/projects/incidentscope-dark.png" alt="Dark theme overview" loading="lazy" />
    <span class="img-caption">Dark theme</span>
  </a>
</div>

## Limitations (documented, not hidden)

- History starts at first collection — the API cannot provide lifetime incident data
- Statuspage-only in v1; other providers need their own adapters and data-access review
- "Degraded observations" counts collected snapshots, not downtime: a component observed degraded at every run accumulates observations proportionally to the schedule
- Volume-anomaly checks need at least two prior runs before they can compare anything

**Shows:** Python data pipelines, scheduled collection, Postgres normalization, Recharts analytics dashboards, pipeline observability
