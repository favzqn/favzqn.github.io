---
title: 'Uses'
---

## Development Setup

The tools and gear I use daily to build software and stay productive.

### Hardware

**MacBook Pro 14" M1** • 16GB RAM • 1TB SSD
Daily driver for work. Handles Docker containers, multiple IDEs, and heavy browser tabs without breaking a sweat.

**Custom PC Build**
- **CPU:** AMD Ryzen 5 5600G
- **Motherboard:** ASRock B550M Pro4
- **RAM:** 8GB DDR4
- **Storage:** Team MP33 1TB M.2 NVMe SSD
- **Use:** Development, testing, and Baldur's Gate 3

**Custom NAS/Media Server** • Old Set Top Box
Repurposed hardware running Plex, Jellyfin, and various Docker services.

**MSI 24" Monitor** • 1920x1080
Gets the job done. Nothing fancy, just reliable.

**Audio Setup**
- **Headphones:** Moondrop Space Travel
- **IEMs:** KZ with custom cabling

---

### Software & Tools

**Editor:** Visual Studio Code + Windsurf
Extensions: Prettier, ESLint, GitLens, Docker, Remote SSH

**Browser:** Chrome + Arc Browser
Spaces feature keeps work and personal browsing organized. Built-in ad blocker and split view are fantastic.

**API Testing:** Postman
For when you need to test APIs without writing code (but automation is better)

**Database:** DBeaver
Free, cross-platform, and handles every database I throw at it.

**Design:** Figma
For wireframes, mockups, and collaborating with designers

**Notes:** Obsidian
Markdown-based knowledge management. Perfect for technical documentation and linking ideas.

**Task Management:** JIRA/Trello
JIRA for work, Trello for personal projects.

---

### Terminal & Shell

**Shell:** zsh (default on macOS — no reason to fight it)

**Prompt:** Starship
Cross-shell, fast, and shows git status, language versions, and AWS profile at a glance. Configured to stay minimal.

**Key CLI Tools**
- **git** — obviously. Aliases everywhere: `gs` → `git status`, `gp` → `git push`, etc.
- **fzf** — fuzzy finder. Changed how I navigate history and files. `Ctrl+R` for command history is addictive.
- **ripgrep (rg)** — grep but fast. Used daily for searching across codebases.
- **bat** — `cat` with syntax highlighting. Replaced `cat` entirely.
- **eza** — modern `ls` with icons and git status inline.
- **jq** — JSON processing in the terminal. Essential when working with APIs and AWS CLI output.
- **gh** — GitHub CLI. Creating PRs, checking CI status, reviewing without leaving the terminal.
- **awscli** — AWS management. Combined with `jq` it's more powerful than the console.

**Package Manager:** Homebrew
Manages everything on the Mac. `brew bundle` for reproducible setup across machines.

---

### Testing & Automation

**Playwright** • End-to-end testing framework
My go-to for web automation. Fast, reliable, and great developer experience.

**K6** • Load testing
Performance testing and API load testing. Easy to write tests in JavaScript.

**Docker** • Containerization
Everything runs in containers. Makes environment setup reproducible and deployment predictable.

**Jenkins + GitHub Actions** • CI/CD
Jenkins for complex enterprise pipelines, GitHub Actions for simpler workflows

---

### Cloud & Infrastructure

**AWS** • Primary cloud provider
EC2, S3, Lambda, RDS, CloudWatch.

**Netlify** • Static site hosting
This site runs on Netlify. Deploy previews and instant rollbacks are incredible.
