---
title: Sets, Functions, and Proofs
sidebar_position: 1
---

# Sets, Functions, and Proofs

## Goal

By the end of this chapter, you should be able to read basic mathematical
language about sets, functions, relations, and proofs. You should also
understand why this language matters when studying cryptographic systems such
as Chia.

## Prerequisites

You need only ordinary programming experience. If you know what a collection,
value, input, output, and boolean condition are, you already have the right
starting point.

## Motivation

Cryptography is full of statements that sound like code comments but behave
like contracts:

- this function maps every input to exactly one output
- this operation is reversible
- this relation groups equivalent objects together
- this algorithm succeeds with high probability
- no efficient attacker can distinguish two cases

To understand statements like these, we need a small amount of mathematical
vocabulary. Sets describe collections of objects. Functions describe controlled
input-output behavior. Relations describe when two objects are connected. Proofs
explain why a claim follows from definitions instead of from examples alone.

## Sets and Elements

A **set** is a collection of distinct objects. The objects in a set are called
**elements**.

We write $x \in S$ to mean "$x$ is an element of $S$." We write $x \notin S$ to
mean "$x$ is not an element of $S$."

Example:

$$
S = \{2, 4, 6\}
$$

Then $2 \in S$ and $3 \notin S$.

Sets do not care about order or duplicates:

$$
\{2, 4, 6\} = \{6, 4, 2\} = \{2, 2, 4, 6\}
$$

That is different from many programming containers. A list or array usually
remembers order. A mathematical set does not.

## Subsets

A set $A$ is a **subset** of a set $B$ if every element of $A$ is also an
element of $B$. We write $A \subseteq B$.

Example:

$$
A = \{2, 4\}, \quad B = \{2, 4, 6\}
$$

Then $A \subseteq B$.

The empty set, written $\emptyset$, has no elements. It is a subset of every
set. This can feel strange at first, but it follows from the definition: there
is no element of $\emptyset$ that violates the subset condition.

## Ordered Pairs and Tuples

A set ignores order, but cryptography and programming often need ordered data.
An **ordered pair** is a pair where position matters. We write it as $(a, b)$.

In general:

$$
(a, b) \ne (b, a)
$$

unless $a = b$.

A **tuple** is an ordered list of fixed length, such as $(a, b, c)$ or
$(x_1, x_2, x_3, x_4)$. Tuples are useful for representing structured data:
inputs to a function, coordinates, public parameters, or protocol messages.

Programming analogy:

- set: roughly like a collection where membership matters
- tuple: roughly like a fixed-shape record where position matters

The analogy is not exact, but it is a good starting point.

## Functions

A **function** assigns each input in one set exactly one output in another set.
If a function is called $f$, we write:

$$
f : A \to B
$$

This means "$f$ is a function from $A$ to $B$."

The set $A$ is the **domain**. It contains the allowed inputs. The set $B$ is
the **codomain**. It contains the possible kind of output.

Example:

$$
f : \{1, 2, 3\} \to \{0, 1, 4, 9\}
$$

defined by $f(x) = x^2$.

Then:

$$
f(1) = 1, \quad f(2) = 4, \quad f(3) = 9
$$

The value $0$ is in the codomain, but it is not actually hit by this function.
The set of outputs that are actually hit is called the **image** of the
function.

## Domains and Codomains

The domain and codomain are part of a function's definition. The same formula
can define different functions if the domain or codomain changes.

Consider $f(x) = x^2$.

If $f : \mathbb{Z} \to \mathbb{Z}$, then inputs and outputs are integers.

If $f : \mathbb{R} \to \mathbb{R}$, then inputs and outputs are real numbers.

If $f : \{0, 1, 2\} \to \{0, 1, 4\}$, then the function is finite and can be
checked by a table.

In programming, this is similar to caring about types. A function's behavior is
not just the expression in its body. It also depends on what inputs are allowed
and what outputs are expected.

## Injective, Surjective, and Bijective Functions

These three words describe how inputs and outputs match.

A function is **injective** if different inputs always produce different
outputs. It never collapses two distinct inputs into the same output.

Formally, $f : A \to B$ is injective if:

$$
f(x) = f(y) \implies x = y
$$

