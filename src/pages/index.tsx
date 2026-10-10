import type {ReactNode, CSSProperties} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

/**
 * 首页 = 目录矩阵
 * ------------------------------------------------------------------
 * 这里不是宣传页，而是这份笔记库的目录。每个主题一张卡片：
 *   索书号（主题缩写 + 侧栏位次）· 主题名 · 一句话说明 · 代表性题目
 * 颜色 = 索书号色位，与侧栏、正文书脊、代码左轨完全一致，
 * 于是「在哪一章」这件事在首页就已经被颜色交代清楚了。
 *
 * 刻意没有放统计数字卡片和假代码窗口：数字会过期，
 * 而代表性题目本身就是最好的内容说明。
 */

type Shelf = {
  /** 索书号：缩写 + 侧栏位次（位次取自 front-matter 的 sidebar_position） */
  code: string;
  name: string;
  to: string;
  /** [亮色, 暗色] 色位，与 src/clientModules/shelfHue.js 保持一致 */
  hue: [string, string];
  desc: string;
  items: string[];
};

const INTERVIEW: Shelf[] = [
  {
    code: 'JS · 01',
    name: 'JavaScript 基础',
    to: '/docs/interview-questions/basics-JavaScript',
    hue: ['#3b5ba5', '#8fa8e0'],
    desc: '35 道基础与手写题，从类型陷阱到原型链。',
    items: ['var / let / const 的区别', '深拷贝与循环引用', '手写一个简化版 Promise', '事件循环与微任务'],
  },
  {
    code: 'VUE · 02',
    name: 'Vue',
    to: '/docs/interview-questions/basics-vue',
    hue: ['#2f7f76', '#79c3b7'],
    desc: '上下两篇：从 slot 到响应式原理与 Pinia。',
    items: ['v-show 与 v-if 的区别', 'Vue 3 为什么用 Proxy', 'Pinia 与 Vuex 的不同', 'nextTick 的作用'],
  },
  {
    code: 'REACT · 03',
    name: 'React',
    to: '/docs/interview-questions/basics-react',
    hue: ['#6b5493', '#b49cd6'],
    desc: '状态模型、协调算法与 Hooks 的性能问题。',
    items: ['如何理解 UI = f(state)', 'Fiber 架构解决什么', '受控与非受控组件', 'useContext 的性能优化'],
  },
  {
    code: 'ENG · 04',
    name: '工程化',
    to: '/docs/interview-questions/basics-engineering',
    hue: ['#4a5a6a', '#93a7bb'],
    desc: '30 题，含 20 道 Webpack 与构建体系专题。',
    items: ['三个组件请求同一个 API', 'cjs / esm / umd 的区别', 'pnpm 有什么优势', 'Webpack 热更新原理'],
  },
  {
    code: 'NODE · 05',
    name: 'Node.js',
    to: '/docs/interview-questions/basics-node',
    hue: ['#6e7b3e', '#a9c177'],
    desc: 'fs、Buffer、Stream 与事件循环机制。',
    items: ['事件循环流程', 'EventEmitter 如何实现', 'Stream 的四种类型', 'JWT 鉴权机制'],
  },
  {
    code: 'MINI · 06',
    name: '微信小程序',
    to: '/docs/interview-questions/basics-mini-programs',
    hue: ['#a6603a', '#db9569'],
    desc: '运行原理、支付与登录链路、性能优化。',
    items: ['小程序的实现原理', '支付流程与签名', '登录流程与 code2session', 'setData 性能优化'],
  },
];

const HANDWRITTEN: Shelf[] = [
  {
    code: 'COMP · 01',
    name: '综合题',
    to: '/docs/handwritten-questions/comprehensive',
    hue: ['#8e3b4a', '#d48695'],
    desc: '20 道场景实现题，每题都带可运行代码。',
    items: ['实现 sleep 函数', '异步并发数限制', 'Promise 调度器', '版本号排序', '有效括号'],
  },
  {
    code: 'ALGO · 02',
    name: '算法数据结构',
    to: '/docs/handwritten-questions/algorithm-data-structure',
    hue: ['#8e3b4a', '#d48695'],
    desc: '从零手写链表、队列与二叉树，带图解。',
    items: ['实现一个链表结构', '实现一个队列', '递归反转链表', '二叉树搜索'],
  },
];

