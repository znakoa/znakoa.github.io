import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Vue',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
          深入解析 <code>Vue 3</code> 组合式 API，分享优雅、高效的前端开发实践。
          从组件库到企业级项目，探索 <code>Vue</code> 生态的无限可能。
      </>
    ),
  },
  {
    title: 'React',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
          探索<code>React Hooks</code>  与函数式编程的魅力，构建高性能、可扩展的现代 Web 应用。
          分享 <code>Next.js</code> 、状态管理等 React 生态圈的前沿技术与思考。
      </>
    ),
  },
  {
    title: 'Node',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
          从 <code>Koa/Express</code> 框架实践到 API 设计，深入浅出后端开发的世界。
          分享关于性能优化、数据库交互以及全栈开发的实战经验。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
