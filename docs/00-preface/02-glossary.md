---
title: Glossary
sidebar_position: 3
---

# Glossary

Short definitions for terms used in this textbook.

## Algebra

**Abelian group**: A group where the operation commutes: $a \star b = b \star a$.
See [Groups](../03-groups-rings-fields/01-groups.md).

**Cofactor**: The ratio between a full elliptic curve group order and a desired
prime subgroup order. See [Curves Over Finite Fields](../04-elliptic-curves/02-curves-over-finite-fields.md).

**Elliptic curve**: A curve with a group law on its points, often written in
short Weierstrass form as $y^2 = x^3 + ax + b$. See [Elliptic Curve Group Law](../04-elliptic-curves/01-elliptic-curve-group-law.md).

**Field**: A number system where addition, subtraction, multiplication, and
division by nonzero elements work. See [Rings and Fields](../03-groups-rings-fields/02-rings-and-fields.md).

**Finite field**: A field with finitely many elements, such as
$\mathbb{F}_p$. See [Finite Fields](../03-groups-rings-fields/03-finite-fields.md).

**Generator**: An element whose repeated operation creates an entire cyclic
group or subgroup. See [Groups](../03-groups-rings-fields/01-groups.md).

**Group**: A set with one operation satisfying closure, associativity,
identity, and inverses. See [Groups](../03-groups-rings-fields/01-groups.md).

**Prime-order subgroup**: A subgroup whose number of elements is prime.

**Ring**: A set with addition and multiplication that distribute correctly.
See [Rings and Fields](../03-groups-rings-fields/02-rings-and-fields.md).

**Scalar multiplication**: Repeated addition of a group element, written $kP$
for elliptic curve points.

**Subgroup check**: A test that verifies a point belongs to the intended
subgroup.

## Cryptography

**BLS signature**: A pairing-based digital signature scheme with useful
aggregation properties. See [BLS Signatures](../06-bls-signatures/01-bls-signatures.md).

**BLS12-381**: A specific pairing-friendly elliptic curve parameter set used
with BLS signatures and other pairing-based protocols. See [BLS12-381](../05-pairings-bls12381/02-bls12-381.md).

**Hash-to-curve**: A specified method for mapping bytes to a valid elliptic
curve point.

**Pairing**: A bilinear map $e : G_1 \times G_2 \to G_T$. See [Pairings](../05-pairings-bls12381/01-pairings.md).

**Random oracle**: An idealized hash-like function that returns consistent but
random-looking outputs. See [Probability for Cryptography](../01-foundations/02-probability-for-cryptography.md).

**Rogue-key attack**: An aggregate-signature attack where a malicious public
key is chosen to cancel or manipulate another participant's key.

**Security parameter**: A value controlling the intended hardness of an attack.

**VDF**: Verifiable delay function; a function that takes sequential time to
evaluate but is faster to verify. See [Wesolowski VDF](../08-vdf-wesolowski/01-wesolowski-vdf.md).

## Chia

**Coin**: A Chia state object with a parent id, puzzle hash, and amount.

**Coin spend**: The data needed to spend one coin: coin, puzzle reveal, and
solution. See [Spend Bundles and BLS](../11-clvm-transactions/01-spend-bundles-and-bls.md).

**Farmer**: A participant that uses stored plots to find eligible proofs of
space. See [Consensus Overview](../10-chia-consensus/01-consensus-overview.md).

**Harvester**: A process that checks plot files for candidate proofs on behalf
of a farmer.

**Plot**: Stored proof-of-space data used during farming. See [Chia Proof of Space](../09-proof-of-space/03-chia-proof-of-space.md).

**Proof of space**: A proof that a participant is storing structured data.

**Proof of time**: Chia's VDF-based proof that sequential time has passed.

**Puzzle reveal**: The CLVM program revealed when spending a coin.

**Signage point**: An intermediate point in a sub-slot where farmers check
plot eligibility.

**Spend bundle**: A group of coin spends plus an aggregate signature. See
[Spend Bundles and BLS](../11-clvm-transactions/01-spend-bundles-and-bls.md).

**Timelord**: A process that advances VDFs and publishes proofs of time.

## Advanced Terms

**Class group (advanced)**: An unknown-order group built from equivalence
classes of binary quadratic forms. See [Class Groups](../07-class-groups/02-class-groups.md).

**Frobenius map (advanced)**: In characteristic $p$, the map $a \mapsto a^p$.

**n-Wesolowski (advanced)**: A segmented Wesolowski-style proof strategy that
trades proof size and verification work for proof-generation latency. See
[n-Wesolowski](../08-vdf-wesolowski/02-n-wesolowski.md).
