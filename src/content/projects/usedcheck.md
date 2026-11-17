---
title: "UsedCheck"
description: "Offline-first Android app that guides buyers through inspecting second-hand laptops before purchase: guided checklists, battery diagnostics, photo evidence, and on-device PDF reports"
image: "usedcheck-home.png"
tech: ["React Native", "Expo", "TypeScript", "SQLite", "Drizzle ORM", "Jest", "GitHub Actions"]
live: ""
github: "https://github.com/favzqn/usedcheck"
featured: true
priority: 1
---

## The Problem

Buying a second-hand laptop is a gamble. The information you need to evaluate one (how to check for dead pixels, read battery health, spot liquid damage, confirm the device is not locked to someone's Apple ID) is scattered across forums, YouTube videos, and half-remembered tutorials. During an in-person transaction you are nervous, the seller is waiting, and by the time you get home you have forgotten half the checks and kept none of the evidence.

Buyers end up overpaying for machines with hidden defects, or walking away from good deals because they could not verify anything.

## What I Built

UsedCheck is a guided inspection companion that turns a risky purchase into a checklist you follow in the moment. It runs completely offline, on your phone.

**How it works:**

1. **Create**: pick Windows laptop or MacBook, then Quick mode (14 essential checks, 5 to 10 min) or Comprehensive (42 checks, 20 to 40 min). One-tap presets fill specs for popular models, and the price field groups digits as you type: `5000000` reads `5.000.000`
2. **Inspect**: every check explains why it matters, how to do it, what good looks like, and what a concerning result looks like. You mark Pass / Warning / Fail with severity, notes, and photo evidence attached
3. **Measure**: battery health calculates live from design vs full-charge capacity, with a guard that refuses to display impossible values
4. **Decide**: scoring reports coverage next to the score instead of hiding it, critical failures always surface, repair estimates roll into a true potential total, and you can compare up to three laptops side by side. The output is a shareable PDF report in English or Bahasa Indonesia

![Popular model presets fill the entire spec form in one tap](/projects/usedcheck-presets.png)

<div class="shot-row">
  <a href="/projects/usedcheck-mode.png" target="_blank" rel="noopener">
    <img src="/projects/usedcheck-mode.png" alt="Quick mode with 14 checks, Comprehensive with 42" loading="lazy" />
    <span class="img-caption">Quick (14 checks) vs Comprehensive (42)</span>
  </a>
  <a href="/projects/usedcheck-onboarding.png" target="_blank" rel="noopener">
    <img src="/projects/usedcheck-onboarding.png" alt="Three-screen onboarding" loading="lazy" />
    <span class="img-caption">Three-screen onboarding</span>
  </a>
</div>

## Technical Decisions

- **Local-first architecture**: Expo SQLite + Drizzle behind repository interfaces, so no SQL lives outside the data layer. No network calls appear anywhere in app code; a static test in the suite fails the build if `fetch`, XHR, or WebSocket ever shows up
- **Data-driven inspection templates**: checklists are zod-validated TypeScript data with `{ en, id }` strings on every field, snapshotted into each inspection at creation, so template v2 can never rewrite what a past inspection recorded
- **Scoring that cannot flatter you**: weighted score (Pass 1.0, Warning 0.5, Fail 0; severity weights 5/3/2/1) always renders next to coverage. The score hides below 40% coverage, Not Tested never counts as Pass, and any critical failure forces the summary to say so regardless of the average
- **Sync reads over async plumbing**: repositories read synchronously and emit a change event on write, so a checklist tap persists and re-renders instantly without an async data framework
- **On-device PDF reports**: HTML renders through Expo Print with evidence photos embedded as base64 thumbnails, a financial summary, and a plain-language disclaimer. No server involvement
- **Portable backups**: fflate ZIP with a versioned manifest, merge or destructive-replace restore inside one transaction, duplicate-ID detection, and path-traversal rejection
- **Money handling**: integer minor units in SQLite, locale-aware IDR/USD display formatting, and live digit grouping in every price input
- **Type-enforced i18n**: `t()` keys are checked by the compiler, and a type-level constraint keeps Bahasa Indonesia a complete superset of English, so a missing translation fails `tsc` instead of a user's screen

<div class="shot-row">
  <a href="/projects/usedcheck-checklist.png" target="_blank" rel="noopener">
    <img src="/projects/usedcheck-checklist.png" alt="Guided checklist with expandable sections and status filters" loading="lazy" />
    <span class="img-caption">Checklist: sections, counts, filters</span>
  </a>
  <a href="/projects/usedcheck-item-sheet.png" target="_blank" rel="noopener">
    <img src="/projects/usedcheck-item-sheet.png" alt="Item detail with instructions and status selector" loading="lazy" />
    <span class="img-caption">Item detail: instructions, expected vs concerning, status</span>
  </a>
</div>

<div class="shot-row">
  <a href="/projects/usedcheck-report.png" target="_blank" rel="noopener">
    <img src="/projects/usedcheck-report.png" alt="Report preview with PDF generation" loading="lazy" />
    <span class="img-caption">Report preview, PDF generated on device</span>
  </a>
  <a href="/projects/usedcheck-dark.png" target="_blank" rel="noopener">
    <img src="/projects/usedcheck-dark.png" alt="Dark theme home screen" loading="lazy" />
    <span class="img-caption">Dark theme</span>
  </a>
</div>

## Result

- **The full loop runs offline on a device**: onboarding, guided inspection, status writes, force-stop, relaunch with data intact, and a valid PDF generated on disk
- **42 checks across two platforms** (Windows + MacBook), a 14-check quick mode, and 100% bilingual content (en/id) with platform-specific guidance: `powercfg` on Windows, Activation Lock on macOS
- **74 automated tests** (domain math, repositories against real in-memory SQLite, backup roundtrip, report HTML, component tests) plus strict TypeScript and ESLint, all green in CI
- **GitHub Actions builds a signed APK on every push.** The debug keystore is a fixed Expo asset, so installs update in place whether they came from CI or a local build
- **Zero backend, zero accounts, zero analytics.** The privacy screen says exactly what the code does, and the code backs it up

<div class="shot-row">
  <a href="/projects/usedcheck-history.png" target="_blank" rel="noopener">
    <img src="/projects/usedcheck-history.png" alt="Inspection history with search, filters, and sorting" loading="lazy" />
    <span class="img-caption">History: search, filters, sort</span>
  </a>
  <a href="/projects/usedcheck-settings.png" target="_blank" rel="noopener">
    <img src="/projects/usedcheck-settings.png" alt="Settings with appearance, language, currency, backup" loading="lazy" />
    <span class="img-caption">Settings: theme, language, currency, backup</span>
  </a>
</div>

