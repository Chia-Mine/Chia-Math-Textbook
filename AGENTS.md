# AGENTS.md

## Project

This repository is a web textbook called "Mathematics of Chia".

It teaches the mathematics needed to understand the Chia blockchain from first principles, including:

- proof techniques
- modular arithmetic
- group theory
- rings and fields
- finite fields
- elliptic curves
- pairings
- BLS12-381
- BLS signatures
- class groups of unknown order
- Wesolowski VDFs
- n-Wesolowski proofs
- Beyond Hellman time-memory tradeoffs
- Chia Proof of Space and Time
- CLVM, coins, and spend bundles

## Stack

- Docusaurus
- TypeScript
- MDX
- KaTeX
- GitHub Pages

## Commands

Before opening a pull request, run:

    npm install
    npm run build

For local preview, run:

    npm run start

## Writing rules

- Write in clear textbook style.
- Start from first principles.
- Assume the reader is a motivated programmer, not a trained mathematician.
- Prefer definitions, examples, diagrams, exercises, and "Chia connection" sections.
- Do not assume the reader already knows abstract algebra, elliptic curves, pairings, or cryptography.
- Every Chia-specific factual claim should include a source reference.
- Every cryptographic construction should distinguish intuition from formal security.
- Use LaTeX math syntax for equations.
- Avoid giant chapters. Split long topics into smaller pages.
- Prefer short sections with concrete examples.
- When a topic is advanced, explain why it matters before giving formal definitions.
- Avoid pretending that simplified explanations are complete proofs.
- Flag places where a statement is intuition, approximation, or implementation-specific.

## Chapter template

Each chapter should include the following sections when appropriate:

1. Goal
2. Prerequisites
3. Motivation
4. Core definitions
5. Examples
6. Main explanation
7. Chia connection
8. Common pitfalls
9. Exercises
10. Further reading

## Math formatting

Use inline math like this:

    A group operation is written as $a \cdot b$.

Use display math like this:

    $$
    e(aP, bQ) = e(P, Q)^{ab}
    $$

Do not use images for equations unless absolutely necessary.

## Citation rules

For Chia-specific claims, prefer primary sources:

- Chia documentation
- Chia Network GitHub repositories
- official Chia papers or specs
- original cryptography papers when explaining constructions

For cryptographic constructions, cite original or standard references where possible.

Examples:

- BLS signatures: Boneh, Lynn, and Shacham
- BLS signature standardization: IETF / CFRG drafts or RFCs
- BLS12-381: pairing-friendly curve references and implementation specs
- VDFs: Wesolowski, Pietrzak, and Chia documentation
- Proof of Space: Beyond Hellman paper and Chia proof-of-space docs

## Tone

The textbook should be rigorous but friendly.

Good:

- "Here is the intuition first."
- "This is not a full proof yet, but it explains the shape of the argument."
- "This definition looks abstract, so let us test it on a small example."

Avoid:

- unexplained jargon
- huge symbolic jumps
- claims like "obviously" or "clearly" when the reader may not know why
- unsupported implementation claims

## Review guidelines

When reviewing a chapter, check:

- mathematical correctness
- clear definitions
- accurate Chia-specific statements
- working links
- working KaTeX syntax
- beginner readability
- consistent terminology
- sidebar ordering
- whether exercises match the chapter content

## Repository conventions

- Put textbook chapters under `docs/`.
- Use one MDX file per chapter or subchapter.
- Use lowercase filenames with hyphens.
- Keep filenames numbered for ordering.

Example:

    docs/01-foundations/01-sets-functions-proofs.md
    docs/01-foundations/02-modular-arithmetic.md
    docs/02-algebra/01-groups.md
    docs/04-bls/03-bls-signatures.md

## Preferred chapter structure

Use this structure for most chapters:

    ---
    title: Chapter Title
    sidebar_position: 1
    ---

    # Chapter Title

    ## Goal

    By the end of this chapter, you should be able to ...

    ## Prerequisites

    - ...

    ## Motivation

    ...

    ## Core definitions

    ...

    ## Examples

    ...

    ## Main explanation

    ...

    ## Chia connection

    ...

    ## Common pitfalls

    ...

    ## Exercises

    1. ...
    2. ...
    3. ...

    ## Further reading

    ...

## Build requirements

A pull request should not be considered ready until:

    npm run build

passes successfully.

If a build fails, fix the build before expanding the content further.

## Codex task behavior

When asked to write or revise content:

- Prefer focused edits.
- Do not rewrite unrelated chapters.
- Keep pull requests small.
- Explain important assumptions in the PR summary.
- Mention any sources that still need verification.
- Mention any mathematical sections that need human review.
- Run the build before finalizing.

When asked to add a new chapter:

- Create the MDX file.
- Add or update sidebar ordering if needed.
- Include the standard chapter sections.
- Include at least three exercises.
- Include a "Chia connection" section when relevant.
- Run the build.

When asked to review:

- Look for correctness first.
- Then readability.
- Then style.
- Then formatting.
- Do not make broad rewrites unless explicitly requested.

## Important subject map

The dependency path for BLS12-381 and BLS signatures is:

    proofs
    -> modular arithmetic
    -> groups
    -> fields
    -> finite fields
    -> elliptic curves
    -> extension fields
    -> pairings
    -> BLS12-381
    -> hash-to-curve
    -> BLS signatures
    -> aggregation
    -> Chia spend bundles

The dependency path for VDFs and n-Wesolowski is:

    modular arithmetic
    -> groups
    -> exponentiation
    -> unknown-order groups
    -> class groups
    -> repeated squaring
    -> Wesolowski proof
    -> n-Wesolowski
    -> Chia proof of time

The dependency path for Proof of Space and Beyond Hellman is:

    algorithms
    -> probability
    -> hash functions
    -> function inversion
    -> time-memory tradeoffs
    -> Hellman tables
    -> Beyond Hellman
    -> Chia plotting
    -> Chia farming proofs

The dependency path for Chia as a whole is:

    proof of space
    -> proof of time
    -> consensus chains
    -> blocks and sub-slots
    -> BLS signatures
    -> CLVM
    -> coin set model
    -> spend bundles
    -> full node validation
