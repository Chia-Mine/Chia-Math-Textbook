---
title: Groups
sidebar_position: 1
---

# Groups

## Goal

By the end of this chapter, you should understand what a group is, how to check
the group rules, and why groups are one of the main languages of modern
cryptography.

You should also be able to distinguish additive notation from multiplicative
notation, recognize simple subgroups and cyclic groups, compute the order of an
element in small examples, and understand the basic idea of a homomorphism.

## Prerequisites

You should be comfortable with modular arithmetic: remainders, congruence
modulo $n$, modular addition, modular multiplication, and modular inverses.

You do not need prior abstract algebra.

## Motivation

Cryptography often needs a setting where operations are predictable, reversible,
and still hard to undo without special information. Groups give us a precise
way to talk about such settings.

Instead of saying "these values can be combined somehow," group theory asks:

- is the result still in the same set?
- does the order of parentheses matter?
- is there a do-nothing element?
- can every operation be undone?

Those questions are simple, but they become powerful when the set is large and
the operation has a useful structure.

## Binary Operations

A **binary operation** on a set $G$ is a rule that combines two elements of $G$
to produce an output.

For example, ordinary addition combines two integers:

$$
2 + 5 = 7
$$

Ordinary multiplication also combines two integers:

$$
2 \cdot 5 = 10
$$

In group theory, we often write a generic operation as $\star$:

$$
a \star b
$$

This notation means "combine $a$ and $b$ using the operation currently being
studied."

## Closure

A set is **closed** under an operation if combining two elements of the set
always gives another element of the same set.

Example: the integers are closed under addition. If $a$ and $b$ are integers,
then $a + b$ is also an integer.

The positive integers are not closed under subtraction. For example:

$$
3 - 5 = -2
$$

and $-2$ is not a positive integer.

Modulo arithmetic gives small finite examples. Let:

$$
\mathbb{Z}/5\mathbb{Z} = \{0, 1, 2, 3, 4\}
$$

Under addition modulo $5$, this set is closed:

$$
3 + 4 \equiv 2 \pmod 5
$$

The result $2$ is still in $\{0, 1, 2, 3, 4\}$.

## Associativity

An operation is **associative** if parentheses do not matter:

$$
(a \star b) \star c = a \star (b \star c)
$$

for all $a$, $b$, and $c$ in the set.

Ordinary integer addition is associative:

$$
(2 + 3) + 4 = 2 + (3 + 4)
$$

Both sides equal $9$.

Ordinary subtraction is not associative:

$$
(10 - 3) - 2 = 5
$$

but:

$$
10 - (3 - 2) = 9
$$

Associativity matters because it lets us write expressions like $a \star b
\star c$ without constantly specifying parentheses.

## Identity

An **identity element** is an element that does nothing when combined with any
other element.

For additive notation, the identity is often written $0$:

$$
a + 0 = a
$$

For multiplicative notation, the identity is often written $1$:

$$
a \cdot 1 = a
$$

Example: in $\mathbb{Z}/5\mathbb{Z}$ under addition modulo $5$, the identity is
$0$.

Example: in the nonzero residues modulo $5$ under multiplication modulo $5$,

$$
\{1, 2, 3, 4\}
$$

the identity is $1$.

## Inverses

An **inverse** of an element is something that undoes it.

In additive notation, the inverse of $a$ is written $-a$ and satisfies:

$$
a + (-a) = 0
$$

Example: modulo $5$, the additive inverse of $2$ is $3$ because:

$$
2 + 3 \equiv 0 \pmod 5
$$

In multiplicative notation, the inverse of $a$ is written $a^{-1}$ and
satisfies:

$$
a \cdot a^{-1} = 1
$$

Example: modulo $5$, the multiplicative inverse of $2$ is $3$ because:

$$
2 \cdot 3 \equiv 1 \pmod 5
$$

The notation depends on the operation. The additive inverse of $2$ modulo $5$
and the multiplicative inverse of $2$ modulo $5$ happen to both be $3$, but
that is a coincidence in this small example.

## Definition of a Group

A **group** is a set $G$ together with a binary operation $\star$ satisfying
four rules:

