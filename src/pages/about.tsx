import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './about.module.css';

type SkillGroup = {label: string; title: string; description: string; skills: string[]};
type Experience = {period: string; company: string; role: string; summary: string; contributions: string[]};
type Project = {name: string; scope: string; stack: string[]; description: string; contribution: string};

const profile = [
  {label: '方向', value: '企业信息化 / Web 前端'},
  {label: '经验', value: '3 年前端开发经验'},
  {label: '交付', value: '管理系统 / 小程序 / 移动端'},
  {label: '协作', value: 'Git / Code Review / CI/CD'},
];

const skillGroups: SkillGroup[] = [
  {label: '01', title: '界面与框架', description: '以可维护的组件边界和一致的交互完成业务界面交付。', skills: ['HTML5', 'CSS3', 'JavaScript', 'Vue 2 / 3', 'React', 'Element Plus']},
  {label: '02', title: '工程与质量', description: '从构建、规范到代码评审，持续处理稳定性和性能问题。', skills: ['Vite', 'Webpack', 'Babel', 'SWC', 'ESLint', 'Prettier', 'Git', 'CI/CD']},
  {label: '03', title: '多端与业务', description: '面向企业流程、后台系统与移动场景，完成稳定的数据交互。', skills: ['uni-app', '微信小程序', 'BPMN', 'Tailwind CSS', 'UnoCSS', 'Node.js']},
];

const experiences: Experience[] = [
  {
    period: '2023.06 - 至今', company: '宁波文钥科技有限公司', role: '前端开发工程师',
    summary: '负责企业信息化产品的前端架构、技术选型与持续迭代。',
    contributions: ['参与前端架构设计与技术选型，保障系统的稳定性和可扩展性。', '通过代码评审和规范化协作提升代码质量、可读性与可维护性。', '围绕加载速度、资源压缩与缓存策略进行性能优化，改善使用体验。'],
  },
  {
    period: '2022.06 - 2023.06', company: '中兴软件技术（南昌）有限公司', role: '开发组组员',
    summary: '参与管理平台与微信小程序开发，完成界面、接口和发布闭环。',
    contributions: ['根据 UI 设计完成前端页面与交互实现，并通过 Axios 完成数据联调。', '处理代码优化、资源压缩和懒加载，提升平台页面加载速度。', '参与微信小程序的设计、开发与发布，熟悉端侧开发流程。'],
  },
];

const projects: Project[] = [
  {name: '信息化平台', scope: '企业信息采集、管理与数据统计', stack: ['Vue 3', 'Element Plus', 'BPMN', 'UnoCSS'], description: '基于开源后台管理系统进行二次开发，面向持续变化的企业业务场景。', contribution: '梳理并规划业务流程，使用 BPMN 推动流程自动化；完成定制化界面和稳定的数据交互，并参与系统集成与性能瓶颈攻关。'},
  {name: '信息化平台 App', scope: '移动端信息采集与作业票管理', stack: ['uni-app', 'JSBridge'], description: '面向登录、信息采集、信息管理及数据统计的移动端应用。', contribution: '参与混合开发场景下的功能交付，保障移动端与业务平台的使用衔接。'},
  {name: '智能收发卡管理后台系统', scope: '收发卡流程与后台管理', stack: ['Vue 3', 'Element Plus'], description: '基于开源后台管理系统进行二次开发，聚焦高效、可维护的后台能力。', contribution: '规划架构与模块开发，建立代码规范与质量保障方式，并持续优化关键模块的性能和响应速度。'},
  {name: 'ERP 管理系统', scope: '供应链、采购与库存管理', stack: ['Vue 3', 'Element Plus', 'BPMN'], description: '服务企业内部资源管理、数据分析与实时业务信息查询。', contribution: '负责核心模块的需求分析、架构规划与模块设计，处理技术选型、组件集成、性能优化与生产问题定位。'},
];

const education = [
  {period: '2023.04 - 2025.07', school: '南昌航空大学', major: '软件工程'},
  {period: '2019.09 - 2022.07', school: '江西应用工程职业学院', major: '物联网应用技术'},
];

function SectionHeading({label, title, id}: {label: string; title: string; id: string}) {
  return <header className={styles.sectionHeading}><span className={styles.sectionLabel}>{label}</span><h2 id={id}>{title}</h2></header>;
}

export default function About(): ReactNode {
  return (
    <Layout title="关于作者" description="周癸，前端开发工程师。专注企业信息化产品、业务流程与多端交付。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container"><div className={styles.heroGrid}>
            <div className={styles.heroIntro}>
              <p className={styles.eyebrow}>Frontend engineer / professional record</p>
              <h1>周癸</h1><p className={styles.role}>前端开发工程师</p>
              <p className={styles.lede}>面向企业信息化产品，专注 Vue 生态、业务流程建模与多端交付。从界面实现到工程协作，持续把复杂业务沉淀为稳定、清晰的使用体验。</p>
              <div className={styles.heroLinks}><a href="https://github.com/znakoa" target="_blank" rel="noopener noreferrer">GitHub</a><Link to="/">浏览知识库</Link></div>
            </div>
            <aside className={styles.profileRecord} aria-label="职业档案摘要"><p className={styles.recordTitle}>PROFILE / 2025</p><dl>{profile.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></aside>
          </div></div>
        </section>

        <section className={styles.capabilities} aria-labelledby="capabilities-title"><div className="container">
          <SectionHeading label="CAPABILITY MAP" title="技术能力" id="capabilities-title" />
          <div className={styles.skillGrid}>{skillGroups.map((group) => <article key={group.label} className={styles.skillGroup}><span className={styles.groupIndex}>{group.label}</span><h3>{group.title}</h3><p>{group.description}</p><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
        </div></section>

        <section className={styles.experienceSection} aria-labelledby="experience-title"><div className="container">
          <SectionHeading label="DELIVERY AXIS" title="工作经历" id="experience-title" />
          <div className={styles.experienceList}>{experiences.map((experience) => <article key={experience.period} className={styles.experienceEntry}><div className={styles.experienceMeta}><span>{experience.period}</span><strong>{experience.company}</strong></div><div className={styles.experienceBody}><h3>{experience.role}</h3><p>{experience.summary}</p><ul>{experience.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul></div></article>)}</div>
        </div></section>

        <section className={styles.projectsSection} aria-labelledby="projects-title"><div className="container">
          <SectionHeading label="SELECTED SYSTEMS" title="项目经历" id="projects-title" />
          <div className={styles.projectList}>{projects.map((project) => <article key={project.name} className={styles.projectEntry}><div className={styles.projectHeading}><h3>{project.name}</h3><p>{project.scope}</p></div><div className={styles.projectDetail}><p>{project.description}</p><p>{project.contribution}</p><ul className={styles.techList} aria-label={`${project.name} 技术栈`}>{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul></div></article>)}</div>
        </div></section>

        <section className={styles.educationSection} aria-labelledby="education-title"><div className="container">
          <SectionHeading label="EDUCATION" title="教育经历" id="education-title" />
          <div className={styles.educationList}>{education.map((item) => <article key={item.period}><span>{item.period}</span><strong>{item.school}</strong><p>{item.major}</p></article>)}</div>
        </div></section>
      </main>
    </Layout>
  );
}
