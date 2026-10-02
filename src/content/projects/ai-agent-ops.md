---
title: "AI Agent Ops Stack"
description: "Five specialized AI agents running content, finance ops, and customer messaging on one shared platform"
image: "ai-agents-ops.png"
tech: ["TypeScript", "Bun", "Hermes Agent", "Supabase", "Baileys", "Cron"]
live: ""
github: ""
featured: true
---

## The Problem

Running a small operation means wearing five hats at once: research, product builds, marketing content, finance reconciliation, and answering customers across two messaging channels. Doing all of it manually does not scale, but bolting a single chatbot onto each workflow just creates five disconnected bots that forget everything between sessions.

## What I Built

A multi-agent operations platform where five specialized AI agents share one runtime, each with its own skills, scheduled jobs, plugins, and persistent memory, coordinated through a single messaging layer.

**The agents:**

1. **Researcher**: literature scans, market and competitor analysis, structured data extraction
2. **Builder**: full-stack feature work, code review, debugging, deployment
3. **Marketing**: content generation for consumer brands, scheduling, publishing
4. **Ops**: finance tracking, email parsing into spreadsheets, daily reporting
5. **Assistant**: day-to-day coordination, reminders, cross-agent handoffs

**Shared infrastructure:**

- **WhatsApp bridge** (Baileys v3) exposing an HTTP API with trigger-based, context-aware replies and quick commands
- **Cron pipelines**: banking email ingestion into a shared spreadsheet every 6 hours, a daily morning brief combining calendar, email and tasks, and scheduled content generation
- **Mention gating** in group chats so messages route to the right agent without collisions
- **One deployment** behind a reverse proxy on a single VPS, four services

## Technical Decisions

- **Hermes Agent multi-profile runtime**: each agent gets an isolated directory for skills, plugins, scheduled jobs, and memories. Agents cannot contaminate each other's context, and any of them can be upgraded or paused independently
- **TypeScript + Bun** for the bridges and tooling, with Supabase for structured state
- **Trigger-based replies, not templates**: every WhatsApp response is generated from the message and its context, with rules deciding when to reply at all
- **Append-only financial records**: parsed transactions are written once and never edited, so the spreadsheet stays auditable
- **Human-in-the-loop by default**: writes that touch money, publishing, or external accounts surface a confirmation instead of firing blind

## Result

- **Five concurrent agents** operating from one codebase and one server
- **98 content assets generated** (74 visual, 24 text) on an automated twice-daily publishing schedule
- **Finance reconciliation runs unattended** every 6 hours, with a daily summary delivered each morning
- **Customer messaging** handled by AI on trigger rules, with no canned responses
