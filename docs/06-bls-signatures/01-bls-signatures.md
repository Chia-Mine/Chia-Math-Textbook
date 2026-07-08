---
title: BLS Signatures
sidebar_position: 1
---

# BLS Signatures

## Goal

By the end of this chapter, you should understand the basic BLS signature
workflow: key generation, signing, verification, hash-to-curve, pairing
verification, aggregation, rogue-key attacks, proof of possession, and the
Basic, Augmented, and Proof-of-Possession variants.

This chapter explains the mathematics and protocol shape. It does not replace
the IETF draft or Chia implementation rules.

## Prerequisites

You should know:

- elliptic-curve groups
- pairings
- BLS12-381 at a high level
- hash-to-curve intuition
- subgroup checks and serialization at a conceptual level

## Digital Signature Basics

A digital signature scheme has three core jobs:

1. Generate a key pair.
2. Sign a message with the secret key.
3. Verify the signature with the public key.

The security goal is authenticity: only the holder of the secret key should be
able to produce a valid signature for that public key and message.

The current CFRG BLS draft describes BLS as a deterministic digital signature
scheme with aggregation properties:
[draft-irtf-cfrg-bls-signature](https://datatracker.ietf.org/doc/draft-irtf-cfrg-bls-signature/).
The original paper is Boneh, Lynn, and Shacham's
[Short Signatures from the Weil Pairing](https://hovav.net/ucsd/papers/bls04.html).

## BLS Key Generation

At a high level, a BLS secret key is a scalar:

$$
sk \in \mathbb{F}_r
$$

where $r$ is the prime subgroup order.

A public key is produced by multiplying a generator by the secret scalar:

$$
PK = sk \cdot P
$$

where $P$ is a fixed generator in one of the BLS groups.

This is the familiar one-way shape: computing $PK$ from $sk$ is easy, but
recovering $sk$ from $PK$ should be infeasible under the relevant discrete-log
assumption.

Real key generation includes details such as deriving secret scalars from key
material, checking ranges, and choosing a ciphersuite.

## BLS Signing

To sign a message $m$, first hash the message to a curve point:

$$
H(m)
$$

Then multiply by the secret key:

$$
\sigma = sk \cdot H(m)
$$

The result $\sigma$ is the signature.

This is the mathematical core. In a real implementation, $H(m)$ is not an
ordinary hash output interpreted as coordinates. It must be a hash-to-curve
operation specified for the ciphersuite.

## Hash-to-Curve Intuition

BLS signatures need a function that maps arbitrary messages to valid curve
points in the correct group.

The job of hash-to-curve is:

```text
message bytes -> valid curve point
```

It should be deterministic: the same message and domain separation tag produce
the same point. It should also behave like a random-looking point for security
arguments.

Domain separation is a label that keeps one protocol use of a hash from being
confused with another. It is like adding a context string before hashing so the
same bytes do not accidentally mean the same thing in two different protocols.

Hashing to a curve is subtle. Do not invent it by taking a hash digest and
treating it as an $x$ coordinate unless a specification explicitly says that is
safe. RFC 9380 defines hash-to-curve methods and includes BLS12-381 suites:
[RFC 9380](https://datatracker.ietf.org/doc/html/rfc9380).

## BLS Verification

Verification checks that the same secret scalar connects the public key to the
generator and the signature to the hashed message.

In one common convention:

$$
PK = sk \cdot P
$$

and:

$$
\sigma = sk \cdot H(m)
$$

The verifier checks:

$$
e(\sigma, P) = e(H(m), PK)
$$

By bilinearity:

$$
e(sk \cdot H(m), P) = e(H(m), sk \cdot P)
$$

Both sides become:

$$
e(H(m), P)^{sk}
$$

The exact argument order depends on which group contains public keys and which
contains signatures.

## Signature Aggregation

BLS signatures can be aggregated. Given signatures:

$$
\sigma_1, \sigma_2, \ldots, \sigma_n
$$

an aggregate signature is formed by adding the group elements:

$$
\sigma = \sigma_1 + \sigma_2 + \cdots + \sigma_n
$$

The result is still one group element. That is the key efficiency benefit.

The CFRG draft describes aggregation APIs, including aggregate verification.
Aggregation rules depend on the variant and on whether messages are distinct.

## Public Key Aggregation

Public keys can also be aggregated in some settings:

$$
PK = PK_1 + PK_2 + \cdots + PK_n
$$

This is useful when multiple signers sign the same message and the protocol has
the right protections against rogue-key attacks.

Public key aggregation is not automatically safe. The protocol must specify
which variant is used and how keys are validated.

## Rogue-Key Attacks

A **rogue-key attack** is an attack where someone chooses a malicious public
key that depends on someone else's public key, making an aggregate signature
appear valid without the attacker knowing the corresponding honest secret.

The CFRG BLS draft defines variants partly to address rogue-key attacks.

The intuition is that aggregation changes the security problem. When public
keys are combined, a malicious participant may be able to cancel or manipulate
another participant's contribution unless the scheme prevents it.

## Proof of Possession

A **proof of possession** is evidence that someone actually knows the secret
key corresponding to a public key.

In BLS, proof-of-possession variants can require a signer to prove knowledge of
the secret key before their public key is used in certain aggregate settings.

This helps defend against rogue-key attacks, but it introduces protocol
requirements: proofs must be generated, checked, and bound to the right public
keys.

## Basic, Augmented, and Proof-of-Possession Variants

The CFRG BLS draft defines three schemes:

- **Basic**: suitable when messages are distinct in aggregate verification.
- **Augmented**: signs an augmented message that includes the public key, which
  helps defend against rogue-key attacks.
- **Proof-of-Possession**: uses proofs that public-key holders know the
  corresponding secret keys, supporting efficient same-message aggregation
  when the proof requirements are met.

Do not mix these variants casually. A signature generated for one variant is
not just a generic BLS signature in every other context. Domain separation,
message augmentation, and proof rules matter.

## Chia Connection

Chia uses BLS signatures in spend bundles. Chia documentation explains that BLS
signatures can be combined into an aggregate signature of the same size as the
original signatures, reducing data transmitted and stored:
[Spend Bundles](https://docs.chia.net/chia-blockchain/coin-set-model/spend-bundles/).

Chia key documentation states that Chia uses BLS-12-381 private keys following
the IETF specification, with public keys as G1 points and signatures as G2
points:
[Keys and Signatures](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/keys/keys-and-signatures.md).

The archived Chia BLS library documentation says it shifted to the IETF BLS
specification and used the minimum-pubkey-size convention:
[Chia-Network/bls-signatures](https://github.com/Chia-Network/bls-signatures).

Later Chia transaction chapters will explain how CLVM conditions produce
messages that are checked against an aggregate signature.

## Common Pitfalls

**Treating hash-to-curve as ordinary hashing.** Hash-to-curve is a specified
mapping to a valid group point.

**Mixing variants.** Basic, Augmented, and Proof-of-Possession schemes have
different security rules.

**Ignoring rogue-key attacks.** Aggregation changes the threat model.

**Skipping subgroup checks.** Public keys and signatures must be valid points
in the expected groups.

**Assuming all protocols choose the same G1/G2 layout.** Chia's convention uses
G1 public keys and G2 signatures, but other contexts may differ.

**Confusing mathematical equations with implementation rules.** Real BLS
verification includes ciphersuite, encoding, domain separation, validation,
and variant details.

## Exercises

1. Write the high-level BLS public key equation.
2. Write the high-level BLS signing equation.
3. Use bilinearity to explain why
   $e(sk \cdot H(m), P) = e(H(m), sk \cdot P)$.
4. What problem does hash-to-curve solve?
5. Explain why adding signatures can produce one aggregate signature.
6. What is a rogue-key attack, in one paragraph?
7. How does proof of possession help with public key aggregation?
8. Name the three CFRG BLS variants and give one sentence about each.
9. Read the Chia spend-bundle source linked above. What benefit does it claim
   aggregate signatures provide?

## Further Reading

- [CFRG BLS signature draft](https://datatracker.ietf.org/doc/draft-irtf-cfrg-bls-signature/)
- [Short Signatures from the Weil Pairing](https://hovav.net/ucsd/papers/bls04.html)
- [RFC 9380: Hashing to Elliptic Curves](https://datatracker.ietf.org/doc/html/rfc9380)
- [Chia Spend Bundles documentation](https://docs.chia.net/chia-blockchain/coin-set-model/spend-bundles/)
- [Chia Keys and Signatures documentation](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/keys/keys-and-signatures.md)
