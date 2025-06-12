import type {ReactNode} from 'react';
import clsx from "clsx";
import styles from './index.module.css';
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function HomepageHeader():ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return  ( <header className={clsx('hero',styles.heroBanner)}>
        <div className="container">
            <Heading as="h1" className="hero__title">
                {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
                <Link
                    className="button button--secondary button--lg"
                    to="/docs/intro">
                    知识笔记
                </Link>
                <Link
                    className="button button--secondary button--lg"
                    to="/about">
                    关于作者
                </Link>
            </div>
        </div>
    </header>)
}