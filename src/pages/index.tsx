import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {motion} from "motion/react";
import '@site/src/css/tailwind.css'

import styles from './index.module.css';
import {Button} from "@site/src/components/ui/button";
import {BoxReveal} from "@site/src/components/ui/boxreveal";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Experience from "@site/src/components/Experience";
import {IconCloud} from "@site/src/components/ui/iconcloud";
import {CoolMode} from "@site/src/components/ui/coolmode";
import Projects from "@site/src/components/Projects";

const slugs = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    'vuedotjs',
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "nginx",
    "docker",
    "git",
    "github",
    "gitlab",
];

function IconCloudDemo() {
    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
    );

    return (
        <div
            className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg  bg-background">
            <IconCloud images={images}/>
        </div>
    );
}

export default function Home(): JSX.Element {

    return (
        <Layout>
            <main className={clsx(styles.hero)}>
                <div className={'container'}>
                    <div className={'grid grid-cols-1 md:grid-cols-2  gap-4'}>
                        <div className='flex flex-col justify-center xl:col-span-1'>
                            <BoxReveal duration={0.5}>
                                <div className="text-[3.5rem] font-semibold">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        您好！我是 <span className="text-pretty">Nakoa</span>
                                    </h2>
                                    <span className="text-pretty text-xl tracking-tighter sm:text-3xl xl:text-4xl/none">  遇上即是上上签</span>
                                </div>
                            </BoxReveal>
                            <div>
                                <IconCloudDemo/>
                            </div>
                            {/*<BoxReveal duration={0.5}>*/}
                            {/*    <Link to="/about">*/}
                            {/*        <Button className="mt-[1.6rem] ">我的简历</Button>*/}
                            {/*    </Link>*/}
                            {/*</BoxReveal>*/}
                        </div>
                        <div className='xl:col-span-1 p-4'>
                            <motion.img src={useBaseUrl("img/programming.svg")} initial={{opacity: 0, x: 100}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{duration: 1, ease: "easeInOut"}}
                                        whileHover={{scale: 1.1}}
                                        className='max-w-full '
                            />
                        </div>

                    </div>
                </div>


            </main>


            {/*<main>*/}
            {/*    <div className='bg-[#f3fcff] py-12 '>*/}
            {/*        <div className='container '>*/}
            {/*            <Experience/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className='bg-[#f2f5f8]'>*/}
            {/*        <Projects/>*/}
            {/*    </div>*/}

            {/*</main>*/}
        </Layout>
    );
}
