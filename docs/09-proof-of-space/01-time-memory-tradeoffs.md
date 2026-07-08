---
title: Time-Memory Tradeoffs
sidebar_position: 1
---

# Time-Memory Tradeoffs

## Goal

By the end of this chapter, you should understand function inversion,
precomputation, online lookup, space-time tradeoffs, Hellman tables, rainbow
table intuition, and why these ideas matter for proof of space.

## Prerequisites

You should know:

- functions
- basic probability
- hash-function intuition
- arrays, maps, and lookup tables

## Motivation

Many problems can be solved either by computing on demand or by storing useful
information ahead of time. A **time-memory tradeoff** studies how much time can
be saved by spending memory, or how much memory can be saved by spending time.

Proofs of space are designed around this tension. Honest participants store
data. Attackers may try to store less and recompute missing information when
challenged. The protocol should make that recomputation too expensive.

## Function Inversion

Given a function:

$$
f : X \to Y
$$

**function inversion** asks: given an output $y$, find an input $x$ such that:

$$
f(x) = y
$$

Example:

Let:

$$
f(x) = x^2 \bmod 11
$$

If $y = 9$, then one valid preimage is:

$$
x = 3
$$

because:

$$
3^2 \equiv 9 \pmod {11}
$$

Another valid preimage is $8$, because:

$$
8^2 = 64 \equiv 9 \pmod {11}
$$

In cryptography, functions may be designed so inversion is hard without extra
stored information.

## Precomputation

**Precomputation** means doing work before you know the exact challenge.

Suppose a function maps small inputs to outputs:

| input | output |
| --- | --- |
| 0 | 4 |
| 1 | 7 |
| 2 | 3 |
| 3 | 9 |

If you store the reverse table:

| output | input |
| --- | --- |
| 4 | 0 |
| 7 | 1 |
| 3 | 2 |
| 9 | 3 |

then inverting a known output becomes a fast lookup.

The cost is memory. You stored extra data so future queries are cheap.

## Online Lookup

**Online lookup** is the work done after the challenge is known.

If you have a full reverse table, online lookup is fast:

```text
return table[y]
```

If you have no table, online lookup may require brute force:

```text
for x in X:
    if f(x) == y:
        return x
```

The first approach uses more memory and less time. The second uses less memory
and more time.

## Space-Time Tradeoffs

A **space-time tradeoff** lets you store some information, but not everything.
The goal is to reduce online time without storing a complete table.

For example, instead of storing every function value, you might store only
checkpoints. When challenged, you recompute from a nearby checkpoint.

This gives three rough strategies:

- store everything: fast lookup, high memory
- store nothing: slow lookup, low memory
- store checkpoints: medium lookup, medium memory

The interesting question is how good the middle strategy can be.

## Hellman Tables

Hellman tables are a classic time-memory tradeoff for inverting functions.

The rough idea is:

1. Start from many random inputs.
2. Repeatedly apply the function and a reduction step to make chains.
3. Store only the start and end of each chain.
4. During lookup, walk forward from the target to see whether it reaches a
   stored endpoint.
5. If it does, regenerate the chain from the start to find the preimage.

Toy chain:

```text
x0 -> x1 -> x2 -> x3 -> x4
```

Store only:

```text
(x0, x4)
```

This saves memory compared with storing every point in the chain, but lookup
may require recomputation.

## Rainbow Table Intuition

Rainbow tables improve on basic Hellman tables by using different reduction
functions at different chain positions.

The intuition is that this reduces chain merging. If two chains collide in a
plain Hellman table, they may follow the same path afterward. Rainbow tables
try to make the position in the chain matter.

This chapter does not need the full construction. The important idea is that
many attacks use precomputed structure to trade memory, time, and success
probability.

## Why Time-Memory Tradeoffs Matter for Proof of Space

A proof of space should reward stored space. If a prover can store only a tiny
amount and recompute answers quickly, the proof is weak.

The protocol designer wants:

- honest storage to answer challenges efficiently
- reduced storage to cause expensive recomputation
- cheating strategies to have low success probability or high cost

Time-memory tradeoff analysis asks whether a prover can use less storage and
still answer challenges fast enough.

## Honest Storage Versus Recomputation Attacks

An honest prover stores the data expected by the protocol.

A recomputation attacker stores less and tries to rebuild missing data after
seeing the challenge.

The attack succeeds if recomputation is fast enough to meet the protocol's
deadline. It fails if missing data takes too long to reconstruct.

This is why proofs of space are not just "large files." They are structured so
that the stored information is useful for answering unpredictable challenges.

## Chia Connection

Chia proof of space is built around the idea that farmers commit disk space in
plots and later answer challenges from stored data. A farmer who stores less
than the plot data should face a time-memory tradeoff.

Later chapters will discuss Beyond Hellman and Chia proof of space more
directly. For now, the key idea is:

```text
storage should save enough time that recomputation is not competitive
```

This chapter is conceptual. Exact Chia plotting tables, compression behavior,
and proof retrieval are later topics.

## Common Pitfalls

**Thinking memory only means RAM.** In proof-of-space settings, disk storage is
central.

**Ignoring online time.** Precomputation is only useful if the challenge can be
answered before the deadline.

**Assuming storing less always saves resources.** Less storage may require much
more computation.

**Confusing success probability with certainty.** Tradeoff attacks may work
only for some challenges.

**Treating Hellman tables as proof-of-space by themselves.** They are an
inversion tradeoff tool, not a complete proof-of-space construction.

## Exercises

1. Give an example of a function inversion problem over a small finite set.
2. What information does a full reverse table store?
3. Compare the online lookup time for full storage versus no storage.
4. In a chain `x0 -> x1 -> x2 -> x3`, what does storing only `(x0, x3)` save,
   and what does it cost?
5. Explain why chain merging can be a problem for Hellman tables.
6. What is the main intuition behind rainbow tables?
7. In your own words, explain why proof of space cares about recomputation
   time.
8. Give one example of an honest-storage strategy and one recomputation-attack
   strategy.
9. Why is a deadline important when evaluating a time-memory tradeoff attack?
10. Programming exercise: implement a tiny reverse table for a function on
    inputs $0$ through $99$, then compare lookup time with brute-force
    inversion.

## Further Reading

- Later chapter: Beyond Hellman
- Later chapter: Chia Proof of Space
- Introductory references on Hellman time-memory tradeoffs and rainbow tables
