---
title: Rings and Fields
sidebar_position: 2
---

# Rings and Fields

## Goal

By the end of this chapter, you should understand the difference between rings,
integral domains, and fields. You should also understand why
$\mathbb{Z}/n\mathbb{Z}$ is not always a field, why prime moduli are special,
and why fields are needed before we can define elliptic curves cleanly.

## Prerequisites

You should know modular arithmetic and the basic definition of a group. In
particular, you should be comfortable with:

- addition and multiplication modulo $n$
- modular inverses
- additive and multiplicative notation for groups
- the idea of a set with one or more operations

## Motivation

Groups have one operation. Rings and fields have two operations that behave
like addition and multiplication.

This matters because elliptic curve equations, finite fields, pairings, and
many cryptographic algorithms need both operations. For example, an elliptic
curve equation may look like:

$$
y^2 = x^3 + ax + b
$$

To make sense of this equation, we need to know what addition, multiplication,
powers, and division mean in the number system where $x$ and $y$ live.

Rings and fields give us that language.

## Rings

A **ring** is a set with two operations, usually called addition and
multiplication.

The exact definition has several parts. A set $R$ is a ring if:

1. $R$ is an abelian group under addition.
2. Multiplication is associative.
3. Multiplication distributes over addition.

The distributive laws are:

$$
a(b + c) = ab + ac
$$

and:

$$
(a + b)c = ac + bc
$$

for all $a, b, c \in R$.

Some books require a ring to have a multiplicative identity, and some do not.
In this textbook, we will usually care about rings with a multiplicative
identity, but we will state the identity explicitly when it matters.

## Example: The Integers

The integers:

$$
\mathbb{Z} = \{\ldots, -2, -1, 0, 1, 2, \ldots\}
$$

form a ring under ordinary addition and multiplication.

Under addition:

- the identity is $0$
- the inverse of $a$ is $-a$
- addition is associative and commutative

Under multiplication:

- multiplication is associative
- multiplication distributes over addition
- $1$ is a multiplicative identity

But $\mathbb{Z}$ is not a field, because most integers do not have
multiplicative inverses inside $\mathbb{Z}$. For example, there is no integer
$x$ such that:

$$
2x = 1
$$

## Commutative Rings

A ring is **commutative** if multiplication commutes:

$$
ab = ba
$$

for all $a, b$ in the ring.

The integers are a commutative ring.

The modular rings $\mathbb{Z}/n\mathbb{Z}$ are also commutative rings:

$$
ab \equiv ba \pmod n
$$

Not every ring is commutative. For example, matrices form rings where
multiplication usually depends on order. This book mostly uses commutative
rings and fields.

## Multiplicative Identity

A **multiplicative identity** is an element, usually written $1$, that does
nothing under multiplication:

$$
1 \cdot a = a
$$

and:

$$
a \cdot 1 = a
$$

In $\mathbb{Z}$, the multiplicative identity is $1$.

In $\mathbb{Z}/5\mathbb{Z}$, the multiplicative identity is also the residue
class represented by $1$:

$$
1 \cdot 3 \equiv 3 \pmod 5
$$

A multiplicative identity is different from an additive identity. The additive
identity is $0$ because:

$$
a + 0 = a
$$

## Integers Modulo $n$ as Rings

For any positive integer $n$, the set:

$$
\mathbb{Z}/n\mathbb{Z} = \{0, 1, 2, \ldots, n - 1\}
$$

is a ring under addition and multiplication modulo $n$.

Example: in $\mathbb{Z}/8\mathbb{Z}$:

$$
5 + 6 \equiv 3 \pmod 8
$$

and:

$$
5 \cdot 6 \equiv 6 \pmod 8
$$

The operations stay inside the set because we always reduce modulo $8$.

## Zero Divisors

A **zero divisor** is a nonzero element $a$ such that there is another nonzero
element $b$ with:

$$
ab = 0
$$

In modular arithmetic, this means:

$$
ab \equiv 0 \pmod n
$$

even though neither $a$ nor $b$ is congruent to $0$.

Example: in $\mathbb{Z}/6\mathbb{Z}$:

$$
2 \cdot 3 \equiv 0 \pmod 6
$$

Here $2$ and $3$ are nonzero modulo $6$, but their product is zero. So $2$ and
$3$ are zero divisors.

