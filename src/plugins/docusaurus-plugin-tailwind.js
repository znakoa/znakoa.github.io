// src/plugins/docusaurus-plugin-tailwind.js

module.exports = function(context, options) {
    return {
        name: 'docusaurus-plugin-tailwind',
        configureWebpack(config, isServer, utils) {
            const {get} = require('lodash');

            // 找到 webpack 中处理 CSS 文件的规则
            const cssRule = config.module.rules.find(
                (rule) => String(rule.test) === String(/\.css$/)
            );

            if (cssRule) {
                // 找到 PostCSS 加载器并添加 Tailwind 插件
                const postcssLoader = get(cssRule, 'use', []).find(
                    (loader) => loader.loader && loader.loader.includes('postcss-loader')
                );

                if (postcssLoader) {
                    postcssLoader.options.postcssOptions.plugins.push(
                        require('@tailwindcss/postcss')({
                            content: [
                                './src/pages/about/**/*.{js,jsx,ts,tsx}',
                                './src/components/**/*.{js,jsx,ts,tsx}',
                            ],
                        })
                    );
                }
            }

            return config;
        },
    };
};