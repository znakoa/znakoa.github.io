import {BoxReveal} from "@site/src/components/ui/boxreveal";
import {motion} from "motion/react";
import {IconCloud} from "@site/src/components/ui/iconcloud";
const slugs = [
    'typescript',
    'javascript',
    'react',
    'html5',
    'css3',
    'vuedotjs',
    'nodedotjs',
    'express',
    'nextdotjs',
    'prisma',
    'nginx',
    'docker',
    'git',
    'github',
    'gitlab',
]
 export default function TechStackSection():JSX.Element {

    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
    )

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container">
                <BoxReveal duration={0.5}>
                    <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              技术栈
            </span>
                    </h2>
                </BoxReveal>
                <div className="max-w-4xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10">
                        <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <IconCloud images={images} />
                        </div>
                    </motion.div>
                    {/* Background decorative elements */}
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                </div>
            </div>
        </section>
    )
}