---
title: "WA Booking Bot"
description: "WhatsApp booking assistant that captures details conversationally and syncs every booking to a spreadsheet"
image: "wa-booking-bot.png"
tech: ["Node.js", "LLM APIs", "Google Sheets API", "Caddy", "systemd"]
live: "http://43.157.225.142:8095"
github: ""
featured: true
priority: 1
---

## The Problem

A small studio takes bookings over WhatsApp all day. Someone asks about classes, a staff member answers, digs out the schedule, asks for a name and phone number, then retypes everything into a spreadsheet. Multiply that by every conversation and it is hours of copy-paste a week, with typos in the sheet and double-bookings when two chats overlap.

## What I Built

A WhatsApp booking assistant that handles the whole conversation. It answers questions about classes, pricing and location, collects the booking details, confirms with the guest, and writes the booking to a spreadsheet, all in one exchange.

**[Try the live demo →](http://43.157.225.142:8095)**

Type to the bot on the left and watch the booking appear in the sheet on the right. It is the real thing, not a scripted walkthrough.

## Technical Decisions

![Bot collecting booking details conversationally](/projects/wa-chat-collect.jpg)

![Booking written to the sheet after confirmation](/projects/wa-chat-sheet.jpg)



- **LLM for the voice, state machine for the data.** This is the core design decision. A pure LLM flow loses or mangles details under pressure, and a pure template flow sounds robotic and cannot answer an unexpected question. So the language model writes every reply and interprets free text, while a deterministic state machine owns the booking record. Slots are extracted with explicit rules and validated before anything reaches the sheet, so a phone number can never be dropped because the model was chatty
- **Confirm before commit.** The row is written only after the assistant has actually confirmed with the guest in conversation. Collecting five fields is not the same as a confirmed booking, and the system respects the difference
- **Graceful degradation.** If the model call fails or times out, the state machine takes over the voice, finishes the booking, and the guest never sees an error
- **Real LLM replies, never canned.** Every message is generated from the conversation history and studio context, so off-topic questions get real answers and the bot steers back to the missing detail naturally
- **Operable like production.** Runs under systemd with automatic restarts behind a Caddy reverse proxy, with per-IP rate limiting and payload caps on the public endpoint

## Result

- **Bookings captured end to end in under a minute**, with zero staff involvement
- **Data integrity guaranteed** by separating conversational AI from booking state
- **Live public demo** a client can try before writing a single word of a brief
- The production path swaps the in-demo sheet view for the **Google Sheets API**, the same append flow already running in my finance automation
