---
type: source
title: "Aljabar Boolean"
created: 2026-05-30
updated: 2026-05-30
tags:
  - book
  - mathematics
  - discrete-math
  - boolean-algebra
  - logic
  - digital-circuits
  - exam-prep
status: developing
source_type: lecture-slides
author: "Rinaldi Munir"
institution: "STEI-ITB"
course: "IF2120 Matematika Diskrit"
date_published: 2016
key_claims:
  - "Boolean algebra is the mathematical foundation of digital circuit design"
  - "Set algebra and propositional logic are subsets of Boolean algebra"
  - "Karnaugh maps provide a graphical method for simplifying Boolean functions"
  - "Any Boolean function can be expressed in canonical SOP or POS form"
  - "Don't care conditions allow further simplification in circuit design"
related:
  - "[[Rinaldi Munir]]"
sources:
  - "[[.raw/books/Aljabar-Boolean-2016.pdf]]"
---

# Aljabar Boolean

Lecture slides for IF2120 Matematika Diskrit (Discrete Mathematics) by Rinaldi Munir at STEI-ITB. Covers the complete Boolean Algebra curriculum: axioms, laws, canonical forms, Karnaugh maps, logic gates, and circuit design applications.

---

## Structure

### Part 1: Foundations (Slides 1–9)
- [[Boolean Algebra Exam Cheatsheet]] — **START HERE** for quick reference
- [[Boolean Algebra]] — definition, axioms, 2-valued algebra
- [[Boolean Laws]] — 11 fundamental laws with proofs

### Part 2: Functions and Canonical Forms (Slides 10–25)
- [[Boolean Functions and Expressions]] — literals, evaluation
- [[Minterms and Maxterms]] — building blocks of canonical forms
- [[Canonical Forms SOP and POS]] — two ways to express any Boolean function

### Part 3: Simplification (Slides 30–66)
- [[Karnaugh Map]] — graphical simplification method
- [[Don't Care Conditions]] — using X values for further minimization

### Part 4: Circuit Design (Slides 26–29, 67–78)
- [[Logic Gates]] — AND, OR, NOT, NAND, NOR, XOR, XNOR
- [[Logic Circuit Design]] — real-world applications

---

## Key Concepts

- [[Boolean Algebra]] — the mathematical structure
- [[Boolean Laws]] — 11 laws you MUST memorize
- [[Boolean Functions and Expressions]] — how to write and evaluate
- [[Minterms and Maxterms]] — the atoms of Boolean functions
- [[Canonical Forms SOP and POS]] — standard representations
- [[Karnaugh Map]] — the simplification tool
- [[Don't Care Conditions]] — optimization with flexibility
- [[Logic Gates]] — physical implementation
- [[Logic Circuit Design]] — from truth table to circuit

---

## Key People

- [[Rinaldi Munir]] — lecturer, STEI-ITB

---

## Exam Focus

> [!tip] What to memorize
> 1. The 4 axioms of Boolean Algebra (identity, commutative, distributive, complement)
> 2. All 11 Boolean laws (especially De Morgan and absorption)
> 3. How to build minterms/maxterms from truth tables
> 4. SOP vs POS — when to use which
> 5. Karnaugh Map grouping rules (1, 2, 4, 8 — powers of 2)
> 6. Don't care handling — treat X as 1 to form groups, leftover X = 0
> 7. Converting between SOP and POS using complement + De Morgan
