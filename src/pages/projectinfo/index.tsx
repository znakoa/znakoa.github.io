import Layout from '@theme/Layout'
import styles from './styles.module.css'
import ShowcaseCard from './_components/ShowcaseCard'
import { cases } from './_data'

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      {/* <h1>项目</h1>
      <p>参与的项目列表</p> */}
      <a
        className="button button--primary"
        href="https://github.com/znakoa"
        target="_blank"
        rel="noreferrer">
        查看源代码
      </a>
    </section>
  )
}

function ShowcaseCards() {
  return (
    <section className="container">
      <div className="row">
        {cases.map((item) => (
          <div key={item.title} className="col col--3 margin-bottom--lg">
            <ShowcaseCard {...item} />
          </div>
        ))}
      </div>
    </section>
  )
}
export default function ProjectInfo() {
  return (
    <Layout title="Showcase">
      <div className={styles.bg}></div>
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseCards />
      </main>
    </Layout>
  )
}
