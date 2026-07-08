---
title: Finite Fields
sidebar_position: 3
---

# Finite Fields

## Goal

By the end of this chapter, you should understand prime fields, basic
arithmetic in $\mathbb{F}_p$, why every nonzero element has an inverse, and how
larger finite fields can be built from irreducible polynomials.

You should also have a first intuition for extension fields, field towers, the
Frobenius map, and why finite fields are essential for elliptic curves and
pairings.

## Prerequisites

You should be comfortable with modular arithmetic, groups, rings, and fields.
In particular, you should know:

- addition and multiplication modulo $n$
- modular inverses
- why $\mathbb{Z}/p\mathbb{Z}$ is a field when $p$ is prime
- polynomial rings at a basic level
- quotient rings as "reduce by a rule" arithmetic

## Motivation

Cryptography often needs arithmetic that is exact, finite, and efficient.
Finite fields provide that environment.

In a finite field:

- there are only finitely many values
- addition, subtraction, multiplication, and division by nonzero values work
- arithmetic is exact, not floating point
- the rules are structured enough for algebra and cryptography

Elliptic curves, pairings, and BLS signatures all use finite fields. Without
finite fields, later chapters would not have a clean arithmetic setting for
curve coordinates and pairing computations.

## Prime Fields $\mathbb{F}_p$

The simplest finite fields are **prime fields**. If $p$ is prime, then:

$$
\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}
$$

This is the set:

$$
\{0, 1, 2, \ldots, p - 1\}
$$

with addition and multiplication performed modulo $p$.

Example:

$$
\mathbb{F}_5 = \{0, 1, 2, 3, 4\}
$$

The word "field" means every nonzero element has a multiplicative inverse.
That works because $p$ is prime.

## Addition Modulo $p$

Addition in $\mathbb{F}_p$ means ordinary addition followed by reduction modulo
$p$.

Example in $\mathbb{F}_5$:

$$
3 + 4 = 7 \equiv 2 \pmod 5
$$

So in $\mathbb{F}_5$:

$$
3 + 4 = 2
$$

The equality is happening inside the field. If we want to emphasize the
ordinary integer computation, we write the congruence.

## Multiplication Modulo $p$

Multiplication in $\mathbb{F}_p$ also means ordinary multiplication followed by
reduction modulo $p$.

Example in $\mathbb{F}_7$:

$$
5 \cdot 6 = 30 \equiv 2 \pmod 7
$$

So in $\mathbb{F}_7$:

$$
5 \cdot 6 = 2
$$

All results remain in:

$$
\{0, 1, \ldots, p - 1\}
$$

## Inverses in $\mathbb{F}_p$

Every nonzero element of $\mathbb{F}_p$ has a multiplicative inverse.

Example: find the inverse of $3$ in $\mathbb{F}_7$.

We need $x$ such that:

$$
3x \equiv 1 \pmod 7
$$

Try small values:

$$
3 \cdot 5 = 15 \equiv 1 \pmod 7
$$

So:

$$
3^{-1} = 5
$$

The extended Euclidean algorithm can find inverses efficiently. Since $p$ is
prime, every nonzero $a$ is coprime to $p$, so the inverse exists.

## Fermat's Little Theorem

**Fermat's little theorem** says that if $p$ is prime and $a$ is not divisible
by $p$, then:

$$
a^{p - 1} \equiv 1 \pmod p
$$

Example with $p = 7$ and $a = 3$:

$$
3^6 = 729
$$

and:

$$
729 \equiv 1 \pmod 7
$$

This theorem gives another way to find inverses. Since:

$$
a^{p - 1} \equiv 1 \pmod p
$$

we can multiply both sides by $a^{-1}$ conceptually and get:

$$
a^{p - 2} \equiv a^{-1} \pmod p
$$

Example in $\mathbb{F}_7$:

$$
3^{-1} \equiv 3^{5} \pmod 7
$$

Compute:

$$
3^2 \equiv 2 \pmod 7
$$

$$
3^4 \equiv 4 \pmod 7
$$

$$
3^5 \equiv 4 \cdot 3 = 12 \equiv 5 \pmod 7
$$

So again:

$$
3^{-1} = 5
$$

## Extension Fields $\mathbb{F}_{p^n}$

Not every finite field has a prime number of elements. There are also fields
with:

$$
p^n
$$

elements, where $p$ is prime and $n \ge 1$.

These are called **extension fields**. They extend the prime field
$\mathbb{F}_p$ by adding a new element that satisfies a polynomial relation.

The notation:

$$
\mathbb{F}_{p^n}
$$

means a finite field with $p^n$ elements.

For example:

$$
\mathbb{F}_{2^3}
$$

has $8$ elements.

## Constructing Extension Fields with Irreducible Polynomials

To construct an extension field, start with polynomials over $\mathbb{F}_p$ and
reduce by an **irreducible polynomial**.

An irreducible polynomial is like a prime number for polynomials. It cannot be
factored into lower-degree nonconstant polynomials over the same field.

Example over $\mathbb{F}_2$:

$$
f(x) = x^2 + x + 1
$$

This polynomial is irreducible over $\mathbb{F}_2$. To check, test $0$ and
$1$:

$$
f(0) = 1
$$

$$
f(1) = 1 + 1 + 1 = 1 \pmod 2
$$

It has no root in $\mathbb{F}_2$, so this degree-$2$ polynomial is irreducible.

Now build:

$$
\mathbb{F}_2[x] / (x^2 + x + 1)
$$

This means polynomial arithmetic over $\mathbb{F}_2$, with the rule:

$$
x^2 + x + 1 = 0
$$

