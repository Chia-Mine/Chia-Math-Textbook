---
title: Probability for Cryptography
sidebar_position: 2
---

# Probability for Cryptography

## Goal

By the end of this chapter, you should be able to read basic probability
statements used in cryptography. You should understand sample spaces, events,
random variables, uniform sampling, independence, conditional probability,
collision probability, the birthday paradox, negligible probability, security
parameters, and the intuition behind random oracles.

## Prerequisites

You only need basic arithmetic: counting, fractions, multiplication, and
exponents. We will avoid measure theory and continuous probability.

## Motivation

Cryptography often cannot promise that something bad is impossible. Instead, it
tries to make the bad event so unlikely that it is not a practical concern.

Examples of probability questions in cryptography include:

- What is the chance that two random hashes collide?
- What is the chance that an attacker guesses a secret key?
- What is the chance that a randomized algorithm fails?
- How many attempts are needed before a collision becomes likely?
- How does security change when a parameter grows?

This is why probability appears in security definitions. A cryptographic scheme
is usually not judged by one example. It is judged by what an efficient attacker
can do over many possible random choices.

## Sample Spaces

A **sample space** is the set of all possible outcomes of an experiment. It is
often written as $\Omega$.

Example: roll one six-sided die.

$$
\Omega = \{1, 2, 3, 4, 5, 6\}
$$

Example: flip one bit.

$$
\Omega = \{0, 1\}
$$

Example: choose a two-bit string.

$$
\Omega = \{00, 01, 10, 11\}
$$

The sample space must match the experiment. If the experiment is "choose a
byte," then the sample space has $256$ outcomes, not $2$.

## Events

An **event** is a subset of the sample space. It is a set of outcomes we care
about.

For a die roll, let:

$$
E = \{2, 4, 6\}
$$

This is the event "the result is even."

If all outcomes are equally likely, then:

$$
\Pr[E] = \frac{\text{number of outcomes in } E}{\text{number of outcomes in } \Omega}
$$

For the even die roll event:

$$
\Pr[E] = \frac{3}{6} = \frac{1}{2}
$$

## Random Variables

A **random variable** is a function from outcomes to values.

Example: flip two coins. The sample space is:

$$
\Omega = \{HH, HT, TH, TT\}
$$

Define $X$ to be the number of heads.

Then:

$$
X(HH) = 2
$$

$$
X(HT) = 1
$$

$$
X(TH) = 1
$$

$$
X(TT) = 0
$$

The random variable $X$ does not have to return one of the original outcomes.
It extracts information from the outcome.

In programming terms, a random variable is like a function applied to a random
sample.

## Uniform Sampling

**Uniform sampling** means every outcome in the sample space has the same
probability.

If there are $N$ possible outcomes and sampling is uniform, each outcome has
probability:

$$
\frac{1}{N}
$$

Example: choose one byte uniformly at random. There are $256$ possible byte
values, so each byte has probability:

$$
\frac{1}{256}
$$

Uniform sampling is important because many cryptographic arguments assume that
keys, nonces, challenges, or hash-like outputs are not biased toward some values
more than others.

## Independence

Two events are **independent** if learning that one happened does not change
the probability that the other happened.

Formally, events $A$ and $B$ are independent if:

$$
\Pr[A \cap B] = \Pr[A]\Pr[B]
$$

Example: flip two fair coins. Let:

- $A$ be "the first coin is heads"
- $B$ be "the second coin is heads"

Then:

$$
\Pr[A] = \frac{1}{2}
$$

$$
\Pr[B] = \frac{1}{2}
$$

$$
\Pr[A \cap B] = \Pr[HH] = \frac{1}{4}
$$

Since:

$$
\frac{1}{4} = \frac{1}{2} \cdot \frac{1}{2}
$$

the events are independent.

Independence is not the same as "both events can happen." It is a statement
about probabilities.

## Conditional Probability

**Conditional probability** asks for the probability of one event after we know
another event happened. It is written:

$$
\Pr[A \mid B]
$$

Read this as "the probability of $A$ given $B$."

If $\Pr[B] \ne 0$, then:

$$
\Pr[A \mid B] = \frac{\Pr[A \cap B]}{\Pr[B]}
$$

Example: roll one fair die. Let:

- $A$ be "the result is even"
- $B$ be "the result is greater than 3"

Then:

$$
A = \{2, 4, 6\}
$$

$$
B = \{4, 5, 6\}
$$

$$
A \cap B = \{4, 6\}
$$

So:

$$
\Pr[A \mid B] = \frac{2/6}{3/6} = \frac{2}{3}
$$

Knowing that the die roll is greater than $3$ changes the probability that it
is even.

## Collision Probability

A **collision** happens when two different inputs or samples produce the same
output.

For a simple example, suppose a function outputs one of $10$ values uniformly.
If we choose two independent outputs, the probability that they collide is:

$$
\frac{1}{10}
$$

Reason: after the first output is chosen, the second output must match that
specific value. There is one matching value out of ten.

For a function with $N$ possible uniform outputs, the two-sample collision
probability is:

$$
\frac{1}{N}
$$

This is one reason cryptographic outputs are large. If a hash output has
$2^{256}$ possible values and behaves like uniform sampling, a fixed second
sample has probability $1/2^{256}$ of matching the first.

## Birthday Paradox

The birthday paradox says that collisions become likely faster than many people
expect when there are many samples.

For birthdays, there are about $365$ possible birthdays. You do not need $365$
people before a shared birthday becomes likely. Around $23$ people is enough
for the probability to exceed one half.

The rough cryptographic intuition is:

If a space has $N$ possible outputs, then collisions start to become likely
after about $\sqrt{N}$ random samples.

For $N = 365$:

$$
\sqrt{365} \approx 19.1
$$

That is close to the famous $23$-person threshold.

For an output space of size $2^{256}$:

$$
\sqrt{2^{256}} = 2^{128}
$$

So a 256-bit hash output gives roughly 128-bit collision resistance under the
birthday bound, assuming the hash behaves like a uniform random function for
this purpose.

This is intuition, not a complete hash-function security proof.

## Negligible Probability

In cryptography, a probability is often called **negligible** if it becomes
smaller than any inverse polynomial as the security parameter grows.

That formal definition is more than we need right now. The intuition is:
negligible means "shrinks so fast that any efficient attacker has only a tiny
chance of success when the security parameter is large enough."

Example intuition:

$$
2^{-128}
$$

is extremely small for practical purposes.

But "small" depends on context. A probability of $10^{-6}$ may be small for one
event, but not small if the event is tried billions of times.

## Security Parameter Intuition

A **security parameter** is a value that controls how hard a cryptographic task
should be. It is often written as $\lambda$.

The security parameter is not always a direct protocol value. It is a way to
reason about a family of systems as sizes grow.

Example intuition:

- a key space of size $2^{80}$ gives about 80 bits of brute-force security
- a key space of size $2^{128}$ gives about 128 bits of brute-force security
- a hash output of 256 bits gives about 128 bits of collision resistance under
  the birthday bound

When a security parameter increases, the attacker's work should grow quickly
and the attacker's success probability should shrink quickly.

## Random Oracle Intuition

A **random oracle** is an idealized function. Every time you ask it for the
output on an input, it returns a value that looks uniformly random, but it is
consistent: the same input always gets the same output.

Think of it as a huge table that is filled in lazily:

```text
function random_oracle(input):
    if input is already in table:
        return table[input]

    output = uniformly random string
    table[input] = output
    return output
```

This is not how ordinary hash functions literally work. A real hash function
has fixed code. The random oracle model is a mathematical idealization used to
reason about protocols that use hashes.

The model is useful, but it is not magic. A proof in the random oracle model
does not automatically prove that every concrete hash function implementation
is secure in every real-world setting.

## Why Probability Appears in Cryptographic Security

Cryptographic security often talks about attackers that run algorithms and make
queries. Those algorithms may use randomness, and the system itself may use
random keys, challenges, salts, or nonces.

Probability lets us state claims such as:

- an attacker guesses the key with probability at most $2^{-\lambda}$
- a collision appears after about $2^{n/2}$ hash queries for an $n$-bit output
- a randomized protocol fails only with negligible probability
- two experiments are hard to distinguish except with tiny advantage

The important shift is from "this worked on my test cases" to "any efficient
attacker has only a small chance of making the bad event happen under the
stated assumptions."

## Chia Connection

Probability appears in several parts of Chia-related reasoning.

Proof of space involves random-looking values, matching conditions, and
probabilistic expectations about finding valid proofs. Time-memory tradeoff
arguments also use probability to reason about success rates and resource
requirements.

Hash functions are used throughout blockchain systems, and hash outputs are
often reasoned about as if they behave randomly for specific purposes. That is
an intuition and modeling choice, not a substitute for checking the actual
protocol and implementation.

This chapter gives the probability vocabulary needed for later chapters on
time-memory tradeoffs, proof of space, BLS signatures, and security arguments.
Chia-specific claims should still be checked against primary sources.

## Common Pitfalls

**Confusing unlikely with impossible.** A negligible event can still be
possible. Cryptography usually aims to make attacks infeasible, not logically
impossible.

**Ignoring repeated attempts.** A one-in-a-million event may become likely if
someone can try billions of times.

**Assuming outputs are uniform without justification.** Uniform sampling is an
assumption or a property to be argued, not something that happens automatically.

**Confusing independence with difference.** Two events can be different without
being independent.

**Forgetting the birthday bound.** Collision resistance for an $n$-bit output
is roughly $n/2$ bits, not $n$ bits.

**Treating random oracle proofs as implementation proofs.** The random oracle
model is useful, but real hash functions are concrete algorithms.

## Exercises

1. A fair coin is flipped three times. Write the sample space.
2. A fair six-sided die is rolled. Let $A$ be the event "the result is odd."
   What is $\Pr[A]$?
3. A byte is sampled uniformly at random. What is the probability that it is
   equal to `00` in hexadecimal?
4. Two fair coins are flipped. Let $A$ be "the first coin is heads" and $B$ be
   "the two coins are the same." Are $A$ and $B$ independent?
5. A fair die is rolled. What is the probability that the result is greater
   than $4$ given that it is even?
6. A function outputs one of $16$ values uniformly at random. If two outputs
   are sampled independently, what is the probability that they collide?
7. Roughly how many random samples are needed before collisions become likely
   in a space of size $2^{64}$?
8. Explain why a probability of $2^{-128}$ may be considered practically tiny,
   but not logically impossible.
9. In your own words, explain why a random oracle returns the same output for
   the same input even though its outputs are described as random.
10. Programming exercise: write a short script that samples random bytes and
    counts how many samples are needed before the first collision. Repeat it
    several times and compare the results with the birthday-paradox intuition.

## Further Reading

- Later chapter: Time-Memory Tradeoffs
- Later chapter: Beyond Hellman
- Later chapter: Chia Proof of Space
- Later chapter: BLS Signatures
- Any introductory probability text covering finite sample spaces and
  conditional probability
