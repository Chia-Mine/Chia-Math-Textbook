---
title: Class Groups
sidebar_position: 2
---

# Class Groups

## Goal

By the end of this chapter, you should have an intuitive first model of class
groups of binary quadratic forms: discriminants, primitive forms, reduced
forms, composition, identity, inverses, and why the group order is unknown.

This is not a full algebraic number theory chapter. Advanced details are
marked as future expansion.

## Prerequisites

You should know:

- modular arithmetic
- groups
- unknown-order groups
- why repeated squaring matters for VDFs

## Motivation for Class Groups

VDFs need groups of unknown order. RSA groups can provide unknown order, but
they require someone to generate a composite modulus and forget its
factorization. That creates a trusted setup concern.

Class groups provide another path. They can give groups of unknown order
without a secret factorization trapdoor.

Chia's proof-of-time materials describe repeated squaring in class groups of
unknown order as the sequential function used in Chia's VDF design:
[Chia green paper introduction](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/green-paper/green-paper-introduction.md).
The Chia VDF implementation repository also points to a class group
construction document:
[Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf).

## Binary Quadratic Forms

A **binary quadratic form** is an expression:

$$
ax^2 + bxy + cy^2
$$

where $a$, $b$, and $c$ are integers.

We often write the form as a triple:

$$
(a, b, c)
$$

Example:

$$
2x^2 + 3xy + 5y^2
$$

is represented by:

$$
(2, 3, 5)
$$

The variables $x$ and $y$ are not the group elements. The form itself, or more
precisely its equivalence class, is the object we will combine.

## Discriminants

The **discriminant** of a binary quadratic form $(a, b, c)$ is:

$$
\Delta = b^2 - 4ac
$$

Example:

For:

$$
(2, 3, 5)
$$

the discriminant is:

$$
\Delta = 3^2 - 4 \cdot 2 \cdot 5 = 9 - 40 = -31
$$

In the class groups used for VDFs, the discriminant is usually negative. This
leads to **imaginary quadratic class groups**.

## Primitive Forms

A form $(a, b, c)$ is **primitive** if:

$$
\gcd(a, b, c) = 1
$$

Example:

$$
(2, 3, 5)
$$

is primitive because:

$$
\gcd(2, 3, 5) = 1
$$

But:

$$
(2, 4, 6)
$$

is not primitive because:

$$
\gcd(2, 4, 6) = 2
$$

Primitive forms are the ones used in the class group.

## Reduced Forms

Many different forms can represent the same class. A **reduced form** is a
canonical-looking representative chosen by size conditions.

For negative discriminants, reduced forms are small compared with other
equivalent forms. They are useful because computations can reduce a form back
to a compact representative.

This is similar in spirit to reducing an integer modulo $n$:

$$
17 \equiv 2 \pmod 5
$$

The number $2$ is a small representative of the same residue class.

TODO: Future expansion should give the exact reduction inequalities for
negative discriminants and walk through a complete reduction example.

## Equivalence Classes

Class groups are built from equivalence classes of forms, not just individual
forms.

The exact equivalence relation comes from changes of variables that preserve
the discriminant. The details are technical, but the intuition is:

Two forms are considered equivalent if they describe the same arithmetic object
after a reversible change of coordinates.

The group elements are these equivalence classes.

## Composition, Conceptually

The group operation is called **composition**. It combines two form classes
with the same discriminant and produces another form class with that same
discriminant.

Conceptually:

$$
[(a_1,b_1,c_1)] \circ [(a_2,b_2,c_2)] = [(a_3,b_3,c_3)]
$$

where brackets mean "equivalence class."

The actual composition algorithm is more involved than modular multiplication.
Efficient implementations use specialized algorithms for composing and reducing
forms.

TODO: Future expansion should introduce NUCOMP and NUDUPL at a high level once
the reader has seen the basic class group operation.

## Identity and Inverses

Like any group, a class group has an identity element and inverses.

The **identity** is the class of a special principal form. Its exact shape
depends on the discriminant.

