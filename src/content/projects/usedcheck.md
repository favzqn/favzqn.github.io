---
title: "UsedCheck"
description: "Offline-first Android app that guides buyers through inspecting second-hand laptops before purchase — guided checklists, battery diagnostics, photo evidence, and on-device PDF reports"
image: "usedcheck-home.png"
tech: ["React Native", "Expo", "TypeScript", "SQLite", "Drizzle ORM", "Jest", "GitHub Actions"]
live: ""
github: "https://github.com/favzqn/usedcheck"
featured: true
priority: 1
---

## The Problem

Buying a second-hand laptop is a gamble. The information you need — how to check for dead pixels, read battery health, spot liquid damage, verify the device isn't locked to someone's Apple ID — is scattered across forums, YouTube videos, and half-remembered tutorials. During an in-person transaction you're nervous, the seller is waiting, and by the time you get home you've forgotten half the checks and kept none of the evidence.

The result: buyers overpay for machines with hidden defects, or walk away from good deals because they couldn't verify anything.

## What I Built

UsedCheck is a guided inspection companion that turns a risky purchase into a checklist you follow in the moment — completely offline, on your phone.

**How it works:**

1. **Create**: pick Windows laptop or MacBook, then Quick mode (14 essential checks, 5–10 min) or Comprehensive (42 checks, 20–40 min). One-tap presets fill specs for popular models — type `5000000` and it reads `5.000.000`
2. **Inspect**: every check explains *why it matters*, *how to do it*, *what good looks like*, and *what a concerning result is* — then you mark Pass / Warning / Fail with severity, notes, and photo evidence attached
3. **Measure**: battery health is calculated live from design vs full-charge capacity, with a guard that refuses to display impossible values
4. **Decide**: honest scoring (coverage reported next to score, critical failures always surfaced), repair estimates that roll into a true potential total, side-by-side comparison of up to three laptops, and a shareable PDF report — all in English or Bahasa Indonesia

![Popular model presets fill the entire spec form in one tap](/projects/usedcheck-presets.png)

![Quick or Comprehensive mode with live check counts](/projects/usedcheck-mode.png)

## Technical Decisions

![Guided checklist with expandable sections and status filters](/projects/usedcheck-checklist.png)

![Item detail: instructions, expected vs concerning results, five-way status selector](/projects/usedcheck-item-sheet.png)

- **Local-first architecture**: Expo SQLite + Drizzle behind repository interfaces — no SQL outside the data layer, no network calls anywhere in app code (a static test in the suite fails the build if `fetch`/XHR/WebSocket ever appear)
- **Data-driven inspection templates**: checklists are zod-validated TypeScript data with `{ en, id }` strings on every field, snapshotted into each inspection at creation — template v2 can never rewrite what a past inspection recorded
- **Honest scoring engine**: weighted score (`Pass 1.0 / Warning 0.5 / Fail 0`, severity weights 5/3/2/1) always reported *next to* coverage; score hides below 40% coverage, Not Tested is never treated as Pass, and any critical failure forces the summary to say so regardless of the average
- **Sync-over-async data flow**: synchronous repository reads plus a tiny change event bus — checklist taps persist and re-render instantly without an async data framework
- **On-device PDF reports**: HTML rendered through Expo Print with evidence photos embedded as base64 thumbnails, financial summary, and a plain-language disclaimer — zero server involvement
- **Portable backups**: fflate ZIP with versioned manifest, merge or destructive-replace restore inside a single transaction, duplicate-ID detection, and path-traversal rejection
- **Money done right**: integer minor units in SQLite, locale-aware IDR/USD display formatting, and live digit grouping in every price input
- **Type-enforced i18n**: `t()` keys are checked by the compiler, and a type-level constraint keeps Bahasa Indonesia a complete superset of English — a missing translation fails `tsc`, not a user's screen

![Report preview with honest coverage labels and on-device PDF generation](/projects/usedcheck-report.png)

![Dark theme](/projects/usedcheck-dark.png)

## Result

- **Fully offline product loop proven on a device**: onboarding → guided inspection → status writes → force-stop → relaunch with data intact → valid PDF generated on disk
- **42 checks across two platforms** (Windows + MacBook), 14-check quick mode, 100% bilingual (en/id) with platform-specific guidance — `powercfg` on Windows, Activation Lock on macOS
- **74 automated tests** (domain math, repositories against real in-memory SQLite, backup roundtrip, report HTML, component tests) plus strict TypeScript and ESLint — all green in CI
- **GitHub Actions builds a signed APK on every push**; the debug keystore is a fixed Expo asset, so installs update in place from CI or local builds
- **Zero backend, zero accounts, zero analytics** — privacy screen says exactly what the code does, and the code backs it up

![Inspection history with search, filters, and sorting](/projects/usedcheck-history.png)

![Settings: appearance, language, currency, local backup export/restore](/projects/usedcheck-settings.png)
