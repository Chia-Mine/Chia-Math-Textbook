import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    title: 'From first principles',
    description:
      'Build the algebra, number theory, and elliptic-curve background needed to read Chia protocol papers with confidence.',
  },
  {
    title: 'Cryptography in context',
    description:
      'Connect BLS12-381 pairings, BLS signatures, class groups, VDFs, and proofs of space to the systems that use them.',
  },
  {
    title: 'Toward the protocol',
    description:
      'Use the mathematical toolkit to study Chia consensus, CLVM transactions, and the design choices behind the network.',
  },
];

function Feature({title, description}: {title: string; description: string}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Mathematics of Chia"
      description="A web textbook for the mathematics behind the Chia blockchain">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            Mathematics of Chia
          </Heading>
          <p className="hero__subtitle">
            A docs-based web textbook explaining the mathematical structures behind Chia.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/00-preface/">
              Start the Textbook
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.introduction}>
          <div className="container">
            <Heading as="h2">What this textbook covers</Heading>
            <p>
              This textbook is organized as a sequence of mathematical chapters that move from
              foundations to the Chia protocol. It is intended for readers who want a rigorous but
              approachable path through the algebra, cryptography, and distributed-systems ideas
              that appear in Chia.
            </p>
          </div>
        </section>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props) => (
                <Feature key={props.title} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
