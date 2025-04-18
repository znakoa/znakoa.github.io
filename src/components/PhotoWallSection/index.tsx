import useBaseUrl from "@docusaurus/useBaseUrl";
import {BoxReveal} from "@site/src/components/ui/boxreveal";
import {motion} from "motion/react";
type Photo = {
    url: string;
    title: string;
    description: string;
    rotate: string;
    translateY: string;
};

export default function PhotoWallSection():JSX.Element  {
    const photos:Photo[] = [
        {
            url: useBaseUrl('img/military/1.jpg'),
            title: '军营生活',
            description: '难忘的军旅岁月',
            rotate: 'rotate-2',
            translateY: 'hover:-translate-y-2',
        },
        {
            url: useBaseUrl('img/military/2.jpg'),
            title: '训练场上',
            description: '挥洒汗水的时光',
            rotate: '-rotate-2',
            translateY: 'hover:-translate-y-4',
        },
        {
            url: useBaseUrl('img/military/3.jpg'),
            title: '战友情谊',
            description: '永远的战友情',
            rotate: 'rotate-1',
            translateY: 'hover:-translate-y-3',
        },
        {
            url: useBaseUrl('img/military/4.jpg'),
            title: '荣誉时刻',
            description: '光荣的军旅生涯',
            rotate: '-rotate-1',
            translateY: 'hover:-translate-y-2',
        },
        {
            url: useBaseUrl('img/military/1.jpg'),
            title: '新的征程',
            description: '以军人的姿态迎接大学生活',
            rotate: 'rotate-3',
            translateY: 'hover:-translate-y-4',
        },
        {
            url: useBaseUrl('img/military/2.jpg'),
            title: '学习时光',
            description: '在知识的海洋里继续拼搏',
            rotate: '-rotate-3',
            translateY: 'hover:-translate-y-3',
        },
        {
            url: useBaseUrl('img/military/3.jpg'),
            title: '毕业典礼',
            description: '收获知识与梦想',
            rotate: 'rotate-2',
            translateY: 'hover:-translate-y-2',
        },
        {
            url: useBaseUrl('img/military/4.jpg'),
            title: '未来展望',
            description: '准备迎接新的挑战',
            rotate: '-rotate-2',
            translateY: 'hover:-translate-y-4',
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="container px-4">
                <BoxReveal duration={0.5}>
                    <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              精彩瞬间
            </span>
                    </h2>
                </BoxReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                type: 'spring',
                                stiffness: 100,
                            }}
                            className="group relative perspective-1000">
                            <div
                                className={`relative transform-gpu transition-all duration-500 
                ${photo.rotate} ${photo.translateY}
                group-hover:rotate-0 group-hover:scale-[1.15]
                group-hover:z-10 rounded-xl overflow-hidden
                shadow-[0_8px_16px_rgb(0_0_0/0.1),0_2px_4px_rgb(0_0_0/0.1)]
                hover:shadow-[0_20px_40px_rgb(0_0_0/0.2),0_8px_16px_rgb(0_0_0/0.1)]`}>
                                <div className="relative aspect-[4/3]">
                                    <img
                                        src={photo.url}
                                        alt={photo.title}
                                        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 scale-[1.01] group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        {/* 3D lighting effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.8),transparent_70%)]" />
                                    </div>
                                    {/* Content container */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 transform">
                                        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                                                {photo.title}
                                            </h3>
                                            <p className="text-sm text-white/90 leading-relaxed">
                                                {photo.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Border gradient effect */}
                                <div className="absolute inset-0 border-2 border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}