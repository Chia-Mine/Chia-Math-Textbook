import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Mathematics of Chia"
      description="A textbook about the math needed to understand the Chia blockchain.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1" className={styles.title}>
              Mathematics of Chia
            </Heading>
            <p className={styles.subtitle}>
              A textbook about the mathematics needed to understand the Chia
              blockchain, from first principles through proof of space,
              proof of time, finite fields, elliptic curves, BLS signatures,
              and VDFs.
            </p>
            <div className={styles.actions}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                Start reading
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.overview}>
          <div className="container">
            <Heading as="h2">A math-first path into Chia</Heading>
            <p>
              This site is organized as a textbook for programmers who want the
              definitions, examples, and intuition behind the mathematics used
              by Chia. The goal is to make each topic build naturally toward
              the protocol concepts it supports.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