Example: $f : \mathbb{Z} \to \mathbb{Z}$ defined by $f(x) = x + 1$ is
injective.

Non-example: $f : \mathbb{Z} \to \mathbb{Z}$ defined by $f(x) = x^2$ is not
injective, because $f(2) = 4$ and $f(-2) = 4$.

A function is **surjective** if every element of the codomain is hit by at
least one input.

Formally, $f : A \to B$ is surjective if for every $b \in B$, there exists an
$a \in A$ such that $f(a) = b$.

Example: $f : \mathbb{Z} \to \mathbb{Z}$ defined by $f(x) = x + 1$ is
surjective.

Non-example: $f : \mathbb{Z} \to \mathbb{Z}$ defined by $f(x) = x^2$ is not
surjective, because no integer squares to $-1$.

A function is **bijective** if it is both injective and surjective. A bijection
matches every input with exactly one output and every output with exactly one
input. In programming terms, a bijection is the mathematical shape of a
perfectly reversible transformation.

## Relations

A **relation** between two sets $A$ and $B$ says which pairs $(a, b)$ are
connected. Formally, a relation from $A$ to $B$ is a subset of $A \times B$,
the set of all ordered pairs with first element in $A$ and second element in
$B$.

Example:

Let $A = \{1, 2, 3\}$ and $B = \{2, 4, 6\}$. Define a relation $R$ by saying
$a$ is related to $b$ when $b = 2a$.

Then:

$$
R = \{(1, 2), (2, 4), (3, 6)\}
$$

Relations are more general than functions. A relation may connect one input to
many outputs, or to none. A function must assign exactly one output to every
input in its domain.

## Equivalence Relations

An **equivalence relation** is a relation that behaves like "is the same kind
of thing as." It must satisfy three properties.

For a relation $\sim$ on a set $S$:

1. Reflexive: $a \sim a$ for every $a \in S$.
2. Symmetric: if $a \sim b$, then $b \sim a$.
3. Transitive: if $a \sim b$ and $b \sim c$, then $a \sim c$.

Example:

On the set of integers, define $a \sim b$ if $a$ and $b$ have the same
remainder when divided by $3$.

Then:

$$
1 \sim 4, \quad 4 \sim 7, \quad 1 \sim 7
$$

This relation groups integers into classes by remainder:

- numbers congruent to $0$ modulo $3$
- numbers congruent to $1$ modulo $3$
- numbers congruent to $2$ modulo $3$

Equivalence relations are important because they let us replace many objects
with a smaller set of representatives. Modular arithmetic depends on this idea.

## Basic Proof Methods

A **proof** is an argument that a claim follows from definitions and accepted
facts. A proof is stronger than many examples. Examples can suggest a pattern,
but they cannot establish that the pattern always holds.

### Direct Proof

In a direct proof, start from the assumptions and move step by step to the
conclusion.

Claim: If $n$ is even, then $n^2$ is even.

Proof:

If $n$ is even, then $n = 2k$ for some integer $k$. Then:

$$
n^2 = (2k)^2 = 4k^2 = 2(2k^2)
$$

Since $2k^2$ is an integer, $n^2$ is even.

### Contrapositive

The **contrapositive** of "if $P$, then $Q$" is "if not $Q$, then not $P$."
These two statements are logically equivalent.

Sometimes the contrapositive is easier to prove.

Claim: If $n^2$ is even, then $n$ is even.

Contrapositive: If $n$ is not even, then $n^2$ is not even.

Proof of contrapositive:

If $n$ is odd, then $n = 2k + 1$ for some integer $k$. Then:

$$
n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1
$$

So $n^2$ is odd. Therefore, if $n^2$ is even, $n$ must be even.

### Contradiction

In a proof by **contradiction**, assume the opposite of what you want to prove.
Then show that this assumption leads to an impossible statement.

Claim: There is no smallest positive real number.

Proof:

Assume there is a smallest positive real number $x$. Since $x > 0$, the number
$x / 2$ is also positive. But $x / 2 < x$, which contradicts the assumption
that $x$ was the smallest positive real number. Therefore, no such smallest
positive real number exists.

### Induction

**Induction** proves a statement for all natural numbers by proving two things:

