// src/plugins/tailwind-plugin.js

module.exports = function tailwindPlugin(context, options) {
    return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
            postcssOptions.plugins = [
                require("@tailwindcss/postcss"),
            ];
            return postcssOptions;
        },
    };
};