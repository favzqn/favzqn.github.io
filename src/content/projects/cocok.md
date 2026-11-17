---
title: "COCOK"
description: "Multi-tenant financial reconciliation platform: bank and gateway statements in, matched transactions and exceptions out"
image: "cocok-reports.png"
tech: ["Go", "Next.js", "TypeScript", "PostgreSQL", "Docker"]
live: ""
github: "https://github.com/favzqn/cocok"
featured: true
priority: 2
---

## The Problem

Indonesian businesses collect money through banks, payment gateways like Xendit and Midtrans, e-wallets, and marketplaces, then try to reconcile all of it in spreadsheets. Every channel exports a different CSV format, nothing lines up, and month-end close turns into days of copy-paste. Existing accounting tools assume one currency and one channel and never handle the mess in between.

## What I Built

COCOK is a B2B reconciliation platform that ingests financial data from any channel, normalizes it into one canonical transaction model, matches it automatically, and surfaces only what does not match for a human to investigate.

**The pipeline:**

1. **Ingest**: upload CSV statements (Indonesian headers like `Tanggal`, `Nominal`, `masuk`/`keluar` auto-detected) into a typed import batch with row-level validation before anything touches the ledger
2. **Normalize**: every row becomes an integer-minor-unit transaction in one canonical schema, defaulting to IDR and `Asia/Jakarta`
3. **Match**: deterministic scoring across reference, amount, date, counterparty, and description proposes 1:1 and 1:N groups with a visible score
4. **Investigate**: unmatched transactions become exceptions with resolve/dismiss workflows; matches can be approved, rejected, or unmatched
5. **Report**: match rate, value flows, per-account breakdowns, and CSV exports of transactions, match groups, exceptions, and settlements

![COCOK reports with match rate, value flows, and per-account charts](/projects/cocok-reports.png)

## Technical Decisions

![Reconciliation view with a proposed 1:1 match and score](/projects/cocok-reconciliation.png)

![Exceptions queue with open unmatched transactions](/projects/cocok-exceptions.png)

- **Go + Chi + pgx + sqlc**: a modular monolith, not microservices. sqlc generates type-safe queries from SQL, so the database stays the source of truth without an ORM in between
- **Money as integer minor units** (`amount_minor BIGINT`): no floats anywhere, ever. Currency defaults to IDR with `Asia/Jakarta` locale baked into the schema
- **Multi-tenancy enforced in middleware**: every owned entity carries `organization_id`, membership is checked before the handler runs, and cross-org reads return `404` instead of leaking existence. Covered by integration tests against a real Postgres
- **Security**: Argon2id password hashing, opaque session tokens stored as SHA-256 hashes with rotation on refresh and revocation on logout, permission-based RBAC across 5 roles, and an append-only audit log enforced at the database level
- **CSV import with validation first**: rows are parsed, column-mapped, and validated in a staging batch. Invalid rows report the exact field and reason; commit inserts only valid rows and records duplicates
- **Next.js App Router + TypeScript strict** on the frontend, with TanStack Query, React Hook Form, Zod, and Recharts for the data-dense finance UI

![Transactions ledger with canonical rows from two accounts](/projects/cocok-transactions.png)

![Audit log showing append-only action trail](/projects/cocok-audit.png)

## Result

- **MVP complete**: full ingestion to reconciliation to exceptions to settlements to reports pipeline, provider webhooks, auth recovery, in 7 implementation phases
- **Load tested with k6**: 5 virtual users for 15 seconds, 2,072 requests, **0% errors**, **p95 at 9.4ms** locally, ~136 requests/second
- **Integration test suite** against real Postgres covering tenant isolation, authentication, and RBAC, run in CI on every push
- **Real matching end to end**: imported a bank statement and a gateway settlement file, and the engine proposed a scored 1:1 match with the remaining 8 transactions queued as exceptions
- **Full audit trail**: every import, match run, and account change recorded as an append-only event with request payloads
