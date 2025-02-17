import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: '个人博客',
    tagline: 'Dinosaurs are cool',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://znakoa.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'znakoa', // Usually your GitHub org/user name.
    projectName: 'znakoa.github.io', // Usually your repo name.

    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',
    trailingSlash: false,

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-CN',
        locales: ['zh-CN', 'en'],
        localeConfigs: {
            'zh-CN': {
                label: '简体中文',
                direction: 'ltr',
                htmlLang: 'zh-CN',
                calendar: 'gregory',
                path: 'zh',
            },
        },
    },


    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                },
                blog: {
                    showReadingTime: true,
                    blogSidebarTitle: '日常随记',
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/tailwind.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true,
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: '',
            logo: {
                alt: 'My Site Logo',
                src: 'img/icon.svg',
                style: {
                    marginRight: '0.5rem',
                },
            },

            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'right',
                    label: '知识库',
                },
                {to: '/blog', label: '日常随记', position: 'right'},
                {
                    href: 'https://github.com/znakoa',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                // {
                //   title: 'Docs',
                //   items: [
                //     {
                //       label: 'Tutorial',
                //       to: '/docs/intro',
                //     },
                //   ],
                // },

            ],
            copyright: `Copyright © ${new Date().getFullYear()} Nakoa. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