1. Closure: if $a, b \in G$, then $a \star b \in G$.
2. Associativity: $(a \star b) \star c = a \star (b \star c)$ for all
   $a, b, c \in G$.
3. Identity: there is an element $e \in G$ such that $e \star a = a$ and
   $a \star e = a$ for every $a \in G$.
4. Inverses: for every $a \in G$, there is an element $a^{-1} \in G$ such that
   $a \star a^{-1} = e$ and $a^{-1} \star a = e$.

The set and the operation both matter. A set is not a group by itself.

## Example: Addition Modulo $n$

For any positive integer $n$, the set:

$$
\mathbb{Z}/n\mathbb{Z} = \{0, 1, 2, \ldots, n - 1\}
$$

is a group under addition modulo $n$.

For $n = 6$, the set is:

$$
\{0, 1, 2, 3, 4, 5\}
$$

Check the group rules:

- closure: adding two residues and reducing modulo $6$ gives another residue
- associativity: addition is associative before and after reduction
- identity: $0$
- inverses: the inverse of $a$ is $6 - a$ modulo $6$

Examples of inverses:

$$
1 + 5 \equiv 0 \pmod 6
$$

$$
2 + 4 \equiv 0 \pmod 6
$$

$$
3 + 3 \equiv 0 \pmod 6
$$

## Example: Multiplication Modulo $n$

The set $\mathbb{Z}/n\mathbb{Z}$ is usually not a group under multiplication.

For example, modulo $6$:

$$
2 \cdot 3 \equiv 0 \pmod 6
$$

But $2$ has no multiplicative inverse modulo $6$. There is no $x$ such that:

$$
2x \equiv 1 \pmod 6
$$

To get a multiplicative group modulo $n$, we use only the residues that are
coprime to $n$. This group is written:

$$
(\mathbb{Z}/n\mathbb{Z})^\times
$$

For $n = 8$, the invertible residues are:

$$
(\mathbb{Z}/8\mathbb{Z})^\times = \{1, 3, 5, 7\}
$$

Check a few products:

$$
3 \cdot 5 = 15 \equiv 7 \pmod 8
$$

$$
3 \cdot 3 = 9 \equiv 1 \pmod 8
$$

$$
5 \cdot 5 = 25 \equiv 1 \pmod 8
$$

The identity is $1$, and each element has a multiplicative inverse.

## Additive and Multiplicative Notation

The same group idea can be written in different notation.

In **additive notation**:

- operation: $a + b$
- identity: $0$
- inverse: $-a$
- repeated operation: $ka = a + a + \cdots + a$

In **multiplicative notation**:

- operation: $ab$ or $a \cdot b$
- identity: $1$
- inverse: $a^{-1}$
- repeated operation: $a^k = a \cdot a \cdots a$

The notation is a convention, not a guarantee that the operation is ordinary
addition or ordinary multiplication.

Elliptic curve groups are often written additively:

$$
P + Q
$$

Repeated addition is written:

$$
kP
$$

Unknown-order groups for VDFs are often written multiplicatively:

$$
g^k
$$

Read the notation in context.

## Abelian Groups

A group is **abelian** if the operation commutes:

$$
a \star b = b \star a
$$

for all $a, b \in G$.

Addition modulo $n$ is abelian:

$$
a + b \equiv b + a \pmod n
$$

Multiplication modulo $n$ among invertible residues is also abelian:

$$
ab \equiv ba \pmod n
$$

Not every group is abelian. In later mathematics, examples include groups of
symmetries where doing operations in different orders can produce different
results.

Many groups used in this book are abelian, but the word should still be stated
when it matters.

## Subgroups

A **subgroup** is a smaller group inside a larger group. If $H$ is a subgroup
of $G$, then:

- every element of $H$ is in $G$
- the operation is the same operation used in $G$
- $H$ is itself a group

Example: consider $\mathbb{Z}/6\mathbb{Z}$ under addition. The set:

$$
H = \{0, 3\}
$$

is a subgroup.

Check:

$$
0 + 0 \equiv 0 \pmod 6
$$

