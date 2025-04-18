import {BoxReveal} from "@site/src/components/ui/boxreveal";
import {motion} from "motion/react";

export default function TimelineSection():JSX.Element {
    const timelineEvents = [
        {
            year: '2017.9',
            title: '参军入伍',
            description:
                '响应祖国号召，投身军营。在部队里培养了严谨的作风和坚韧的意志，学会了团队协作和责任担当。',
            icon: '🎖️',
            color: 'bg-red-500',
            details: ['服役于某部队', '两年军旅生涯', '多次获得嘉奖'],
            bgGradient: 'from-red-50 to-orange-50',
            borderColor: 'border-red-500',
            iconBg: 'bg-red-100',
        },
        {
            year: '2019.9',
            title: '光荣退伍',
            description:
                '带着两年军旅生涯的历练与荣誉，以更加成熟的姿态迎接人生的新阶段。',
            icon: '⭐',
            color: 'bg-yellow-500',
            details: ['光荣完成服役', '获得退伍证书', '转入新的人生阶段'],
            bgGradient: 'from-yellow-50 to-amber-50',
            borderColor: 'border-yellow-500',
            iconBg: 'bg-yellow-100',
        },
        {
            year: '2019.9',
            title: '踏入校园',
            description:
                '退伍即入学，将军营的纪律带入校园。以军人的意志力投入到学习中，在知识的海洋里继续拼搏。',
            icon: '📚',
            color: 'bg-blue-500',
            details: ['开启大学生活', '专业理论学习', '保持军人作风'],
            bgGradient: 'from-blue-50 to-cyan-50',
            borderColor: 'border-blue-500',
            iconBg: 'bg-blue-100',
        },
        {
            year: '2022.7',
            title: '毕业起航',
            description:
                '完成学业，带着知识与梦想，开启人生的新篇章。军旅生涯和大学经历的双重历练，让我更有信心面对未来的挑战。',
            icon: '🎓',
            color: 'bg-green-500',
            details: ['顺利毕业', '收获知识与友谊', '准备新的征程'],
            bgGradient: 'from-green-50 to-emerald-50',
            borderColor: 'border-green-500',
            iconBg: 'bg-green-100',
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container px-4">
                <BoxReveal duration={0.5}>
                    <h2 className="text-3xl font-bold text-center mb-16">我的故事</h2>
                </BoxReveal>
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-300 via-blue-300 to-green-300 hidden md:block"></div>

                    <div className="relative space-y-12 md:space-y-24">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}>
                                <div className="md:hidden w-full flex justify-center mb-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className={`w-32 h-12 ${event.color} rounded-full shadow-lg flex items-center justify-center
                    border-2 border-white relative z-10`}>
                                        <div className="text-white font-bold">{event.year}</div>
                                    </motion.div>
                                </div>

                                <div
                                    className={`w-full md:w-5/12 ${
                                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                    }`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className={`rounded-2xl shadow-lg bg-gradient-to-br ${event.bgGradient}
                    border-2 ${event.borderColor} transition-all duration-300 p-6 md:p-8`}>
                                        <div
                                            className={`flex ${
                                                index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                                            } justify-center`}>
                                            <div
                                                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${event.iconBg} mb-6`}>
                                                <span className="text-4xl">{event.icon}</span>
                                            </div>
                                        </div>
                                        <h3
                                            className={`text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent
                      text-center md:text-${
                                                index % 2 === 0 ? 'right' : 'left'
                                            }`}>
                                            {event.title}
                                        </h3>
                                        <p
                                            className={`text-gray-700 mb-6 leading-relaxed
                      text-center md:text-${
                                                index % 2 === 0 ? 'right' : 'left'
                                            }`}>
                                            {event.description}
                                        </p>
                                        <div
                                            className={`space-y-2 flex flex-col ${
                                                index % 2 === 0 ? 'md:items-end' : 'md:items-start'
                                            } items-center`}>
                                            {event.details.map((detail, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-2 text-sm text-gray-600`}>
                          <span
                              className={`w-1.5 h-1.5 rounded-full ${event.color}`}></span>
                                                    <span>{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-20 h-20">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className={`w-16 h-16 rounded-full ${event.color} shadow-lg flex items-center justify-center
                    border-4 border-white relative z-10`}>
                                        <div className="text-white font-bold text-sm">
                                            {event.year}
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="hidden md:block w-5/12"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}