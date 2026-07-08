---
title: How to Read This Book
sidebar_position: 1
---

# How to Read This Book

## Goal

By the end of this chapter, you should understand what this textbook is for,
how the chapters depend on each other, and how to study the material without
already knowing abstract algebra or cryptography.

You should also be able to tell when the book is giving intuition, when it is
stating formal mathematics, and when it is discussing implementation details
that must be checked against Chia source code, specifications, or other primary
references.

## Prerequisites

You do not need prior training in abstract algebra, elliptic curves, pairings,
or cryptography.

You should be comfortable with:

- reading code or pseudocode
- basic arithmetic and algebra
- the idea of a function that takes inputs and returns outputs
- being patient with definitions that become useful later

If you have programmed with hashes, signatures, blockchains, or databases, that
experience will help. It is not required.

## Motivation

Chia uses several mathematical ideas that are simple to name but hard to
understand deeply from names alone: proof of space, proof of time, BLS
signatures, finite fields, elliptic curves, class groups, and verifiable delay
functions.

This book is meant to build a path into those ideas from first principles. The
goal is not to memorize formulas. The goal is to understand why the formulas
exist, what problems they solve, and where the simplified explanation stops.

The book starts with basic math because advanced cryptographic objects are made
from smaller pieces. For example, a pairing formula such as
$e(aP, bQ) = e(P, Q)^{ab}$ only becomes meaningful after you know what groups,
exponents, elliptic curve points, and finite fields are doing. Starting earlier
prevents the later chapters from becoming a wall of notation.

## What This Textbook Leads To

The long-term destination is a mathematical understanding of the Chia
blockchain. The path eventually leads to:

- proof techniques and modular arithmetic
- probability and time-memory tradeoffs
- groups, rings, fields, and finite fields
- elliptic curves and pairings
- BLS12-381 and BLS signatures
- unknown-order groups and class groups
- Wesolowski-style verifiable delay functions
- Chia proof of space and proof of time
- consensus, CLVM, coins, and spend bundles
- implementation and security boundaries

Not every chapter will be equally formal. Some chapters are foundations. Some
are bridges from math to protocol ideas. Some are reminders that real systems
have edge cases that do not appear in a clean blackboard model.

## Suggested Study Paths

You can read the book straight through, but you do not have to. Use the path
that matches your goal.

For BLS signatures and spend bundles:

```text
proofs
-> modular arithmetic
-> groups
-> fields
-> finite fields
-> elliptic curves
-> pairings
-> BLS12-381
-> BLS signatures
-> aggregation
-> Chia spend bundles
```

For VDFs and proof of time:

```text
modular arithmetic
-> groups
-> exponentiation
-> unknown-order groups
-> class groups
-> repeated squaring
-> Wesolowski proofs
-> Chia proof of time
```

For proof of space:

```text
algorithms
-> probability
-> hash functions
-> function inversion
-> time-memory tradeoffs
-> Beyond Hellman
-> Chia plotting
-> Chia farming proofs
```

For the whole Chia system:

```text
proof of space
-> proof of time
-> consensus chains
-> blocks and sub-slots
-> BLS signatures
-> CLVM
-> coin set model
-> spend bundles
-> full node validation
```

These paths are dependency maps, not strict schedules. If a chapter feels too
abstract, skip ahead to see why the idea matters, then come back.

## How to Read Formulas

Formulas are compressed language. Read them slowly.

When you see inline math such as $a \cdot b$, first ask:

- What kind of objects are $a$ and $b$?
- What operation does $\cdot$ mean here?
- Does the operation behave like ordinary multiplication, or is it only using
  similar notation?

When you see display math, read it as a sentence. For example:

$$
e(aP, bQ) = e(P, Q)^{ab}
$$

One useful first reading is: applying the pairing after scaling the inputs by
$a$ and $b$ matches applying the pairing first and then raising the result to
$ab$. That is intuition, not a full definition of pairings. Later chapters will
define the objects more carefully.

If a formula has too many unfamiliar symbols, do not try to understand all of
them at once. Identify the nouns first, then the operations, then the claim.

## Intuition, Formal Math, and Implementation Details

This book uses three different modes of explanation.

**Intuition** explains the shape of an idea before the details are complete. It
may use analogies, small examples, or informal language. Intuition is useful,
but it is not a proof.

**Formal math** gives definitions, propositions, and arguments with precise
conditions. Formal statements are where hidden assumptions matter. If a theorem
says an operation works in a group, you should ask which group and which
operation.

**Implementation details** describe what software must actually do. These
details can depend on serialization formats, consensus rules, edge cases,
network upgrades, or exact constants. Chia-specific implementation claims
should be checked against primary sources such as Chia documentation, Chia
Network repositories, specifications, or relevant papers.

When studying, keep a small note beside each concept:

- intuition: what problem is this idea trying to solve?
- formal: what is the exact definition?
- implementation: where does the real system use it?

## How to Use Exercises

Exercises are not only tests. They are part of the explanation.

Use them in three passes:

1. Try the exercise without looking ahead.
2. Write down where you got stuck.
3. Return to the definition and identify which word or condition mattered.

For programming-oriented exercises, prefer tiny experiments. A ten-line script
that checks a modular arithmetic identity for small numbers can make an
abstract rule feel concrete.

For proof exercises, do not aim for elegance at first. A correct explanation in
plain language is a good start. Later, compress it into mathematical notation.

## How to Use Codex or GitHub While Studying

Codex, GitHub, and source repositories can help, but use them carefully.

Good uses include:

- asking for a simpler example of a definition
- asking which prerequisite chapter to review
- turning a small formula into a short program
- comparing a textbook explanation with a linked source
- finding where a term appears in the repository

Risky uses include:

- accepting a cryptographic claim without a source
- treating generated code as a security reference
- assuming a simplified explanation matches consensus behavior
- skipping the definitions because a summary sounds plausible

When you use GitHub, read code with a narrow question. For example, ask "Where
is this value serialized?" or "Which function checks this condition?" rather
than "How does all of consensus work?" Narrow questions make source code less
overwhelming.

## Common Pitfalls

Do not treat familiar notation as familiar meaning. In this book, $+$ might be
an elliptic curve group operation, and multiplication might mean repeated
application of an abstract operation.

Do not confuse a toy example with the real protocol. Small numbers are useful
for learning, but real cryptographic parameters are chosen for security,
interoperability, and implementation constraints.

Do not expect every chapter to immediately mention Chia. Some foundations are
included because later Chia-specific ideas need them.

## Exercises

1. Pick one destination from the study paths above. Write down the first three
   prerequisites you think you need and why.
2. In your own words, explain the difference between intuition and a formal
   proof.
3. Find a formula in this chapter. Identify the objects, the operations, and
   the claim being made.
4. Write one GitHub or Codex question that is narrow enough to be useful while
   studying a protocol detail.
5. Give an example of an implementation detail that should not be trusted
   without checking a primary source.

## Further Reading

These references will be filled in as the relevant chapters are written:

- Chia documentation
- Chia Network GitHub repositories
- Chia consensus and protocol specifications
- original papers on BLS signatures
- references on BLS12-381 and pairing-friendly curves
- papers on verifiable delay functions
- papers and documentation related to Chia proof of space
