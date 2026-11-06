import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type Post = {title: string; description: string; date: string; to: string};

function Arrow({diagonal = false}: {diagonal?: boolean}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
  );
}

function PostDate({date}: {date: string}) {
  return <time dateTime={date}>{date.replaceAll('-', '.')}</time>;
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button type="button" className={styles.scrollTop} hidden={!visible}
      onClick={() => window.scrollTo({top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}
      aria-label="回到顶部" title="回到顶部">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20V4m-7 7 7-7 7 7" /></svg>
    </button>
  );
}

export default function Home(): ReactNode {
  const {posts} = usePluginData('personal-blog-home') as {posts: Post[]};
  const featured = posts.find((post) => post.to.endsWith('/blog/blog')) ?? posts[0];
  const recent = posts.filter((post) => post.to !== featured?.to).slice(0, 4);
  const searchUrl = useBaseUrl('/search');
  return (
    <Layout title="苏木的个人博客" description="你好，我是苏木，一名前端开发者。在这里写代码，也记日常，记录开发中的发现、项目里的思考和博客的点滴更新。">
      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.intro} aria-labelledby="home-title">
            <div className={styles.introBody}>
              <h1 id="home-title">写代码，<br />也记日常<span className={styles.fullStop}>。</span></h1>
              <p className={styles.greeting}>你好，我是<Link to="/about">苏木</Link>，一名前端开发者。</p>
              <p className={styles.introText}>这里记录开发中的发现、项目里的思考，<br className={styles.desktopBreak} />也留下一些关于这个博客的点滴更新。</p>
              <div className={styles.introLinks}>
                <a href="#writing" className={styles.primaryLink}>读读最近的文章 <Arrow /></a>
                <Link to="/about" className={styles.textLink}>更多关于我 <Arrow diagonal /></Link>
              </div>
            </div>
            {featured && (
              <article className={styles.featured} aria-labelledby="featured-title">
                <Link to={featured.to} className={styles.featuredTitleLink}><h2 id="featured-title">{featured.title}</h2></Link>
                <p className={styles.featuredDescription}>{featured.description}</p>
                <div className={styles.featuredMeta}><span>从这篇开始</span><PostDate date={featured.date} /></div>
                <Link to={featured.to} className={styles.featuredLink}>阅读这篇文章 <Arrow /></Link>
                <span className={styles.featuredMark} aria-hidden="true">文</span>
              </article>
            )}
          </section>
          <div className={styles.readingLayout}>
            <section className={styles.writing} id="writing" aria-labelledby="writing-title">
              <div className={styles.sectionHead}><h2 id="writing-title">最近写下</h2><Link to="/blog" className={styles.textLink}>所有文章 <Arrow /></Link></div>
              <p className={styles.sectionIntro}>一些近况，一些折腾，也有一些慢慢积累的想法。</p>
              {recent.length > 0 ? (
                <div className={styles.postList}>
                  {recent.map((post) => (
                    <article className={styles.post} key={post.to}>
                      <div className={styles.postMeta}><PostDate date={post.date} /><span>随记</span></div>
                      <h3><Link to={post.to}>{post.title}</Link></h3>
                      <p>{post.description}</p>
                      <Link to={post.to} className={styles.postRead} aria-label={`继续阅读：${post.title}`}>继续阅读 <Arrow /></Link>
                    </article>
                  ))}
                </div>
              ) : <p className={styles.empty}>新的文字还在酝酿，可以先读读上面的文章。</p>}
              <Link to="/blog/archive" className={styles.archiveLink}>沿着时间，翻翻过去的文章 <Arrow /></Link>
            </section>
            <aside className={styles.sidebar} aria-label="关于博客与其他入口">
              <section className={styles.about} aria-labelledby="about-title">
                <h2 id="about-title">关于这里</h2>
                <p>一个前端开发者的个人角落。写下解决过的问题，也记录把想法一点点做出来的过程。</p>
                <p>希望这些文字，对偶然路过的你也有一点帮助。</p>
                <Link to="/about" className={styles.textLink}>认识一下 <Arrow diagonal /></Link>
              </section>
              <section className={styles.notes} aria-labelledby="notes-title">
                <h2 id="notes-title">偶尔，也记技术</h2>
                <p>工作里用到的，趁还记得，整理下来。</p>
                <ul>
                  <li><Link to="/docs/handbooks/javascript-core">JavaScript 核心进阶 <Arrow /></Link></li>
                  <li><Link to="/docs/handbooks/chunked-upload">大文件分片上传方案 <Arrow /></Link></li>
                  <li><Link to="/docs/gitorder">Git 常见实战命令 <Arrow /></Link></li>
                </ul>
                <Link to="/docs" className={styles.textLink}>其他技术笔记 <Arrow /></Link>
              </section>
              <form className={styles.search} action={searchUrl} method="get" role="search" aria-label="站内文章搜索">
                <label htmlFor="home-search">找一篇文章</label>
                <div className={styles.searchField}><input id="home-search" name="q" type="search" placeholder="输入关键词…" required maxLength={100} />
                  <button type="submit" aria-label="搜索文章"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg></button>
                </div>
              </form>
              <a href="https://github.com/znakoa" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>也可以在 GitHub 找到我 <Arrow diagonal /></a>
            </aside>
          </div>
          <div className={styles.signoff}><p>谢谢你读到这里。</p><span>下次见，苏木</span></div>
        </div>
        <ScrollToTop />
      </main>
    </Layout>
  );
}
