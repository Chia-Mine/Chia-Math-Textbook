---
title: Elliptic Curve Group Law
sidebar_position: 1
---

# Elliptic Curve Group Law

## Goal

By the end of this chapter, you should understand what an elliptic curve is,
what its points are, why a special point at infinity is added, and how point
addition, point doubling, and scalar multiplication fit together.

You should also understand the intuition for why elliptic curve points form a
group, without needing algebraic geometry.

## Prerequisites

You should know:

- groups and additive notation
- finite fields, especially $\mathbb{F}_p$
- modular inverses
- polynomial equations over a field

## Motivation

Elliptic curves give cryptography a group where honest users can compute
efficiently, while some reverse problems appear hard for attackers. BLS
signatures use elliptic-curve groups, so understanding the group law is the
first step toward understanding public keys, signatures, and pairings.

The operation on elliptic curve points is usually written as addition:

$$
P + Q
$$

This does not mean ordinary coordinate-wise addition. It is a special operation
defined by the curve.

## What Is an Elliptic Curve?

For this book, an elliptic curve is a set of points satisfying an equation of
the form:

$$
y^2 = x^3 + ax + b
$$

over some field, together with one extra point called the point at infinity.

This is a short Weierstrass equation. It is not the only possible curve form,
but it is the easiest starting point.

The constants $a$ and $b$ come from the field. The curve must also avoid a
singularity. For short Weierstrass form, this means:

$$
4a^3 + 27b^2 \ne 0
$$

in the field.

This condition prevents the curve from having a cusp or self-intersection,
which would break the group law.

## Points on a Curve

A **point** on the curve is a pair $(x, y)$ that satisfies the curve equation.

Example over the real numbers:

$$
E : y^2 = x^3 - x + 1
$$

The point $(0, 1)$ is on the curve because:

$$
1^2 = 0^3 - 0 + 1
$$

Both sides equal $1$.

The point $(0, 2)$ is not on the curve because:

$$
2^2 \ne 0^3 - 0 + 1
$$

That is:

$$
4 \ne 1
$$

## Points Over a Finite Field

In cryptography, curves are usually defined over finite fields. For example,
consider:

$$
E : y^2 = x^3 + 2x + 3
$$

over $\mathbb{F}_5$.

Check whether $(1, 1)$ is on the curve:

$$
y^2 = 1^2 = 1
$$

and:

$$
x^3 + 2x + 3 = 1^3 + 2 \cdot 1 + 3 = 6 \equiv 1 \pmod 5
$$

So $(1, 1)$ is on the curve over $\mathbb{F}_5$.

Check $(2, 1)$:

$$
y^2 = 1
$$

but:

$$
2^3 + 2 \cdot 2 + 3 = 15 \equiv 0 \pmod 5
$$

So $(2, 1)$ is not on the curve over $\mathbb{F}_5$.

## The Point at Infinity

Elliptic curve groups need an identity element. This identity is a special
point called the **point at infinity**, often written:

$$
\mathcal{O}
$$

It satisfies:

$$
P + \mathcal{O} = P
$$

and:

$$
\mathcal{O} + P = P
$$

for every point $P$ on the curve.

The point at infinity is not an ordinary coordinate pair. It is an extra
formal point added so the group operation always has an identity and every
point has an inverse.

## Geometric Intuition Over the Reals

Over the real numbers, the group law has a geometric picture.

To add two distinct points $P$ and $Q$:

1. Draw the line through $P$ and $Q$.
2. The line usually intersects the curve at a third point $R$.
3. Reflect $R$ across the $x$-axis.
4. The reflected point is $P + Q$.

TODO: Add a diagram showing the chord-and-reflect rule over the real numbers.

To double a point $P$:

1. Draw the tangent line to the curve at $P$.
2. The tangent usually intersects the curve at another point $R$.
3. Reflect $R$ across the $x$-axis.
4. The reflected point is $2P$.

TODO: Add a diagram showing the tangent-and-reflect rule.

Finite fields do not have smooth pictures, but the algebraic formulas are
based on the same idea.

## Point Addition Formula

Let:

$$
P = (x_1, y_1)
$$

and:

$$
Q = (x_2, y_2)
$$

with $P \ne Q$ and $x_1 \ne x_2$.

The slope of the line through $P$ and $Q$ is:

$$
m = \frac{y_2 - y_1}{x_2 - x_1}
$$

Over a finite field, division means multiplication by a modular inverse.

The sum:

$$
P + Q = (x_3, y_3)
$$

is computed by:

$$
x_3 = m^2 - x_1 - x_2
$$

$$
y_3 = m(x_1 - x_3) - y_1
$$

All arithmetic happens in the field.

## Point Doubling Formula

To compute:

$$
2P = P + P
$$

for $P = (x_1, y_1)$, use the tangent slope:

$$
m = \frac{3x_1^2 + a}{2y_1}
$$

Then:

$$
x_3 = m^2 - 2x_1
$$

