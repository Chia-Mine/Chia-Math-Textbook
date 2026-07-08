---
title: Unknown-Order Groups
sidebar_position: 1
---

# Unknown-Order Groups

## Goal

By the end of this chapter, you should understand the difference between
known-order and unknown-order groups, why group order matters, and why
unknown-order groups are useful for verifiable delay functions.

You should also understand the high-level difference between RSA groups and
class groups, and why trusted setup matters.

## Prerequisites

You should know:

- groups and group order
- modular multiplication
- modular exponentiation
- repeated squaring
- modular inverses at a basic level

## Motivation

In many cryptographic groups, the group order is public. That is useful for
signatures and many elliptic-curve protocols.

For VDFs, however, public knowledge of the group order can create shortcuts.
The computation:

$$
x^{2^T}
$$

can sometimes be simplified if you know the group order, because exponents can
be reduced modulo the order. Unknown-order groups are designed to block that
shortcut.

## Known-Order Groups

A **known-order group** is a group whose number of elements is known.

Example: the additive group $\mathbb{Z}/7\mathbb{Z}$ has order $7$.

Example: the multiplicative group $(\mathbb{Z}/11\mathbb{Z})^\times$ has order
$10$.

In a finite group of order $r$, repeated operations eventually cycle. If $g$ is
in the group, then:

$$
g^r = 1
$$

for multiplicative notation, assuming $g$ lies in a group of order $r$ or a
subgroup whose order divides $r$.

Knowing the order is often useful. It lets you reduce exponents, check subgroup
membership, and reason about element orders.

## Unknown-Order Groups

An **unknown-order group** is a group where participants can compute the group
operation but do not know the exact group order.

The group still has an order. "Unknown" means the order is not known to the
party who is supposed to perform the delayed computation.

This distinction matters. The group is not chaotic or undefined. It is a normal
group with an operation, identity, and inverses. What is missing is a public
shortcut based on the order.

## Why Group Order Matters

Suppose a group has known order $r$. Then for many exponent computations, you
can reduce exponents modulo $r$.

For example, if:

$$
g^r = 1
$$

then:

$$
g^{k + r} = g^k
$$

This means very large exponents may be replaced by smaller equivalent
exponents.

For a VDF-style computation:

$$
y = x^{2^T}
$$

knowing the group order may let someone compute:

$$
2^T \bmod r
$$

quickly and then compute:

$$
x^{2^T \bmod r}
$$

with fast exponentiation. That would skip the intended delay.

Unknown-order groups prevent this shortcut because the prover does not know
the modulus needed to reduce the exponent.

## Repeated Squaring

Repeated squaring computes:

$$
x \to x^2 \to x^4 \to x^8 \to \cdots \to x^{2^T}
$$

Each step depends on the previous output:

```text
y = x
repeat T times:
    y = y * y
return y
```

If no shortcut is available, the evaluator must perform the squarings in
sequence.

This sequential dependency is the heart of VDF evaluation.

## Sequential Computation Intuition

A computation is **sequential** when step $i + 1$ cannot start until step $i$
has finished.

Repeated squaring has this shape:

```text
y1 = x * x
y2 = y1 * y1
y3 = y2 * y2
...
```

You cannot compute $y_3$ until you know $y_2$. You cannot compute $y_2$ until
you know $y_1$.

This does not prove VDF security by itself. It explains the shape of the delay.
The security argument also depends on the algebraic setting and assumptions
about shortcuts.

## RSA Groups

An RSA group is based on multiplication modulo a composite number:

$$
N = pq
$$

where $p$ and $q$ are large secret primes.

The group is often:

$$
(\mathbb{Z}/N\mathbb{Z})^\times
$$

the invertible residues modulo $N$.

If someone knows $p$ and $q$, they can compute the group order:

$$
\varphi(N) = (p - 1)(q - 1)
$$

If nobody knows the factorization of $N$, then the group order is unknown to
participants.

This creates a trusted-setup question: who generated $N$, and can we trust that
they destroyed $p$ and $q$?

## Class Groups

Class groups are another source of unknown-order groups. Very roughly, they
come from equivalence classes of binary quadratic forms with a chosen
discriminant.

Unlike RSA groups, class groups can be generated without a secret factorization
trapdoor. This makes them attractive for VDF settings where a trusted setup is
undesirable.

This chapter only needs the motivation. The next chapter introduces class
groups more concretely.

## Trusted Setup Versus Trustless Setup

A **trusted setup** means some party creates public parameters and may know
hidden information that could break security if retained.

For RSA groups, the hidden information is the factorization:

$$
N = pq
$$

If the setup party knows $p$ and $q$, then they know the group order and may
have shortcuts unavailable to everyone else.

A **trustless setup** aims to avoid such hidden trapdoor information.

Class-group VDFs are attractive because they can avoid the trusted-modulus
setup problem.

## Why VDFs Like Unknown-Order Groups

A verifiable delay function needs evaluation to take a prescribed amount of
sequential time, while verification should be much faster.

Unknown-order groups help because they make:

$$
x^{2^T}
$$

hard to shortcut by exponent reduction.

The evaluator performs repeated squaring. The verifier later checks a proof
that the result is correct without recomputing all $T$ squarings.

Wesolowski proofs, discussed later, use this setting to make verification much
faster than evaluation.

## Simple Example: Known Order Shortcut

This toy example is intentionally insecure, but it shows the issue.

In $(\mathbb{Z}/7\mathbb{Z})^\times$, the group order is $6$.

Suppose we want:

$$
3^{2^{10}} \pmod 7
$$

Since the group order is known, reduce:

$$
2^{10} = 1024 \equiv 4 \pmod 6
$$

So:

$$
3^{2^{10}} \equiv 3^4 \pmod 7
$$

That is much easier than doing ten sequential squarings. In an unknown-order
group, the corresponding reduction modulus is not known.

## Chia Connection

Chia's proof of time is based on VDFs. The VDF path uses repeated squaring in
an unknown-order group so that time passes in a way that is hard to parallelize
but still efficiently verifiable.

Chia uses class groups rather than an RSA modulus with a trusted setup. Later
chapters will explain class groups and Wesolowski proofs in more detail.

This chapter gives the motivation and vocabulary, not the full Chia proof of
time specification.

## Common Pitfalls

**Thinking unknown-order means no order exists.** The order exists; it is not
known to the evaluator.

**Confusing hard with impossible.** Unknown-order groups are used to remove
known shortcuts, not to make computation impossible.

**Forgetting trusted setup.** RSA groups can be unknown order to users while
still known to whoever generated the modulus.

**Assuming repeated squaring alone is a VDF.** A VDF also needs a proof and a
verification algorithm.

**Treating class groups as easy because the word group is familiar.** The group
law is more advanced than modular multiplication and will need its own chapter.

## Exercises

1. Give an example of a known-order group and state its order.
2. Explain why knowing the order of a group can help reduce exponents.
3. In $(\mathbb{Z}/11\mathbb{Z})^\times$, reduce the exponent $2^8$ modulo the
   group order.
4. Write pseudocode for $T$ repeated squarings starting from $x$.
5. Why does knowing the factorization of $N = pq$ reveal the order of an RSA
   group?
6. What is the trusted setup concern for RSA groups?
7. Why are class groups attractive for trustless VDF settings?
8. Explain why repeated squaring is sequential.
9. In your own words, explain why VDFs want evaluation to be slow but
   verification to be fast.

## Further Reading

- Later chapter: Class Groups
- Later chapter: Wesolowski VDF
- Later chapter: n-Wesolowski
- References on unknown-order groups and verifiable delay functions
