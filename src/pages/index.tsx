import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import { motion } from 'motion/react'
import '@site/src/css/tailwind.css'
import styles from './index.module.css'
import { Button } from '@site/src/components/ui/button'
import { BoxReveal } from '@site/src/components/ui/boxreveal'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { IconCloud } from '@site/src/components/ui/iconcloud'

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

function IconCloudDemo() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  )

  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-background">
      <IconCloud images={images} />
    </div>
  )
}

function HeroSection() {
  return (
    <section className={clsx(styles.hero, 'py-16 lg:py-24')}>
      <div className={'container'}>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-8 items-center'}>
          <div className="flex flex-col justify-center">
            <BoxReveal duration={0.5}>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                  您好！我是 <span className="text-pretty">Nakoa</span>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -top-8 -left-8 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-8 -right-8 w-24 h-24 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
            />
            <div className="relative bg-gradient-to-br from-gray-50/50 to-white/50 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <motion.img
                src={useBaseUrl('img/programming.svg')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <BoxReveal duration={0.5}>
            <blockquote className="relative p-12">
              <div className="text-6xl text-blue-200 absolute top-0 left-0">
                "
              </div>
              <p className="text-2xl md:text-3xl text-gray-700 italic mb-6">
                青春不是年华，而是心境；青春不是桃面，丹唇，柔膝，而是深沉的意志，恢宏的想象，炙热的感情。
              </p>
              <footer className="text-lg text-gray-600">— 塞缪尔·厄尔曼</footer>
              <div className="text-6xl text-blue-200 absolute bottom-0 right-0">
                "
              </div>
            </blockquote>
          </BoxReveal>
        </div>
      </div>
    </section>
  )
}

function TechStackSection() {
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

function TimelineSection() {
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

function PhotoWallSection() {
  const photos = [
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

function ContactSection() {
  const contacts = [
    {
      icon: '📧',
      title: '邮件',
      value: 'contact@example.com',
      link: 'mailto:contact@example.com',
    },
    {
      icon: '💬',
      title: '微信',
      value: 'WeChat_ID',
      link: '#',
    },
    {
      icon: '🌟',
      title: 'GitHub',
      value: 'github.com/username',
      link: 'https://github.com/username',
    },
    {
      icon: '📝',
      title: '博客',
      value: '技术博客',
      link: '/blog',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <BoxReveal duration={0.5}>
          <h2 className="text-3xl font-bold text-center mb-12">保持联系</h2>
        </BoxReveal>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 rounded-lg bg-white">
              <Link
                to={contact.link}
                className="flex flex-col items-center [&:hover]:no-underline [&]:no-underline [&]:text-current">
                <div className="text-4xl mb-3">{contact.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{contact.title}</h3>
                <p className="text-gray-600 text-sm text-center">
                  {contact.value}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home(): JSX.Element {
  return (
    <Layout title="Nakoa的个人网站" description="技术博客与文档中心">
      <main>
        <HeroSection />
        <QuoteSection />
        <TimelineSection />
        <PhotoWallSection />
        <ContactSection />
      </main>
    </Layout>
  )
}
