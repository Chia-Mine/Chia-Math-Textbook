---
title: Curves Over Finite Fields
sidebar_position: 2
---

# Curves Over Finite Fields

## Goal

By the end of this chapter, you should understand what it means to define an
elliptic curve over $\mathbb{F}_p$, how points are counted in small examples,
why group size matters, and why cryptographic protocols usually work in
carefully chosen prime-order subgroups.

You should also have a first conceptual understanding of torsion points,
cofactors, cofactor clearing, subgroup checks, and invalid-curve attacks.

## Prerequisites

You should know:

- finite fields, especially $\mathbb{F}_p$
- elliptic curve point addition
- scalar multiplication
- group order and element order

## Motivation

Over the real numbers, elliptic curves make smooth pictures. Over finite
fields, they become finite sets of points. That finiteness is exactly what
cryptography needs: a large but bounded group where computation is exact.

The shift from real numbers to finite fields changes how we think. There is no
continuous curve to draw. There are only points whose coordinates satisfy the
equation modulo $p$.

## Curves Over $\mathbb{F}_p$

Let $p$ be prime. A short Weierstrass elliptic curve over $\mathbb{F}_p$ has an
equation:

$$
E : y^2 = x^3 + ax + b
$$

where $a, b \in \mathbb{F}_p$ and:

$$
4a^3 + 27b^2 \ne 0
$$

in $\mathbb{F}_p$.

The points are:

$$
E(\mathbb{F}_p) = \{(x, y) \in \mathbb{F}_p^2 : y^2 = x^3 + ax + b\} \cup \{\mathcal{O}\}
$$

The notation $E(\mathbb{F}_p)$ means "the points of $E$ whose coordinates are
in $\mathbb{F}_p$, plus the point at infinity."

## Counting Points: A Tiny Example

Consider:

$$
E : y^2 = x^3 + 2x + 3
$$

over $\mathbb{F}_5$.

First list the square values modulo $5$:

$$
0^2 = 0
$$

$$
1^2 = 1
$$

$$
2^2 = 4
$$

$$
3^2 = 9 \equiv 4 \pmod 5
$$

$$
4^2 = 16 \equiv 1 \pmod 5
$$

So the possible values of $y^2$ are:

$$
0, 1, 4
$$

Now evaluate the right side for each $x$:

| $x$ | $x^3 + 2x + 3 \pmod 5$ | matching $y$ values |
| --- | --- | --- |
| 0 | 3 | none |
| 1 | 1 | 1, 4 |
| 2 | 0 | 0 |
| 3 | 1 | 1, 4 |
| 4 | 0 | 0 |

So the affine points are:

$$
(1,1), (1,4), (2,0), (3,1), (3,4), (4,0)
$$

Then add the point at infinity $\mathcal{O}$. Therefore:

$$
|E(\mathbb{F}_5)| = 7
$$

This curve has seven points over $\mathbb{F}_5$.

## Hasse Bound, Lightly

For a curve over $\mathbb{F}_p$, the number of points is close to $p + 1$.
Hasse's bound says:

$$
\left| |E(\mathbb{F}_p)| - (p + 1) \right| \le 2\sqrt{p}
$$

For $p = 5$, this gives:

$$
\left| |E(\mathbb{F}_5)| - 6 \right| \le 2\sqrt{5}
$$

Our example has $7$ points, which fits the bound.

The bound is useful because it says the number of points is not arbitrary. It
is tightly constrained by the field size.

## Group Structure

The set $E(\mathbb{F}_p)$ forms a finite abelian group under elliptic curve
point addition.

Because it is finite, every point has finite order. If $P$ is a point, then
some positive integer $k$ satisfies:

$$
kP = \mathcal{O}
$$

The order of a point divides the order of the group. This is one reason group
size matters in cryptography.

## Torsion Points

A **torsion point** is a point with finite order. Over finite fields, every
point is a torsion point because the whole group is finite.

The phrase is still useful because we often talk about points killed by a
specific scalar. For example, a point $P$ is an $r$-torsion point if:

$$
rP = \mathcal{O}
$$

In cryptography, we often care about a large prime $r$ and the subgroup of
points whose order divides $r$.

## Scalar Multiplication

Scalar multiplication is repeated point addition:

$$
kP = P + P + \cdots + P
$$

In finite elliptic curve groups, scalar multiplication eventually cycles back
to $\mathcal{O}$.