Zero divisors are one reason $\mathbb{Z}/n\mathbb{Z}$ is not always a field.
If $a$ is a zero divisor, then it cannot have a multiplicative inverse. If it
did, multiplying $ab = 0$ by $a^{-1}$ would force $b = 0$, contradicting that
$b$ was nonzero.

## Integral Domains

An **integral domain** is a commutative ring with multiplicative identity where:

1. $0 \ne 1$.
2. There are no zero divisors.

The integers $\mathbb{Z}$ form an integral domain.

Example:

If $ab = 0$ in $\mathbb{Z}$, then either $a = 0$ or $b = 0$. You cannot multiply
two nonzero integers and get zero.

$\mathbb{Z}/6\mathbb{Z}$ is not an integral domain because:

$$
2 \cdot 3 \equiv 0 \pmod 6
$$

But $\mathbb{Z}/5\mathbb{Z}$ is an integral domain. There are no nonzero
residues whose product is $0$ modulo $5$.

## Fields

A **field** is a commutative ring with multiplicative identity where every
nonzero element has a multiplicative inverse.

In a field, you can add, subtract, multiply, and divide by any nonzero element.

The rational numbers $\mathbb{Q}$ form a field. For example, the inverse of
$2$ is:

$$
\frac{1}{2}
$$

The integers $\mathbb{Z}$ do not form a field, because $2$ has no inverse in
$\mathbb{Z}$.

## Why $\mathbb{Z}/n\mathbb{Z}$ Is Not Always a Field

$\mathbb{Z}/n\mathbb{Z}$ is a field exactly when $n$ is prime.

If $n$ is composite, then $n = ab$ for some integers $a$ and $b$ with:

$$
1 < a < n
$$

and:

$$
1 < b < n
$$

Then in $\mathbb{Z}/n\mathbb{Z}$:

$$
ab \equiv 0 \pmod n
$$

So $a$ and $b$ are zero divisors. A field cannot have zero divisors.

Example:

In $\mathbb{Z}/10\mathbb{Z}$:

$$
2 \cdot 5 \equiv 0 \pmod {10}
$$

so it is not a field.

If $p$ is prime, every nonzero element of $\mathbb{Z}/p\mathbb{Z}$ is coprime
to $p$, so it has a modular inverse. Therefore $\mathbb{Z}/p\mathbb{Z}$ is a
field.

Example: in $\mathbb{Z}/7\mathbb{Z}$, the nonzero elements are:

$$
1, 2, 3, 4, 5, 6
$$

Each has an inverse:

$$
1^{-1} \equiv 1 \pmod 7
$$

$$
2^{-1} \equiv 4 \pmod 7
$$

$$
3^{-1} \equiv 5 \pmod 7
$$

$$
6^{-1} \equiv 6 \pmod 7
$$

## Characteristic

The **characteristic** of a ring or field is the smallest positive integer $m$
such that:

$$
\underbrace{1 + 1 + \cdots + 1}_{m \text{ times}} = 0
$$

If no such positive integer exists, the characteristic is $0$.

The integers $\mathbb{Z}$ have characteristic $0$. No positive number of copies
of $1$ adds up to $0$ in $\mathbb{Z}$.

The ring $\mathbb{Z}/5\mathbb{Z}$ has characteristic $5$:

$$
1 + 1 + 1 + 1 + 1 \equiv 0 \pmod 5
$$

The field $\mathbb{Z}/p\mathbb{Z}$ has characteristic $p$ when $p$ is prime.

Characteristic matters because algebra can behave differently in different
characteristics. For example, in characteristic $2$:

$$
1 + 1 = 0
$$

This changes many formulas.

## Polynomial Rings

A **polynomial ring** is a ring whose elements are polynomials with
coefficients from another ring or field.

For example:

$$
\mathbb{Z}[x]
$$

is the ring of polynomials in $x$ with integer coefficients.

Examples of elements:

$$
x^2 + 3x + 2
$$

$$
5x^3 - x + 7
$$

If the coefficients come from $\mathbb{Z}/5\mathbb{Z}$, we write:

$$
(\mathbb{Z}/5\mathbb{Z})[x]
$$

In that ring, coefficients are reduced modulo $5$. For example:

$$
4x + 3x = 7x \equiv 2x \pmod 5
$$

Polynomial rings let us build larger algebraic systems from smaller ones.
Finite fields used in pairing-based cryptography are often built using
polynomials and quotient rings.

