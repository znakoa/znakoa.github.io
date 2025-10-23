import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// 现代简约英雄区域组件
function ModernHero() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <section className={clsx('modern-hero', styles.modernHero)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={clsx(styles.heroTitle)}>
              {siteConfig.title}
            </h1>
            <p className={clsx(styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>
            <div className={styles.heroButtons}>
              <Link to="/docs/gitorder" className="modern-button">
                开始探索
              </Link>
              <Link to="/docs/interview-questions/basics-JavaScript" className="modern-button" style={{background: 'transparent', color: 'var(--ifm-color-primary)', borderColor: 'var(--ifm-color-primary)'}}>
                面试题库
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={clsx('modern-card', styles.codeBlock)}>
              <div className={styles.codeHeader}>
                <div className={styles.codeDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.codeTitle}>knowledge.js</span>
              </div>
              <pre className={styles.codeContent}>
{`const knowledge = {
  skills: ['JavaScript', 'Vue', 'React'],
  experience: 'Frontend Developer',
  passion: 'Learning & Sharing'
};

console.log('Welcome to my world!');`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 现代简约特性展示组件
function ModernFeatures() {
  const features = [
    {
      title: '📚 知识库',
      description: '系统化整理技术知识，涵盖前端开发的各个方面',
      link: '/docs/gitorder',
      icon: '💻'
    },
    {
      title: '🎯 面试题',
      description: '详细的JavaScript面试题库，助你面试成功',
      link: '/docs/interview-questions/basics-JavaScript',
      icon: '🚀'
    },
    {
      title: '🛠️ 实战指南',
      description: '实用的技术方案和工具使用指南',
      link: '/docs/export-word',
      icon: '⚡'
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={clsx(styles.sectionTitle)}>
          探索我的世界
        </h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.link} 
              className={clsx('modern-card', styles.featureCard)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>
                {feature.title}
              </h3>
              <p className={styles.featureDescription}>
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// 现代简约项目展示组件
function ModernProjects() {
  const projects = [
    {
      title: '🚗 汽车商城',
      description: '现代化的汽车电商平台，提供完整的购物体验',
      link: 'https://znakoa.github.io/car-maeketplace/',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      image: '🚗',
      color: '#2563eb',
      category: 'Web应用',
      status: '已完成',
      featured: true
    },
    {
      title: '📊 数据展示大屏',
      description: '实时数据可视化大屏，支持多种图表展示',
      link: 'https://znakoa.github.io/bigscreen/',
      tech: ['Vue', 'ECharts', 'WebSocket'],
      image: '📊',
      color: '#64748b',
      category: '数据可视化',
      status: '已完成',
      featured: true
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section className={styles.projectsSection}>
      <div className="container">
        <h2 className={clsx(styles.sectionTitle)}>
          我的项目
        </h2>
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project, index) => (
            <a 
              key={index} 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={clsx('modern-card', styles.projectCard)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={styles.projectHeader}>
                <div className={styles.projectIcon} style={{color: project.color}}>
                  {project.image}
                </div>
                <div className={styles.projectTitleContainer}>
                  <h3 className={styles.projectTitle}>
                    {project.title}
                  </h3>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <span className={styles.projectStatus}>{project.status}</span>
                  </div>
                </div>
              </div>
              <p className={styles.projectDescription}>
                {project.description}
              </p>
              <div className={styles.projectTech}>
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.projectLink}>
                <span className={styles.linkText}>查看项目 →</span>
              </div>
            </a>
          ))}
        </div>
        
        <div className={styles.projectsFooter}>
          <a 
            href="/" 
            className={clsx('modern-button', styles.viewAllButton)}
          >
            <span className={styles.buttonText}>查看更多项目</span>
            <span className={styles.buttonIcon}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// 现代简约统计组件
function ModernStats() {
  const stats = [
    { number: '35+', label: 'JavaScript知识点' },
    { number: '50+', label: 'Git命令实战' },
    { number: '∞', label: '学习热情' }
  ];

  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={clsx('modern-card', styles.statCard)}>
              <div className={styles.statNumber}>
                {stat.number}
              </div>
              <div className={styles.statLabel}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="现代简约风格的个人知识库，包含JavaScript面试题、Git实战指南、前端技术文档等丰富内容">
      <ModernHero />
      <ModernFeatures />
      <ModernProjects />
      <ModernStats />
    </Layout>
  );
}