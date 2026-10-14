import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './about.module.css';

type BasicInfo = {
  label: string;
  value: string;
  href?: string;
};

const basicInfo: BasicInfo[] = [
  {label: '姓名', value: '苏木'},
  {label: '职业', value: '前端开发工程师'},
  {label: '所在地', value: '中国 · 杭州'},
  {label: 'GitHub', value: 'github.com/znakoa', href: 'https://github.com/znakoa'},
  {label: '技术方向', value: 'Web 前端 / 数据可视化'},
];

const stats = [
  {number: '5+', label: '年开发经验'},
  {number: '30+', label: '完成项目'},
  {number: '120+', label: '知识笔记'},
];

const skills = [
  'Vue',
  'React',
  'TypeScript',
  'Node.js',
  '小程序',
  'ECharts',
];

const timeline = [
  {
    period: '2021 - 至今',
    title: '前端开发工程师',
    description: '负责中后台系统、数据可视化大屏与技术文档建设。',
  },
  {
    period: '2019 - 2021',
    title: '初级前端工程师',
    description: '参与电商与内容平台的前端开发，积累工程实践。',
  },
  {
    period: '2017 - 2019',
    title: '软件工程专业学习',
    description: '从基础语法到项目实践，形成系统的知识体系。',
  },
];

export default function About(): ReactNode {
  return (
    <Layout
      title="关于作者"
      description="苏木的个人技术知识库，整理前端开发、工程化与数据可视化实践。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className={styles.heroMain}>
                <p className={styles.kicker}>FILE // SU-MU</p>
                <h1 className={styles.name}>苏木</h1>
                <p className={styles.role}>前端开发工程师 · 知识分享者</p>
                <p className={styles.bio}>
                  喜欢把复杂的技术问题拆成清晰的知识卡片，长期沉淀前端、工程化和数据可视化相关内容。
                </p>
              </div>

              <aside className={styles.infoCard}>
                <h2 className={styles.infoTitle}>基本信息</h2>
                <dl className={styles.infoList}>
                  {basicInfo.map((item) => (
                    <div key={item.label} className={styles.infoItem}>
                      <dt>{item.label}</dt>
                      <dd>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.skillsSection}>
          <div className="container">
            <p className={styles.sectionIndex}>SKILL.01 / stack</p>
            <h2 className={styles.sectionTitle}>技术方向</h2>
            <div className={styles.skillsGrid}>
              {skills.map((skill) => (
                <div key={skill} className={styles.skillCard}>
                  <span className={styles.skillName}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.timelineSection}>
          <div className="container">
            <p className={styles.sectionIndex}>PATH.02 / timeline</p>
            <h2 className={styles.sectionTitle}>经历时间线</h2>
            <div className={styles.timeline}>
              {timeline.map((item) => (
                <article key={item.title} className={styles.timelineItem}>
                  <span className={styles.timelinePeriod}>{item.period}</span>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDescription}>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className="container">
            <p className={styles.sectionIndex}>LINK.03 / contact</p>
            <h2 className={styles.sectionTitle}>联系我</h2>
            <div className={styles.contactLinks}>
              <a className={styles.contactLink} href="https://github.com/znakoa" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <Link className={styles.contactLink} to="/">
                返回首页
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
