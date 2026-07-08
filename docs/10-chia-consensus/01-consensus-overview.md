---
title: Consensus Overview
sidebar_position: 1
---

# Chia Consensus Overview

## Goal

By the end of this chapter, you should understand the roles of farmers,
harvesters, full nodes, and timelords, and how proof of space and proof of time
fit together through challenges, signage points, infusion points, sub-slots,
and chain weight.

This is an overview. It intentionally avoids full consensus validation details.

## Prerequisites

You should know:

- Chia proof of space at a high level
- VDFs and proof of time at a high level
- BLS signatures at a high level
- basic blockchain vocabulary such as blocks and nodes

## Proof of Space and Time

Chia consensus combines proof of space and proof of time.

Proof of space lets farmers show that they have allocated storage in plots.
Proof of time uses VDFs to show that sequential time has passed.

Chia's consensus basics documentation describes the method as Proof of Space
and Time:
[How Chia Consensus Works](https://docs.chia.net/consensus-basics/).

The high-level idea is:

```text
stored plots create eligibility
-> VDFs pace time
-> blocks are selected and infused
-> the heaviest valid chain wins
```

## Farmers

A **farmer** manages farming activity. It receives signage point information,
asks harvesters whether plots have eligible proofs, and assembles block
information when it can create a block.

Farmers are the participants trying to win blocks with stored plots.

## Harvesters

A **harvester** manages plots. It checks plot files for proofs when the farmer
asks.

Separating farmer and harvester roles lets one farmer coordinate plots across
multiple machines. Conceptually:

```text
farmer receives challenge
-> harvester checks plots
-> harvester returns candidate proofs
-> farmer signs/submits block data
```

Implementation details vary by deployment and configuration.

## Full Nodes

A **full node** validates and propagates blockchain data. It checks block
headers, proofs of space and time, signatures, transactions, and consensus
rules as appropriate.

Chia block validation documentation distinguishes header validation from body
validation:
[Block Validation](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/consensus/block-validation/block-validation.md).

For this overview, remember that full nodes enforce the rules. They do not
trust farmers just because farmers claim they found a proof.

## Timelords

A **timelord** runs VDFs and broadcasts proofs of time. Chia timelord
documentation describes timelords as supporting the network by creating
sequential proofs of time:
[Timelords](https://docs.chia.net/chia-blockchain/architecture/timelords/).

Timelords help pace the chain. Farmers can find eligible proofs of space, but
proof of time determines when those proofs are infused into the chain.

## Challenges

A **challenge** is a value used by farmers' plots and VDF chains. Chia docs
describe challenges as 256-bit hash values used as proof-of-space challenges
and VDF inputs:
[Challenges](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/consensus/chains/challenges.md).

The challenge gives farmers an unpredictable question to answer from their
stored plots.

## Signage Points

A **signage point** is an intermediate point in time inside a sub-slot.

Chia docs describe 64 signage points within a sub-slot in the challenge and
reward chains, with VDF outputs created and broadcast at each point:
[Signage and Infusion Points](https://docs.chia.net/chia-blockchain/consensus/chains/signage-and-infusion-points/).

At a signage point, farmers learn information that lets them check whether any
of their plots may be eligible.

## Infusion Points

An **infusion point** is where a farmer's block is infused into the reward
chain VDF.

A block's infusion point comes after its signage point. The farmer can create
and broadcast block information at the signage point, but the block is not
fully finished until the required VDF information reaches the infusion point.

This is one way proof of time complements proof of space: the farmer's storage
eligibility must be followed by elapsed VDF time.

## Sub-Slots

A **sub-slot** is a segment of VDF iterations. Chia's chain documentation
describes sub-slots as fixed iteration segments subject to adjustment:
[Challenges](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/consensus/chains/challenges.md).

Sub-slots structure time in the consensus protocol. Signage points divide a
sub-slot into smaller opportunities for farmers to create blocks.

## Chain Weight

Chain weight is the measure used to compare competing chains. A full node
follows the best valid chain according to consensus rules, not merely the chain
it saw first.

At this overview level, think of weight as the accumulated consensus strength
of a chain. Detailed weight calculation belongs in a later consensus-validation
chapter.

## Why Proof of Time Complements Proof of Space

Proof of space by itself gives storage-based eligibility, but it does not
force time to pass between attempts. Proof of time adds a sequential clock.

Together:

- proof of space chooses eligible farmers according to stored space
- proof of time prevents instant grinding through many possible histories
- signatures bind farmer-created block data
- full nodes validate the resulting chain

This combination is why Chia is described as proof of space and time, not only
proof of space.

## Common Pitfalls

**Thinking farmers and timelords do the same job.** Farmers use plots to find
proofs of space. Timelords advance VDF time.

**Confusing signage points with infusion points.** A signage point is when a
farmer may create a block candidate; the infusion point is when the block gets
infused into the VDF chain.

**Assuming harvesters validate consensus.** Harvesters check plots. Full nodes
validate the chain.

**Treating this overview as a full specification.** Exact validation rules
belong in Chia consensus documents and source code.

**Ignoring time.** Proof of space needs proof of time to prevent cheap grinding
over alternatives.

## Exercises

1. In one sentence each, describe the role of a farmer, harvester, full node,
   and timelord.
2. Why does Chia need proof of time in addition to proof of space?
3. What happens at a signage point, conceptually?
4. What happens at an infusion point, conceptually?
5. Explain why a full node should validate proofs instead of trusting a farmer.
6. What is a sub-slot?
7. Read the linked signage/infusion documentation and identify one detail this
   chapter leaves at overview level.

## Further Reading

- [How Chia Consensus Works](https://docs.chia.net/consensus-basics/)
- [Signage and Infusion Points](https://docs.chia.net/chia-blockchain/consensus/chains/signage-and-infusion-points/)
- [Timelords](https://docs.chia.net/chia-blockchain/architecture/timelords/)
- [Three VDF Chains](https://docs.chia.net/chia-blockchain/consensus/chains/three-vdf-chains/)
- [Block Validation](https://github.com/Chia-Network/chia-docs/blob/main/docs/chia-blockchain/consensus/block-validation/block-validation.md)
