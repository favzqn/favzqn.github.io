---
title: "ClaimPro COBOL"
kind: 'Insurance claims batch processor · GnuCOBOL'
description: "Traditional enterprise COBOL batch application: fixed-width sequential files, copybooks, packed-decimal financial calculations, deterministic validation rules, and 63 automated checks"
image: "claimpro-report.png"
tech: ["COBOL", "GnuCOBOL", "Make", "Bash", "Shell testing"]
github: "https://github.com/favzqn/claimpro-cobol"
live: ""
featured: false
priority: 25
year: "2026"
role: 'Personal project · portfolio'
metrics:
  - { value: '63', label: 'automated checks' }
  - { value: '11', label: 'validation rules' }
  - { value: '6', label: 'linked COBOL programs' }
  - { value: '0', label: 'floating-point money' }
---

## The Problem

COBOL still runs a startling amount of the world's financial infrastructure — core banking, insurance claims, payment clearing — yet most developer portfolios never touch it. The usual COBOL "projects" online are hello-world exercises: a few `DISPLAY` statements, no files, no business rules, nothing that resembles how the language is actually used in batch processing.

Hiring managers for insurance and banking roles need to see something else: that a candidate can work with fixed-width record layouts, sequential file I/O and `FILE STATUS` codes, copybook reuse across programs, deterministic business-rule chains, and money arithmetic that never touches a floating-point register. Those are the skills that keep a claims batch job running at 2 a.m. without silently paying out the wrong amount.

## What I Built

ClaimPro COBOL is a complete batch claims processor for a fictional insurer, Nusantara Insurance, written entirely in COBOL and compiled with GnuCOBOL 3.2. Every night the job loads a policy master file, validates each incoming claim against its policy, approves or rejects it with a documented reason code, calculates payouts in exact decimal rupiah, and writes approved/rejected output files plus a summary report.

The batch is deterministic: the same input files always produce the same business results.

![Batch run against the 100-claim sample dataset, with the full summary report](/projects/claimpro-report.png)

**The processing flow:**

1. Parse command-line arguments (`--policies`, `--claims`, `--output`, `--help`) — in COBOL, no helper language
2. Load and validate 99-byte policy records into an `OCCURS` table (10,000-entry capacity, explicit overflow handling)
3. Read 101-byte claim records one at a time and run them through an eleven-rule validation chain
4. Calculate approved payouts: `claimed − deductible`, floored at zero, capped at coverage
5. Write `approved.dat` / `rejected.dat` and generate the batch summary report
6. Return a proper process exit code (0 success, 2 usage error, 8 fatal)

## Architecture

Six linked COBOL programs, one executable, seven copybooks:

```
claimpro-cobol/
├── src/
│   ├── main.cbl             CLI parsing, orchestration, exit codes
│   ├── load-policies.cbl    policy reader + load-time validation
│   ├── process-claims.cbl   claim validation / approval loop
│   ├── calc-payout.cbl      payout formula (called per claim)
│   ├── check-date.cbl       calendar date validation, leap years
│   └── generate-report.cbl  batch summary report
├── copybooks/               record layouts, policy table,
│                            batch summary, rejection codes
├── data/input/              sample dataset: 50 policies, 100 claims
├── tests/                   fixtures + 4 shell test suites
└── Makefile                 make build / test / run / clean
```

Programs exchange data through `CALL ... USING` with `LINKAGE SECTION` declarations: the main program owns the policy table and batch summary and passes them by reference to the loader, the claim processor, and the report generator. Business logic stays out of the orchestrator — the payout formula lives in its own ten-line program, date validation in another, so neither is duplicated when the loader and the claim processor both need them.

Files are `ORGANIZATION IS LINE SEQUENTIAL` with `FILE STATUS` checked on every open, read, and write. A malformed claim never kills the batch; a missing input file always does, with a nonzero exit code.

## Record layouts

Everything is documented at byte level so another developer can construct compatible input files. Amounts are stored as plain digits with an implied decimal point — the `V` in the PIC clause exists only inside the program:

**Policy master — 99 bytes:** policy number `X(12)`, customer id `X(10)`, name `X(30)`, type `X(10)`, coverage `9(9)V99`, deductible `9(7)V99`, start `X(8)`, expiry `X(8)`, status `X(1)`.

**Claim — 101 bytes:** claim id `X(12)`, policy number `X(12)`, claim date `X(8)`, incident date `X(8)`, type `X(10)`, claimed amount `9(9)V99`, description `X(40)`.

The approved output (111 bytes) carries the customer identity and the three money fields — claimed, deductible, approved payout — plus an `APPROVED` status; the rejected output (79 bytes) keeps the claim traceable with its rejection code and human-readable reason:

![Fixed-width approved and rejected output records, with record counts](/projects/claimpro-outputs.png)

## Business rules

The payout formula is deliberately boring, because insurance math should be:

```
PAYABLE = CLAIMED AMOUNT − DEDUCTIBLE
PAYABLE = max(PAYABLE, 0)           ← claim below deductible pays nothing
PAYABLE = min(PAYABLE, COVERAGE)    ← never exceeds the policy limit
```

Worked examples against a policy with Rp100,000,000 coverage and Rp2,000,000 deductible:

| Claimed | Result |
|---:|---|
| Rp20,000,000 | approved — payout Rp18,000,000 |
| Rp150,000,000 | rejected `R008` — exceeds coverage |
| Rp1,000,000 | approved — payout Rp0 (below deductible) |
| Rp100,000,000 | approved — payout Rp98,000,000 (equal to coverage) |

Eligibility runs as eleven guarded paragraphs in a fixed precedence order, so a claim with several problems still gets exactly one deterministic rejection code — policy existence, validity, active status, incident window, claim-vs-incident sequencing, then the coverage limit, after the record-level checks for dates, amounts, and duplicate claim ids. The full precedence table is documented in the README and in the source header of `process-claims.cbl`.

## Financial precision

Money never touches a floating-point register. Records carry `PIC 9(9)V99` display fields, in-memory totals and the payout result use `PIC S9(n)V99 COMP-3` packed decimal, and every value is integer cents — so `18,000,000.00` is exact by construction, with no rounding rule to get wrong. The calculator itself is a ten-line program with `COMPUTE ... ON SIZE ERROR` as the only safety net:

![The payout calculator: fixed-point subtraction, floor at zero, cap at coverage](/projects/claimpro-code.png)

## Error handling

Three failure classes with distinct behavior — the distinction matters in batch operations where one bad record must not abort a million-dollar run:

- **Business rejections** (R001–R011): the claim is written to `rejected.dat` with its code, the batch continues, exit code stays 0
- **Record errors**: malformed short lines are read into a spaces-initialized buffer and fail validation naturally — counted, rejected, never crash
- **Fatal errors**: missing input file, empty policy file, output directory that cannot be created, unexpected I/O status, table capacity exceeded → error message, all opened files closed, exit code 8. Missing arguments exit 2 with a usage message.

## Testing

The project is not "done" because it compiles. Four shell test suites run against deterministic fixtures — 10 policies and 17 claims chosen to hit every rejection code and every financial edge case:

![make test: four suites, 63 checks, all passing](/projects/claimpro-test.png)

What the suites verify:

- **Claim accounting** — every input claim appears in exactly one output, no id duplicated within a file, approved and rejected counts match the report
- **Rule mapping** — each fixture claim asserted against its exact rejection code (`CLM000000004 → R003`, `CLM000000008 → R008`, blank id → `R011`, …), including precedence: a duplicate with valid dates gets `R009`, a date-broken duplicate gets `R006` first
- **Financial invariants** — payout is never negative, always equals `max(0, claimed − deductible)` in cents, sums in `approved.dat` reconcile to the cent with the report's `TOTAL APPROVED PAYOUT`, and non-duplicate rejected claims never appear in approved output
- **File handling** — missing/empty policy file (fatal), missing/empty claims file (fatal vs. valid empty batch), missing output directory (fatal), argument validation, malformed short records (survivable)

The sample dataset generator is fully deterministic — no randomness anywhere — so `scripts/generate-data.sh` always reproduces the same 50 policies and 100 claims (50 approved, 50 rejected; every rejection code exercised by the test fixtures).

## Build

```bash
brew install gnucobol
make build && make test && make run
```

Compiles clean with `cobc -fformat=free -Wall` — zero warnings, free-format source throughout. Nothing but COBOL, a Makefile, and shell scripts: no second language performs any business logic.

## Result

- <mark>**63/63 automated checks passing**</mark> on GnuCOBOL 3.2, compiled warning-free
- **100-claim sample batch** splits 50/50 approved/rejected across all eleven rejection codes, Rp452,850,000.00 total payout, every figure reconciled between output files and report
- **Six programs, seven copybooks** — modular `CALL`/`LINKAGE` structure instead of one monolithic source file
- **Zero floating-point money** — `COMP-3` packed decimal and integer cents end to end

**Shows:** traditional COBOL batch development — sequential file processing, fixed-width layouts, copybooks, `OCCURS` tables, `SEARCH`/`SEARCH ALL`, `FILE STATUS` discipline, exact decimal financial arithmetic, deterministic business rules, and test automation around a compiled COBOL binary. The kind of job that runs unattended overnight and has to be right every time.

<sub>The repository is currently private; the case study screenshots are captured from real runs of the code.</sub>

