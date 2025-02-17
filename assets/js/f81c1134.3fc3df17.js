"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8130],{7735:n=>{n.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"GitHub Actions","metadata":{"permalink":"/blog/GitHub Actions","source":"@site/blog/2024-8-16-actions/index.md","title":"Actions \u81ea\u52a8\u90e8\u7f72\u9879\u76ee\u8e29\u5751","description":"GitHub Actions \u81ea\u52a8\u90e8\u7f72\u9879\u76ee\u8e29\u5751","date":"2024-08-16T00:00:00.000Z","tags":[{"inline":false,"label":"\u7b14\u8bb0","permalink":"/blog/tags/notes","description":"\u5b66\u4e60\u7b14\u8bb0"}],"readingTime":3.715,"hasTruncateMarker":true,"authors":[{"name":"znakoa","title":"\u83dc\u9e1f","url":"https://github.com/znakoa","imageURL":"https://github.com/znakoa.png","key":"znakoa","page":null}],"frontMatter":{"slug":"GitHub Actions","title":"Actions \u81ea\u52a8\u90e8\u7f72\u9879\u76ee\u8e29\u5751","authors":["znakoa"],"tags":["notes"]},"unlisted":false,"nextItem":{"title":"BPMN2.0\u89c4\u8303\u5b66\u4e60","permalink":"/blog/BPMN"}},"content":"## GitHub Actions \u81ea\u52a8\u90e8\u7f72\u9879\u76ee\u8e29\u5751\\n\\n\u6700\u8fd1\u770b\u5230\u4e00\u7bc7\u5173\u4e8e**GitHub Actions \u81ea\u52a8\u90e8\u7f72\u524d\u7aef Vue react \u9879\u76ee** \u6587\u7ae0\uff0c\u4ee5\u53ca \u4f7f\u7528GitHub\u6258\u7ba1\u5bf9\u5916\u8bbf\u95ee\u7684\u7f51\u7ad9\uff0c \u60f3\u7740\u6b63\u597d\u628a\u4e00\u4e2a\u5927\u5c4f\u9879\u76ee\u505a\u7ec3\u624b\uff0c\u8bf4\u5e72\u5c31\u6562\\n\\n\x3c!--truncate--\x3e\\n\\n\\n\u4e00\u3001\u51c6\u5907\u9879\u76ee\\n\\n\u200b\\t\u81ea\u5df1\u642d\u5efa\u4e00\u4e2a\u9879\u76eevue/react\\n\\n\u4e8c\u3001git\u7ba1\u7406\u9879\u76ee\\n\\n\u200b\\t\u5c06\u51c6\u5907\u597d\u7684\u9879\u76ee\u4e0a\u4f20\u5230\u81ea\u5df1\u7684**GitHub**\u4ed3\u5e93\u91cc\u53bb\\n\\n\u4e09\u3001\u914d\u7f6e **GitHub Pages**\\n\\n  - \u8fdb\u53bb\u521a\u521a\u7684github \u4ed3\u5e93 \u70b9\u51fb --\x3e Setting->Page \u770b\u5230\u4e0b\u9762\u7684\u754c\u9762\\n\\n    ![1723771296331](./img/1723771296331.png)\\n\\n- \u8fd8\u9700\u8981\u65b0\u5efa\u4e00\u4e2a\u540d\u4e3a **gh-pages ** \u7684\u5206\u652f\uff0c\u8fd9\u662f\u6211\u4eec\u90e8\u7f72\u5206\u652f\uff0c\u5b58\u653e\u7684\u662f\u6253\u5305\u540e\u7684\u4ee3\u7801\\n\\n\u56db\u3001 \u914d\u7f6e **GitHub Actions** \u5b9e\u73b0\u81ea\u52a8\u5316\u90e8\u7f72\\n\\n- \u65b0\u5efa.yml\u6587\u4ef6 \u70b9\u51fb\u4e3b\u9875Actions -> New workflow -> set up a workflow yourself\uff0c\u5f53\u7136\u4f60\u4e5f\u53ef\u4ee5\u9009\u62e9\u4e00\u4e2a\u6a21\u677f\uff0c\u70b9\u51fbstart commit\u5219\u4f1a\u81ea\u52a8\u5728\u6211\u4eec\u9879\u76ee\u76ee\u5f55\u4e0b\u65b0\u5efa.github/workflows/main.yml\u6587\u4ef6\\n\\n  ![1723771564881](C:\\\\Users\\\\admin\\\\AppData\\\\Roaming\\\\Typora\\\\typora-user-images\\\\1723771564881.png)\\n\\n\u200b\\t![1723771587838](./img/1723771587838.png)\\n\\n```yaml\\nname: CI Github Pages\\non:\\n  #\u76d1\u542cpush\u64cd\u4f5c\\n  push:\\n    branches:\\n      - master # \u8fd9\u91cc\u53ea\u914d\u7f6e\u4e86master\u5206\u652f\uff0c\u6240\u4ee5\u53ea\u6709\u63a8\u9001master\u5206\u652f\u624d\u4f1a\u89e6\u53d1\u4ee5\u4e0b\u4efb\u52a1\\njobs:\\n  # \u4efb\u52a1ID\\n  build-and-deploy:\\n    # \u8fd0\u884c\u73af\u5883\\n    runs-on: ubuntu-latest\\n    # \u6b65\u9aa4\\n    steps:\\n      # \u5b98\u65b9action\uff0c\u5c06\u4ee3\u7801\u62c9\u53d6\u5230\u865a\u62df\u673a\\n      - name: Checkout  \ufe0f \\n        uses: actions/checkout@v3\\n\\n      - name: Install and Build   # \u5b89\u88c5\u4f9d\u8d56\u3001\u6253\u5305\uff0c\u5982\u679c\u63d0\u524d\u5df2\u6253\u5305\u597d\u65e0\u9700\u8fd9\u4e00\u6b65\\n        run: |\\n          npm install\\n          npm run build\\n\\n      - name: Deploy   # \u90e8\u7f72\\n        uses: JamesIves/github-pages-deploy-action@v4.3.3\\n        with:\\n          branch: gh-pages # \u90e8\u7f72\u540e\u63d0\u4ea4\u5230\u90a3\u4e2a\u5206\u652f\\n          folder: dist # \u8fd9\u91cc\u586b\u6253\u5305\u597d\u7684\u76ee\u5f55\u540d\u79f0\\n```\\n\\n\u4e0a\u9762\u6574\u4e2aworkflow\u7684\u8bf4\u660e\uff1a\\n\\n- \u53ea\u6709\u5f53main\u5206\u652f\u6709\u65b0\u7684push\u63a8\u9001\u65f6\u5019\u624d\u4f1a\u6267\u884c\u6574\u4e2aworkflow.\\n- \u6574\u4e2aworkflow\u53ea\u6709\u4e00\u4e2ajob,job_id\u662fbuild-and-deploy,name\u88ab\u7701\u7565.\\n- job \u6709\u4e09\u4e2astep\uff1a \u7b2c\u4e00\u6b65\u662fCheckout,\u83b7\u53d6\u6e90\u7801\uff0c\u4f7f\u7528\u7684action\u662fGitHub\u5b98\u65b9\u7684actions/checkout.\\n- \u7b2c\u4e8c\u6b65\uff1aInstall and Build,\u6267\u884c\u4e86\u4e24\u6761\u547d\u4ee4\uff1anpm install,npm run build,\u5206\u522b\u5b89\u88c5\u4f9d\u8d56\u4e0e\u6253\u5305\u5e94\u7528.\\n- \u7b2c\u4e09\u6b65\uff1aDeploy \u90e8\u7f72\uff0c\u4f7f\u7528\u7684\u7b2c\u4e09\u65b9action\uff1aJamesIves/github-pages-deploy-action@v4.3.3,\u5b83\u6709\u4e24\u4e2a\u53c2\u6570\uff1a\u5206\u522b\u662fbranch\u3001folder\uff0c\u66f4\u591a\u5173\u4e8e\u8fd9\u4e2aaction\u7684\u8be6\u60c5\u53ef\u4ee5\u53bb[\u67e5\u770b](https://github.com/marketplace/actions/deploy-to-github-pages).\\n\\n## \u8e29\u5751\u8bb0\u5f55\\n\\n\u9996\u6b21\u6253\u5f00\u627e\u4e0d\u5230\u8d44\u6e90 \\n\\n\u9879\u76ee\u914d\u7f6e\u8def\u5f84\\n\\n```bash\\nexport default defineConfig({\\n  plugins: [vue(), vueJsx()],\\n  base:\'./\',// \u5c06\u6839\u8def\u5f84\u6362\u6210\u76f8\u5bf9\u8def\u5f84\\n  resolve: {\\n    alias: {\\n      \\"@\\": fileURLToPath(new URL(\\"./src\\", import.meta.url)),\\n    },\\n  },\\n})\\n```\\n\\n```bash\\nmodule.exports = {\\n  /**\\n   * publicPath \u9ed8\u8ba4\u662f / \u662f\u6839\u8def\u5f84\uff0c\u8fd9\u4e2a\u662f\u6307\u670d\u52a1\u7684\u6839\u8def\u5f84\uff1ahttps://xxx.github.io/\uff0c\u53d1\u5e03\u540e\u4f1a\u4ece\u8fd9\u4e2a\u8def\u5f84\u4e0b\u627e js.css \u7b49\u8d44\u6e90\uff0c\\n   \u800c\u751f\u6210\u7684\u7f51\u7ad9\u8def\u5f84\u662f\u8fd9\u4e2a Vite5-Vue3-base\u663e\u7136\u662f\u627e\u4e0d\u5230\u7684\\n   * \u6211\u4eec\u9700\u8981\u4fee\u6539\u4e3a \u76f8\u5bf9\u8def\u5f84\'./\' \u6216\u662f\u2018.\u2019 \u6216\u662f \u76f4\u63a5\u8bbe\u7f6e\u7684\u9879\u76ee\u5b50\u8def\u5f84 :/\u9879\u76ee\u540d\u79f0/ \u5c31\u53ef\u627e\u5230\u8d44\u6e90\u4e86\\n   */\\n  publicPath: \'./\',\\n  outputDir: \'dist\', // dist\\n  assetsDir: \'static\',\\n  lintOnSave: process.env.NODE_ENV === \'development\',\\n  productionSourceMap: false,\\n  ...\\n```\\n\\nGitHub Actions \u6784\u5efa\u65e0\u6743\u9650\\n\\n\u662f\u7528\u516c\u5f00\u4ed3\u5e93 \u4e0d\u8981\u7528\u79c1\u6709\u4ed3\u5e93\\n\\n![1723772018074](./img/1723772018074.png)\\n\\nreact \u9879\u8def\u7531\u5730\u5740\u6839\u76ee\u5f55\u5339\u914d\u4e0d\u5230\\n\\n- \u5728\u9879\u76ee\u91cc\u9762\u4fee\u6539 \u8def\u7531\u914d\u7f6e\u6587\u4ef6\u52a0\u4e0a github \u7684\u4ed3\u5e93\u540d\\n\\n\u6216\u8005\u53bb\u4fee\u6539\u8def\u7531\u6a21\u5f0f \u6539\u4e3a \u54c8\u5e0c\u6a21\u5f0f"},{"id":"BPMN","metadata":{"permalink":"/blog/BPMN","source":"@site/blog/2024-07-22-bpmn/index.md","title":"BPMN2.0\u89c4\u8303\u5b66\u4e60","description":"\u4e00\u3001BPMN2.0 \u4ecb\u7ecd","date":"2024-07-22T00:00:00.000Z","tags":[{"inline":false,"label":"\u7b14\u8bb0","permalink":"/blog/tags/notes","description":"\u5b66\u4e60\u7b14\u8bb0"}],"readingTime":1.365,"hasTruncateMarker":true,"authors":[{"name":"znakoa","title":"\u83dc\u9e1f","url":"https://github.com/znakoa","imageURL":"https://github.com/znakoa.png","key":"znakoa","page":null}],"frontMatter":{"slug":"BPMN","title":"BPMN2.0\u89c4\u8303\u5b66\u4e60","authors":["znakoa"],"tags":["notes"]},"unlisted":false,"prevItem":{"title":"Actions \u81ea\u52a8\u90e8\u7f72\u9879\u76ee\u8e29\u5751","permalink":"/blog/GitHub Actions"},"nextItem":{"title":"\u642d\u5efa\u4e2a\u4eba\u535a\u5ba2","permalink":"/blog/blog"}},"content":"## \u4e00\u3001BPMN2.0 \u4ecb\u7ecd\\n\\n**BPMN \u7684\u4e3b\u8981\u76ee\u7684\u662f\u63d0\u4f9b\u4e00\u5957\u6240\u6709\u4e1a\u52a1\u7528\u6237\u5bb9\u6613\u7406\u89e3\u548c\u4f7f\u7528\u7684\u6807\u51c6\u7b26\u53f7\uff0c\u5229\u7528\u8fd9\u4e9b\u7b26\u53f7\u5c06\u4e1a\u52a1\u6d41\u7a0b\u5efa\u6a21\u7b80\u5355\u5316\u3001\u56fe\u5f62\u5316\u3001\u5c06\u590d\u6742\u7684\u8fc7\u7a0b\u89c6\u89c9\u5316**\\n\\n\x3c!--truncate--\x3e\\n\\n## \u4e8c\u3001BPMN2.0 \u89c4\u8303\u7684\u57fa\u7840\u5143\u7d20\\n\\n\u5927\u81f4\u5206\u4e3a\u56db\u7c7b\\n\\n\u6d41\u5bf9\u8c61\uff08Flow Objects): \u5305\u62ec\u4e8b\u4ef6\u3001\u6d3b\u52a8\u3001\u7f51\u5173\uff0c\u662f bpmn \u4e2d\u7684\u6838\u5fc3\u5143\u7d20\\n\\n1.1 \u3001\u4e8b\u4ef6\\n\\n\u200b \u4f5c\u7528\uff1a\u7528\u4e8e\u5bf9\u6d41\u7a0b\u751f\u547d\u5468\u671f\u4e2d\u53d1\u751f\u7684\u4e8b\u4ef6\u8fdb\u884c\u5efa\u6a21\\n\\n\u5206\u7c7b\\n\\n1.1.1 \u5f00\u59cb\u4e8b\u4ef6\uff1a\u5f00\u59cb\u4e8b\u4ef6\u6307\u793a\u6d41\u7a0b\u4ece\u4f55\u5904\u5f00\u59cb\\n\\n1.  \u7a7a\u4e8b\u4ef6\\n\\n\u6ca1\u6709\u542f\u52a8\u4e8b\u4ef6\uff0c\u9700\u8981\u8c03\u7528**startProcessInstanceByXXX**\u65b9\u6cd5\u6267\u884c\u8be5\u7a7a\u5f00\u59cb\u4e8b\u4ef6\\n\\n\u56fe\u5f62\u8868\u793a\\n\\n![1721615863448](./_image/1721615863448.png)\\n\\nxml \u8868\u793a\\n\\n```bash\\n<startEvent id=\\"start\\" name=\\"my start event\\" />\\n```\\n\\n1.1.2 \u4e2d\u95f4\u4e8b\u4ef6\\n\\n1.1.3 \u7ed3\u675f\u4e8b\u4ef6\uff1a\u6807\u5fd7\u7740\u6d41\u7a0b\u7684\u7ed3\u675f\\n\\n\u200b 1\uff09\u7a7a\u7ed3\u675f\u4e8b\u4ef6\\n\\n\u200b \u6ca1\u6709\u7ed3\u675f\u4e8b\u4ef6\uff0c\u5f53\u6d41\u7a0b\u5f15\u64ce\u68c0\u6d4b\u5230\u6267\u884c\u5230\u8be5\u7a7a\u7ed3\u675f\u4e8b\u4ef6\u65f6\u4f1a\u81ea\u52a8\u6267\u884c\uff0c\u5df2\u7ed3\u675f\u6574\u4e2a\u6d41\u7a0b\u3002\\n\\n\u56fe\u5f62\u8868\u793a\\n\\n![1721616188799](./_image/1721616188799.png)\\n\\nxml \u8868\u793a\\n\\n```bash\\n<endEvent id=\\"end\\" name=\\"my end event\\" />\\n```\\n\\n1.2 \u6d3b\u52a8\\n\\n1.3 \u7f51\u5173\uff08\u8282\u70b9\uff09"},{"id":"blog","metadata":{"permalink":"/blog/blog","source":"@site/blog/2024-07-18-blog/index.md","title":"\u642d\u5efa\u4e2a\u4eba\u535a\u5ba2","description":"\u4f7f\u7528 Docusaurus \u642d\u5efa\u4e2a\u4eba\u535a\u5ba2\u7f51\u7ad9","date":"2024-07-18T00:00:00.000Z","tags":[{"inline":false,"label":"\u7b14\u8bb0","permalink":"/blog/tags/notes","description":"\u5b66\u4e60\u7b14\u8bb0"}],"readingTime":0.66,"hasTruncateMarker":true,"authors":[{"name":"znakoa","title":"\u83dc\u9e1f","url":"https://github.com/znakoa","imageURL":"https://github.com/znakoa.png","key":"znakoa","page":null}],"frontMatter":{"slug":"blog","title":"\u642d\u5efa\u4e2a\u4eba\u535a\u5ba2","authors":["znakoa"],"tags":["notes"]},"unlisted":false,"prevItem":{"title":"BPMN2.0\u89c4\u8303\u5b66\u4e60","permalink":"/blog/BPMN"}},"content":"\u4f7f\u7528 Docusaurus \u642d\u5efa\u4e2a\u4eba\u535a\u5ba2\u7f51\u7ad9\\n\\n\x3c!--truncate--\x3e\\n\\n# Docusaurus \u4ecb\u7ecd\\n\\n[Docusaurus](https://docusaurus.io/zh-CN) \u662f\u4e00\u4e2a\u9759\u6001\u7f51\u7ad9\u751f\u6210\u5668\uff0c\u5b83\u5141\u8bb8\u4f60\u4f7f\u7528 **Markdown** \u548c **React** \u6765\u7f16\u5199\u4f60\u7684\u6587\u6863\uff0c\u7136\u540e\u751f\u6210\u4e00\u4e2a\u7f51\u7ad9\u3002\\n\\nDocusaurus \u652f\u6301\u4ee5\u4e0b\u529f\u80fd\uff1a\\n\\n- \u591a\u8bed\u8a00\\n- \u4e30\u5bcc\u7684\u4e3b\u9898\\n- \u4e30\u5bcc\u7684\u914d\u7f6e\\n- \u63d2\u4ef6\u7cfb\u7edf\\n- \u4e30\u5bcc\u7684\u529f\u80fd\\n\\n# \u642d\u5efa\u6b65\u9aa4\\n\\n1. \u5b89\u88c5 Docusaurus CLI\\n\\n   ```bash\\n   npx @docusaurus/init@latest init my-website classic\\n   ```\\n\\n   **my-website** \u662f\u4f60\u9879\u76ee\u540d\u79f0\uff0c\u53ef\u4ee5\u968f\u4fbf\u53d6\\n\\n2. \u672c\u5730\u9884\u89c8\\n\\n   \u4f7f\u7528 vscode \u6253\u5f00\u9879\u76ee\\n\\n   ```bash\\n   cd my-website\\n   npm run start\\n   ```\\n\\n3. \u4fee\u6539\u914d\u7f6e"}]}}')}}]);