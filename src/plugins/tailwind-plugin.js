// src/plugins/tailwind-plugin.js

module.exports = function tailwindPlugin(context, options) {
    return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
            postcssOptions.plugins = [
                require("@tailwindcss/postcss")({
                    content: [
                        // 明确指定 Tailwind 作用的文件夹
                        "./src/pages/about/**/*.{js,jsx,ts,tsx}",
                        "./src/components/**/*.{js,jsx,ts,tsx}",
                    ],
                }),
            ];
            return postcssOptions;
        },
    };
};