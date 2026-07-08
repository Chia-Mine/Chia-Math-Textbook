---
title: Notation
sidebar_position: 4
---

# Notation

This page collects notation used throughout the textbook.

## Number Systems

**$\mathbb{Z}$**: the integers:

$$
\ldots, -2, -1, 0, 1, 2, \ldots
$$

**$\mathbb{F}_p$**: the finite field with $p$ elements, where $p$ is prime.
Arithmetic is done modulo $p$.

Example:

$$
4 + 6 = 3 \quad \text{in } \mathbb{F}_7
$$

**$\mathbb{F}_{p^n}$**: a finite field with $p^n$ elements. For $n > 1$, this
is usually an extension field, not the same thing as integers modulo $p^n$.

## Groups

**Additive notation** uses:

$$
P + Q
$$

for the group operation, $0$ or $\mathcal{O}$ for the identity, and $-P$ for
the inverse.

Repeated addition is written:

$$
kP
$$

Elliptic curve groups are usually written additively.

**Multiplicative notation** uses:

$$
ab
$$

or:

$$
a \cdot b
$$

for the group operation, $1$ for the identity, and $a^{-1}$ for the inverse.

Repeated multiplication is written:

$$
a^k
$$

Unknown-order groups and pairing target groups are often written
multiplicatively.

## Elliptic Curves

**$E(\mathbb{F}_p)$**: the points of an elliptic curve $E$ with coordinates in
$\mathbb{F}_p$, plus the point at infinity.

Example:

$$
E : y^2 = x^3 + ax + b
$$

**$\mathcal{O}$**: the point at infinity, the identity element of an elliptic
curve group.

## Pairings

**$G_1$ and $G_2$**: source groups for a pairing. They are usually elliptic
curve groups written additively.

**$G_T$**: the target group for a pairing. It is usually written
multiplicatively.

**$e(P, Q)$**: a pairing applied to $P \in G_1$ and $Q \in G_2$.

The key property is bilinearity:

$$
e(aP, bQ) = e(P, Q)^{ab}
$$

## Hashes and Signatures

**$H(m)$**: a hash of message $m$. In BLS contexts, this often means
hash-to-curve, not an ordinary byte digest.

**$PK$**: public key.

**$sk$**: secret key or private scalar.

**$\sigma$**: a signature.

Example BLS-style equation:

$$
\sigma = sk \cdot H(m)
$$

## VDFs

**$x^{2^T}$**: repeated squaring for $T$ steps.

The sequence is:

$$
x \to x^2 \to x^4 \to x^8 \to \cdots \to x^{2^T}
$$

**$\pi$**: often used for a proof element in a Wesolowski proof.

**$\ell$**: often used for the challenge prime in a Wesolowski proof.

## Algorithms

**$O(n)$**: big-O notation. It describes how a resource such as time or memory
grows with input size.

Example:

An algorithm with $O(n)$ time does work proportional to $n$ up to constant
factors.

**$O(\log n)$**: grows roughly with the number of bits or digits of $n$.

## Equality and Congruence

**$=$** means equality in the current setting.

**$\equiv \pmod n$** means congruence modulo $n$.

Example:

$$
17 \equiv 5 \pmod {12}
$$

because $17 - 5$ is divisible by $12$.

## Reading Advice

Always ask:

- What set or group do these symbols live in?
- Which operation is being used?
- Is this ordinary arithmetic, modular arithmetic, or group notation?
- Is the statement intuition, a definition, or an implementation detail?
