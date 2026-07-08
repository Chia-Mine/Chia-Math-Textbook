---
title: Spend Bundles and BLS
sidebar_position: 1
---

# Spend Bundles and BLS in Chia

## Goal

By the end of this chapter, you should understand the coin set model at a high
level, what coin spends and spend bundles contain, how puzzle reveals and
solutions produce conditions, and how aggregate BLS signatures are checked
during transaction validation.

This chapter stays conceptual and does not go deep into CLVM execution.

## Prerequisites

You should know:

- BLS signatures and aggregation
- basic Chia consensus roles
- the idea of a blockchain transaction
- hash and signature intuition

## Coin Set Model

Chia uses a coin set model. Instead of accounts with mutable balances, the
state is a set of coins. Spending consumes existing coins and creates new
coins.

At a high level, a coin has:

- a parent coin id
- a puzzle hash
- an amount

The puzzle hash commits to the program that controls how the coin may be
spent.

## Coin Spends

A **coin spend** gives the information needed to spend one coin.

Conceptually it includes:

- the coin being spent
- the puzzle reveal
- the solution

The Chia spend-bundle documentation describes a spend bundle as a group of coin
spends, where each spend includes the coin, puzzle program, and solution
program:
[Spend Bundles](https://docs.chia.net/chia-blockchain/coin-set-model/spend-bundles/).

## Puzzle Reveal

The **puzzle reveal** is the CLVM program that corresponds to the coin's puzzle
hash.

The verifier can hash the revealed puzzle and check that it matches the puzzle
hash in the coin.

This prevents someone from replacing the spending logic with a different
program after the coin was created.

## Solution

The **solution** is data passed to the puzzle program when spending the coin.

The puzzle and solution run together:

```text
puzzle(solution) -> conditions
```

The resulting conditions describe what must be true for the spend to be valid
and what new coins or assertions should be created.

## Conditions

**Conditions** are outputs from CLVM execution. Some conditions create new
coins. Some require signatures. Some assert facts about the spend.

This chapter focuses on signature-related conditions.

Chia documentation notes that `AGG_SIG_ME` and `AGG_SIG_UNSAFE` require a
signature to be present for a spend to be valid:
[Spend Bundles](https://docs.chia.net/chia-blockchain/coin-set-model/spend-bundles/).

## Spend Bundle

A **spend bundle** groups multiple coin spends and one aggregate signature.

Conceptually:

```text
spend_bundle = {
    coin_spends: [...],
    aggregate_signature: ...
}
```

Multiple coin spends can be bundled so a transaction can consume several coins
and create several outputs.

## Aggregate Signature

BLS signatures can be added together to form one aggregate signature.

If several spends require signatures:

```text
(pk1, m1, sig1)
(pk2, m2, sig2)
(pk3, m3, sig3)
```

the signatures can be aggregated:

$$
\sigma = \sigma_1 + \sigma_2 + \sigma_3
$$

The verifier checks the aggregate against the list of public keys and messages.
Chia documentation emphasizes that this lets multiple signatures be combined
into one signature of the same size as the originals.

## `AGG_SIG_ME`, Conceptually

`AGG_SIG_ME` is a signature condition that binds a public key to a message in a
way that is tied to the specific coin spend context.

At a high level:

```text
AGG_SIG_ME(public_key, message)
```

means the aggregate signature must include a valid signature for the relevant
message under that public key, with Chia's required additional context.

This context binding is important because signatures should not be replayable
in unintended spends.

TODO: Future CLVM chapters should explain the exact message construction for
`AGG_SIG_ME` from Chia's consensus code and documentation.

## Signature Verification During Transaction Validation

During validation, a full node:

1. Runs each coin spend's puzzle with its solution.
2. Collects the resulting conditions.
3. Extracts signature requirements.
4. Constructs the required public-key/message pairs.
5. Verifies the spend bundle's aggregate signature against those pairs.

If the aggregate signature does not verify, the spend bundle is invalid.

This is where BLS aggregation becomes practical: many signature requirements
can be checked against one aggregate signature.

## Chia Connection

This chapter is directly about Chia transactions.

Chia's spend-bundle documentation says BLS signatures are used and can be
combined into aggregate signatures:
[Spend Bundles](https://docs.chia.net/chia-blockchain/coin-set-model/spend-bundles/).

Chia's key documentation states that Chia uses BLS-12-381 keys and that public
keys are G1 points while signatures are G2 points:
[Keys and Signatures](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/keys/keys-and-signatures.md).

The important dependency path is:

```text
BLS signatures
-> aggregate signatures
-> AGG_SIG conditions
-> spend bundle validation
```

## Common Pitfalls

**Thinking a spend bundle is a block.** A spend bundle is transaction data; a
block may include many spends.

**Confusing puzzle hash with puzzle reveal.** The hash is committed in the
coin; the reveal provides the actual program.

**Ignoring the solution.** The puzzle is not evaluated alone. It runs with the
solution.

**Assuming every condition is a signature condition.** Conditions can do many
things; signature conditions are only one category.

**Treating aggregate signatures as a list of signatures.** The aggregate is one
signature object checked against many public-key/message pairs.

**Skipping message context.** Chia signature conditions must bind signatures to
the right spend context.

## Exercises

1. Name the three conceptual pieces of a coin spend.
2. What does the puzzle reveal prove about the coin's puzzle hash?
3. What does a solution do?
4. Why can a spend bundle contain one aggregate signature for many spends?
5. What does `AGG_SIG_ME` require at a high level?
6. List the high-level validation steps for signature checking in a spend
   bundle.
7. Read the linked spend-bundle documentation. What benefit does Chia claim for
   aggregate signatures?
8. Why is context binding important for a signature condition?

## Further Reading

- [Chia Spend Bundles documentation](https://docs.chia.net/chia-blockchain/coin-set-model/spend-bundles/)
- [Chia Keys and Signatures documentation](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/keys/keys-and-signatures.md)
- Later chapter: CLVM basics
- Later chapter: Transaction validation details
