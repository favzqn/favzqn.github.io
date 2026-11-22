---
type: concept
title: "Boolean Functions and Expressions"
created: 2026-05-30
updated: 2026-05-30
tags:
  - mathematics
  - boolean-algebra
  - functions
  - exam-prep
status: developing
complexity: intermediate
related:
  - "[[Boolean Algebra]]"
  - "[[Boolean Laws]]"
  - "[[Canonical Forms SOP and POS]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Boolean Functions and Expressions

Boolean functions map combinations of binary inputs to a binary output. They are built from variables, constants (0, 1), and operators (+, ·, ').

---

## What is a Boolean Expression?

Formed from elements of B and/or variables combined with +, ·, and '.

**Examples:**
- `0` — constant
- `1` — constant
- `a` — variable
- `a + b` — OR
- `a · b` — AND
- `a' · (b + c)` — NOT AND OR
- `a·b' + a·b·c' + b'` — complex expression

---

## Literal

Every variable in a Boolean function, including its complemented form, is called a **literal**.

**Example**: h(x, y, z) = xyz' has **3 literals**: x, y, z'

---

## Evaluating a Boolean Function

Substitute values and compute step by step.

**Example**: h(x, y, z) = xyz', find h(1, 1, 0)

```
h(1, 1, 0) = 1 · 1 · 0'
           = 1 · 1 · 1
           = 1
```

---

## Function vs Expression

- A **Boolean function** is the mapping from inputs to output (defined by truth table)
- A **Boolean expression** is one way to write that function
- Multiple expressions can represent the **same function**
- The goal of simplification: find the shortest expression for a given function

**Example**: These are all the same function:
- f(x, y) = x'y + xy' + y'
- f(x, y) = x' + y'

---

## Why Simplify?

In circuit design:
- Simpler expression = fewer logic gates = cheaper, faster, less power
- f(x,y) = x'y + xy' + y' needs 5 gates
- f(x,y) = x' + y' needs 2 gates

---

## Cross-References

- [[Boolean Laws]] — tools for algebraic simplification
- [[Canonical Forms SOP and POS]] — standard representations
- [[Minterms and Maxterms]] — atomic building blocks
- [[Karnaugh Map]] — graphical simplification method
- [[Logic Gates]] — physical implementation