$$
0 + 3 \equiv 3 \pmod 6
$$

$$
3 + 3 \equiv 0 \pmod 6
$$

The identity $0$ is present, and each element has an inverse inside $H$.

But:

$$
\{0, 2, 3\}
$$

is not a subgroup under addition modulo $6$, because:

$$
2 + 3 \equiv 5 \pmod 6
$$

and $5$ is not in the set.

## Cyclic Groups and Generators

A group is **cyclic** if one element can generate the entire group by repeated
use of the operation. Such an element is called a **generator**.

In additive notation, the subgroup generated by $g$ is:

$$
\{0, g, 2g, 3g, \ldots\}
$$

In multiplicative notation, the subgroup generated by $g$ is:

$$
\{1, g, g^2, g^3, \ldots\}
$$

Example: $\mathbb{Z}/6\mathbb{Z}$ under addition is cyclic. The element $1$
generates the whole group:

$$
0, 1, 2, 3, 4, 5
$$

The element $2$ does not generate the whole group:

$$
0, 2, 4, 0, 2, 4, \ldots
$$

It generates the subgroup:

$$
\{0, 2, 4\}
$$

Example: $(\mathbb{Z}/7\mathbb{Z})^\times$ under multiplication is:

$$
\{1, 2, 3, 4, 5, 6\}
$$

The element $3$ generates the whole group:

$$
3^1 \equiv 3 \pmod 7
$$

$$
3^2 \equiv 2 \pmod 7
$$

$$
3^3 \equiv 6 \pmod 7
$$

$$
3^4 \equiv 4 \pmod 7
$$

$$
3^5 \equiv 5 \pmod 7
$$

$$
3^6 \equiv 1 \pmod 7
$$

So the powers of $3$ hit every element.

## Order of a Group

The **order of a group** is the number of elements in the group. It is written
$|G|$.

Example:

$$
|\mathbb{Z}/6\mathbb{Z}| = 6
$$

under addition modulo $6$.

Example:

$$
|(\mathbb{Z}/8\mathbb{Z})^\times| = 4
$$

because:

$$
(\mathbb{Z}/8\mathbb{Z})^\times = \{1, 3, 5, 7\}
$$

For infinite groups, the order is infinite. This book mostly uses finite groups
or very large finite groups.

## Order of an Element

The **order of an element** is the smallest positive number of times you apply
the operation to get back to the identity.

In additive notation, the order of $a$ is the smallest positive $k$ such that:

$$
ka = 0
$$

In multiplicative notation, the order of $a$ is the smallest positive $k$ such
that:

$$
a^k = 1
$$

Example: in $\mathbb{Z}/6\mathbb{Z}$ under addition, the element $2$ has order
$3$:

$$
2 + 2 + 2 \equiv 0 \pmod 6
$$

The element $1$ has order $6$:

$$
6 \cdot 1 \equiv 0 \pmod 6
$$

Example: in $(\mathbb{Z}/7\mathbb{Z})^\times$, the element $2$ has order $3$:

$$
2^1 \equiv 2 \pmod 7
$$

$$
2^2 \equiv 4 \pmod 7
$$

$$
2^3 \equiv 1 \pmod 7
$$

An element is a generator of a finite group if its order equals the order of
the group.

## Homomorphisms

A **homomorphism** is a function between groups that preserves the group
operation.

Suppose $(G, \star)$ and $(H, \diamond)$ are groups. A function:

$$
\varphi : G \to H
$$

is a homomorphism if:

$$
\varphi(a \star b) = \varphi(a) \diamond \varphi(b)
$$

for all $a, b \in G$.

Example: define:

$$
\varphi : \mathbb{Z}/6\mathbb{Z} \to \mathbb{Z}/3\mathbb{Z}
$$

by:

$$
\varphi(x) = x \bmod 3
$$

This preserves addition:

$$
\varphi(a + b \bmod 6) = \varphi(a) + \varphi(b) \bmod 3
$$

Try $a = 4$ and $b = 5$:

$$
4 + 5 \equiv 3 \pmod 6
$$

so:

$$
\varphi(4 + 5) = \varphi(3) = 0
$$

On the other side:

$$
\varphi(4) + \varphi(5) \equiv 1 + 2 \equiv 0 \pmod 3
$$

Both sides match.

Homomorphisms matter because they let structure move from one group to another.
Later, pairings will be a more advanced example of maps that preserve useful
algebraic structure.

## Why Cryptography Uses Groups

Groups give cryptography a balance of structure and hardness.

The structure lets honest users compute:

- combine elements
- repeat an operation many times
- verify equations
- use inverses when appropriate
- reason about identities and generators

The hardness comes from choosing groups where some problems appear difficult.
For example, in some groups it is easy to compute $g^x$ from $g$ and $x$, but
hard to recover $x$ from $g$ and $g^x$. That is the shape of a discrete
logarithm problem.

This chapter does not prove any cryptographic hardness. It only introduces the
language needed to state such assumptions carefully.

## Chia Connection

Chia uses group-based mathematics in more than one place.

BLS signatures use elliptic-curve groups. These groups are usually written in
additive notation, with points such as $P$ and $Q$ combined as $P + Q$ and
scaled as $kP$. Later chapters will explain elliptic curve group law, pairings,
BLS12-381, and BLS signatures.

VDFs use groups of unknown order. These are often written multiplicatively,
with repeated squaring expressed as:

$$
x \to x^2 \to x^4 \to x^8 \to \cdots
$$

The phrase "unknown order" refers to the fact that the size of the relevant
group is not known to the prover in a useful way. That property is part of what
makes the VDF path different from ordinary modular exponentiation in a known
finite group.

This chapter gives the group vocabulary. Chia-specific implementation details,
constants, and security claims still need primary sources.

Source starting points: [Chia Keys and Signatures](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/keys/keys-and-signatures.md)
and [Chia green paper introduction](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/green-paper/green-paper-introduction.md).

## Common Pitfalls

**Talking about a group without naming the operation.** The same set may be a
group under one operation and not under another.

**Confusing additive and multiplicative notation.** In additive notation the
identity is $0$ and inverses look like $-a$. In multiplicative notation the
identity is $1$ and inverses look like $a^{-1}$.

**Assuming multiplication modulo $n$ uses all residues.** Only residues coprime
to $n$ have multiplicative inverses modulo $n$.

**Forgetting closure when checking subgroups.** A subset that contains the
identity can still fail to be a subgroup if the operation leaves the subset.

**Assuming every cyclic group has only one generator.** A cyclic group can have
several generators.

**Treating notation as implementation.** Elliptic curve "addition" is not
ordinary coordinate-wise addition. The notation describes the group operation,
not necessarily how it is computed internally.

## Exercises

1. In $\mathbb{Z}/8\mathbb{Z}$ under addition, find the additive inverse of
   each element.
2. Is $\mathbb{Z}/8\mathbb{Z}$ a group under multiplication modulo $8$? If not,
   which group rule fails?
3. List the elements of $(\mathbb{Z}/10\mathbb{Z})^\times$.
4. In $\mathbb{Z}/10\mathbb{Z}$ under addition, find the order of the element
   $4$.
5. In $(\mathbb{Z}/7\mathbb{Z})^\times$, find the order of the element $2$ and
   the order of the element $3$.
6. Show that $\{0, 2, 4\}$ is a subgroup of $\mathbb{Z}/6\mathbb{Z}$ under
   addition.
7. Is $\{1, 3\}$ a subgroup of $(\mathbb{Z}/8\mathbb{Z})^\times$ under
   multiplication? Explain.
8. In your own words, explain the difference between the order of a group and
   the order of an element.
9. Give a small example of a function between additive groups modulo $n$ that
   preserves addition.
10. Explain why a cryptographic group should have enough structure for honest
    users to compute, but enough hardness to make some attacker tasks
    infeasible.

## Further Reading

- Later chapter: Rings and Fields
- Later chapter: Finite Fields
- Later chapter: Elliptic Curve Group Law
- Later chapter: Unknown-Order Groups
- Any introductory abstract algebra text covering groups and cyclic groups