1. Base case: the statement is true for the first value.
2. Inductive step: if the statement is true for $n$, then it is true for
   $n + 1$.

Claim:

$$
1 + 2 + \cdots + n = \frac{n(n + 1)}{2}
$$

for every integer $n \ge 1$.

Base case: when $n = 1$, the left side is $1$ and the right side is:

$$
\frac{1(1 + 1)}{2} = 1
$$

Inductive step: assume the formula is true for $n$. Then:

$$
1 + 2 + \cdots + n + (n + 1)
= \frac{n(n + 1)}{2} + (n + 1)
= \frac{(n + 1)(n + 2)}{2}
$$

That is the same formula with $n + 1$ in place of $n$, so the claim holds for
all $n \ge 1$.

## Why Proofs Matter in Cryptography

Cryptographic systems are designed to keep working even when someone is trying
to break them. Testing examples is not enough. An attacker is free to look for
the one case you did not test.

Proofs help us make precise claims such as:

- a verification equation accepts valid signatures
- a transformation is reversible only with certain information
- two protocol states are equivalent for a particular purpose
- a probability bound is small enough to be meaningful
- an attacker would need to solve a hard mathematical problem

This does not mean every deployed system is proven secure in every possible
sense. Real systems also depend on implementations, parameter choices,
side-channel resistance, serialization rules, and consensus behavior. The point
is that proof language gives us a way to separate what is mathematically true
from what is an engineering assumption.

## Chia Connection

Chia uses mathematical objects that are easiest to understand once this chapter
is comfortable.

Sets appear whenever we define the allowed values of a system: possible inputs,
valid outputs, coins, puzzle conditions, signatures, or group elements.

Functions appear in hashes, signature verification, plotting algorithms, and
state transitions. The domain and codomain matter because a function that is
well-defined for one kind of object may be meaningless for another.

Equivalence relations appear in modular arithmetic, where many integers can
represent the same remainder class. This idea later supports finite fields and
other algebraic structures.

Proof methods appear throughout cryptography. When a later chapter says "this
works for all group elements" or "this algorithm verifies the result," it is
making a universal statement. Proofs are how we justify those statements.

Chia-specific implementation claims still need primary references. This
chapter gives the mathematical vocabulary; it does not by itself specify Chia
consensus behavior.

## Common Pitfalls

**Confusing examples with proofs.** Checking $2$, $4$, and $6$ does not prove a
claim for all even numbers.

**Ignoring the codomain.** Surjectivity depends on the codomain. The same
formula may be surjective for one codomain and not another.

**Treating sets like arrays.** Sets do not have order or duplicate elements.
Tuples do.

**Assuming a relation is a function.** A relation can connect one input to many
outputs. A function cannot.

**Forgetting one equivalence property.** A relation must be reflexive,
symmetric, and transitive to be an equivalence relation.

**Using contradiction too casually.** A contradiction proof must contradict a
precise assumption, not merely produce a surprising result.

## Exercises

1. Let $A = \{1, 2, 3\}$ and $B = \{1, 2, 3, 4, 5\}$. Is $A \subseteq B$?
   Explain using the definition of subset.
2. Give an example of two sets that are equal even though they are written in a
   different order.
3. Let $f : \{1, 2, 3\} \to \{2, 4, 6, 8\}$ be defined by $f(x) = 2x$. Is
   $f$ injective? Is it surjective? Explain both answers.
4. Give an example of a relation from $\{1, 2\}$ to $\{a, b\}$ that is not a
   function.
5. On the integers, define $a \sim b$ if $a - b$ is even. Check whether this
   relation is reflexive, symmetric, and transitive.
6. Prove directly: if $n$ is odd, then $n^2$ is odd.
7. Prove by contrapositive: if $n^2$ is odd, then $n$ is odd.
8. Use induction to prove that $2 + 4 + \cdots + 2n = n(n + 1)$ for every
   integer $n \ge 1$.
9. In one paragraph, explain why a cryptographic claim needs more than a list
   of passing test cases.

## Further Reading

- Any introductory discrete mathematics text covering sets, functions, and
  proof methods
- Later chapter: Modular Arithmetic
- Later chapter: Groups
- Later chapter: Probability for Crypto
