---
title: Wesolowski VDF
sidebar_position: 1
---

# Wesolowski VDF

## Goal

By the end of this chapter, you should understand the high-level structure of a
Wesolowski verifiable delay function: evaluation by repeated squaring,
verification with a short proof, the statement $y = x^{2^T}$, Fiat-Shamir
challenge primes, the quotient-and-remainder idea, and why verification can be
faster than recomputation.

This chapter gives intuition and algebraic shape. It is not a formal security
proof.

## Prerequisites

You should know:

- modular exponentiation and repeated squaring
- groups and group order
- unknown-order groups
- class groups at a high level
- hash functions and random-oracle intuition

## What a VDF Is

A **verifiable delay function** is a function where:

1. Evaluation takes a prescribed amount of sequential time.
2. The evaluator can produce a proof of correct evaluation.
3. Verification is much faster than recomputing the whole delay.

Wesolowski's paper constructs a VDF based on proof of exponentiation:
[Efficient Verifiable Delay Functions](https://ir.cwi.nl/pub/30021/Wesolowski2020_Article_EfficientVerifiableDelayFuncti.pdf).

Chia documentation describes proof of time as a VDF proof that a sequential
function was executed a certain number of times:
[Proof of Time](https://docs.chia.net/chia-blockchain/consensus/proof-of-time/).

## Evaluation

The evaluator starts with a group element $x$ in an unknown-order group and a
delay parameter $T$.

The target statement is:

$$
y = x^{2^T}
$$

The straightforward evaluation is repeated squaring:

```text
y = x
repeat T times:
    y = y * y
return y
```

After one step:

$$
y = x^2
$$

After two steps:

$$
y = x^4
$$

After $T$ steps:

$$
y = x^{2^T}
$$

## Verification

A verifier wants to check that $y$ really equals $x^{2^T}$ without doing all
$T$ squarings.

Wesolowski's proof gives the verifier one extra group element, usually called
$\pi$, plus a challenge prime $\ell$. The verifier checks an equation that
recombines the proof and a smaller exponent.

The result is much faster verification than recomputing:

```text
repeat T times:
    y = y * y
```

The exact security depends on assumptions about the group and the challenge
generation.

## The Statement $y = x^{2^T}$

The exponent $2^T$ is enormous when $T$ is large. For example:

$$
T = 1000000
$$

means the exponent is:

$$
2^{1000000}
$$

Nobody writes this exponent out. The evaluator reaches it by repeated
squaring.

In a known-order group, someone might reduce $2^T$ modulo the group order. In
an unknown-order group, that shortcut is not available to the evaluator.

## Wesolowski Proof Intuition

The prover wants to convince the verifier:

$$
y = x^{2^T}
$$

without making the verifier perform all $T$ squarings.

The key idea is to divide the exponent $2^T$ by a challenge prime $\ell$:

$$
2^T = q\ell + r
$$

where:

- $q$ is the quotient
- $r$ is the remainder
- $0 \le r < \ell$

The proof is:

$$
\pi = x^q
$$

Then:

$$
x^{2^T} = x^{q\ell + r} = (x^q)^\ell x^r = \pi^\ell x^r
$$

So the verifier can check:

$$
y = \pi^\ell x^r
$$

This is the core algebraic shape.

## Fiat-Shamir Challenge Prime

The challenge prime $\ell$ should not be chosen by the prover in a way that
lets them cheat.

The Fiat-Shamir idea is to derive the challenge from a hash of the public
statement:

```text
ell = hash_to_prime(x, y, T)
```

The hash output is interpreted through a procedure that produces a prime.

The intuition is that the prover must commit to $y$ before learning a challenge
that is hard to manipulate. In formal analysis, this is often modeled with a
random oracle.

## Quotient and Remainder

The quotient-and-remainder step is ordinary integer division:

$$
2^T = q\ell + r
$$

The verifier does not need to compute $q$ directly. The proof $\pi = x^q$ is
provided by the prover.

The verifier does need $r$:

$$
r = 2^T \bmod \ell
$$

This can be computed quickly with modular exponentiation:

```text
r = pow_mod(2, T, ell)
```

This is much faster than doing $T$ group squarings when $\ell$ is small enough
for normal integer arithmetic.

## Verification Equation

The verification equation is:

$$
y \stackrel{?}{=} \pi^\ell x^r
$$

where:

$$
r = 2^T \bmod \ell
$$

If the equation holds, the verifier accepts.

This equation follows from:

$$
2^T = q\ell + r
$$

and:

$$
\pi = x^q
$$

This explanation is algebraic intuition. Formal soundness requires precise
assumptions about the group and challenge generation.

## Why Verification Is Faster Than Recomputation

Evaluation requires $T$ sequential squarings.

Verification requires:

- deriving $\ell$
- computing $r = 2^T \bmod \ell$
- computing $\pi^\ell$
- computing $x^r$
- checking one group equation

The verifier performs exponentiations with exponents much smaller than $2^T$
and avoids the full sequential chain.

This is the "verifiable" part of a VDF: the verifier gets confidence without
rerunning the delay.

## Soundness Intuition

Soundness means a cheating prover should not be able to convince the verifier
of a false output.

Intuitively, after the prover commits to $y$, the challenge prime $\ell$ forces
them to provide a proof consistent with a hard-to-predict quotient. If $y$ is
wrong, producing a valid $\pi$ should be infeasible under the proof's
assumptions.

This is not a full proof. Formal soundness depends on the adaptive root
assumption or related assumptions used in Wesolowski-style analyses.

For a first reading, treat the adaptive root assumption as a formal way of
saying that producing certain roots in an unknown-order group should be hard
even after seeing challenge information. Later security-focused chapters can
state this more precisely.

## Chia Connection

Chia uses VDFs as proof of time. The Chia VDF implementation repository
describes repeated squaring of a generator form and generation of Wesolowski
proof segments:
[Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf).

The green paper introduction describes Chia's VDF sequential function as
repeated squaring in class groups of unknown order, with Wesolowski's proof of
exponentiation:
[Chia green paper introduction](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/green-paper/green-paper-introduction.md).

Later chapters will discuss n-Wesolowski and how proof of time fits into Chia
consensus.

## Common Pitfalls

**Thinking the proof removes the delay.** The proof helps verification. The
evaluator still performs the delayed computation.

**Confusing fast modular exponentiation with VDF evaluation.** The VDF delay is
the sequential group squaring chain.

**Letting the prover choose the challenge.** The challenge must be derived in a
way the prover cannot bias after seeing the statement.

**Forgetting the remainder term.** The verifier checks $\pi^\ell x^r$, not
just $\pi^\ell$.

**Treating intuition as a proof.** The quotient equation explains why the
verification equation makes sense, but it is not a complete soundness proof.

## Exercises

1. If $T = 5$, write $x^{2^T}$ as an ordinary exponent.
2. For $\ell = 7$ and $T = 5$, compute $r = 2^T \bmod \ell$.
3. If $2^T = q\ell + r$ and $\pi = x^q$, derive
   $x^{2^T} = \pi^\ell x^r$.
4. Why should $\ell$ be derived after $y$ is known?
5. List the steps a verifier performs in the simplified Wesolowski check.
6. Explain why verification can be faster than recomputing all squarings.
7. What assumption about the group order is important for the VDF delay?
8. In your own words, explain what "soundness" means for a VDF proof.

## Further Reading

- [Efficient Verifiable Delay Functions](https://ir.cwi.nl/pub/30021/Wesolowski2020_Article_EfficientVerifiableDelayFuncti.pdf)
- [Chia Proof of Time documentation](https://docs.chia.net/chia-blockchain/consensus/proof-of-time/)
- [Chia green paper introduction](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/green-paper/green-paper-introduction.md)
- [Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf)
- Boneh, Bünz, and Fisch, "A Survey of Two Verifiable Delay Functions"