## Quotient Rings, Gently

A **quotient ring** is what you get when you decide that two ring elements
should count as the same if their difference is a multiple of some chosen
element or ideal.

The familiar example is modular arithmetic:

$$
\mathbb{Z}/n\mathbb{Z}
$$

This can be read as "integers where numbers that differ by a multiple of $n$
are treated as equivalent."

For example, in $\mathbb{Z}/5\mathbb{Z}$:

$$
12 \equiv 2 \pmod 5
$$

because:

$$
12 - 2 = 10
$$

and $10$ is a multiple of $5$.

Polynomial quotient rings follow the same idea, but with polynomials. Instead
of reducing integers by a number like $5$, we reduce polynomials by another
polynomial.

For example, in a quotient where $x^2 + 1$ is treated as zero, we get:

$$
x^2 = -1
$$

This lets high-degree polynomials be reduced to lower-degree representatives.

This chapter only needs the intuition. Later finite-field chapters will use
this idea more concretely.

## Why Fields Are Needed for Elliptic Curves

Elliptic curve equations use addition, multiplication, powers, and division by
nonzero values. A typical curve equation has the form:

$$
y^2 = x^3 + ax + b
$$

To define the curve over a set of numbers, those operations need to behave
well. Fields give us that setting.

Over a field, every nonzero element has an inverse. That means formulas used in
the elliptic curve group law can divide by nonzero quantities when needed.

For cryptography, elliptic curves are often defined over finite fields. This
keeps the set of possible points finite and makes computation exact.

## Chia Connection

BLS12-381, the pairing-friendly curve used in BLS signatures, is built using
finite fields. Later chapters will discuss the base field, scalar field, and
extension fields involved in BLS12-381.

For now, the important point is that "field" is not decoration. The field is
the arithmetic environment where curve coordinates, polynomial relations, and
pairing computations live.

Chia uses BLS signatures, so understanding fields is part of the path toward
understanding how those signatures are represented and verified. Exact
parameters and implementation details should be checked against primary
specifications and Chia-related source code when those chapters make specific
claims.

Source starting points: [BLS12-381 construction notes](https://electriccoin.co/blog/new-snark-curve/)
and the [IETF pairing-friendly curves draft](https://datatracker.ietf.org/doc/draft-irtf-cfrg-pairing-friendly-curves/08/).

## Common Pitfalls

**Thinking a ring is just a group with multiplication added.** A ring has a
specific interaction between addition and multiplication through distributive
laws.

**Assuming every $\mathbb{Z}/n\mathbb{Z}$ is a field.** It is a field only when
$n$ is prime.

**Ignoring zero divisors.** Zero divisors break familiar cancellation rules.
If $ab = ac$, you cannot always cancel $a$ unless you know cancellation is
valid.

**Confusing integral domains with fields.** Every field is an integral domain,
but not every integral domain is a field. The integers are an integral domain
but not a field.

**Forgetting the characteristic.** In finite fields, repeated addition of $1$
eventually gives $0$. This can change algebraic identities.

**Treating quotient rings as mysterious.** Modular arithmetic is already a
quotient-ring idea: reduce by a rule and work with representatives.

## Exercises

1. Explain why $\mathbb{Z}$ is a ring under ordinary addition and
   multiplication.
2. Is $\mathbb{Z}$ a field? Explain which field rule fails.
3. Find two nonzero zero divisors in $\mathbb{Z}/12\mathbb{Z}$.
4. Is $\mathbb{Z}/9\mathbb{Z}$ a field? Explain using either zero divisors or
   modular inverses.
5. List the multiplicative inverses of all nonzero elements in
   $\mathbb{Z}/5\mathbb{Z}$.
6. What is the characteristic of $\mathbb{Z}/11\mathbb{Z}$?
7. In $(\mathbb{Z}/5\mathbb{Z})[x]$, simplify $(3x + 4x) + (2 + 4)$.
8. In ordinary integers, $ab = ac$ and $a \ne 0$ implies $b = c$. Give an
   example showing that cancellation can fail in $\mathbb{Z}/6\mathbb{Z}$.
9. Explain in your own words why fields are useful for elliptic curve
   equations.

## Further Reading

- Later chapter: Finite Fields
- Later chapter: Elliptic Curve Group Law
- Later chapter: BLS12-381
- Any introductory abstract algebra text covering rings, fields, and quotient
  rings