$$
y_3 = m(x_1 - x_3) - y_1
$$

Again, all arithmetic is field arithmetic.

If the denominator is zero, the tangent is vertical and the result is the point
at infinity.

## Inverses

For a point:

$$
P = (x, y)
$$

the inverse is:

$$
-P = (x, -y)
$$

because a vertical line through $P$ and $-P$ meets the curve and corresponds to
the identity:

$$
P + (-P) = \mathcal{O}
$$

Over $\mathbb{F}_p$, the value $-y$ means:

$$
p - y
$$

when $y \ne 0$.

## A Small Finite-Field Addition Example

Work over $\mathbb{F}_5$ with:

$$
E : y^2 = x^3 + 2x + 3
$$

We already checked that:

$$
P = (1, 1)
$$

is on the curve. Another point is:

$$
Q = (3, 1)
$$

Check $Q$:

$$
1^2 = 1
$$

and:

$$
3^3 + 2 \cdot 3 + 3 = 36 \equiv 1 \pmod 5
$$

Now compute $P + Q$.

The slope is:

$$
m = \frac{1 - 1}{3 - 1} = \frac{0}{2} = 0
$$

Then:

$$
x_3 = 0^2 - 1 - 3 = -4 \equiv 1 \pmod 5
$$

and:

$$
y_3 = 0(1 - 1) - 1 = -1 \equiv 4 \pmod 5
$$

So:

$$
P + Q = (1, 4)
$$

Notice that $(1, 4)$ is the inverse of $(1, 1)$ over $\mathbb{F}_5$.

## Scalar Multiplication

**Scalar multiplication** means adding a point to itself repeatedly:

$$
kP = \underbrace{P + P + \cdots + P}_{k \text{ times}}
$$

Examples:

$$
2P = P + P
$$

$$
3P = P + P + P
$$

Efficient implementations do not add one point at a time for large $k$. They
use double-and-add methods, similar in spirit to repeated squaring.

Pseudocode:

```text
function scalar_mul(k, P):
    result = O
    addend = P

    while k > 0:
        if k is odd:
            result = result + addend
        addend = addend + addend
        k = floor(k / 2)

    return result
```

Here `O` is the point at infinity.

## Why the Points Form a Group

The points on an elliptic curve, together with $\mathcal{O}$, form a group
under the point addition law.

The group rules are:

- closure: adding two curve points gives another curve point or
  $\mathcal{O}$
- associativity: $(P + Q) + R = P + (Q + R)$
- identity: $\mathcal{O}$
- inverses: $-P$

Associativity is the hardest rule to prove. It is true, but the proof is more
technical than this first chapter needs. For now, treat it as a theorem about
the elliptic curve group law.

## Chia Connection

BLS public keys and signatures live in elliptic-curve groups. The group
operation is what makes scalar multiplication, public key derivation, signature
creation, and signature verification equations possible.

In later chapters, BLS12-381 will provide specific elliptic-curve groups used
for BLS signatures. Pairings will connect two source groups to a target group
in a way that supports compact signature verification and aggregation.

This chapter explains the basic group law, not Chia's exact serialization,
subgroup checks, or consensus rules.

## Common Pitfalls

**Using coordinate-wise addition.** Usually:

$$
(x_1, y_1) + (x_2, y_2) \ne (x_1 + x_2, y_1 + y_2)
$$

Elliptic curve addition has its own formula.

**Forgetting field arithmetic.** Over $\mathbb{F}_p$, every addition,
subtraction, multiplication, and inverse is computed modulo $p$.

**Ignoring the point at infinity.** Without $\mathcal{O}$, the group would not
have an identity element.

**Confusing doubling with ordinary multiplication of coordinates.** $2P$ means
$P + P$ using the group law.

**Assuming the real-number picture works over finite fields.** The geometric
picture gives intuition, but finite-field curves are computed algebraically.

**Treating associativity as obvious from the formulas.** Associativity is true,
but proving it takes real work.

## Exercises

1. Over $\mathbb{F}_5$, check whether $(0, 2)$ lies on
   $y^2 = x^3 + 2x + 3$.
2. Over $\mathbb{F}_5$, find the inverse of the point $(3, 1)$.
3. Explain why the point at infinity acts like the identity element.
4. In your own words, explain why elliptic curve addition is not coordinate
   addition.
5. Over $\mathbb{F}_5$ on $y^2 = x^3 + 2x + 3$, compute the slope for adding
   $(1, 1)$ and $(3, 1)$.
6. Describe what scalar multiplication $7P$ means using only point addition.
7. Write pseudocode for a slow scalar multiplication algorithm that adds $P$
   exactly $k$ times.
8. Why does point doubling use a different slope formula from adding two
   distinct points?
9. Mark one place in this chapter where the real-number geometric intuition is
   helpful but incomplete.

## Further Reading

- Later chapter: Curves Over Finite Fields
- Later chapter: Pairings
- Later chapter: BLS12-381
- Any introductory elliptic curve cryptography text covering the group law
