---
title: 'Building a NAS and AI Assistant from a Used Set-Top Box'
pubDate: '2024-08-16'
---

Sometimes small experiments lead to big results. From an inexpensive device, a mini server was born that now works <mark>24/7</mark> at home.

## It Started with Curiosity

A while back, I became interested in trying **self-hosting**: running my own server at home. It felt exciting to imagine all my data stored on my own device, automation running according to my needs, and <mark>not depending on third-party services</mark>.

The problem was, as soon as I started looking for hardware, reality hit hard:

- **Raspberry Pi** - once cheap and accessible, now scarce and expensive
- **Mini PC** - great performance, but the price made me think twice for just an experiment

Then one day, I saw a post on a Facebook marketplace: **HG680P B860H**, a used Android TV set-top box. Small form factor, modest specs, but there was one thing that made me stop scrolling — it had a <mark>**LAN port**</mark>.

> "If this can be modified into a server, why not try it?"

The price was reasonable. If it failed? At least I'd gain <mark>experience and a story to tell</mark>.

## From Android TV to Linux

Out of the box, this STB could only run Android TV. Great for streaming, but <mark>limited for server use</mark>. So, first step: **replace the OS**.

I chose **Armbian**, a Linux distribution optimized for ARM devices. With Armbian, I had <mark>full control via terminal</mark>, just like a mini computer.

The steps were straightforward:

1. Download the **Armbian image** for HG680P
2. Prepare a **128GB SD Card** for the system and initial storage
3. Flash the image with `balenaEtcher`
4. Insert the SD card into the STB, power it on, and... <mark>boot into Armbian!</mark>

> At that moment, it felt like "bringing to life" a device that was previously just a media player into a machine ready to work 24/7.

## Installing CasaOS

While I was comfortable in the terminal, I wanted a **UI interface**. My choice fell on **CasaOS**, a web dashboard for home servers and small NAS setups.

With CasaOS, I could:

- <mark>Install applications</mark> via the App Store
- <mark>Monitor</mark> CPU, RAM, and storage
- <mark>Access files</mark> directly through the browser

The installation was quick, and as soon as I opened the device's IP address, a clean dashboard greeted me.

## Setting Up n8n for Automation

**n8n** is a flexible automation tool that allows me to create <mark>workflows without having to write code from scratch</mark>.

In CasaOS, the installation was as simple as:

1. Search for `n8n` in the App Store
2. Click **Install**
3. Wait a few minutes, then open it from the dashboard

## First Workflow: Curated AI News

As an initial experiment, I wanted to create something that would <mark>immediately provide daily value</mark>. The idea that emerged: an **AI news summary** automatically sent to Telegram every morning.

The flow was simple but effective:

1. **RSS Node** → Fetches the latest AI news from `TheDecoder` and `TechCrunch`. 
2. **Function Node** → Filters news so only articles published in the <mark>last 24 hours</mark> make the list. 
3. **Telegram Node** → Sends the news list to my personal Telegram chat. The format is clean: article title, link, and brief summary.

The result? Every morning I get a notification containing a collection of the latest AI news. <mark>No more habit of opening multiple tabs</mark> just to find the latest updates — just open one chat, everything is already curated.

This workflow is simple, but it immediately <mark>saves time</mark> and ensures I don't miss important information in the field I'm interested in.

## New Possibilities Unlocked

After the first workflow succeeded, it felt like <mark>opening a door to a room full of new tools</mark>. Suddenly, other ideas began to emerge, and I realized this small device could do <mark>far more than I initially planned</mark>.

Some ideas I started thinking about:

### Automatic Work File Backup

Set `n8n` to monitor certain folders on my main NAS, then periodically make copies to **Google Drive**.

### Automate Social Media Content Upload

`n8n` takes image or video files from a specific folder, adds a **watermark**, then posts them to Instagram, Facebook, or Twitter. Perfect for <mark>small businesses or personal branding</mark>.

### Public Data Scraper

`n8n` pulls data from specific sites — for example, product prices on marketplaces, event schedules, or specific news — then saves it in **spreadsheet or database format**. From there, I can create <mark>automatic analysis or reports</mark>.

### Smart Home Control Dashboard

Connect this STB to smart home devices via **API** or **MQTT broker**, then create a simple UI interface to monitor room temperature, turn on lights, or control other devices.

### Online Service Monitoring

Create a workflow that routinely checks the status of websites or APIs I use, then sends **Telegram notifications** if there are problems. Perfect for <mark>maintaining uptime</mark> of personal services or side hustle projects.

### Automatic Reminders

For example, pulling **calendar data**, combining it with **weather data**, then sending morning notifications with a schedule summary and weather forecast.

## Lessons from This Experiment

From this process, I gained several important notes — some technical, some related to device usage management:

### SD Card Works for Starting, but External HDD/SSD is Far More Durable

The **128GB SD card** I used was sufficient for installation and initial experiments. But for <mark>long-term use</mark>, especially if workflows start storing large data or making routine backups, an **external SSD/HDD** will be much safer from damage risk and have <mark>stable read-write speeds</mark>.

### 2GB RAM is Enough for Light Applications

With this much RAM, the STB can run `n8n`, file manager, and several background processes without problems. However, running <mark>heavy applications or multiple containers</mark> simultaneously will clearly cause performance degradation. This means I must <mark>selectively choose</mark> which applications to run and optimize workflows to avoid burdening RAM.

### Monitor Performance to Keep the Server Running Smoothly

Regularly checking **CPU**, **RAM**, and **storage** usage is important. In CasaOS, this information can be seen from the dashboard. For more detail, I usually enter the terminal and use `htop` or `iotop` to see active processes.

### Backup n8n Workflows Regularly

`n8n` workflows are stored in a specific data folder. I created a <mark>weekly backup schedule</mark> for this folder to my main NAS. That way, if the SD card fails or the system needs to be reinstalled, I can <mark>restore all workflows</mark> without having to create them from scratch.

---

_From a simple experiment, I now have a small digital assistant that's always on standby. The **HG680P B860H** that was once just an STB now works tirelessly. Who knows, maybe old devices in your home can also have a new story._