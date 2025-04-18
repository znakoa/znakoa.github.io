import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import {motion} from 'motion/react'
import '@site/src/css/tailwind.css'
import styles from './index.module.css'
import {Button} from '@site/src/components/ui/button'
import {BoxReveal} from '@site/src/components/ui/boxreveal'
import useBaseUrl from '@docusaurus/useBaseUrl'
import PhotoWallSection from "@site/src/components/PhotoWallSection";
import QuoteSection from "@site/src/components/QuoteSection";
import TimelineSection from "@site/src/components/TimelineSection";
import ContactSection from "@site/src/components/ContactSection";


function HeroSection() {
    return (
        <section className={clsx(styles.hero, 'py-16 lg:py-24')}>
            <div className={'container'}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-8 items-center'}>
                    <div className="flex flex-col justify-center">
                        <BoxReveal duration={0.5}>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                                    您好！我是 <span className="text-pretty">苏木</span>
                                </h1>
                                <p className="text-xl text-gray-600 sm:text-2xl">
                                    遇上即是上上签
                                </p>
                                <p className="text-lg text-gray-500 max-w-lg">
                                    从军营到校园，用代码编写人生新篇章
                                </p>
                            </div>
                        </BoxReveal>
                        <BoxReveal duration={0.7}>
                            <div className="flex gap-4 mt-8">
                                <Link to="/docs/intro">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        了解更多
                                    </Button>
                                </Link>
                                <Link to="/blog">
                                    <Button variant="outline">我的博客</Button>
                                </Link>
                            </div>
                        </BoxReveal>
                    </div>
                    <div className="relative">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            className="absolute -top-8 -left-8 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                        />
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                            className="absolute -bottom-8 -right-8 w-24 h-24 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
                        />
                        <div
                            className="relative bg-gradient-to-br from-gray-50/50 to-white/50 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                            <motion.img
                                src={useBaseUrl('img/programming.svg')}
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.8}}
                                className="w-full max-w-lg mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default function Home(): JSX.Element {
    return (
        <Layout title="Nakoa的个人网站" description="技术博客与文档中心">
            <main>
                <HeroSection/>
                <QuoteSection/>
                <TimelineSection/>
                <PhotoWallSection/>
                <ContactSection/>
            </main>
        </Layout>
    )
}
