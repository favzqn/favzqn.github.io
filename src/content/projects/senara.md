---
title: "Senara"
description: "Free interactive story platform teaching life skills through visual novels"
image: "senara.png"
tech: ["Astro", "TypeScript", "Tailwind CSS", "Monogatari", "i18n"]
live: "https://senara.id"
github: "https://github.com/favzqn/senara"
featured: true
---

## The Problem

Life skills education -- mental health, financial literacy, communication -- is usually delivered through lectures, textbooks, or boring compliance modules. Nobody remembers them. Young people in Indonesia needed something engaging that doesn't feel like school.

## What I Built

A free, nonprofit interactive story platform that teaches life skills through visual novel-style stories. Users make choices that shape the narrative, learning by living through scenarios instead of being told what to do.

**Core features:**
- **6 story worlds** covering mental health, relationships, money, digital literacy, communication, and environmental awareness
- **Interactive VN engine** (Monogatari) with branching narratives and voice acting
- **3 languages** -- Indonesian, English, Japanese with full i18n system
- **Story browser** with filters, search, and difficulty levels
- **Dark mode** with system preference detection
- **Offline support** via service worker

## Technical Decisions

- **Astro** -- static output, fast loads, no server needed
- **Monogatari engine** -- open-source VN framework, customizable for educational content
- **Tailwind CSS** -- rapid styling with consistent design tokens
- **i18n system** -- custom data-attribute approach for 3 languages without runtime overhead
- **No database** -- all content static, deployable anywhere

## Result

Live at senara.id with 6 stories, 3 languages, and growing. Open source with contribution guidelines for educators and translators to add new stories.