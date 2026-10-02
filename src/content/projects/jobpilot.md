---
title: "JobPilot"
description: "Chrome extension that automates job applications with AI resume tailoring and smart match scoring"
image: "jobpilot-popup.png"
tech: ["TypeScript", "React", "Manifest V3", "Vite", "Vitest", "GitHub Actions"]
live: ""
github: ""
featured: true
priority: 2
---

## The Problem

Applying to jobs online is the same loop on every board: read the listing, tailor the resume, fill the same forms, repeat. With four different job boards open, a single application takes 20+ minutes of copy-paste, and keeping track of what was sent where is a spreadsheet nightmare.

## What I Built

JobPilot is a Manifest V3 Chrome extension that turns job applications into a one-click flow.

**How it works:**

1. **Detect**: a content script parses the listing (title, company, description, skills) on Upwork, LinkedIn, RemoteOK, and Indeed
2. **Score**: the job is matched against your skills to show a fit percentage at a glance
3. **Tailor**: AI rewrites your resume for that specific job, direct from the extension via the OpenAI API
4. **Apply**: cover letter fields are auto-filled and the application is logged to the dashboard

## Technical Decisions

- **Manifest V3**: service worker background script, side panel dashboard, minimal permissions (storage, activeTab, scripting)
- **TypeScript + React**: popup and side panel UI with Zustand state, persisted through the Chrome Storage API
- **Privacy by design**: resume data never leaves the browser, AI calls go direct to the API, no middleman server
- **Testable parsing layer**: the four board parsers take the URL as a parameter instead of coupling to `window.location`, so every parser runs under unit tests in jsdom
- **CI/CD pipeline**: GitHub Actions runs type checking, unit tests, and a full two-pass extension build on every push. Vite builds the extension pages as ES modules and the content script as a self-contained IIFE bundle

## Result

- **One-click applications** across four major job boards
- **10 unit tests** covering board parsing, skill tag extraction, and form auto-fill, enforced in CI on every push
- **Fully client-side** architecture with zero backend infrastructure
