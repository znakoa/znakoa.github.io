import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'

import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <img
          src={require('@site/static/img/hello-world.gif').default}
          style={{
            flex: '0 0 auto',
            borderRadius: 8,
          }}
        />
        <Heading as="h1" className="hero__title" style={{ marginTop: '100px' }}>
          遇上即是上上签
        </Heading>
        {/* <p className="hero__subtitle">666</p> */}
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/about">
            关于作者
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={siteConfig.title}>
      <main>
        <HomepageHeader />
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  )
}
