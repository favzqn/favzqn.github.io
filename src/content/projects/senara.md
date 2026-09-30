---
title: "Senara"
description: "Free interactive story platform teaching life skills through visual novels"
image: "senara-home.png"
tech: ["Astro", "TypeScript", "Tailwind CSS", "i18n"]
live: "https://senara.id"
github: "https://github.com/favzqn/senara"
featured: true
---

## The Problem

Life skills education (mental health, financial literacy, communication) is usually delivered through lectures, textbooks, or boring compliance modules. Nobody remembers them. Young people in Indonesia needed something engaging that doesn't feel like school.

## What I Built

A free, nonprofit interactive story platform that teaches life skills through visual novel-style stories. Users make choices that shape the narrative, learning by living through scenarios instead of being told what to do.

**Core features:**
- **6 story worlds** covering mental health, relationships, money, digital literacy, communication, and environmental awareness
- **Interactive story engine** with branching narratives and voice acting
- **3 languages** (Indonesian, English, Japanese) with full translation system
- **Story browser** with filters, search, and difficulty levels
- **Dark mode** with system preference detection
- **Offline support** via service worker

### Demo

![Senara demo](/projects/senara-demo.gif)

### Screenshots

![Stories collection](/projects/senara-stories.png)

![VN player in action](/projects/senara-vn-playing.png)

## Technical Decisions

- **Astro** (static output, fast loads, no server needed)
- **Custom i18n system** (data-attribute approach for 3 languages without runtime overhead)
- **Tailwind CSS** (rapid styling with consistent design tokens)
- **No database** (all content static, deployable anywhere)

## Result

Live at senara.id with 6 stories, 3 languages, and growing. Open source with contribution guidelines for educators and translators to add new stories.