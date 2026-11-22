---
type: concept
title: "Boolean Algebra"
created: 2026-05-30
updated: 2026-05-30
tags:
  - mathematics
  - boolean-algebra
  - logic
  - discrete-math
  - exam-prep
status: developing
complexity: foundational
related:
  - "[[Boolean Laws]]"
  - "[[Boolean Functions and Expressions]]"
  - "[[Logic Gates]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Boolean Algebra

A mathematical structure defined on a set B with two binary operators (+, ·) and one unary operator (') that satisfies four axioms. Discovered by George Boole in 1854 in *The Laws of Thought*.

---

## Formal Definition

A tuple **<B, +, ·, ', 0, 1>** is a Boolean algebra if for all a, b, c ∈ B:

### The 4 Axioms

| # | Axiom | OR (+) | AND (·) |
|---|-------|--------|---------|
| 1 | **Identity** | a + 0 = a | a · 1 = a |
| 2 | **Commutative** | a + b = b + a | a · b = b · a |
| 3 | **Distributive** | a · (b + c) = (a·b) + (a·c) | a + (b·c) = (a+b) · (a+c) |
| 4 | **Complement** | a + a' = 1 | a · a' = 0 |

> [!tip] EXAM TIP — Memorize these 4 axioms
> Everything else derives from them. If you forget a law, you can prove it from these 4.

---

## Boolean Algebra 2-Values (Most Important)

The most popular Boolean algebra for digital circuits:

- **B = {0, 1}** — only two elements
- **Binary operators**: + (OR) and · (AND)
- **Unary operator**: ' (NOT/complement)

### Truth Tables

**AND (·)**
| a | b | a·b |
|---|---|-----|
| 0 | 0 | 0   |
| 0 | 1 | 0   |
| 1 | 0 | 0   |
| 1 | 1 | 1   |

**OR (+)**
| a | b | a+b |
|---|---|-----|
| 0 | 0 | 0   |
| 0 | 1 | 1   |
| 1 | 0 | 1   |
| 1 | 1 | 1   |

**NOT (')**
| a | a' |
|---|----|
| 0 | 1  |
| 1 | 0  |

---

## Key Insight

- **Set algebra** and **propositional logic** are both subsets of Boolean algebra
- Propositional logic: B = {T, F}, operators = ∨, ∧, ~
- Set algebra: B = {sets}, operators = ∪, ∩, complement
- Both satisfy the same 4 axioms → both are Boolean algebras

---

## Applications

- Digital circuit design
- Integrated circuits (IC)
- Switching networks
- Computer logic units (ALU)

---

## Cross-References

- [[Boolean Laws]] — the 11 derived laws
- [[Boolean Functions and Expressions]] — how to build and evaluate
- [[Logic Gates]] — physical implementation of Boolean operators
- [[Canonical Forms SOP and POS]] — standard ways to express functions
