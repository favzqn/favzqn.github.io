---
title: "ClassTwin"
description: "Agent-based simulation for policy analysis in higher education"
image: "classtwin.png"
tech: ["Python", "Streamlit", "Agent-Based Modeling", "Data Visualization"]
live: "https://classtwin-simulation.streamlit.app"
github: "https://github.com/favzqn/classtwin-simulation"
featured: false
---

## The Problem

University administrators make policy decisions (class size, feedback timing, workload) based on intuition or small surveys. There's no way to test "what if we halve class size?" without actually doing it and affecting real students.

## What I Built

A digital twin of a university classroom. An agent-based simulation where 30 virtual students each have their own knowledge, stress, motivation, and socioeconomic background. They interact through peer learning groups over a 14-week semester.

**What it simulates:**
- Student knowledge accumulation and forgetting curves
- Stress and motivation dynamics
- Attendance patterns
- Peer learning effects
- Lecturer feedback timing
- Assignment workload impact

**Interactive dashboard:**
- Adjust every parameter in real-time
- Compare policy scenarios side-by-side
- See GPA distributions, dropout rates, attendance curves
- Executive summary with policy ROI

## Key Findings

- **Feedback speed is the #1 lever** -- reducing delay from 4 weeks to 0 has larger effect than halving class size
- Best practice bundle (fast feedback + low load + tutoring) raises GPA from 3.01 to 3.47
- Worst case (large class + overload + slow feedback) drops GPA to 1.72 with 90% failure rate
- **Total policy impact range: 1.75 GPA points** between best and worst scenarios

## Technical Decisions

- **Python + Streamlit**: Fast dashboard development, easy deployment
- **Agent-based modeling**: Each student is an autonomous agent with individual behaviors
- **40 tests**: Comprehensive test coverage for simulation logic
- **Citation paper**: Academic-grade documentation with CITATION.cff

## Result

Live dashboard at classtwin-simulation.streamlit.app. Used for policy experimentation without affecting real students.