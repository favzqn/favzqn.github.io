---
title: "Chatbiz Chatbot Platform"
kind: 'Chatbot platform · YC W21'
description: "30+ chatbots handling 100k+ messages/day for brands across Indonesia"
image: "chatbiz-portfolio.png"
tech: ["TypeScript", "Node.js", "NLP", "Webhooks", "Redis"]
live: "https://chatbiz.id"
github: ""
featured: false
priority: 20
role: 'Software Engineer, YC W21 startup'
metrics:
  - { value: '30+', label: 'chatbots shipped' }
  - { value: '100k+', label: 'messages per day' }
  - { value: '40%', label: 'infra cost reduction' }
  - { value: '15%', label: 'week-over-week GTV growth' }
---

## The Problem

Brands in Indonesia wanted to automate customer interactions across WhatsApp and Instagram, but existing chatbot platforms were expensive, inflexible, and couldn't handle Bahasa Indonesia properly. They needed custom solutions that understood local context.

## What I Built

A multi-tenant chatbot platform at a YC W21 company, building and scaling 30+ chatbots for major brands.

**Core features:**
- **Multi-channel Engine**: WhatsApp, Instagram, and web chat from a single platform
- **NLP Pipeline**: Intent recognition and entity extraction tuned for Bahasa Indonesia
- **Real-time Dashboard**: Bot performance analytics, conversation logs, and conversion tracking
- **Webhook System**: Easy integration with client CRMs and external services

### Client implementations

![Chatbiz portfolio](/projects/chatbiz-portfolio.png)

![Case study: Courtina](/projects/chatbiz-case.png)

```mermaid
flowchart LR
    W1["WhatsApp"] --> E["Multi-channel<br/>engine"]
    W2["Instagram"] --> E
    W3["Web chat"] --> E
    E --> N["NLP pipeline<br/>intent + entities (Bahasa ID)"]
    N --> R["Reply + routing"]
    R --> CRM["Client CRM<br/>via webhooks"]
    E --> D["Real-time dashboard<br/>analytics + conversion"]
```

## Technical Decisions

![Chatbiz platform features](/projects/chatbiz-features.jpg)



- **Node.js + TypeScript**: Fast iteration, shared types across the stack
- **Redis caching**: Sub-second response times even at 100k+ messages/day
- **Microservices architecture**: Independent scaling for NLP, message routing, and analytics
- **Infrastructure optimization**: Reduced costs by 40% through caching and resource right-sizing

## Result

- <mark>30+ chatbots shipped for brands across Indonesia</mark>
- **100k+ messages/day** processed with sub-second response times
- **15% week-over-week growth** in gross transaction value
- **40% infrastructure cost reduction** through optimization

**Shows:** Node.js at scale, serverless migration, NLP integrations, infrastructure cost engineering
