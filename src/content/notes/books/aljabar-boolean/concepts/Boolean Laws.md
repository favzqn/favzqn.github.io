---
type: concept
title: "Boolean Laws"
created: 2026-05-30
updated: 2026-05-30
tags:
  - mathematics
  - boolean-algebra
  - laws
  - exam-prep
status: developing
complexity: foundational
related:
  - "[[Boolean Algebra]]"
  - "[[Boolean Functions and Expressions]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Boolean Laws

The 11 fundamental laws of Boolean Algebra. These are the tools you use for algebraic simplification and proofs.

---

## Complete Reference Table

| # | Law | OR form | AND form |
|---|-----|---------|----------|
| 1 | **Identity** | a + 0 = a | a · 1 = a |
| 2 | **Idempotent** | a + a = a | a · a = a |
| 3 | **Complement** | a + a' = 1 | a · a' = 0 |
| 4 | **Dominance** | a + 1 = 1 | a · 0 = 0 |
| 5 | **Involution** | (a')' = a | — |
| 6 | **Absorption** | a + ab = a | a(a + b) = a |
| 7 | **Commutative** | a + b = b + a | ab = ba |
| 8 | **Associative** | a + (b + c) = (a+b)+c | a(bc) = (ab)c |
| 9 | **Distributive** | a + bc = (a+b)(a+c) | a(b + c) = ab + ac |
| 10 | **De Morgan** | (a + b)' = a'b' | (ab)' = a' + b' |
| 11 | **0/1 Law** | 0' = 1 | 1' = 0 |

---

## Laws You MUST Know Cold

### De Morgan's Laws (Most Tested)

> [!important] De Morgan — The "Flip and Complement" Rule
> - **(a + b)' = a' · b'** — complement of OR = AND of complements
> - **(a · b)' = a' + b'** — complement of AND = OR of complements
> 
> **Memory trick**: "Break the bar, change the sign"

### Absorption Laws

> [!important] Absorption — The Simplification Power Tool
> - **a + ab = a** — a "absorbs" the product
> - **a(a + b) = a** — a "absorbs" the sum
> 
> **Why it works**: a + ab = a(1 + b) = a · 1 = a

### Distributive Law (Note: dual form!)

> [!warning] Unlike regular algebra!
> - **a + bc = (a+b)(a+c)** — OR distributes over AND
> - **a(b + c) = ab + ac** — AND distributes over OR
> 
> In regular algebra, only multiplication distributes over addition. In Boolean algebra, BOTH distribute over each other.

---

## Proof Example

**Prove: a + a'b = a + b**

```
a + a'b
= (a + ab) + a'b    [Absorption: a = a + ab]
= a + (ab + a'b)    [Associative]
= a + (a + a')b     [Distributive]
= a + 1·b            [Complement: a + a' = 1]
= a + b              [Identity: 1·b = b]
```

**Prove: a(a' + b) = ab**

```
a(a' + b)
= aa' + ab           [Distributive]
= 0 + ab             [Complement: aa' = 0]
= ab                  [Identity: 0 + ab = ab]
```

---

## Exam Strategy

> [!tip] How to approach algebraic proofs
> 1. Look for absorption opportunities first (simplifies fast)
> 2. Use distributive law to factor or expand
> 3. Apply complement to eliminate terms
> 4. Use identity to clean up (a + 0 = a, a·1 = a)
> 5. De Morgan's for complement of complex expressions

---

## Cross-References

- [[Boolean Algebra]] — the axioms these laws derive from
- [[Canonical Forms SOP and POS]] — where distributive law is key
- [[Karnaugh Map]] — graphical alternative to algebraic simplification
- [[Logic Gates]] — De Morgan's gives you NAND/NOR equivalents
