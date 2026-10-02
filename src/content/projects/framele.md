---
title: "Framele"
description: "Daily anime guessing game with clue progression, scoring, streaks, and shareable Wordle-style results"
image: "framele-gameplay.png"
tech: ["Astro", "React", "TypeScript", "AniList API", "Vercel"]
live: "http://43.157.225.142:8096"
github: ""
featured: false
---

## The Problem

Daily puzzle games drive repeat traffic like nothing else, but building one usually means a backend, a user system, and a database just to hand everyone the same puzzle. This project had to ship as a static site: no server, no accounts, no cost to run, and still feel like a real game people come back to.

## What I Built

A Wordle-style guessing game for anime fans. One puzzle, six rounds, clues revealed one at a time.

**Core features:**

- **Progressive clues**: each wrong guess reveals the next hint, so the puzzle gets easier as your chances get worse
- **Scoring and streaks**: guess in round one and you get Genius, run out of rounds and it is Missed, with stats persisted locally between visits
- **Practice mode**: unlimited games next to the daily puzzle, so a first-time visitor can learn the rules without waiting for tomorrow
- **Share results**: a copyable grid of your score that spreads the game the same way Wordle did

![Framele gameplay mid-round with guesses and clue feedback](/projects/framele-gameplay.png)

## Technical Decisions

- **AniList GraphQL as the data source**: free, no auth, and deep enough to pull characters and cover art for the top 100 popular anime, so the puzzle pool stays fresh without me maintaining a dataset
- **Static build, client-side state**: the whole game runs in the browser, stats live in localStorage, and the deploy is a folder of files. Zero backend means zero hosting bill and nothing to break
- **Astro with a single hydrated React island**: pages render statically for fast first paint, and only the game component ships JavaScript
- **Deterministic feedback logic**: guess checking is pure functions, so scoring is testable and the same guess always produces the same result

## Result

- **Playable daily game at a public URL**, built and deployed as a fully static site
- **Six-round scoring system** with persistence, streaks, and share output, all client-side
- **Two game modes** (daily and practice) from one component, keeping the codebase small
