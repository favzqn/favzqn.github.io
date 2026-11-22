---
type: concept
title: "Karnaugh Map"
created: 2026-05-30
updated: 2026-05-30
tags:
  - mathematics
  - boolean-algebra
  - karnaugh-map
  - k-map
  - simplification
  - exam-prep
status: developing
complexity: intermediate
related:
  - "[[Minterms and Maxterms]]"
  - "[[Canonical Forms SOP and POS]]"
  - "[[Don't Care Conditions]]"
  - "[[Boolean Laws]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Karnaugh Map (K-Map)

A graphical method for simplifying Boolean functions. Invented by Maurice Karnaugh in 1953. Each cell represents one minterm. Adjacent cells differ by exactly one literal.

---

## K-Map Structure

### 2 Variables (x, y)
```
        y
        0    1
    ┌────┬────┐
x 0 │ m₀ │ m₁ │  x'y'  x'y
    ├────┼────┤
  1 │ m₂ │ m₃ │  xy'   xy
    └────┴────┘
```

### 3 Variables (x, y, z)
```
        yz
        00   01   11   10
    ┌────┬────┬────┬────┐
x 0 │ m₀ │ m₁ │ m₃ │ m₂ │  x'y'z' x'y'z x'yz x'yz'
    ├────┼────┼────┼────┤
  1 │ m₄ │ m₅ │ m₇ │ m₆ │  xy'z'  xy'z  xyz  xyz'
    └────┴────┴────┴────┘
```

> [!warning] Gray Code Order!
> Columns are NOT 00, 01, 10, 11. They are **00, 01, 11, 10** (Gray code — only 1 bit changes between adjacent columns). This is what makes adjacent cells differ by 1 literal.

### 4 Variables (w, x, y, z)
```
        yz
        00   01   11   10
    ┌────┬────┬────┬────┐
wx 00│ m₀ │ m₁ │ m₃ │ m₂ │
    ├────┼────┼────┼────┤
   01│ m₄ │ m₅ │ m₇ │ m₆ │
    ├────┼────┼────┼────┤
   11│m₁₂ │m₁₃ │m₁₅ │m₁₄ │
    ├────┼────┼────┼────┤
   10│ m₈ │ m₉ │m₁₁ │m₁₀ │
    └────┴────┴────┴────┘
```

---

## How to Fill the K-Map

1. Place 1 in cells corresponding to minterms where f = 1
2. Place 0 in all other cells
3. For don't care conditions, place X

**Example**: f(x,y,z) = x'yz' + xyz' + xyz
- x'yz' = m₂ → place 1 at (0, 10)
- xyz' = m₆ → place 1 at (1, 10)
- xyz = m₇ → place 1 at (1, 11)

---

## Simplification Rules

> [!important] Grouping Rules
> 1. Groups must contain **1, 2, 4, 8, ...** cells (powers of 2)
> 2. Groups must be **rectangular** (squares or rectangles)
> 3. Groups must contain only **1s** (and X if don't care)
> 4. Groups should be as **large as possible**
> 5. Groups can **overlap**
> 6. Groups can **wrap around** edges (top-bottom, left-right)
> 7. Every 1 must be covered by at least one group

### What Each Group Size Eliminates

| Group Size | Cells | Literals Eliminated | Result |
|------------|-------|---------------------|--------|
| 1 (single) | 1 | 0 | Full term (no simplification) |
| 2 (pair) | 2 | 1 | One fewer literal |
| 4 (quad) | 4 | 2 | Two fewer literals |
| 8 (octet) | 8 | 3 | Three fewer literals |

---

## Step-by-Step Strategy

> [!tip] EXAM STRATEGY — Follow this order
> 1. **Find octets** (groups of 8) first — they eliminate the most
> 2. **Find quads** (groups of 4) next
> 3. **Find pairs** (groups of 2) last
> 4. **Cover any remaining 1s** with singles if needed
> 5. **Never use a smaller group** if a larger one is possible

---

## Example 1: 3-Variable Simplification

**Simplify f(x,y,z) = x'yz + xy'z' + xyz + xyz'**

K-Map:
```
        yz
        00   01   11   10
    ┌────┬────┬────┬────┐
x 0 │  0 │  0 │  1 │  1 │  ← m₂, m₃
    ├────┼────┼────┼────┤
  1 │  1 │  0 │  1 │  1 │  ← m₄, m₆, m₇
    └────┴────┴────┴────┘
```

Groups:
- Quad: m₂, m₃, m₆, m₇ → **y** (eliminates x and z)
- Single: m₄ → **xy'z'**

Wait, let me re-examine:
- m₃ (x'yz) and m₇ (xyz) are adjacent → pair eliminates x → yz
- m₆ (xyz') and m₂ (x'yz') are adjacent → pair eliminates x → yz'
- m₇ (xyz) and m₆ (xyz') are adjacent → pair eliminates z → xy
- m₄ (xy'z') and m₆ (xyz') are adjacent → pair eliminates y → xz'

Actually: **f(x,y,z) = yz + xz'** (two quads that overlap)

---

## Example 2: 4-Variable Simplification

**Simplify f(w,x,y,z) = Σ(0,1,2,4,5,6,8,9,12,13,14)**

K-Map:
```
        yz
        00   01   11   10
    ┌────┬────┬────┬────┐
wx 00│  1 │  1 │  0 │  1 │
    ├────┼────┼────┼────┤
   01│  1 │  1 │  0 │  1 │
    ├────┼────┼────┼────┤
   11│  1 │  1 │  0 │  1 │
    ├────┼────┼────┼────┤
   10│  1 │  1 │  0 │  0 │
    └────┴────┴────┴────┘
```

Groups:
- Octet: m₀,m₁,m₄,m₅,m₈,m₉,m₁₂,m₁₃ → **y'** (all in columns 00,01)
- Quad: m₀,m₂,m₄,m₆ → **w'z'** (wraps around)
- Quad: m₄,m₆,m₁₂,m₁₄ → **xz'**

**Result: f(w,x,y,z) = y' + w'z' + xz'**

---

## Wrapping Around

K-Maps wrap! The leftmost and rightmost columns are adjacent. The top and bottom rows are adjacent.

```
This pair wraps horizontally:
┌────┬────┬────┬────┐
│ 1  │    │    │  1 │  ← m₀ and m₂ are adjacent!
└────┴────┴────┴────┘
```

---

## Cross-References

- [[Minterms and Maxterms]] — each K-Map cell = one minterm
- [[Canonical Forms SOP and POS]] — K-Map gives simplified SOP or POS
- [[Don't Care Conditions]] — X values in K-Map
- [[Boolean Laws]] — algebraic alternative to K-Map
- [[Logic Circuit Design]] — simplified function → simpler circuit
