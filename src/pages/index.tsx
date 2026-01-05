import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
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
      <div className={styles.heroBackground}>
        <div className={styles.floatingElements}>
          <div className={styles.floatingCircle} style={{top: '10%', left: '10%', animationDelay: '0s'}}></div>
          <div className={styles.floatingCircle} style={{top: '20%', right: '15%', animationDelay: '1s'}}></div>
          <div className={styles.floatingCircle} style={{bottom: '30%', left: '20%', animationDelay: '2s'}}></div>
          <div className={styles.floatingCircle} style={{bottom: '10%', right: '10%', animationDelay: '3s'}}></div>
        </div>
      </div>
      
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            {/* <div className={styles.heroBadge}>
              <span className={styles.badgeIcon}>✨</span>
              <span className={styles.badgeText}>现代简约设计</span>
            </div> */}
            
            <h1 className={clsx(styles.heroTitle)}>
              <span className={styles.titleMain}>{siteConfig.title}</span>
              <span className={styles.titleSub}>个人知识库</span>
            </h1>
            
            <p className={clsx(styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>
            
            <div className={styles.heroButtons}>
              <Link to="/docs/gitorder" className={styles.primaryButton}>
                <span className={styles.buttonIcon}>🚀</span>
                <span>开始探索</span>
              </Link>
              <Link to="/docs/interview-questions/basics-JavaScript" className={styles.secondaryButton}>
                <span className={styles.buttonIcon}>📚</span>
                <span>面试题库</span>
              </Link>
            </div>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>35+</span>
                <span className={styles.statLabel}>知识点</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>实战案例</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>∞</span>
                <span className={styles.statLabel}>学习热情</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.visualContainer}>
              <div className={styles.codeWindowWrapper}>
                <div className={styles.codeWindow}>
                  <div className={styles.codeHeader}>
                    <div className={styles.codeDots}>
                      <div className={styles.dot} style={{background: '#ff5f56'}}></div>
                      <div className={styles.dot} style={{background: '#ffbd2e'}}></div>
                      <div className={styles.dot} style={{background: '#27c93f'}}></div>
                    </div>
                    <div className={styles.codeTitle}>knowledge.js</div>
                    <div className={styles.codeActions}>
                      <span className={styles.actionIcon}>📁</span>
                      <span className={styles.actionIcon}>⚙️</span>
                    </div>
                  </div>
                  <div className={styles.codeContent}>
                    <div className={styles.codeLine} style={{animationDelay: '0.1s'}}>
                      <span className={styles.lineNumber}>1</span>
                      <span className={styles.codeText}>
                        <span className={styles.keyword}>const</span> <span className={styles.property}>knowledge</span> = <span className={styles.bracket}>{'{'}</span>
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '0.2s'}}>
                      <span className={styles.lineNumber}>2</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;<span className={styles.property}>name</span>: <span className={styles.string}>'个人知识库'</span>,
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '0.3s'}}>
                      <span className={styles.lineNumber}>3</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;<span className={styles.property}>topics</span>: <span className={styles.bracket}>[</span>
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '0.4s'}}>
                      <span className={styles.lineNumber}>4</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.string}>'JavaScript'</span>,
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '0.5s'}}>
                      <span className={styles.lineNumber}>5</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.string}>'Git'</span>,
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '0.6s'}}>
                      <span className={styles.lineNumber}>6</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.string}>'前端开发'</span>
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '0.7s'}}>
                      <span className={styles.lineNumber}>7</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;<span className={styles.bracket}>]</span>,
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '0.8s'}}>
                      <span className={styles.lineNumber}>8</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;<span className={styles.property}>learning</span>: <span className={styles.function}>()</span> => <span className={styles.bracket}>{'{'}</span>
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '0.9s'}}>
                      <span className={styles.lineNumber}>9</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.keyword}>return</span> <span className={styles.string}>'持续学习中...'</span>;
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '1.0s'}}>
                      <span className={styles.lineNumber}>10</span>
                      <span className={styles.codeText}>
                        &nbsp;&nbsp;<span className={styles.bracket}>{'}'}</span>
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '1.1s'}}>
                      <span className={styles.lineNumber}>11</span>
                      <span className={styles.codeText}>
                        <span className={styles.bracket}>{'}'}</span>;
                      </span>
                    </div>
                    <div className={styles.codeLine} style={{animationDelay: '1.2s'}}>
                      <span className={styles.lineNumber}>12</span>
                      <span className={styles.codeText}>
                        <span className={styles.comment}>// 探索更多精彩内容 →</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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

// 回到顶部按钮组件
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 当滚动超过300px时显示按钮
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 监听滚动事件
    window.addEventListener('scroll', toggleVisibility);
    
    // 初始化检查
    toggleVisibility();

    // 清理函数
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={clsx(styles.scrollToTop, {[styles.visible]: isVisible})}
      onClick={scrollToTop}
      aria-label="回到顶部"
      title="回到顶部"
    >
      <div className={styles.scrollToTopGlow}></div>
      <div className={styles.scrollToTopRing}></div>
      <div className={styles.scrollToTopContent}>
        <div className={styles.rocketContainer}>
          <svg className={styles.scrollToTopIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
          <div className={styles.rocketFlame}>
            <div className={styles.flame1}></div>
            <div className={styles.flame2}></div>
            <div className={styles.flame3}></div>
          </div>
        </div>
        <div className={styles.scrollToTopRipple}></div>
      </div>
    </button>
  );
}


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="现代简约风格的个人知识库，包含JavaScript面试题、Git实战指南、前端技术文档等丰富内容">
        <main className={styles.mianbg}>
            <ModernHero />
            <ModernFeatures />
            <ModernProjects />
            <ModernStats />
            <ScrollToTop />
        </main>

    </Layout>
  );
}