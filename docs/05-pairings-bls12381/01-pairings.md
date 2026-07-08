---
title: Pairings
sidebar_position: 1
---

# Pairings

## Goal

By the end of this chapter, you should understand what a bilinear pairing is,
what the groups $G_1$, $G_2$, and $G_T$ represent, and why pairings make BLS
signature verification possible.

This chapter is conceptual and algebraic. It does not derive pairings from
divisors, Miller loops, or final exponentiation.

## Prerequisites

You should know:

- groups and cyclic groups
- finite fields and extension fields
- elliptic curve groups
- scalar multiplication
- basic modular exponentiation

## Motivation

Many cryptographic protocols need to check relationships between hidden
scalars without revealing those scalars.

Suppose:

$$
P
$$

is a group generator, and someone gives you:

$$
aP
$$

and:

$$
bQ
$$

How can you verify a multiplicative relationship involving $a$ and $b$ if you
do not know either scalar?

Pairings provide a special map that turns scalar multiplication in elliptic
curve groups into exponentiation-like behavior in another group. That is what
makes compact verification equations possible.

## What a Bilinear Pairing Is

A **bilinear pairing** is a map:

$$
e : G_1 \times G_2 \to G_T
$$

where:

- $G_1$ is one source group
- $G_2$ is another source group
- $G_T$ is a target group

The map takes one element from $G_1$ and one element from $G_2$ and returns an
element of $G_T$.

The main property is **bilinearity**:

$$
e(aP, bQ) = e(P, Q)^{ab}
$$

for scalars $a$ and $b$, $P \in G_1$, and $Q \in G_2$.

This one equation is the heart of why pairings are useful.

## The Groups $G_1$, $G_2$, and $G_T$

In pairing-based cryptography, $G_1$ and $G_2$ are usually elliptic-curve
groups. Their operations are written additively:

$$
P + Q
$$

and scalar multiplication is written:

$$
aP
$$

The target group $G_T$ is usually written multiplicatively:

$$
uv
$$

and repeated multiplication is written:

$$
u^a
$$

This notation difference matters. The pairing maps additive source-group
structure into multiplicative target-group structure.

## Bilinearity

Bilinearity means the pairing respects scalar multiplication in both inputs.

For the first input:

$$
e(aP, Q) = e(P, Q)^a
$$

For the second input:

$$
e(P, bQ) = e(P, Q)^b
$$

For both inputs:

$$
e(aP, bQ) = e(P, Q)^{ab}
$$

This is not ordinary multiplication of coordinates. It is a special algebraic
property of the pairing.

## Non-Degeneracy

A useful pairing must not collapse everything to the identity in $G_T$.

This property is called **non-degeneracy**. Informally, it means there are
points $P \in G_1$ and $Q \in G_2$ such that:

$$
e(P, Q) \ne 1
$$

If every pairing output were $1$, the map would satisfy some equations but
would be useless for cryptography.

## Efficient Computability

A pairing must also be **efficiently computable**. Honest users need to compute
pairing outputs in a reasonable amount of time.

This creates a careful balance:

- scalar multiplication should be efficient
- pairing evaluation should be efficient enough for verification
- some reverse problems should still be hard

The algorithms that compute pairings are technical. Later implementation
chapters may discuss them at a high level, but this chapter only needs the
interface and properties.

## Pairing Verification Equations

Pairings let us compare scalar relationships using group elements.

Suppose $P \in G_1$ and $Q \in G_2$. If someone gives:

$$
A = aP
$$

and:

$$
B = aQ
$$

then pairings can check whether the same scalar $a$ was used:

$$
e(A, Q) = e(P, B)
$$

Why?

The left side is:

$$
e(aP, Q) = e(P, Q)^a
$$

The right side is:

$$
e(P, aQ) = e(P, Q)^a
$$

So both sides match.

This example is simplified, but it shows the shape of pairing-based
verification.

## Intuition Behind Pairings

A pairing is like a structured translator between two kinds of group
calculation.

In the source groups, secrets appear as scalar multipliers:

$$
aP
$$

In the target group, the pairing turns those scalar multipliers into exponents:

$$
e(P, Q)^a
$$

This does not reveal $a$ by itself. It gives a way to check equations involving
$a$ using public group elements.

The pairing is powerful precisely because it preserves enough structure to
verify relationships, but not so much that the underlying hard problems become
easy in all directions.

## Why Pairings Enable BLS Signatures

At a high level, a BLS public key has the form:

$$
PK = sk \cdot P
$$

where $sk$ is a secret scalar and $P$ is a generator.

A signature on a message is formed by hashing the message to a curve point and
scaling that point by the secret key:

$$
\sigma = sk \cdot H(m)
$$

Pairings let a verifier check that the same secret scalar connects $P$ to $PK$
and $H(m)$ to $\sigma$:

$$
e(\sigma, P) = e(H(m), PK)
$$

The exact groups and argument order depend on the variant and convention. The
important idea is that bilinearity moves the secret scalar into the pairing
output on both sides:

$$
e(sk \cdot H(m), P) = e(H(m), sk \cdot P)
$$

Both sides become the same target-group element.

## Chia Connection

Chia uses BLS signatures, and BLS verification relies on pairings. Pairings are
also what make signature aggregation possible: multiple signature checks can be
combined into fewer pairing equations under the right rules.

Later chapters will discuss BLS12-381, BLS signatures, aggregation, proof of
possession, and Chia spend bundles. This chapter only introduces the algebraic
interface that those constructions use.

Source starting points: [CFRG BLS signature draft](https://datatracker.ietf.org/doc/draft-irtf-cfrg-bls-signature/)
and [Chia Spend Bundles](https://docs.chia.net/chia-blockchain/coin-set-model/spend-bundles/).

## Common Pitfalls

**Thinking a pairing is a dot product.** A pairing is not ordinary vector
algebra. It is a special map between algebraic groups.

**Forgetting there are three groups.** Pairing equations involve $G_1$, $G_2$,
and $G_T$, and they are not interchangeable.

**Mixing additive and multiplicative notation.** $G_1$ and $G_2$ are usually
written additively, while $G_T$ is written multiplicatively.

**Assuming bilinearity means linearity over ordinary numbers.** The scalars act
through group operations, not through real-number vector spaces.

**Ignoring group membership.** Pairing inputs must be valid points in the
correct source groups.

**Treating the BLS equation as implementation-ready.** Real implementations
must handle hash-to-curve, subgroup checks, serialization, variants, and
domain separation.

## Exercises

1. Write the bilinearity equation for $e(aP, Q)$.
2. Write the bilinearity equation for $e(P, bQ)$.
3. If $A = 7P$ and $B = 7Q$, explain why $e(A, Q) = e(P, B)$.
4. Which groups are usually written additively: $G_1$, $G_2$, or $G_T$?
5. Why would a pairing that always outputs $1$ be useless?
6. In the simplified BLS equation
   $e(\sigma, P) = e(H(m), PK)$, identify where the secret scalar appears on
   each side before applying bilinearity.
7. Explain why validating pairing inputs matters.
8. In your own words, describe what a pairing lets a verifier check.

## Further Reading

- Later chapter: BLS12-381
- Later chapter: BLS Signatures
- Pairing-based cryptography references covering bilinear maps and Miller's
  algorithm
