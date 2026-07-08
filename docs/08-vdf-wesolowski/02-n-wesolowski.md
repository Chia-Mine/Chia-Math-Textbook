---
title: n-Wesolowski
sidebar_position: 2
---

# n-Wesolowski

## Goal

By the end of this chapter, you should understand why n-Wesolowski proofs
exist, how splitting a long delay into phases changes proof generation and
verification tradeoffs, and how this relates to Chia proof of time.

This is a first operational explanation. It does not replace the implementation
notes in Chia's VDF repositories.

## Prerequisites

You should know:

- repeated squaring
- unknown-order groups
- the basic Wesolowski proof equation
- why verification should be faster than recomputation

## Motivation for n-Wesolowski

A simple Wesolowski proof can be compact and quick to verify, but generating it
for a long delay can require extra work after the evaluator reaches the final
VDF output.

Operationally, that matters. A blockchain system does not only care that a
proof exists. It cares when the proof is ready, how much parallel work can be
used, how large the proof is, and how fast nodes can verify it.

n-Wesolowski is a variation that trades proof size and verification work for
faster proof availability.

Chia's VDF implementation repository discusses generating n-Wesolowski proofs
from finished segments:
[Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf).

## Splitting a Long Delay Into Phases

Suppose the full delay is $T$ squarings:

$$
y = x^{2^T}
$$

Instead of treating the whole delay as one segment, split it into smaller
segments:

```text
x0 -> x1 -> x2 -> ... -> xn
```

Each arrow represents a shorter repeated-squaring interval.

For example, if:

$$
T = T_1 + T_2 + T_3
$$

then:

$$
x_1 = x_0^{2^{T_1}}
$$

$$
x_2 = x_1^{2^{T_2}}
$$

$$
x_3 = x_2^{2^{T_3}}
$$

and $x_3$ is the final output.

Each segment can have its own proof.

## Proof Generation Tradeoffs

The simple goal is: have proofs ready soon after the main VDF output is ready.

Segmenting helps because auxiliary workers can prepare proofs for completed
segments while the main repeated-squaring loop continues.

The tradeoff is that the final proof may contain more than one group element
or require more verification work. You are buying faster proof generation with
larger proof material and extra verification steps.

This is an engineering tradeoff, not a change to the basic idea of repeated
squaring.

## Verification Tradeoffs

A single Wesolowski proof may be very compact. An n-Wesolowski proof can be
larger because it represents multiple segments.

The verifier may need to check several proof equations, one for each segment
or for a composed segment structure.

So the tradeoff is:

- faster proof availability for the prover
- more proof data
- more verification work

This can still be worthwhile if the alternative is waiting too long for one
compact proof.

## Why Larger Proofs Can Be Useful Operationally

In a live system, latency matters. If a proof arrives too late, the system may
not be able to use the VDF output when it needs it.

Larger proofs can be useful if they are ready sooner.

Think of it like caching intermediate work. The main VDF loop keeps producing
the sequential result, while other workers prepare proof segments in parallel.
When the final output is needed, the system can assemble proof material from
segments that are already finished.

## Why Smaller Proofs May Replace Them Later

If there is enough time after the VDF output is known, or if proof generation
can be optimized, a smaller proof may be preferable.

Smaller proofs reduce:

- bandwidth
- storage
- verification work
- implementation complexity at the verifier

So n-Wesolowski is not simply "better" or "worse." It is a point in a design
space.

## Relation to Chia Proof of Time

Chia's proof of time needs VDF outputs and proofs to become available on a
tight operational schedule. The Chia VDF implementation describes segment
storage and n-Wesolowski proof generation so proofs can be ready soon after the
main loop reaches a target iteration.

The high-level flow is:

```text
main VDF loop performs repeated squaring
-> segment workers prepare proof pieces
-> proof material is assembled for verification
-> full nodes can verify without recomputing the delay
```

This chapter stays at the conceptual level. Exact segment sizes, thread counts,
and implementation details belong in implementation documentation and source
code.

## Chia Connection

Chia uses VDFs as proof of time. Its VDF utilities discuss Wesolowski and
n-Wesolowski proof generation in the context of class-group repeated squaring:
[Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf).

The proof-of-time documentation gives the system-level role of VDFs:
[Proof of Time](https://docs.chia.net/chia-blockchain/consensus/proof-of-time/).

The practical lesson is that proof systems are not only abstract math. Their
latency, size, and verification costs shape the protocol.

## Common Pitfalls

**Thinking n-Wesolowski changes the VDF output.** The output still comes from
repeated squaring.

**Assuming larger proofs are always worse.** Larger proofs may be useful if
they are ready sooner.

**Ignoring verification cost.** Splitting into segments can increase verifier
work.

**Confusing segment parallelism with VDF parallelism.** The main delay
computation is still sequential; auxiliary proof work may be parallelized.

**Treating implementation parameters as universal constants.** Segment sizes
and scheduling choices are implementation details.

## Exercises

1. Explain why proof generation latency matters in a blockchain setting.
2. If a delay of $T$ is split into $T_1 + T_2$, write the two segment output
   equations.
3. Name one advantage of n-Wesolowski over a single proof.
4. Name one disadvantage of n-Wesolowski over a single proof.
5. Explain why segment proof work can be parallelized even though the main VDF
   loop is sequential.
6. In your own words, describe the tradeoff between proof size and proof
   availability.
7. Read the linked `chiavdf` repository notes and identify one implementation
   detail that this chapter intentionally leaves out.

## Further Reading

- [Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf)
- [Chia Proof of Time documentation](https://docs.chia.net/chia-blockchain/consensus/proof-of-time/)
- Previous chapter: Wesolowski VDF
- References on VDF proof generation tradeoffs
