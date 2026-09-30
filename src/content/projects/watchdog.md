---
title: "Watchdog"
description: "Playwright scraper that finds profitable Japanese auction items using margin filters"
image: "watchdog.svg"
tech: ["Playwright", "Node.js", "JavaScript"]
live: ""
github: "https://github.com/favzqn/watchdog"
featured: false
---

## The Problem

Import resellers and collectors manually browse Japanese auction sites (Mercari, Yahoo Auctions) to find underpriced items. This means hours of scrolling, manual price calculations, and missing deals that expire fast.

## What I Built

A Playwright-based scraper that automatically finds profitable items by calculating landed costs and filtering by profit margin.

**Core features:**
- **Automated scraping** -- Playwright handles JavaScript-rendered pages
- **Smart filtering** -- skip overpriced, junk, or bulk items automatically
- **Profit estimation** -- calculate landed cost in JPY and margin in IDR
- **Configurable thresholds** -- set minimum margin, max price, and categories via environment variables
- **Rate limiting** -- respectful scraping with configurable delays

## Technical Decisions

- **Playwright over Puppeteer** -- better handling of anti-bot measures and modern SPAs
- **Environment-based config** -- no hardcoded values, easy to adjust for different use cases
- **Modular architecture** -- separate scraping, filtering, and output modules

## Result

A tool that turns hours of manual browsing into a single command. Finds deals that manual searches miss, with exact profit calculations before committing to buy.