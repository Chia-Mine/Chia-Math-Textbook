---
title: Roadmap
sidebar_position: 5
---

# Roadmap

This textbook is an evolving guide to the mathematics needed to understand the
Chia blockchain.

Chapters may change through GitHub issues and pull requests as explanations,
sources, diagrams, and exercises improve.

## Completed MVP Parts

- Preface and study guidance
- Sets, functions, and proof methods
- Probability for cryptography
- Modular arithmetic
- Groups, rings, and fields
- Finite fields
- Elliptic curve group law
- Curves over finite fields
- Pairings
- BLS12-381 overview
- BLS signatures
- Unknown-order groups
- Class groups
- Wesolowski and n-Wesolowski overview
- Time-memory tradeoffs
- Beyond Hellman overview
- Chia proof of space overview
- Chia consensus overview
- Spend bundles and BLS overview

## Planned Deepening

The MVP chapters are intentionally first-pass explanations. Planned deepening
includes:

- worked solutions or answer sketches for selected exercises
- diagrams for elliptic curve addition and doubling
- more finite-field extension examples
- more careful subgroup and cofactor examples
- hash-to-curve chapter
- BLS aggregate verification examples
- CLVM basics
- coin and spend bundle validation details
- class group arithmetic details
- NUCOMP and NUDUPL overview
- plot internals and compression behavior
- plot filter and quality string details
- consensus validation and chain weight details

## Future Topics

Future chapters or appendices may include:

- hash-to-curve
- BLS ciphersuites and domain separation
- BLS proof-of-possession details
- class group arithmetic
- Wesolowski soundness assumptions
- n-Wesolowski implementation tradeoffs
- Chia plot internals
- proof retrieval internals
- CLVM and conditions
- AGG_SIG_ME message construction
- consensus validation
- wallet key derivation
- implementation security and side-channel notes

## Contributor Guidance

Good roadmap issues are small.

Prefer:

- one chapter section
- one mathematical correction
- one source addition
- one diagram request
- one exercise set

Avoid:

- rewriting many chapters at once
- adding unsourced Chia-specific claims
- mixing implementation details into beginner chapters without context

Use the issue templates when proposing new work.

## Current Review Needs

- Human mathematical review of all algebra and elliptic curve chapters
- Source review of Chia-specific implementation claims
- Diagram review for elliptic curve and proof-of-space explanations
- Exercise difficulty review for beginner accessibility
- Future source pass for exact Chia consensus parameters
