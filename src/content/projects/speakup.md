---
title: "SpeakUp"
description: "Offline-first PWA for English speaking practice, designed for low-end Android devices"
image: "speakup.png"
tech: ["JavaScript", "PWA", "Web Speech API", "Service Worker"]
live: "https://speakup.fauzan08fauzan.workers.dev"
github: "https://github.com/favzqn/speakup"
featured: true
---

## The Problem

English learners in rural Indonesia and similar low-connectivity environments need speaking practice, but existing apps require accounts, internet connections, and modern devices. Most language apps are bloated, ad-heavy, or behind paywalls.

## What I Built

A free, offline-first progressive web app that works on low-end Android devices without any account or backend.

**Core features:**
- **8 lessons, 64 phrases** with Indonesian translations
- **Listen and repeat** workflow: tap to hear, record yourself, get instant feedback
- **Word-level diff** showing exactly which words you got right and wrong
- **Offline support** via service worker -- works without internet after first load
- **No account, no backend, no cost** -- everything runs in the browser

## Technical Decisions

- **Pure JavaScript, no framework** -- keeps the bundle tiny for low-end devices
- **Web Speech API** -- browser-native speech recognition, no cloud dependency
- **Service Worker** -- full offline support with cache-first strategy
- **Cloudflare Workers** -- free hosting, global CDN, zero maintenance

## Result

A working PWA that runs on $50 Android phones in areas with poor connectivity. No servers to maintain, no costs to scale.