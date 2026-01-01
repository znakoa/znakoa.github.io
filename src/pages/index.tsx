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
              <div className={styles.techShowcase}>
                <div className={styles.techShowcaseBg}></div>
                <div className={styles.techShowcasePattern}></div>
                
                <div className={styles.techHeader}>
                  <div className={styles.techHeaderBadge}>
                    <div className={styles.techHeaderIcon}>🚀</div>
                    <div className={styles.techHeaderGlow}></div>
                  </div>
                  <h3 className={styles.techHeaderTitle}>
                    <span className={styles.titleText}>技术栈</span>
                    <span className={styles.titleUnderline}></span>
                  </h3>
                  <p className={styles.techHeaderSubtitle}>我的开发工具与技能</p>
                </div>
                
                <div className={styles.techGrid}>
                  <div className={styles.techItem} style={{'--delay': '0.1s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #f7df1e 0%, #f0db4f 100%)'}}>
                      <span>JS</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>JavaScript</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '0.2s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #3178c6 0%, #235a97 100%)'}}>
                      <span>TS</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>TypeScript</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '0.3s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #4fc08d 0%, #42b883 100%)'}}>
                      <span>Vue</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>Vue.js</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '0.4s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #61dafb 0%, #00d8ff 100%)'}}>
                      <span>⚛️</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>React</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '0.5s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #339933 0%, #026e00 100%)'}}>
                      <span>Node</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>Node.js</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '0.6s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #f05032 0%, #ee5131 100%)'}}>
                      <span>Git</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>Git</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '0.7s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #646cff 0%, #535bf2 100%)'}}>
                      <span>⚡</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>Vite</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '0.8s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #1572b6 0%, #33a9dc 100%)'}}>
                      <span>CSS</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>CSS3</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '0.9s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #e34f26 0%, #f06529 100%)'}}>
                      <span>HTML</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>HTML5</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '1.0s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #f0db4f 0%, #323330 100%)'}}>
                      <span>ES6</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>ES6+</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '1.1s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'}}>
                      <span>TW</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>Tailwind</div>
                    <div className={styles.techItemBorder}></div>
                  </div>
                  
                  <div className={styles.techItem} style={{'--delay': '1.2s'} as React.CSSProperties}>
                    <div className={styles.techItemGlow}></div>
                    <div className={styles.techItemIcon} style={{background: 'linear-gradient(135deg, #8dd6f9 0%, #1c78c0 100%)'}}>
                      <span>WP</span>
                      <div className={styles.iconShine}></div>
                    </div>
                    <div className={styles.techItemName}>Webpack</div>
                    <div className={styles.techItemBorder}></div>
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