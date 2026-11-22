---
type: concept
title: "Minterms and Maxterms"
created: 2026-05-30
updated: 2026-05-30
tags:
  - mathematics
  - boolean-algebra
  - minterms
  - maxterms
  - canonical-forms
  - exam-prep
status: developing
complexity: intermediate
related:
  - "[[Canonical Forms SOP and POS]]"
  - "[[Boolean Functions and Expressions]]"
  - "[[Karnaugh Map]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Minterms and Maxterms

The atomic building blocks of canonical Boolean expressions. Every Boolean function can be uniquely expressed as a sum of minterms or product of maxterms.

---

## Minterm

A product (AND) term that contains **every variable** exactly once, either complemented or not.

**For 3 variables (x, y, z):**

| x | y | z | Minterm | Symbol |
|---|---|---|---------|--------|
| 0 | 0 | 0 | x'y'z'  | m₀     |
| 0 | 0 | 1 | x'y'z   | m₁     |
| 0 | 1 | 0 | x'yz'   | m₂     |
| 0 | 1 | 1 | x'yz    | m₃     |
| 1 | 0 | 0 | xy'z'   | m₄     |
| 1 | 0 | 1 | xy'z    | m₅     |
| 1 | 1 | 0 | xyz'    | m₆     |
| 1 | 1 | 1 | xyz     | m₇     |

> [!tip] Minterm rule
> Variable = 0 → use complement (x')
> Variable = 1 → use direct (x)

---

## Maxterm

A sum (OR) term that contains **every variable** exactly once, either complemented or not.

**For 3 variables (x, y, z):**

| x | y | z | Maxterm | Symbol |
|---|---|---|---------|--------|
| 0 | 0 | 0 | x+y+z   | M₀     |
| 0 | 0 | 1 | x+y+z'  | M₁     |
| 0 | 1 | 0 | x+y'+z  | M₂     |
| 0 | 1 | 1 | x+y'+z' | M₃     |
| 1 | 0 | 0 | x'+y+z  | M₄     |
| 1 | 0 | 1 | x'+y+z' | M₅     |
| 1 | 1 | 0 | x'+y'+z | M₆     |
| 1 | 1 | 1 | x'+y'+z'| M₇     |

> [!tip] Maxterm rule (OPPOSITE of minterm!)
> Variable = 0 → use direct (x)
> Variable = 1 → use complement (x')

---

## Critical Relationship

> [!important] mj' = Mj
> The complement of minterm j equals maxterm j.
> 
> **Proof**: m₀ = x'y'z', so m₀' = (x'y'z')' = x+y+z = M₀ (by De Morgan)

---

## What's NOT a Minterm/Maxterm?

For variables x, y, z:
- **x'y** → NOT a minterm (missing z)
- **y'z'** → NOT a minterm (missing x)
- **xy'z** → IS a minterm ✓ (all 3 variables present)
- **(x + z)** → NOT a maxterm (missing y)
- **(x' + y + z')** → IS a maxterm ✓

---

## How to Build from Truth Table

Given a truth table for f(x, y, z):

**For SOP (Sum of Products):**
1. Find all rows where f = 1
2. Take the minterm for each such row
3. OR them together

**For POS (Product of Sums):**
1. Find all rows where f = 0
2. Take the maxterm for each such row
3. AND them together

---

## Example

| x | y | z | f(x,y,z) |
|---|---|---|----------|
| 0 | 0 | 0 | 0        |
| 0 | 0 | 1 | 1        |
| 0 | 1 | 0 | 0        |
| 0 | 1 | 1 | 0        |
| 1 | 0 | 0 | 1        |
| 1 | 0 | 1 | 0        |
| 1 | 1 | 0 | 0        |
| 1 | 1 | 1 | 1        |

**SOP**: f = m₁ + m₄ + m₇ = x'y'z + xy'z' + xyz = Σ(1, 4, 7)

**POS**: f = M₀·M₂·M₃·M₅·M₆ = (x+y+z)(x+y'+z)(x+y'+z')(x'+y+z')(x'+y'+z) = Π(0,2,3,5,6)

---

## Cross-References

- [[Canonical Forms SOP and POS]] — the two standard forms
- [[Karnaugh Map]] — visual representation using minterms
- [[Boolean Functions and Expressions]] — functions built from minterms
- [[Don't Care Conditions]] — when some minterms don't matter
