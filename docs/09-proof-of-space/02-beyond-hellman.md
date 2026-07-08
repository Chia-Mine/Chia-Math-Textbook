---
title: Beyond Hellman
sidebar_position: 2
---

# Beyond Hellman

## Goal

By the end of this chapter, you should understand the motivation behind the
Beyond Hellman construction, the function-graph intuition, why storing
information helps answer challenges, why recomputing should be expensive, and
how the construction influenced Chia proof of space.

This chapter is a simplified explanation. It is not a full proof of the
Beyond Hellman security theorem.

## Prerequisites

You should know:

- functions and function inversion
- probability basics
- hash-function intuition
- time-memory tradeoffs
- Hellman table intuition

## Motivation of the Beyond Hellman Construction

Hellman's classic time-memory tradeoff shows that precomputation can help
invert functions using less than a full lookup table. A proof-of-space
construction wants the opposite pressure: if a prover claims to store space,
then storing the intended data should be meaningfully better than recomputing
answers later.

The paper **Beyond Hellman's Time-Memory Trade-Offs with Applications to Proofs
of Space** studies functions with stronger inversion tradeoff behavior:
[ISTA record](https://research-explorer.ista.ac.at/record/559).

Chia's proof of space construction explicitly says it is based on Beyond
Hellman and extends the idea to a practical seven-table construction:
[Chia proof of space document](https://github.com/Chia-Network/proofofspace/blob/master/proof_of_space.md).

## Function Graphs

Think of a function:

$$
f : [N] \to [N]
$$

as a directed graph. Each input has one outgoing edge:

$$
x \to f(x)
$$

If you draw all inputs and outputs as nodes, the function defines a graph made
of arrows. Inverting the function means going backward from an output to some
input that points to it.

For a random-looking function, this graph can have many branches, collisions,
and chains.

Proof-of-space constructions use graph-like structure to make stored
information valuable.

## Proof of Space Intuition

A proof of space asks a prover to demonstrate that they stored a large amount
of data.

The challenge is that a prover might try to store less and recompute missing
data only when challenged.

The construction should make this strategy unattractive:

```text
honest prover: stores data -> answers quickly
cheating prover: stores less -> recomputes too slowly or fails often
```

Beyond Hellman-style constructions try to make the time-memory tradeoff worse
for the cheating prover than in simpler inversion settings.

## Compression Resistance Intuition

In this context, **compression resistance** means the plotted data should not
be easy to shrink while preserving the ability to answer challenges quickly.

This is not the same as general-purpose file compression. The attacker is not
only trying to zip the data. They are trying to keep just enough information to
reconstruct proofs on demand.

A good proof-of-space construction should make partial storage lead to painful
costs:

- more online time
- lower success probability
- more recomputation
- more random access

## Why Storing Information Helps Answer Challenges

Stored data acts like precomputed knowledge about a function graph.

When a challenge arrives, the prover can follow stored pointers or retrieve
stored values instead of recomputing them from scratch.

Toy example:

```text
challenge asks for a path endpoint
stored table contains the path pieces
prover returns the pieces quickly
verifier checks consistency
```

The verifier does not need to store the whole table. The verifier only checks
that the proof has the required relationships.

## Why Recomputation Should Be Expensive

If a prover can delete most stored data and rebuild it quickly, then the proof
does not really prove storage.

The construction should make recomputation expensive enough that the prover
misses the response window or loses too much success probability.

This is the central design pressure:

```text
less storage should imply much more time
```

The exact lower bounds are part of the formal paper. This chapter only gives
the intuition.

## How the Construction Inspired Chia Proof of Space

Chia's proof-of-space documentation says its practical construction is based on
Beyond Hellman, extends it from two to seven tables, and adds engineering
tweaks for Chia.

At a high level:

- plotting builds structured tables on disk
- farming answers challenges using the stored tables
- verification checks that the returned proof has the expected relationships
- storing less should make answering challenges less competitive

The seven-table structure belongs to the next chapter. For now, the important
idea is that Chia's proof of space is not just "store a big file." It is a
carefully structured time-memory tradeoff problem.

## Chia Connection

Chia documentation states that the proof-of-space construction is based on
Beyond Hellman, nested six times to create seven tables, with additional
heuristics:
[Proof of Space](https://docs.chia.net/chia-blockchain/consensus/proof-of-space-1.0/).

The `chiapos` repository is Chia's proof-of-space implementation library:
[Chia-Network/chiapos](https://github.com/chia-network/chiapos).

Later chapters will describe plots, the $k$ parameter, seven tables, matching
pairs, quality strings, and proof retrieval at a conceptual level.

## Common Pitfalls

**Thinking Beyond Hellman is just Hellman tables.** It is motivated by
Hellman-style tradeoffs but studies stronger proof-of-space behavior.

**Treating the simplified graph picture as the full construction.** Function
graphs are intuition; the paper has formal definitions and bounds.

**Assuming compression means ordinary file compression.** The relevant attack
is storing less while still answering challenges quickly.

**Ignoring online deadlines.** A recomputation attack only matters if it can
finish in time.

**Overstating Chia's construction as a direct copy.** Chia's proof of space is
based on Beyond Hellman but extends and modifies it for practicality.

## Exercises

1. Explain function inversion using the graph picture.
2. What does a stored table give an honest prover that a recomputing prover
   lacks?
3. In your own words, define compression resistance for proof of space.
4. Why is recomputation after the challenge dangerous for a proof-of-space
   protocol?
5. What does it mean for less storage to imply more time?
6. Name one way the Chia construction differs from the simplified explanation
   in this chapter.
7. Read the Chia proof-of-space source linked above. What does it say about
   Beyond Hellman and seven tables?
8. Why should this chapter not be treated as a full security proof?

## Further Reading

- [Beyond Hellman's Time-Memory Trade-Offs with Applications to Proofs of Space](https://research-explorer.ista.ac.at/record/559)
- [Chia Proof of Space documentation](https://docs.chia.net/chia-blockchain/consensus/proof-of-space-1.0/)
- [Chia proof_of_space.md](https://github.com/Chia-Network/proofofspace/blob/master/proof_of_space.md)
- [Chia-Network/chiapos](https://github.com/chia-network/chiapos)
- Previous chapter: Time-Memory Tradeoffs