The **inverse** of a form class can be represented by changing the sign of the
middle coefficient:

$$
(a, b, c)^{-1} \sim (a, -b, c)
$$

This should be read as intuition for this first chapter. The precise statement
belongs with the full theory of binary quadratic forms.

## Imaginary Quadratic Class Groups

An **imaginary quadratic class group** is associated with a negative
discriminant.

These groups are finite, abelian, and suitable for unknown-order group
constructions. The group operation is composition of form classes.

The word "imaginary" comes from algebraic number theory. You do not need the
full number-field background yet. For VDF intuition, the important points are:

- elements can be represented by reduced binary quadratic forms
- forms can be composed and squared
- the group order is not efficiently known from the public discriminant
- no trusted factorization secret is needed in the RSA-modulus sense

## Why the Group Order Is Unknown

For an RSA group, knowing the factorization of $N$ gives the group order.

For class groups, there is no analogous short secret factorization generated by
a trusted party. The order is the class number, and computing it for the large
discriminants used in VDF settings is intended to be infeasible.

This makes class groups attractive for public VDF parameters. Participants can
know the discriminant and the group operation without knowing the group order.

This is a security-relevant claim, not a proof. A full treatment would require
class number algorithms and concrete parameter analysis.

## Why Chia Uses Class Groups for VDFs

Chia needs a proof-of-time mechanism where evaluation takes sequential time and
verification is faster. Chia documentation describes VDFs as proofs that a
sequential function was executed a certain number of times:
[Proof of Time](https://docs.chia.net/chia-blockchain/consensus/proof-of-time/).

The class-group setting supports repeated squaring in a group of unknown order:

$$
g \to g^2 \to g^4 \to g^8 \to \cdots
$$

Because the group order is unknown, the evaluator cannot reduce the exponent
using a known order shortcut. Later, a Wesolowski proof lets a verifier check
the result faster than recomputing every squaring.

## Chia Connection

The Chia VDF path uses class groups for proof of time. The implementation
repository discusses repeated squaring of a generator form and proof generation
segments:
[Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf).

For the purposes of this textbook, the main connection is:

```text
class group
-> unknown order
-> repeated squaring
-> Wesolowski proof
-> proof of time
```

Exact discriminant generation, reducer algorithms, proof segment parameters,
and performance engineering are implementation topics for later chapters.

## Common Pitfalls

**Thinking the form variables are the group elements.** The group elements are
equivalence classes of forms, not values of $x$ and $y$.

**Confusing discriminant with modulus.** A discriminant is not the same thing
as the modulus in $\mathbb{Z}/n\mathbb{Z}$.

**Assuming composition is ordinary multiplication.** Composition is the class
group operation and has its own algorithm.

**Forgetting equivalence classes.** A reduced form is a representative, not the
whole class.

**Treating this chapter as a full proof.** This is an intuition-first bridge.
The exact theory requires more algebraic number theory.

**Overstating unknown order.** The order exists. It is intended to be hard to
compute from the public parameters.

## Exercises

1. Compute the discriminant of the form $(1, 1, 6)$.
2. Is $(3, 6, 9)$ primitive? Explain.
3. Give a short explanation of why reduced forms are useful.
4. In your own words, describe composition of form classes.
5. What is the intuitive inverse of $(a, b, c)$?
6. Why are negative discriminants associated with imaginary quadratic class
   groups?
7. Explain why avoiding a trusted RSA modulus setup is useful for VDFs.
8. What information would make exponent reduction shortcuts possible in a
   finite group?
9. Identify two details in this chapter marked for future expansion.

## Further Reading

- [Chia Proof of Time documentation](https://docs.chia.net/chia-blockchain/consensus/proof-of-time/)
- [Chia green paper introduction](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/green-paper/green-paper-introduction.md)
- [Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf)
- [Chia VDF competition repository](https://github.com/Chia-Network/vdf-competition)
- Introductory references on binary quadratic forms and imaginary quadratic
  class groups
