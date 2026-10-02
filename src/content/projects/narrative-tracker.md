---
title: "Narrative Tracker"
description: "Dashboard that tracks how controversies and narratives evolve across social media, with timelines, sentiment, and actor networks"
image: "narrative-dashboard.png"
tech: ["JavaScript", "D3.js", "Playwright", "Supabase", "Node.js"]
live: "http://43.157.225.142:8094"
github: ""
featured: false
---

## The Problem

A controversy never stands still. It jumps platforms, picks up new voices, and changes tone hour by hour, and anyone trying to follow it ends up with fifty browser tabs and no picture of how things actually developed. Existing monitoring tools show mentions; they do not show how a story moved.

## What I Built

A narrative analysis dashboard that treats a topic as something with a history, not a stream of mentions.

**Core features:**

- **Issue dashboard**: every tracked topic with its current stats, sentiment split, and recent activity
- **Temporal timeline**: events plotted at minute and second granularity, so you can see exactly when a narrative shifted
- **Actor network**: a force-directed graph of who is driving the conversation and how they connect
- **Sentiment breakdown**: positive, negative, and neutral classification over time, with a per-issue sentiment trend chart

![Narrative Tracker timeline view](/projects/narrative-timeline.png)

## Technical Decisions

- **D3.js for both charts**: the timeline and the network graph are hand-rolled D3 rather than a charting library, because the views are custom (time granularity on one, force layout on the other) and generic libraries fought the data model
- **Playwright and Patchright scrapers**: collection runs through a real browser so it works on sites that block plain HTTP clients, with rate limits and robots.txt respected
- **Static frontend, API backend split**: the dashboard is plain HTML, CSS, and JavaScript served statically, talking to a Node.js API, so the visual layer is easy to redeploy anywhere
- **Rich seeded data**: eight realistic issues with full event histories, so every view demonstrates itself instead of showing empty states to a first-time viewer

![Narrative Tracker actor network graph](/projects/narrative-network.png)

## Result

- **Four working views**: dashboard, issues list, timeline, and network graph, all from one dataset
- **Second-level timeline resolution** showing narrative shifts as they happened, not daily aggregates
- **Multi-platform collection** across Twitter, Threads, YouTube, and Reddit behind one interface
