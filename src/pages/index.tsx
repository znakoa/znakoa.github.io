import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// 像素风格英雄区域组件
function PixelHero() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <section className={clsx('pixel-hero', styles.pixelHero)}>
      <div className="pixel-grid" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}></div>
      <div className="pixel-particles">
        {Array.from({length: 9}, (_, i) => (
          <div key={i} className="pixel-particle" style={{top: `${Math.random() * 100}%`}}></div>
        ))}
      </div>
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={clsx('pixel-text pixel-text-glow', styles.heroTitle)}>
              {siteConfig.title}
            </h1>
            <p className={clsx('pixel-text', styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>
            <div className={styles.heroButtons}>
              <Link to="/docs/gitorder" className="pixel-button">
                开始探索
              </Link>
              <Link to="/docs/interview-questions/basics-JavaScript" className="pixel-button">
                面试题库
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={clsx('pixel-card pixel-border-effect', styles.codeBlock)}>
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

// 像素风格特性展示组件
function PixelFeatures() {
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
        <h2 className={clsx('pixel-text pixel-text-glow', styles.sectionTitle)}>
          探索我的世界
        </h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.link} 
              className={clsx('pixel-card', styles.featureCard)}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={clsx('pixel-text', styles.featureTitle)}>
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

// 像素风格项目展示组件
function PixelProjects() {
  // 从配置文件读取项目数据（这里先使用静态数据，后续可以改为动态加载）
  const projects = [
    {
      title: '🚗 汽车商城',
      description: '现代化的汽车电商平台，提供完整的购物体验',
      link: 'https://znakoa.github.io/car-maeketplace/',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      image: '🚗',
      color: '#00d4ff',
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
      color: '#ff0080',
      category: '数据可视化',
      status: '已完成',
      featured: true
    }
  ];

  // 过滤出推荐项目
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section className={styles.projectsSection}>
      <div className="container">
        <h2 className={clsx('pixel-text pixel-text-glow', styles.sectionTitle)}>
          我的项目
        </h2>
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project, index) => (
            <a 
              key={index} 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={clsx('pixel-card', styles.projectCard)}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className={styles.projectHeader}>
                <div className={styles.projectIcon} style={{color: project.color}}>
                  {project.image}
                </div>
                <div className={styles.projectTitleContainer}>
                  <h3 className={clsx('pixel-text', styles.projectTitle)}>
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
            className={clsx('pixel-button', styles.viewAllButton)}
          >
            <span className={styles.buttonText}>查看更多项目</span>
            <span className={styles.buttonIcon}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// 像素风格统计组件
function PixelStats() {
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
            <div key={index} className={clsx('pixel-card', styles.statCard)}>
              <div className={clsx('pixel-text pixel-text-glow', styles.statNumber)}>
                {stat.number}
              </div>
              <div className={clsx('pixel-text', styles.statLabel)}>
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
      description="现代像素风格的个人知识库，包含JavaScript面试题、Git实战指南、前端技术文档等丰富内容">
      <PixelHero />
      <PixelFeatures />
      <PixelProjects />
      <PixelStats />
    </Layout>
  );
}
