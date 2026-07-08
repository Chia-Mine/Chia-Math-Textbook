---
title: Chia Proof of Space
sidebar_position: 3
---

# Chia Proof of Space

## Goal

By the end of this chapter, you should understand the high-level shape of Chia
proof of space: plots, the $k$ parameter, plotting versus farming, seven
tables, functions $f_1$ through $f_7$, matching pairs, backpointers, quality
strings, plot filters, proof retrieval, and verification.

This is a conceptual chapter. It intentionally leaves low-level implementation
details for future work.

## Prerequisites

You should know:

- probability and hash-function intuition
- time-memory tradeoffs
- Beyond Hellman
- basic proof-of-space motivation

## What a Plot Is

A **plot** is a file that stores structured proof-of-space data. The farmer
creates the plot ahead of time during plotting, then keeps it on disk for
farming.

The plot is not arbitrary random data. It is organized so that, for some
challenges, the farmer can retrieve a proof efficiently.

Chia's proof-of-space documentation describes the construction as based on
Beyond Hellman and extended to seven tables:
[Proof of Space](https://docs.chia.net/chia-blockchain/consensus/proof-of-space-1.0/).

## The $k$ Parameter

The $k$ parameter controls plot size and the size of the proof search space.

At a high level, larger $k$ means larger plots. Chia documentation gives the
plot size formula and notes a minimum $k$ value for current practical use. Those
values are implementation and network-policy details, so they should be checked
against current Chia documentation before relying on them.

For this chapter, remember:

```text
k larger -> plot larger -> more stored space
```

## Plotting Versus Farming

**Plotting** is the up-front process of generating the plot file.

**Farming** is the ongoing process of using stored plots to answer challenges.

Plotting can be compute- and I/O-heavy. Farming should be much lighter: the
farmer checks whether a plot might contain a useful proof, then retrieves proof
data if it does.

This separation is central:

```text
plot once -> store -> farm many challenges
```

## Seven Tables

Chia proof of space uses seven tables. The construction is based on nested
Beyond Hellman-style ideas, with functions and matching relationships between
tables.

Conceptually:

```text
Table 1 -> Table 2 -> Table 3 -> Table 4 -> Table 5 -> Table 6 -> Table 7
```

Each later table summarizes or combines information from earlier tables.

The exact table formats, sorting passes, compression, and disk layout are
implementation topics. The important idea is that the final proof can be traced
back through the tables to original values.

## $f_1$ Through $f_7$, Conceptually

The functions $f_1$ through $f_7$ produce values used to build and connect the
tables.

At a high level:

- $f_1$ starts from initial inputs
- later functions combine matched pairs from previous tables
- the process creates structured relationships that can be verified later

Do not think of these functions as seven unrelated hashes. They are part of a
carefully arranged proof-of-space construction.

TODO: Future expansion should walk through the exact function definitions from
the Chia proof-of-space construction document.

## Matching Pairs

Tables are built by finding pairs of entries that satisfy matching conditions.

Conceptually:

```text
entry A matches entry B
-> combine them
-> create an entry in the next table
```

The matching rules are designed so the stored structure is useful for producing
valid proofs, while recomputing missing pieces should be costly.

## Backpointers

A later table entry needs to be traceable to earlier entries. **Backpointers**
store enough information to reconstruct that path.

Think of a table entry as saying:

```text
I was made from these earlier entries.
```

When retrieving a proof, the farmer follows backpointers from a high-level
entry down to the original values that make up the proof.

## Quality Strings

A **quality string** is derived from a proof and challenge. It helps determine
whether the proof is good enough to compete for a block or other consensus
role.

The exact quality-string derivation is a Chia-specific detail. Conceptually,
quality turns a valid proof into a value that can be compared against
difficulty and challenge requirements.

TODO: Future expansion should cite and explain the exact quality-string
derivation from the Chia proof-of-space specification.

## Plot Filter

A plot filter lets a farmer quickly decide whether a plot should be searched
more deeply for a given challenge.

The filter saves work. Most plots should be skipped for most challenges. Only
plots passing the filter need more expensive lookup.

The exact filter rule can change across protocol versions, so this chapter
keeps the description conceptual.

## Proof Retrieval

Proof retrieval follows the stored structure backward.

High-level flow:

```text
challenge arrives
-> check plot filter
-> find candidate table entries
-> follow backpointers
-> recover original proof values
-> return proof
```

The farmer's advantage comes from having the plot data already stored. A
recomputing attacker would need to rebuild enough of this structure quickly.

## Verification

The verifier checks that the proof values satisfy the expected relationships.

Verification should be much cheaper than generating the plot. The verifier does
not store the farmer's plot; it only checks a submitted proof against the
challenge and public rules.

At a high level:

```text
proof + challenge + plot id
-> recompute/check relationships
-> derive quality
-> accept or reject
```

## Chia-Specific Source Notes

Primary references for this chapter include:

- [Chia Proof of Space documentation](https://docs.chia.net/chia-blockchain/consensus/proof-of-space-1.0/)
- [Chia proof_of_space.md](https://github.com/Chia-Network/proofofspace/blob/master/proof_of_space.md)
- [Chia-Network/chiapos](https://github.com/chia-network/chiapos)
- [Chia Proof of Space Construction PDF](https://www.chia.net/wp-content/uploads/2023/01/proof_of_space.pdf)

Implementation details should be checked against the current repository and
specification, especially for plot format, filter behavior, and consensus
parameters.

## Common Pitfalls

**Thinking a plot stores useful user data.** A Chia plot stores proof-of-space
data, not user files.

**Confusing plotting and farming.** Plotting creates the stored structure;
farming uses it.

**Assuming seven tables are arbitrary.** They come from the construction's
nested matching structure.

**Treating this chapter as an implementation guide.** It is conceptual. The
exact algorithms belong in the specification and source code.

**Ignoring time-memory attacks.** The point is not only to store data, but to
make storing data more competitive than recomputing it.

**Assuming parameters never change.** Network policy and implementation details
can evolve.

## Exercises

1. Explain the difference between plotting and farming.
2. What does the $k$ parameter control at a high level?
3. Why are backpointers useful during proof retrieval?
4. What is the purpose of a plot filter?
5. In your own words, explain why proof retrieval should be faster for an
   honest farmer than for a recomputing attacker.
6. What does a verifier need to check, conceptually?
7. Read one linked source and identify one detail this chapter intentionally
   leaves as TODO.
8. Why is it important to distinguish conceptual proof-of-space ideas from
   Chia's exact implementation?
9. Chia-connection exercise: explain why a plot filter is useful for a farmer
   with many plots, and what would become more expensive if there were no
   filter.

## Further Reading

- [Chia Proof of Space documentation](https://docs.chia.net/chia-blockchain/consensus/proof-of-space-1.0/)
- [Chia proof_of_space.md](https://github.com/Chia-Network/proofofspace/blob/master/proof_of_space.md)
- [Chia-Network/chiapos](https://github.com/chia-network/chiapos)
- Previous chapter: Beyond Hellman
