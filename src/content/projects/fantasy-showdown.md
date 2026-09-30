---
title: "Fantasy Showdown"
description: "Web3 fantasy sports platform combining ESPN/Yahoo imports with NFT gear and competitive matches"
image: "fantasy-showdown.png"
tech: ["TypeScript", "React", "Node.js", "Blockchain", "Sports APIs"]
live: "https://fantasyshowdowndev.com"
github: ""
featured: true
---

## The Problem

Fantasy sports players invest hours managing teams across ESPN and Yahoo, but there's no way to use those teams in competitive, skill-based matchups with real stakes. Traditional fantasy is passive. You set your lineup and wait. Players wanted something more engaging.

## What I Built

A full-stack platform that imports existing fantasy teams and turns them into competitive assets.

**Core features:**
- **Team Import**: Pull live data from ESPN and Yahoo APIs. No need to rebuild teams from scratch.
- **NFT Gear System**: Earn and equip gear that boosts specific player stats (passing, rushing, receiving). Built on blockchain for true ownership and marketplace trading.
- **Matchmaking Engine**: Real-time head-to-head competitions with live scoring and dynamic leaderboards.
- **Subscription System**: Tiered access with payment processing and user dashboard.

## Technical Decisions

- **TypeScript throughout**: End-to-end type safety across frontend and backend
- **PostgreSQL**: Complex queries for leaderboard rankings and match history
- **Blockchain integration**: NFT minting and trading via smart contracts
- **Sports APIs**: Real-time player stats for dynamic scoring

## Result

A working platform that combines fantasy sports with Web3 mechanics. Users import teams, earn gear, and compete, all without managing another fantasy roster.