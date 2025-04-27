import {Badge} from "@site/src/components/ui/badge";
import Layout from "@theme/Layout";
import {CodeIcon} from "@radix-ui/react-icons";
import {Button} from "@site/src/components/ui/button";
import Link from "@docusaurus/Link";
import {Card, CardContent} from "@site/src/components/ui/card";

export default function AboutHome(): JSX.Element {
    return (
        <Layout title="苏木的个人网站" description="技术博客与文档中心">
            <main>

                {/* 代码装饰元素 */}
                <div className="absolute top-20 left-10 text-muted-foreground/20 text-xs font-mono hidden lg:block">
        <pre>
          {`const Portfolio = () => {
  const [isAwesome, setIsAwesome] = useState(true);
  
  useEffect(() => {
    // Always awesome
    setIsAwesome(true);
  }, []);

  return <AwesomeDeveloper />;
};`}
        </pre>
                </div>
                <div className="absolute bottom-20 right-10 text-muted-foreground/20 text-xs font-mono hidden lg:block">
        <pre>
          {`.portfolio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--gradient);
  color: var(--text);
}`}
        </pre>
                </div>
                <main className=" relative z-10 py-10">
                    <section className="py-16 md:py-24">
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-6 text-center">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge variant="outline"
                                               className="px-3 py-1 border-purple-500/50 text-purple-500">
                                            <span className="mr-1">👋</span> 你好，我是
                                        </Badge>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span
                      className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                    前端开发者
                  </span>
                                    </h1>
                                    <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">打造出色的用户体验</h2>
                                </div>

                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    我是一名充满激情的前端开发者，专注于创建美观、高性能且用户友好的网站和应用程序。
                                    我热爱将设计转化为代码，并且擅长使用现代前端技术栈构建响应式界面。
                                </p>

                                <div className="flex flex-wrap gap-3 justify-center">
                                    <Badge className="px-3 py-1 bg-background border border-border">React</Badge>
                                    <Badge className="px-3 py-1 bg-background border border-border">Next.js</Badge>
                                    <Badge className="px-3 py-1 bg-background border border-border">TypeScript</Badge>
                                    <Badge className="px-3 py-1 bg-background border border-border">Tailwind CSS</Badge>
                                    <Badge className="px-3 py-1 bg-background border border-border">UI/UX</Badge>
                                </div>

                                {/*<div className="flex gap-4 justify-center">*/}
                                {/*    <Button*/}
                                {/*        className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">*/}
                                {/*        查看作品集*/}
                                {/*    </Button>*/}
                                {/*    <Button variant="outline" className="rounded-full">*/}
                                {/*        联系我*/}
                                {/*    </Button>*/}
                                {/*</div>*/}

                                <div className="flex gap-4 justify-center pt-2">
                                    <Button asChild variant="ghost" className="rounded-full">
                                        <Link href="https://github.com" target="_blank" aria-label="GitHub">
                                            {/*<Github className="h-5 w-5" />*/}
                                        </Link>
                                    </Button>
                                    <Button asChild  variant="ghost" className="rounded-full">
                                        <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                                            {/*<Linkedin className="h-5 w-5" />*/}
                                        </Link>
                                    </Button>
                                    <Button asChild  variant="ghost" className="rounded-full">
                                        <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                                            {/*<Twitter className="h-5 w-5" />*/}
                                        </Link>
                                    </Button>
                                    <Button asChild  variant="ghost" className="rounded-full">
                                        <Link href="mailto:example@example.com" aria-label="Email">
                                            {/*<Mail className="h-5 w-5" />*/}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 我的专长 */}
                    <section className="py-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl -z-10"></div>

                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-3 px-3 py-1 border-purple-500/50 text-purple-500">
                                我的专长
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">前端开发技能</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                作为一名前端开发者，我精通多种现代技术和框架，能够打造出色的用户界面和体验。
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                        {/*<Code className="w-6 h-6" />*/}
                                    </div>
                                    <h3 className="text-xl font-bold">前端开发</h3>
                                    <p className="text-muted-foreground">
                                        使用HTML5、CSS3和JavaScript构建响应式、交互式和高性能的网站和应用程序。
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge variant="secondary">HTML5</Badge>
                                        <Badge variant="secondary">CSS3</Badge>
                                        <Badge variant="secondary">JavaScript</Badge>
                                        <Badge variant="secondary">ES6+</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-md hover:shadow-pink-500/5 transition-all duration-300">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                                        {/*<Layers className="w-6 h-6" />*/}
                                    </div>
                                    <h3 className="text-xl font-bold">框架与库</h3>
                                    <p className="text-muted-foreground">
                                        熟练使用现代前端框架和库，构建可扩展的单页应用和服务端渲染应用。
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge variant="secondary">React</Badge>
                                        <Badge variant="secondary">Next.js</Badge>
                                        <Badge variant="secondary">Vue</Badge>
                                        <Badge variant="secondary">Redux</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-md hover:shadow-orange-500/5 transition-all duration-300">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        {/*<Monitor className="w-6 h-6" />*/}
                                    </div>
                                    <h3 className="text-xl font-bold">UI/UX设计</h3>
                                    <p className="text-muted-foreground">关注用户体验和界面设计，创建美观且易用的界面，提升用户满意度。</p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge variant="secondary">Figma</Badge>
                                        <Badge variant="secondary">Tailwind CSS</Badge>
                                        <Badge variant="secondary">Styled Components</Badge>
                                        <Badge variant="secondary">Framer Motion</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                        {/*<Zap className="w-6 h-6" />*/}
                                    </div>
                                    <h3 className="text-xl font-bold">性能优化</h3>
                                    <p className="text-muted-foreground">优化网站性能，提高加载速度，改善用户体验，提升搜索引擎排名。</p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge variant="secondary">Webpack</Badge>
                                        <Badge variant="secondary">Lighthouse</Badge>
                                        <Badge variant="secondary">性能分析</Badge>
                                        <Badge variant="secondary">懒加载</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-md hover:shadow-pink-500/5 transition-all duration-300">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                                        {/*<Globe className="w-6 h-6" />*/}
                                    </div>
                                    <h3 className="text-xl font-bold">响应式设计</h3>
                                    <p className="text-muted-foreground">创建适应各种设备和屏幕尺寸的响应式网站，确保最佳用户体验。</p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge variant="secondary">移动优先</Badge>
                                        <Badge variant="secondary">Flexbox</Badge>
                                        <Badge variant="secondary">Grid</Badge>
                                        <Badge variant="secondary">媒体查询</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-md hover:shadow-orange-500/5 transition-all duration-300">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        {/*<Cpu className="w-6 h-6" />*/}
                                    </div>
                                    <h3 className="text-xl font-bold">工具与测试</h3>
                                    <p className="text-muted-foreground">使用现代开发工具和测试框架，确保代码质量和项目可维护性。</p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge variant="secondary">Git</Badge>
                                        <Badge variant="secondary">Jest</Badge>
                                        <Badge variant="secondary">TypeScript</Badge>
                                        <Badge variant="secondary">ESLint</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                    {/* 技术栈展示 */}
                    <section className="py-16">
                        <div className="text-center mb-12">
                            <Badge variant="outline" className="mb-3 px-3 py-1 border-purple-500/50 text-purple-500">
                                我的技术栈
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">技术与工具</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                这些是我日常使用的技术和工具，帮助我高效地完成前端开发工作。
                            </p>
                        </div>

                        <div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
                            {/* 技术图标 */}
                            {[
                                "HTML5",
                                "CSS3",
                                "JavaScript",
                                "TypeScript",
                                "React",
                                "Next.js",
                                "Vue.js",
                                "Tailwind CSS",
                                "Sass",
                                "Redux",
                                "GraphQL",
                                "Node.js",
                                "Git",
                                "Figma",
                                "Jest",
                                "Webpack",
                            ].map((tech, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/30 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300"
                                >
                                    <div
                                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-3">
                                        {/*<Code*/}
                                        {/*    className={`w-6 h-6 ${index % 3 === 0 ? "text-purple-500" : index % 3 === 1 ? "text-pink-500" : "text-orange-500"}`}*/}
                                        {/*/>*/}
                                        <div className={`flex items-center justify-center ${
                                            index % 3 === 0
                                                ? "text-purple-500"
                                                : index % 3 === 1
                                                    ? "text-pink-500"
                                                    : "text-orange-500"
                                        }`}>
                                            <CodeIcon/>
                                        </div>
                                    </div>

                                    <span className="text-sm font-medium">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/* 代码示例部分 */}
                    <section className="py-16 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-3xl -z-10"></div>

                        <div className="text-center mb-12">
                            <Badge variant="outline" className="mb-3 px-3 py-1 border-purple-500/50 text-purple-500">
                                代码示例
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">我的编码风格</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                这是我的一些代码示例，展示了我的编码风格和最佳实践。
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl">
                            <div
                                className="bg-muted/30 backdrop-blur-sm p-2 border-b border-border/50 flex items-center">
                                <div className="flex gap-1.5 mr-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-xs font-mono text-muted-foreground">ReactComponent.tsx</div>
                            </div>
                            <div className="bg-muted/10 backdrop-blur-sm p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">
                <code>
                  {`import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
}

const ProjectCard = ({ title, description, imageUrl, tags = [] }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Handle responsive behavior
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      className="card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;`}
                </code>
              </pre>
                            </div>
                        </div>
                    </section>
                </main>
            </main>
        </Layout>
    )
}