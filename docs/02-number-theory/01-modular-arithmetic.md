---
title: Modular Arithmetic
sidebar_position: 1
---

# Modular Arithmetic

## Goal

By the end of this chapter, you should be able to compute with remainders,
understand congruence modulo $n$, find greatest common divisors, compute
modular inverses, and use repeated squaring for modular exponentiation.

You should also understand why repeated squaring is one of the basic operations
behind verifiable delay functions.

## Prerequisites

You should know the integers:

$$
\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots
$$

You do not need prior number theory. The only assumption is that you are
comfortable with ordinary addition, multiplication, division with remainder,
and basic loops.

## Motivation

Many cryptographic systems work with finite sets of numbers. Instead of
allowing integers to grow forever, we reduce them by a modulus and keep only a
remainder. This gives a controlled arithmetic world where values stay bounded.

Modular arithmetic appears in finite fields, elliptic curves, signatures,
hashing constructions, and verifiable delay functions. It is one of the
foundational tools for the rest of the book.

## Divisibility

An integer $a$ **divides** an integer $b$ if $b$ is an exact multiple of $a$.
We write:

$$
a \mid b
$$

This means there is an integer $k$ such that:

$$
b = ak
$$

Example:

$$
3 \mid 12
$$

because $12 = 3 \cdot 4$.

But:

$$
5 \nmid 12
$$

because no integer $k$ satisfies $12 = 5k$.

## Remainders

When you divide one integer by another positive integer, you can write:

$$
a = qn + r
$$

where:

- $a$ is the number being divided
- $n$ is the divisor
- $q$ is the quotient
- $r$ is the remainder
- $0 \le r < n$

Example:

$$
29 = 4 \cdot 7 + 1
$$

So the remainder when $29$ is divided by $7$ is $1$.

In programming, this is the idea behind `a % n`, though programming languages
can differ on negative inputs. In this book, the remainder modulo $n$ is always
chosen from:

$$
\{0, 1, \ldots, n - 1\}
$$

## Congruence Modulo $n$

Two integers are **congruent modulo $n$** if they have the same remainder when
divided by $n$. We write:

$$
a \equiv b \pmod n
$$

Equivalent definition:

$$
n \mid (a - b)
$$

Example:

$$
17 \equiv 5 \pmod {12}
$$

because:

$$
17 - 5 = 12
$$

and $12$ divides $12$.

Another example:

$$
31 \equiv 3 \pmod 7
$$

because both $31$ and $3$ have remainder $3$ when divided by $7$.

Modulo $n$, every integer behaves like one of the numbers:

$$
0, 1, 2, \ldots, n - 1
$$

These are the **residue classes modulo $n$**.

## Modular Addition

To add modulo $n$, add normally and then reduce the result modulo $n$.

Example:

$$
8 + 9 = 17
$$

Modulo $12$:

$$
17 \equiv 5 \pmod {12}
$$

So:

$$
8 + 9 \equiv 5 \pmod {12}
$$

This is clock arithmetic. If it is 8 o'clock and 9 hours pass, the clock shows
5 o'clock.

## Modular Multiplication

To multiply modulo $n$, multiply normally and reduce the result modulo $n$.

Example:

$$
7 \cdot 8 = 56
$$

Modulo $10$:

$$
56 \equiv 6 \pmod {10}
$$

So:

$$
7 \cdot 8 \equiv 6 \pmod {10}
$$

Modular multiplication keeps numbers bounded even when many multiplications are
performed.

## Greatest Common Divisor

The **greatest common divisor** of two integers $a$ and $b$, written
$\gcd(a, b)$, is the largest positive integer that divides both $a$ and $b$.

Example:

The positive divisors of $18$ are:

$$
1, 2, 3, 6, 9, 18
$$

The positive divisors of $24$ are:

$$
1, 2, 3, 4, 6, 8, 12, 24
$$

The common divisors are:

$$
1, 2, 3, 6
$$

So:

$$
\gcd(18, 24) = 6
$$

If $\gcd(a, b) = 1$, then $a$ and $b$ are **coprime**.

## Euclidean Algorithm

The Euclidean algorithm computes $\gcd(a, b)$ efficiently using repeated
division with remainder.

The key fact is:

$$
\gcd(a, b) = \gcd(b, a \bmod b)
$$

Example: compute $\gcd(252, 105)$.

First divide:

$$
252 = 2 \cdot 105 + 42
$$

So:

$$
\gcd(252, 105) = \gcd(105, 42)
$$

Continue:

$$
105 = 2 \cdot 42 + 21
$$

So:

$$
\gcd(105, 42) = \gcd(42, 21)
$$

Continue:

$$
42 = 2 \cdot 21 + 0
$$

The last nonzero remainder is $21$, so:

$$
\gcd(252, 105) = 21
$$

Pseudocode:

```text
function gcd(a, b):
    while b != 0:
        r = a mod b
        a = b
        b = r
    return abs(a)
```

## Extended Euclidean Algorithm

The extended Euclidean algorithm finds more than the gcd. It finds integers
$x$ and $y$ such that:

$$
ax + by = \gcd(a, b)
$$

This is called Bezout's identity.

Example: find $x$ and $y$ for $30$ and $12$.

We know:

$$
\gcd(30, 12) = 6
$$

Run the Euclidean algorithm:

$$
30 = 2 \cdot 12 + 6
$$

Rearrange:

$$
6 = 30 - 2 \cdot 12
$$

So $x = 1$ and $y = -2$:

$$
30(1) + 12(-2) = 6
$$

A slightly larger example shows the back-substitution pattern. Compute
$\gcd(101, 23)$:

$$
101 = 4 \cdot 23 + 9
$$

$$
23 = 2 \cdot 9 + 5
$$

$$
9 = 1 \cdot 5 + 4
$$

$$
5 = 1 \cdot 4 + 1
$$

Now work backward:

$$
1 = 5 - 1 \cdot 4
$$

Since $4 = 9 - 1 \cdot 5$:

$$
1 = 5 - (9 - 1 \cdot 5) = 2 \cdot 5 - 9
$$

Since $5 = 23 - 2 \cdot 9$:

$$
1 = 2(23 - 2 \cdot 9) - 9 = 2 \cdot 23 - 5 \cdot 9
$$

Since $9 = 101 - 4 \cdot 23$:

$$
1 = 2 \cdot 23 - 5(101 - 4 \cdot 23)
= 22 \cdot 23 - 5 \cdot 101
$$

So:

$$
101(-5) + 23(22) = 1
$$

Pseudocode:

```text
function extended_gcd(a, b):
    old_r = a
    r = b
    old_s = 1
    s = 0
    old_t = 0
    t = 1

    while r != 0:
        q = old_r div r

        (old_r, r) = (r, old_r - q * r)
        (old_s, s) = (s, old_s - q * s)
        (old_t, t) = (t, old_t - q * t)

    return (old_r, old_s, old_t)
```

The return values mean:

$$
a \cdot old\_s + b \cdot old\_t = old\_r
$$

where $old\_r = \gcd(a, b)$.

## Modular Inverses

A **modular inverse** of $a$ modulo $n$ is a number $a^{-1}$ such that:

$$
a \cdot a^{-1} \equiv 1 \pmod n
$$

Not every number has a modular inverse. The number $a$ has an inverse modulo
$n$ exactly when:

$$
\gcd(a, n) = 1
$$

Example: find the inverse of $5$ modulo $12$.

We need a number $x$ such that:

$$
5x \equiv 1 \pmod {12}
$$

Try small values:

$$
5 \cdot 5 = 25 \equiv 1 \pmod {12}
$$

So:

$$
5^{-1} \equiv 5 \pmod {12}
$$

For a larger example, use the extended Euclidean algorithm. Earlier we found:

$$
101(-5) + 23(22) = 1
$$

Modulo $101$, this becomes:

$$
23(22) \equiv 1 \pmod {101}
$$

So the inverse of $23$ modulo $101$ is $22$.

Pseudocode:

```text
function inverse_mod(a, n):
    (g, x, y) = extended_gcd(a, n)
    if g != 1:
        error "inverse does not exist"
    return x mod n
```

## Modular Exponentiation

Modular exponentiation means computing:

$$
a^e \bmod n
$$

The direct method multiplies $a$ by itself $e$ times. That is too slow when
$e$ is large.

Example:

$$
3^5 \bmod 7
$$

Compute normally:

$$
3^5 = 243
$$

Then reduce:

$$
243 \equiv 5 \pmod 7
$$

So:

$$
3^5 \equiv 5 \pmod 7
$$

But for large exponents, we want to reduce as we go:

$$
3^2 = 9 \equiv 2 \pmod 7
$$

$$
3^4 \equiv 2^2 = 4 \pmod 7
$$

$$
3^5 = 3^4 \cdot 3 \equiv 4 \cdot 3 = 12 \equiv 5 \pmod 7
$$

Same answer, smaller intermediate numbers.

## Repeated Squaring

**Repeated squaring** computes powers efficiently by using the binary
representation of the exponent.

Example: compute $5^{13} \bmod 23$.

Write:

$$
13 = 8 + 4 + 1
$$

Compute powers by squaring:

$$
5^1 \equiv 5 \pmod {23}
$$

$$
5^2 \equiv 25 \equiv 2 \pmod {23}
$$

$$
5^4 \equiv 2^2 = 4 \pmod {23}
$$

$$
5^8 \equiv 4^2 = 16 \pmod {23}
$$

Now multiply the powers for $8$, $4$, and $1$:

$$
5^{13} = 5^8 \cdot 5^4 \cdot 5^1
$$

So:

$$
5^{13} \equiv 16 \cdot 4 \cdot 5 = 320 \equiv 21 \pmod {23}
$$

Pseudocode:

```text
function pow_mod(base, exponent, modulus):
    result = 1
    base = base mod modulus

    while exponent > 0:
        if exponent is odd:
            result = (result * base) mod modulus

        base = (base * base) mod modulus
        exponent = floor(exponent / 2)

    return result
```

This algorithm uses only about $\log_2(e)$ squaring steps for exponent $e$,
plus some multiplications.

## Why Repeated Squaring Matters for VDFs

Repeated squaring is fast when you are allowed to choose the exponent and use
its binary representation. But VDFs are interested in a different shape of
computation: a long chain of squarings that is deliberately hard to parallelize.

One simplified VDF-style operation is:

$$
y = x^{2^T}
$$

In a group where the order is unknown, the straightforward way to compute this
is to square repeatedly:

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

After three steps:

$$
y = x^8
$$

After $T$ steps:

$$
y = x^{2^T}
$$

The important intuition is that each squaring depends on the previous result.
That dependency is what makes repeated squaring relevant to verifiable delay
functions. This is not yet a full VDF construction or security proof; later
chapters will add unknown-order groups and Wesolowski proofs.

## Chia Connection

Chia uses proof of space and proof of time. The proof-of-time side relies on
verifiable delay functions, and repeated squaring is the core sequential
operation behind the VDF path studied later in this book.

Modular arithmetic also prepares us for finite fields, elliptic curves, and
BLS signatures. In those chapters, values are often reduced modulo a prime or
an algebraic modulus, and the arithmetic rules must be followed exactly.

This chapter gives the arithmetic vocabulary. Chia-specific constants,
serialization formats, and consensus rules must still be checked against Chia
documentation, Chia Network repositories, and protocol specifications.

Source starting points: [Chia Proof of Time](https://docs.chia.net/chia-blockchain/consensus/proof-of-time/)
and [Chia Proof of Space](https://docs.chia.net/chia-blockchain/consensus/proof-of-space-1.0/).

## Common Pitfalls

**Confusing division with modular inverse.** In modular arithmetic, division by
$a$ means multiplication by $a^{-1}$, and $a^{-1}$ may not exist.

**Forgetting the modulus.** The statement $7 \equiv 2$ is incomplete. You must
say the modulus, such as $7 \equiv 2 \pmod 5$.

**Assuming every nonzero number has an inverse.** This is true modulo a prime,
but not true modulo every integer. For example, $2$ has no inverse modulo $6$.

**Letting intermediate values grow unnecessarily.** Reduce modulo $n$ during
the computation, not only at the end, especially in code.

**Trusting `%` without checking negative behavior.** Programming languages can
handle negative remainders differently. Mathematical residues modulo $n$ are
usually chosen from $0$ through $n - 1$.

**Confusing fast exponentiation with VDF delay.** Repeated squaring can be used
for fast modular exponentiation, but VDFs rely on a sequential squaring process
in a setting where shortcuts are not available in the same way.

## Exercises

1. Compute the remainder when $83$ is divided by $9$.
2. Decide whether $41 \equiv 5 \pmod {12}$. Explain your answer using
   divisibility.
3. Compute $17 + 29 \pmod {10}$ and $17 \cdot 29 \pmod {10}$.
4. Use the Euclidean algorithm to compute $\gcd(84, 30)$.
5. Use the extended Euclidean algorithm to find integers $x$ and $y$ such that
   $35x + 12y = \gcd(35, 12)$.
6. Find the inverse of $7$ modulo $26$, or explain why it does not exist.
7. Find the inverse of $6$ modulo $21$, or explain why it does not exist.
8. Compute $4^{13} \bmod 9$ using repeated squaring.
9. Write pseudocode for a function that tests whether $a$ has an inverse modulo
   $n$.
10. In your own words, explain why the computation
    $x \to x^2 \to x^4 \to x^8$ is sequential.

## Further Reading

- Later chapter: Groups
- Later chapter: Finite Fields
- Later chapter: Unknown-Order Groups
- Later chapter: Wesolowski VDF
- Any introductory number theory text covering congruences and the Euclidean
  algorithm