Equivalently:

$$
x^2 = x + 1
$$

because in characteristic $2$, subtraction and addition are the same.

Every element can be represented as:

$$
a + bx
$$

where $a, b \in \mathbb{F}_2$.

So the field has four elements:

$$
0, 1, x, 1 + x
$$

## A Small Extension-Field Multiplication Example

Work in:

$$
\mathbb{F}_2[x] / (x^2 + x + 1)
$$

Compute:

$$
x(1 + x)
$$

First multiply as polynomials:

$$
x(1 + x) = x + x^2
$$

Use the reduction rule $x^2 = x + 1$:

$$
x + x^2 = x + (x + 1)
$$

In characteristic $2$, $x + x = 0$, so:

$$
x + (x + 1) = 1
$$

Thus:

$$
x(1 + x) = 1
$$

So $x$ and $1 + x$ are multiplicative inverses in this field.

## Field Towers

A **field tower** builds fields in stages.

For example, instead of jumping directly from $\mathbb{F}_p$ to a large
extension, we can build:

$$
\mathbb{F}_p \subset \mathbb{F}_{p^2} \subset \mathbb{F}_{p^6} \subset \mathbb{F}_{p^{12}}
$$

The symbol $\subset$ here means each field is contained inside the next one.

Field towers are useful in pairing-friendly curves because computations in
large extension fields can be organized using smaller extension layers. This is
an implementation and efficiency concern as well as an algebraic construction.

We will not build a full tower here. The important idea is that extension
fields can be layered.

## Frobenius Map, Lightly

In a field of characteristic $p$, the **Frobenius map** sends:

$$
a \mapsto a^p
$$

In finite fields, this map has special structure and is often efficient to
compute.

In the prime field $\mathbb{F}_p$, Fermat's little theorem implies:

$$
a^p = a
$$

for every $a \in \mathbb{F}_p$.

In extension fields, the Frobenius map is not always the identity, but it still
preserves addition and multiplication:

$$
(a + b)^p = a^p + b^p
$$

and:

$$
(ab)^p = a^p b^p
$$

This becomes useful in pairing computations and field arithmetic. For now, it
is enough to recognize the name and the operation.

## Why Finite Fields Are Essential for Elliptic Curves and Pairings

Elliptic curve cryptography needs a finite arithmetic environment where
equations can be evaluated exactly and where division by nonzero values is
available. Finite fields provide that environment.

An elliptic curve over a finite field might be written:

$$
E : y^2 = x^3 + ax + b
$$

where $x$, $y$, $a$, and $b$ are elements of a finite field.

Pairings need even more field structure. The output of a pairing lives in a
target group related to an extension field. In pairing-friendly curves, field
extensions are part of the construction that makes pairings computable and
useful.

## Chia Connection

BLS12-381 uses finite fields. At a high level, it has a base field used for
curve coordinates and a scalar field used for scalar multiplication. Pairing
computations also use extension fields.

This chapter does not give the BLS12-381 parameters. Later chapters will
separate the curve family from the specific BLS12-381 parameter set and cite
standard sources for factual details.

For now, the important point is that BLS signatures in Chia rest on arithmetic
in finite fields, not on floating-point numbers or informal real-number
geometry.

Source starting points: [BLS12-381 construction notes](https://electriccoin.co/blog/new-snark-curve/),
[IETF pairing-friendly curves draft](https://datatracker.ietf.org/doc/draft-irtf-cfrg-pairing-friendly-curves/08/),
and [Chia Keys and Signatures](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/keys/keys-and-signatures.md).

## Common Pitfalls

**Assuming every modulus gives a field.** $\mathbb{Z}/n\mathbb{Z}$ is a field
only when $n$ is prime.

**Confusing $\mathbb{F}_{p^n}$ with integers modulo $p^n$.** The field
$\mathbb{F}_{p^n}$ is not usually the same thing as
$\mathbb{Z}/p^n\mathbb{Z}$. For $n > 1$, the latter has zero divisors and is
not a field.

**Forgetting to reduce polynomials.** In extension fields, polynomial products
must be reduced by the chosen irreducible polynomial.

**Treating the symbol $x$ as an ordinary unknown.** In a quotient construction,
$x$ represents a field element satisfying a fixed polynomial relation.

**Assuming Frobenius is always the identity.** It is the identity on
$\mathbb{F}_p$, but in extension fields it can move elements nontrivially.

**Thinking field towers are only theory.** Field towers often matter for
efficient implementation of pairing arithmetic.

## Exercises

1. Compute $4 + 6$ and $4 \cdot 6$ in $\mathbb{F}_7$.
2. Find the inverse of $5$ in $\mathbb{F}_{11}$.
3. Use Fermat's little theorem to compute $3^{-1}$ in $\mathbb{F}_{13}$.
4. Explain why $\mathbb{Z}/9\mathbb{Z}$ is not the field
   $\mathbb{F}_9$.
5. In $\mathbb{F}_2[x]/(x^2 + x + 1)$, compute $(1 + x)^2$.
6. List the four elements of $\mathbb{F}_2[x]/(x^2 + x + 1)$.
7. In your own words, explain what it means to reduce a polynomial by
   $x^2 + x + 1$.
8. What does the Frobenius map do to elements of $\mathbb{F}_p$?
9. Why do elliptic curve equations need field arithmetic instead of ordinary
   floating-point arithmetic?

## Further Reading

- Later chapter: Elliptic Curve Group Law
- Later chapter: Curves Over Finite Fields
- Later chapter: Pairings
- Later chapter: BLS12-381
- Any introductory abstract algebra text covering finite fields and polynomial
  quotient rings
