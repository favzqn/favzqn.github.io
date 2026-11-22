---
type: concept
title: "Canonical Forms SOP and POS"
created: 2026-05-30
updated: 2026-05-30
tags:
  - mathematics
  - boolean-algebra
  - sop
  - pos
  - canonical-forms
  - exam-prep
status: developing
complexity: intermediate
related:
  - "[[Minterms and Maxterms]]"
  - "[[Boolean Functions and Expressions]]"
  - "[[Karnaugh Map]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Canonical Forms: SOP and POS

Two standard ways to express any Boolean function uniquely. Every Boolean function has exactly one canonical SOP and one canonical POS form.

---

## SOP — Sum of Products (Penjumlahan dari Hasil Kali)

Expression = OR of AND terms (minterms).

**f(x,y,z) = x'y'z + xy'z' + xyz = Σ(1, 4, 7)**

- Each term is a minterm (all variables present)
- Terms are OR'd together
- Use minterms from rows where f = 1

---

## POS — Product of Sums (Perkalian dari Hasil Jumlah)

Expression = AND of OR terms (maxterms).

**f(x,y,z) = (x+y+z)(x+y'+z)(x+y'+z')(x'+y+z')(x'+y'+z) = Π(0,2,3,5,6)**

- Each term is a maxterm (all variables present)
- Terms are AND'd together
- Use maxterms from rows where f = 0

---

## How to Convert Non-Canonical to Canonical

### SOP: Expand each term to include all variables

**Example**: Convert f(x,y,z) = x + y'z to canonical SOP

```
Step 1: x = x(y + y') = xy + xy'
      = xy(z + z') + xy'(z + z')
      = xyz + xyz' + xy'z + xy'z'

Step 2: y'z = y'z(x + x') = xy'z + x'y'z

Step 3: Combine (remove duplicates)
f = x'y'z + xy'z' + xy'z + xyz' + xyz
  = m₁ + m₄ + m₅ + m₆ + m₇
  = Σ(1, 4, 5, 6, 7)
```

### POS: Expand each term using distributive law

**Example**: Convert f(x,y,z) = x + y'z to canonical POS

```
Step 1: x + y'z = (x + y')(x + z)    [Distributive]

Step 2: x + y' = x + y' + zz' = (x+y'+z)(x+y'+z')
        x + z  = x + z + yy' = (x+y+z)(x+y'+z)

Step 3: Combine (remove duplicates)
f = (x+y+z)(x+y'+z)(x+y'+z')
  = M₀ · M₂ · M₃
  = Π(0, 2, 3)
```

---

## Converting Between SOP and POS

> [!important] The Complement Trick
> **Key insight**: mj' = Mj (complement of minterm j = maxterm j)
>
> **Steps**:
> 1. If f = Σ(1, 4, 5, 6, 7), then f' = Σ(0, 2, 3) = m₀ + m₂ + m₃
> 2. f = (f')' = (m₀ + m₂ + m₃)' = m₀' · m₂' · m₃' [De Morgan]
> 3. = M₀ · M₂ · M₃ = Π(0, 2, 3)
>
> **Result**: f = Σ(1,4,5,6,7) = Π(0,2,3)
>
> The missing indices from Σ become the indices for Π!

---

## Quick Conversion Table

| Form | Symbol | Meaning |
|------|--------|---------|
| SOP  | Σ(i,j,k) | Sum of minterms i, j, k |
| POS  | Π(i,j,k) | Product of maxterms i, j, k |
| Σ ∪ Π indices | = all indices 0..2ⁿ-1 | They partition the index space |

---

## When to Use Which

| Situation | Use |
|-----------|-----|
| Truth table has mostly 1s | POS (fewer terms — only the 0s) |
| Truth table has mostly 0s | SOP (fewer terms — only the 1s) |
| Circuit needs AND-OR structure | SOP |
| Circuit needs OR-AND structure | POS |

---

## Cross-References

- [[Minterms and Maxterms]] — the building blocks
- [[Boolean Laws]] — distributive law enables conversion
- [[Karnaugh Map]] — visual method to get simplified SOP/POS
- [[Logic Gates]] — SOP → AND-OR circuit, POS → OR-AND circuit
