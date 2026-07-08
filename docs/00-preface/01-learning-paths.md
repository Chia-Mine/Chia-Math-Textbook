---
title: Learning Paths
sidebar_position: 2
---

# Learning Paths

## Goal

This page gives short routes through the textbook for readers who want to
understand a specific part of Chia without reading every chapter first.

Skipping is allowed, but skip responsibly: when notation starts to feel opaque,
follow the prerequisite link backward.

## BLS Signatures in Chia

Shortest path:

```text
sets, functions, and proofs
-> modular arithmetic
-> groups
-> rings and fields
-> finite fields
-> elliptic curve group law
-> curves over finite fields
-> pairings
-> BLS12-381
-> BLS signatures
-> spend bundles and BLS
```

This path explains how Chia can aggregate many signature requirements into one
aggregate BLS signature in a spend bundle.

## BLS12-381

Shortest path:

```text
modular arithmetic
-> groups
-> rings and fields
-> finite fields
-> elliptic curve group law
-> curves over finite fields
-> pairings
-> BLS12-381
```

This path is for understanding the curve and field setting itself, before
focusing on signatures.

## VDFs and n-Wesolowski

Shortest path:

```text
modular arithmetic
-> groups
-> unknown-order groups
-> class groups
-> Wesolowski VDF
-> n-Wesolowski
```

This path explains why repeated squaring in an unknown-order group can act as a
delay and how proof generation/verification tradeoffs enter Chia proof of
time.

## Proof of Space and Beyond Hellman

Shortest path:

```text
probability for cryptography
-> time-memory tradeoffs
-> Beyond Hellman
-> Chia Proof of Space
```

This path focuses on why storage helps answer challenges and why recomputation
should be expensive.

## Chia Consensus as a Whole

Shortest path:

```text
Chia Proof of Space
-> Wesolowski VDF
-> n-Wesolowski
-> BLS signatures
-> Chia consensus overview
-> spend bundles and BLS
```

This path gives a system-level view: storage creates eligibility, VDFs pace
time, signatures authenticate data, and full nodes validate the result.

## How to Skip Ahead Responsibly

When skipping ahead:

- read the chapter goal and prerequisites first
- stop when a definition appears that you cannot paraphrase
- follow only the missing prerequisite, not the entire book
- treat Chia-specific implementation claims as source-dependent
- use exercises as a quick test before continuing

If a formula has too many unfamiliar symbols, identify the objects first, then
the operation, then the claim.

## Exercise

Choose one learning path and write down the first chapter where you expect to
slow down. Explain which prerequisite you would review if that happens.
