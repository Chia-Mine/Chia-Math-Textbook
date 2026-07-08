# Mathematics of Chia

Mathematics of Chia is a Docusaurus web textbook about the mathematics needed
to understand the Chia blockchain.

The textbook is written for motivated programmers. It starts from first
principles and builds toward proof of space, proof of time, finite fields,
elliptic curves, pairings, BLS12-381, BLS signatures, class groups, VDFs, Chia
consensus, and spend bundles.

## Current Status

This is a buildable MVP textbook site. It includes the main learning path,
notation and glossary pages, introductory foundations chapters, and first-pass
Chia-specific chapters on BLS signatures, VDFs, proof of space, consensus, and
spend bundles.

Remaining work is tracked in the roadmap and chapter TODO notes. The largest
open areas are diagrams, deeper implementation details, exact Chia validation
paths, and independent mathematical review.

## Install

```bash
npm install
```

## Local Development

```bash
npm run start
```

This starts the Docusaurus development server with live reload.

## Build

```bash
npm run build
```

This generates the static site in `build/`.

## Learning Path

High-level path:

```text
foundations
-> modular arithmetic
-> groups, rings, and fields
-> finite fields
-> elliptic curves
-> pairings and BLS12-381
-> BLS signatures
-> class groups and VDFs
-> proof of space
-> Chia consensus
-> CLVM and spend bundles
```

Readers who only want one topic can follow shorter paths:

- BLS signatures: modular arithmetic, groups, finite fields, elliptic curves,
  pairings, BLS12-381, BLS signatures
- VDFs: modular arithmetic, groups, unknown-order groups, class groups,
  Wesolowski proofs
- Proof of Space: probability, time-memory tradeoffs, Beyond Hellman, Chia
  proof of space

## Contributing

Keep changes small and reviewable.

Before submitting changes:

```bash
npm run build
```

When adding or revising chapters:

- use clear textbook style
- assume the reader is a programmer, not a trained mathematician
- include examples and exercises where useful
- cite primary sources for Chia-specific claims
- distinguish intuition from formal math and implementation details

See [AGENTS.md](./AGENTS.md) for Codex/project instructions, writing rules,
chapter structure, citation expectations, and review guidelines.

## Deployment

The site is configured for GitHub Pages using GitHub Actions in
`.github/workflows/deploy.yml`.

Repository setting needed on GitHub:

```text
Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```