const REFERENCE: Shelf[] = [
  {
    code: 'GIT · 01',
    name: 'git 常见实战命令',
    to: '/docs/gitorder',
    hue: ['#4a5a6a', '#93a7bb'],
    desc: '分支、暂存、回退与 tag 的速查表。',
    items: [],
  },
  {
    code: 'WORD · 02',
    name: '前端导出 Word 文件',
    to: '/docs/export-word',
    hue: ['#4a5a6a', '#93a7bb'],
    desc: 'docxtemplater + pizzip 的完整实现。',
    items: [],
  },
  {
    code: 'CSS · 05',
    name: '如何命名更规范 class',
    to: '/docs/class-name',
    hue: ['#4a5a6a', '#93a7bb'],
    desc: '命名关键词表与 BEM 实践。',
    items: [],
  },
  {
    code: 'MINI · 01',
    name: 'uniapp 安卓语音播报',
    to: '/docs/daily-work/uniapp',
    hue: ['#a6603a', '#db9569'],
    desc: '调用系统 TTS 引擎的完整封装类。',
    items: [],
  },
  {
    code: 'REF · 07',
    name: '开发相关资料',
    to: '/docs/material',
    hue: ['#5d7285', '#93a9bc'],
    desc: 'CSS / HTML / Vue / React 编码规范。',
    items: [],
  },
];

const NOTES = [
  {title: '更新随记：彩签档案主题上线', date: '2026-08-13', to: '/blog/theme-redesign-2026-08-13'},
  {title: '日常随记：博客同步与 Docusaurus 升级', date: '2026-08-04', to: '/blog/daily-2026-08-04'},
  {title: '更新日记', date: '2025-10-28', to: '/blog/update'},
  {title: '搭建个人博客', date: '2024-07-18', to: '/blog/blog'},
];

/** 把色位写进卡片，再由 CSS 映射到 --sc-shelf（暗色模式取另一支） */
function hueStyle(shelf: Shelf): CSSProperties {
  return {'--card-l': shelf.hue[0], '--card-d': shelf.hue[1]} as CSSProperties;
}

function ShelfCard({shelf}: {shelf: Shelf}) {
  return (
    <Link to={shelf.to} className={styles.card} style={hueStyle(shelf)}>
      <div className={styles.cardTop}>
        <span className={styles.code}>{shelf.code}</span>
        <h3 className={styles.cardName}>{shelf.name}</h3>
      </div>
      <p className={styles.cardDesc}>{shelf.desc}</p>
      {shelf.items.length > 0 && (
        <ul className={styles.cardList}>
          {shelf.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <span className={styles.cardFoot}>查看全部 →</span>
    </Link>
  );
}

function ReferenceItem({shelf}: {shelf: Shelf}) {
  return (
    <Link to={shelf.to} className={styles.refItem} style={hueStyle(shelf)}>
      <span className={styles.refCode}>{shelf.code}</span>
      <span className={styles.refBody}>
        <span className={styles.refName}>{shelf.name}</span>
        <span className={styles.refDesc}>{shelf.desc}</span>
      </span>
      <span className={styles.refArrow}>→</span>
    </Link>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={clsx(styles.scrollTop, visible && styles.scrollTopVisible)}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      aria-label="回到顶部"
      title="回到顶部"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="按主题归档的前端知识笔记：JavaScript、Vue、React、Node.js、微信小程序与工程化面试题，以及手写题与工程实践。"
    >
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>field catalog · 索书号</p>
            <h1 className={styles.heroTitle}>前端知识笔记，按主题分色归档</h1>
            <p className={styles.heroLede}>
              面试题库、手写题与工程实践。每种颜色对应一个主题，
              贯穿侧栏、正文与代码，一眼定位当前章节。
            </p>
            <div className={styles.heroActions}>
              <Link to="/docs/interview-questions/basics-JavaScript" className={styles.btn}>
                从 JavaScript 开始
              </Link>
              <Link to="/docs/handwritten-questions/comprehensive" className={styles.btnGhost}>
                手写题
              </Link>
              <span className={styles.heroHint}>
                全文搜索 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>
              </span>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>面试题</h2>
              <span className={styles.sectionNote}>6 个主题</span>
            </div>
            <div className={styles.matrix}>
              {INTERVIEW.map((shelf) => (
                <ShelfCard key={shelf.code} shelf={shelf} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>手写题</h2>
              <span className={styles.sectionNote}>白板实现，附可运行代码</span>
            </div>
            <div className={styles.matrixTwo}>
              {HANDWRITTEN.map((shelf) => (
                <ShelfCard key={shelf.code} shelf={shelf} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>工具与规范</h2>
              <span className={styles.sectionNote}>查得到就用得上</span>
            </div>
            <div className={styles.refList}>
              {REFERENCE.map((shelf) => (
                <ReferenceItem key={shelf.code} shelf={shelf} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>日常随记</h2>
              <Link to="/blog" className={styles.sectionLink}>
                全部随记 →
              </Link>
            </div>
            <ul className={styles.notes}>
              {NOTES.map((note) => (
                <li key={note.to}>
                  <Link to={note.to} className={styles.noteItem}>
                    <span className={styles.noteDate}>{note.date}</span>
                    <span className={styles.noteTitle}>{note.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ScrollToTop />
      </main>
    </Layout>
  );
}
