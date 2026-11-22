---
type: concept
title: "Boolean Algebra Exam Cheatsheet"
created: 2026-05-30
updated: 2026-05-30
tags:
  - mathematics
  - boolean-algebra
  - exam-prep
  - cheatsheet
status: developing
complexity: reference
related:
  - "[[Boolean Algebra]]"
  - "[[Boolean Laws]]"
  - "[[Karnaugh Map]]"
  - "[[Canonical Forms SOP and POS]]"
  - "[[Minterms and Maxterms]]"
  - "[[Logic Gates]]"
  - "[[Don't Care Conditions]]"
  - "[[Logic Circuit Design]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Boolean Algebra Exam Cheatsheet

One-page reference for IF2120 Matematika Diskrit. Everything you need for the Boolean Algebra section.

---

## 1. The 4 Axioms (Everything Derives From These)

| Axiom | OR (+) | AND (·) |
|-------|--------|---------|
| **Identity** | a + 0 = a | a · 1 = a |
| **Commutative** | a + b = b + a | a · b = b · a |
| **Distributive** | a · (b+c) = ab + ac | a + bc = (a+b)(a+c) |
| **Complement** | a + a' = 1 | a · a' = 0 |

---

## 2. The 11 Laws (Quick Reference)

| Law | OR | AND |
|-----|-----|------|
| Identity | a + 0 = a | a · 1 = a |
| Idempotent | a + a = a | a · a = a |
| Complement | a + a' = 1 | a · a' = 0 |
| Dominance | a + 1 = 1 | a · 0 = 0 |
| Involution | (a')' = a | — |
| Absorption | a + ab = a | a(a+b) = a |
| Commutative | a + b = b + a | ab = ba |
| Associative | a+(b+c) = (a+b)+c | a(bc) = (ab)c |
| Distributive | a+bc = (a+b)(a+c) | a(b+c) = ab+ac |
| De Morgan | (a+b)' = a'b' | (ab)' = a'+b' |
| 0/1 | 0' = 1 | 1' = 0 |

> [!tip] De Morgan shortcut
> "Break the bar, change the sign"

---

## 3. Minterm vs Maxterm

| | Minterm | Maxterm |
|---|---------|---------|
| **Form** | Product (AND) | Sum (OR) |
| **Contains** | All variables | All variables |
| **Variable = 0** | Complement (x') | Direct (x) |
| **Variable = 1** | Direct (x) | Complement (x') |
| **Symbol** | mⱼ | Mⱼ |
| **Value** | = 1 for ONE input combo | = 0 for ONE input combo |

> [!important] Key relationship
> **mⱼ' = Mⱼ** — complement of minterm j = maxterm j

---

## 4. Canonical Forms

| Form | Structure | From truth table | Symbol |
|------|-----------|-----------------|--------|
| **SOP** | Sum of Products (OR of ANDs) | Take minterms where f=1 | Σ(i,j,k) |
| **POS** | Product of Sums (AND of ORs) | Take maxterms where f=0 | Π(i,j,k) |

**SOP ↔ POS conversion**: The indices NOT in Σ go to Π, and vice versa.
- f = Σ(1,4,5,6,7) = Π(0,2,3)

---

## 5. Karnaugh Map Rules

**Structure** (Gray code order!):
- 2 vars: 2×2 grid
- 3 vars: 2×4 grid
- 4 vars: 4×4 grid

**Grouping rules:**
1. Groups must be **1, 2, 4, 8** cells (powers of 2)
2. Groups must be **rectangular**
3. Only **1s** (and X for don't care)
4. Make groups as **large as possible**
5. Groups can **overlap**
6. Groups can **wrap around** edges
7. Every **1 must be covered**

**Strategy**: Octets (8) → Quads (4) → Pairs (2) → Singles (1)

**What each group eliminates:**

| Size | Literals eliminated |
|------|-------------------|
| 2 (pair) | 1 |
| 4 (quad) | 2 |
| 8 (octet) | 3 |

---

## 6. Don't Care (X)

1. Treat X as **1** if it helps form a larger group with 1s
2. Treat X as **0** if NOT in any group
3. Never make a group of ONLY X values

---

## 7. Logic Gates

| Gate | Formula | Notes |
|------|---------|-------|
| AND | a·b | Both 1 → 1 |
| OR | a+b | Either 1 → 1 |
| NOT | a' | Invert |
| NAND | (ab)' | Universal gate |
| NOR | (a+b)' | Universal gate |
| XOR | a⊕b = ab'+a'b | Different → 1 |
| XNOR | (a⊕b)' = a'b'+ab | Same → 1 |

**De Morgan equivalents:**
- NAND = OR with inverted inputs: (ab)' = a'+b'
- NOR = AND with inverted inputs: (a+b)' = a'b'

---

## 8. Design Flow

```
Problem → Truth Table → K-Map → Simplified Boolean → Logic Circuit
```

**SOP circuit**: AND gates → OR gate
**POS circuit**: OR gates → AND gate
**NAND-only**: Convert SOP, replace AND→NAND, OR→NAND on inverted inputs

---

## 9. Common Proof Patterns

```
a + a'b = a + b           [expand a, factor, complement, identity]
a(a' + b) = ab            [distribute, complement, identity]
(a + b)' = a'b'           [De Morgan]
(ab)' = a' + b'           [De Morgan]
a + ab = a                [absorption — the quick simplifier]
```

---

## 10. Quick Conversion: Non-Canonical → Canonical SOP

```
f(x,y,z) = x + y'z
→ x = x(y+y') = xy+xy' = xy(z+z') + xy'(z+z') = xyz+xyz'+xy'z+xy'z'
→ y'z = y'z(x+x') = xy'z + x'y'z
→ f = x'y'z + xy'z' + xy'z + xyz' + xyz = Σ(1,4,5,6,7)
```

**Pattern**: For each term missing variable v, multiply by (v+v'), then expand.