Example: in the tiny curve from above, the group has $7$ points. Since $7$ is
prime, every non-identity point has order $7$. For any non-identity point $P$:

$$
7P = \mathcal{O}
$$

Real cryptographic groups use enormous prime-order subgroups, not tiny groups
like this.

## Prime-Order Subgroups

A **prime-order subgroup** is a subgroup whose number of elements is a prime
$r$.

Prime-order subgroups are useful because their non-identity elements all have
order $r$. This avoids many small-subgroup problems and makes the group
structure simpler for cryptographic protocols.

If a curve group has order:

$$
|E(\mathbb{F}_p)| = hr
$$

where $r$ is a large prime, then $h$ is called the cofactor.

## Cofactors

The **cofactor** is the ratio between the full curve group size and the desired
large prime subgroup size:

$$
h = \frac{|E(\mathbb{F}_p)|}{r}
$$

If $h = 1$, the whole curve group has prime order.

If $h > 1$, the curve has points outside the desired prime-order subgroup.
Protocols must handle those points carefully.

## Cofactor Clearing

**Cofactor clearing** maps a point into a desired subgroup by multiplying by a
cofactor or by a related subgroup-clearing factor.

The simplest idea is:

$$
P \mapsto hP
$$

This can remove components of the point that live outside the large prime-order
subgroup.

Real protocols may use optimized or curve-specific cofactor-clearing methods.
The important concept is that not every point with valid coordinates is
automatically in the subgroup a protocol wants.

## Subgroup Checks

A **subgroup check** verifies that a point belongs to the intended subgroup.

For a prime-order subgroup of order $r$, a direct check is:

$$
rP = \mathcal{O}
$$

If this holds and $P$ is valid, then $P$ is in the subgroup whose order divides
$r$.

Subgroup checks matter when accepting public keys, signatures, or other points
from outside the program. A point can satisfy the curve equation but still be
in the wrong subgroup.

## Invalid-Curve Attacks, Conceptually

An **invalid-curve attack** happens when an implementation performs scalar
multiplication on points that are not valid points of the intended curve or not
in the intended subgroup.

The attacker may craft inputs that live in a smaller or different group. If the
implementation multiplies secret scalars by those points and reveals enough
information, the attacker may learn something about the secret.

The core lesson is simple: validate external points before using them in
security-sensitive group operations.

This chapter gives the concept, not a full attack implementation.

## Chia Connection

BLS12-381 has elliptic-curve groups commonly called G1 and G2. These are
subgroups associated with curves over finite fields and extension fields.

For BLS signatures, it is not enough for a byte string to decode to coordinates
that satisfy a curve equation. Implementations also need the point to be in the
right subgroup and represented canonically according to the relevant
specification.

Later chapters will discuss BLS12-381, G1, G2, cofactors, subgroup checks, and
serialization at a higher level. Chia-specific behavior should be checked
against Chia source code and BLS standards when we make detailed claims.

## Common Pitfalls

**Thinking every coordinate pair is a point.** A pair $(x, y)$ is a point only
if it satisfies the curve equation.

**Forgetting the point at infinity.** It counts as part of the group.

**Confusing the whole curve group with a protocol subgroup.** Protocols often
use a large prime-order subgroup, not every curve point.

**Ignoring cofactors.** When $h > 1$, some valid curve points may be outside
the desired subgroup.

**Assuming cofactor clearing and subgroup checks are interchangeable in every
protocol.** They are related but serve different roles, and real specifications
must be followed.

**Skipping point validation.** Invalid points can break assumptions behind
scalar multiplication and verification.

## Exercises

1. Over $\mathbb{F}_7$, list the square values $y^2$ for $y = 0,\ldots,6$.
2. Over $\mathbb{F}_5$, recount the points on
   $y^2 = x^3 + 2x + 3$ and confirm that there are seven including
   $\mathcal{O}$.
3. State Hasse's bound for $p = 11$.
4. If a curve group has order $44$ and the desired prime subgroup has order
   $11$, what is the cofactor?
5. Explain why a point can satisfy the curve equation but still be unsuitable
   for a protocol.
6. What does the subgroup check $rP = \mathcal{O}$ test?
7. In your own words, explain why prime-order subgroups are convenient in
   cryptography.
8. Give one reason an implementation should validate points received from the
   network.

## Further Reading

- Later chapter: Pairings
- Later chapter: BLS12-381
- Later chapter: BLS Signatures
- Any elliptic curve cryptography reference covering cofactors and subgroup
  checks
