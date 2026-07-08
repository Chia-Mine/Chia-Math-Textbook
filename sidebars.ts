import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  textbookSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Preface',
      link: {type: 'doc', id: 'preface/index'},
      items: [
        'preface/how-to-read-this-book',
        'preface/learning-paths',
        'preface/glossary',
        'preface/notation',
        'preface/roadmap',
        'preface/math-rendering-test',
      ],
    },
    {
      type: 'category',
      label: 'Foundations',
      link: {type: 'doc', id: 'foundations/index'},
      items: [
        'foundations/sets-functions-proofs',
        'foundations/probability-for-cryptography',
      ],
    },
    {
      type: 'category',
      label: 'Number Theory',
      link: {type: 'doc', id: 'number-theory/index'},
      items: ['number-theory/modular-arithmetic'],
    },
    {
      type: 'category',
      label: 'Groups, Rings, and Fields',
      link: {type: 'doc', id: 'groups-rings-fields/index'},
      items: [
        'groups-rings-fields/groups',
        'groups-rings-fields/rings-and-fields',
        'groups-rings-fields/finite-fields',
      ],
    },
    {
      type: 'category',
      label: 'Elliptic Curves',
      link: {type: 'doc', id: 'elliptic-curves/index'},
      items: [
        'elliptic-curves/elliptic-curve-group-law',
        'elliptic-curves/curves-over-finite-fields',
      ],
    },
    {
      type: 'category',
      label: 'Pairings and BLS12-381',
      link: {type: 'doc', id: 'pairings-bls12381/index'},
      items: [
        'pairings-bls12381/pairings',
        'pairings-bls12381/bls12-381',
      ],
    },
    {
      type: 'category',
      label: 'BLS Signatures',
      link: {type: 'doc', id: 'bls-signatures/index'},
      items: ['bls-signatures/bls-signatures'],
    },
    {
      type: 'category',
      label: 'Class Groups',
      link: {type: 'doc', id: 'class-groups/index'},
      items: [
        'class-groups/unknown-order-groups',
        'class-groups/class-groups',
      ],
    },
    {
      type: 'category',
      label: 'VDFs and Wesolowski Proofs',
      link: {type: 'doc', id: 'vdf-wesolowski/index'},
      items: [
        'vdf-wesolowski/wesolowski-vdf',
        'vdf-wesolowski/n-wesolowski',
      ],
    },
    {
      type: 'category',
      label: 'Proof of Space',
      link: {type: 'doc', id: 'proof-of-space/index'},
      items: [
        'proof-of-space/time-memory-tradeoffs',
        'proof-of-space/beyond-hellman',
        'proof-of-space/chia-proof-of-space',
      ],
    },
    {
      type: 'category',
      label: 'Chia Consensus',
      link: {type: 'doc', id: 'chia-consensus/index'},
      items: ['chia-consensus/consensus-overview'],
    },
    {
      type: 'category',
      label: 'CLVM and Transactions',
      link: {type: 'doc', id: 'clvm-transactions/index'},
      items: ['clvm-transactions/spend-bundles-and-bls'],
    },
    {
      type: 'category',
      label: 'Implementation and Security',
      link: {type: 'doc', id: 'implementation-security/index'},
      items: [],
    },
  ],
};

export default sidebars;
