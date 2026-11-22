---
type: concept
title: "Logic Circuit Design"
created: 2026-05-30
updated: 2026-05-30
tags:
  - digital-circuits
  - logic-design
  - boolean-algebra
  - hardware
  - exam-prep
status: developing
complexity: advanced
related:
  - "[[Logic Gates]]"
  - "[[Karnaugh Map]]"
  - "[[Canonical Forms SOP and POS]]"
  - "[[Don't Care Conditions]]"
  - "[[Boolean Functions and Expressions]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Logic Circuit Design

The process of converting a problem specification into a physical digital circuit using Boolean algebra and logic gates.

---

## Design Flow

```
Problem → Truth Table → K-Map → Simplified Boolean → Logic Circuit
```

1. **Define inputs and outputs** — what are the variables?
2. **Build truth table** — list all input/output combinations
3. **Write Boolean function** — from truth table (SOP or POS)
4. **Simplify** — using K-Map or algebraic methods
5. **Draw circuit** — using logic gates

---

## Example 1: Majority Gate

**Problem**: Output = 1 if majority of 3 inputs are 1.

**Truth Table**:
| x | y | z | f |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

**K-Map**:
```
        yz
        00   01   11   10
    ┌────┬────┬────┬────┐
x 0 │  0 │  0 │  1 │  0 │
    ├────┼────┼────┼────┤
  1 │  0 │  1 │  1 │  1 │
    └────┴────┴────┴────┘
```

**Groups**: yz + xy + xz

**Circuit**: Three AND gates feeding into one OR gate
```
x──┤AND├──┐
y──┘     ├──┤OR├── f
y──┤AND├──┘
z──┘
x──┤AND├──┘
z──┘
```

---

## Example 2: Even Number Detector

**Problem**: Output = 1 if 4-bit decimal number is even.

**Key insight**: A binary number is even iff its least significant bit is 0.

**Solution**: f(a₀,a₁,a₂,a₃) = a₃'

**Circuit**: Single NOT gate! (with don't care for 10–15)

---

## Example 3: Half Adder

**Problem**: Add two 1-bit numbers. Outputs: SUM and CARRY.

| x | y | SUM | CARRY |
|---|---|-----|-------|
| 0 | 0 | 0   | 0     |
| 0 | 1 | 1   | 0     |
| 1 | 0 | 1   | 0     |
| 1 | 1 | 0   | 1     |

- **SUM = x ⊕ y** (XOR) = xy' + x'y
- **CARRY = xy** (AND)

---

## Example 4: 2-Bit Comparator (A > B)

**Problem**: Output = 1 if 2-bit number A > 2-bit number B.

Inputs: a₁a₂ (A), b₁b₂ (B)

**K-Map gives**: f(a₁,a₂,b₁,b₂) = a₁b₁' + a₂b₁'b₂' + a₁a₂b₂'

**NAND-only implementation** (using De Morgan):
```
f = ((a₁b₁')' · (a₂b₁'b₂')' · (a₁a₂b₂')')'
```
Each term uses NAND gates, final output uses NAND of NANDs.

---

## SOP vs POS Circuit Structure

| Form | Circuit Structure |
|------|-------------------|
| SOP | AND gates → OR gate (Sum of Products) |
| POS | OR gates → AND gate (Product of Sums) |

---

## NAND-Only Implementation

Any circuit can be converted to use only NAND gates:

1. Get simplified SOP expression
2. Replace each AND with NAND + NOT
3. Replace the final OR with NAND + NOT on each input
4. Cancel double NOTs

**Result**: All gates are NAND. This is important for manufacturing (fewer gate types = cheaper ICs).

---

## Cross-References

- [[Logic Gates]] — the building blocks
- [[Karnaugh Map]] — simplification tool
- [[Canonical Forms SOP and POS]] — starting point for circuit design
- [[Don't Care Conditions]] — simplification with impossible inputs
- [[Boolean Functions and Expressions]] — the mathematical representation
- [[Boolean Laws]] — De Morgan's for NAND/NOR conversion
