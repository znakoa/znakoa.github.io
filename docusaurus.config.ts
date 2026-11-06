import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import homePosts from './plugins/home-posts';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: '苏木',
    tagline: '写代码，也记日常',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
        faster: true, // 启用 SWC 加速构建（对应 @docusaurus/faster）
    },

    // 站点真实地址（GitHub Pages 自定义域名，与 static/CNAME 一致）
    url: 'https://blog.nakoa.cc',
    baseUrl: '/',

    // GitHub pages deployment config.
    organizationName: 'znakoa', // Usually your GitHub org/user name.
    projectName: 'znakoa.github.io', // Usually your repo name.
    trailingSlash: false,

    onBrokenLinks: 'throw',
    plugins: [homePosts],

    // 按路由写入「索书号色位」--sc-shelf-l / --sc-shelf-d
    clientModules: [
        require.resolve('./src/clientModules/shelfHue.ts'),
    ],

    themes:[
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                hashed: true,
                language: ["en", "zh"],
                indexDocs: true,
                indexBlog: true,
                indexPages: false,
                explicitSearchResultPath: true,
                searchBarShortcutKeymap: "ctrl+shift+f", // Use Ctrl+Shift+F
                highlightSearchTermsOnTargetPage: true,
            }),
        ]
    ],

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-CN',
        locales: ['zh-CN'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    blogSidebarTitle: '日常随记',
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        image: 'img/sumu-social-card.jpg',

        // 亮暗双模：默认跟随系统，导航栏保留手动开关
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },

        navbar: {
            logo: {
                alt: '苏木',
                src: 'img/logo.svg',
                srcDark: 'img/logo-dark.svg',
            },
            hideOnScroll: false,
            items: [
                {to: '/', label: '首页', position: 'left', activeBaseRegex: '^/$'},
                {to: '/blog', label: '文章', position: 'left'},
                {to: '/docs', label: '技术笔记', position: 'left'},
                {
                    type: 'search',
                    position: 'right',
                },
                {to: '/about', label: '关于我', position: 'right'},
                {
                    href: 'https://github.com/znakoa',
                    html: '<svg t="1761705188126" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5445" width="22" height="22"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" fill="currentColor" p-id="5446"></path></svg>',
                    position: 'right',
                    className: 'github-icon',
                    'aria-label': 'GitHub',
                },
            ],
        },

        footer: {
            style: 'light',
            links: [
                {
                    title: '继续逛逛',
                    items: [
                        {
                            label: '所有文章',
                            to: '/blog',
                        },
                        {
                            label: '文章归档',
                            to: '/blog/archive',
                        },
                        {
                            label: '技术笔记',
                            to: '/docs',
                        },
                    ],
                },
                {
                    title: '更多',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/znakoa',
                        },
                        {
                            label: '关于我',
                            to: '/about',
                        },
                    ],
                },
            ],
            copyright: `© ${new Date().getFullYear()} 苏木 · 写代码，也记日常。 Built with Docusaurus.`,
        },

        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.vsDark,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
