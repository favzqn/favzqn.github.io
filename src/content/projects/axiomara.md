---
title: "Axiomara"
description: "Interactive Discrete Mathematics Simulator with D3.js visualizations and KaTeX math"
image: "axiomara.png"
tech: ["TypeScript", "D3.js", "KaTeX", "Mathematics"]
live: "https://favzqn.github.io/axiomara"
github: "https://github.com/favzqn/axiomara"
featured: false
---

## The Problem

Discrete mathematics is abstract and hard to visualize. Students struggle with set theory, logic, and proofs because they can't see what's happening. Textbooks show static diagrams. Nothing is interactive.

## What I Built

A virtual math laboratory where abstract concepts become interactive experiences. Users manipulate sets, build logic expressions, and see the results in real-time.

**11 modules:**
- **Set Theory**: Union, intersection, difference, complement, power set, Cartesian product with interactive Venn diagrams
- **Logic**: Propositions, AND/OR/NOT/XOR/IMPLIES/BICONDITIONAL, truth tables with step-by-step evaluation
- **Boolean Algebra**: Simplification, De Morgan's laws, Karnaugh maps
- **Relations**: Reflexive, symmetric, transitive, equivalence relations
- **Functions**: Injective, surjective, bijective, composition
- **Proofs**: Direct, contrapositive, contradiction, induction
- **And more**

## Technical Decisions

![Set theory module with interactive Venn diagram](/projects/axiomara-sets.png)

![Logic module with truth table evaluation](/projects/axiomara-logic.png)

![Graph algorithms module](/projects/axiomara-graph.png)



- **D3.js**: Interactive visualizations that update in real-time
- **KaTeX**: Fast math rendering for notation
- **TypeScript**: Type safety for complex mathematical operations
- **No backend**: Everything runs in the browser

## Result

Live at favzqn.github.io/axiomara. Used by students to explore discrete math concepts interactively.