---
type: concept
title: "Logic Gates"
created: 2026-05-30
updated: 2026-05-30
tags:
  - digital-circuits
  - logic-gates
  - boolean-algebra
  - hardware
  - exam-prep
status: developing
complexity: foundational
related:
  - "[[Boolean Algebra]]"
  - "[[Boolean Laws]]"
  - "[[Logic Circuit Design]]"
sources:
  - "[[Aljabar Boolean]]"
---

# Logic Gates

Physical implementations of Boolean operators. Every Boolean expression maps directly to a circuit of logic gates.

---

## Basic Gates

| Gate | Symbol | Boolean | Truth Table |
|------|--------|---------|-------------|
| **AND** | · | a · b | 1 only when BOTH inputs are 1 |
| **OR** | + | a + b | 1 when AT LEAST ONE input is 1 |
| **NOT** | ' | a' | Inverts: 0→1, 1→0 |

---

## Derived Gates

| Gate | Formula | Equivalent | Meaning |
|------|---------|------------|---------|
| **NAND** | (ab)' | NOT of AND | 0 only when BOTH are 1 |
| **NOR** | (a+b)' | NOT of OR | 1 only when BOTH are 0 |
| **XOR** | a ⊕ b | ab' + a'b | 1 when inputs DIFFER |
| **XNOR** | (a ⊕ b)' | a'b' + ab | 1 when inputs are SAME |

---

## De Morgan Equivalents

Using De Morgan's laws, we can build equivalent circuits:

> [!important] NAND = OR with inverted inputs
> **(ab)' = a' + b'** — NAND gate ≡ OR gate with NOT on each input

> [!important] NOR = AND with inverted inputs  
> **(a+b)' = a'b'** — NOR gate ≡ AND gate with NOT on each input

This is critical for circuit design — you can implement ANY function using only NAND gates or only NOR gates.

---

## Universal Gates

**NAND** and **NOR** are called **universal gates** because:
- Any Boolean function can be implemented using only NAND gates
- Any Boolean function can be implemented using only NOR gates
- AND, OR, and NOT can all be built from NAND or NOR alone

---

## Cross-References

- [[Boolean Algebra]] — the math behind gates
- [[Boolean Laws]] — De Morgan's gives NAND/NOR equivalents
- [[Logic Circuit Design]] — combining gates into functional circuits
- [[Canonical Forms SOP and POS]] — SOP → AND-OR circuit, POS → OR-AND circuit
