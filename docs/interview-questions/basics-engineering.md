---
sidebar_position: 4
title: "工程化基础相关"
---

## 01 同一个页面三个组件请求同一个 API
面试要点/答案要点
- 避免重复请求：使用共享状态或请求去重（dedupe）。
- 可用方案：全局缓存（Redux/Pinia/Zustand）、请求级缓存（axios cache）、请求队列 + Promise 复用、SSR/预取。
- 细节：请求参数相同才复用，考虑缓存失效、并发冲突、错误重试、取消请求（AbortController）。
示例代码（用 Promise 去重 + 简单缓存，适用于 fetch/axios）
```jsx
// requestPool.js
const pool = new Map(); // key -> Promise
const cache = new Map(); // key -> { data, expire }

function genKey(url, params) {
return url + '::' + JSON.stringify(params || {});
}

export async function request(url, params = {}, opts = {}) {
const key = genKey(url, params);
const now = Date.now();
const ttl = opts.ttl || 0;

if (cache.has(key)) {
const { data, expire } = cache.get(key);
if (!expire || expire > now) return data;
cache.delete(key);
}

if (pool.has(key)) {
// 有正在进行的请求，直接复用 Promise
return pool.get(key);

}

const p = fetch(url, {
method: opts.method || 'GET',
headers: opts.headers,
body: opts.body ? JSON.stringify(opts.body) : undefined,
signal: opts.signal,
})
.then(res => {
if (!res.ok) throw new Error('Network error');
return res.json();
})
.then(data => {
if (ttl > 0) cache.set(key, { data, expire: now + ttl });
return data;
})
.finally(() => {
pool.delete(key);
});

pool.set(key, p);
return p;
}
// ExampleComponent.jsx (React)
import React, { useEffect, useState } from 'react';
import { request } from './requestPool';

function Item() {
const [data, setData] = useState(null);
useEffect(() => {
let ac = new AbortController();
request('/api/items', {}, { ttl: 5000, signal: ac.signal })
.then(setData)
.catch(err => { if (err.name !== 'AbortError') console.error(err);});
return () => ac.abort();
}, []);
return <div>{data ? JSON.stringify(data) : 'loading'}</div>;
}

export default function Page() {
return (
<div>
<Item /><Item /><Item />
</div>
);
}
```
面试话术：“我们采用请求复用（Promise pooling）+ 可配置 TTL 缓存，避免同一时刻的重复网络请求，同时支持 AbortController 取消与错误边界处理。”

## 02 cjs / esm / umd 等区别是什么
面试要点
- CJS (CommonJS)：Node.js 传统模块（require/module.exports），同步加载，适用于服务器。
- ESM (ES Modules)：import/export，静态分析、支持 tree-shaking、可以异步加载，浏览器/现代打包器优先。
- UMD (Universal Module Definition)：兼容 AMD、CJS、全局变量，常用于发布兼容包（CDN）。
- 选型原则：库发布 -> 提供 ESM + CJS + UMD（兼容旧环境）；应用中优先 ESM。
示例：输出多格式（Rollup 配置）
```jsx
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
{
input: 'src/index.js',
output: { file: 'dist/bundle.cjs.js', format: 'cjs' },
plugins: [nodeResolve(), commonjs()],
},
{
input: 'src/index.js',
output: { file: 'dist/bundle.esm.js', format: 'es' },
plugins: [nodeResolve()],
},
{
input: 'src/index.js',
output: { file: 'dist/bundle.umd.js', format: 'umd', name: 'MyLib' },
plugins: [nodeResolve(), commonjs(), terser()],
},
];
```
面试话术：“库通常提供 ESM 以便 tree-shaking，CJS 保持 Node 兼容，UMD 提供浏览器直接引入支持。”

## 03 前端权限管理的模型
要点
- 权限维度：认证（AuthN） vs 授权（AuthZ）。
- 模型：
- RBAC（基于角色 Role-Based）—— 角色映射权限集合（常见）。
- ABAC（基于属性 Attribute-Based）—— 基于资源/用户/环境属性判断（更灵活）。
- PBAC / ACL（基于策略或访问控制列表）。
- 前端实践：最小权限展示、路由守卫、组件级权限指令、后端返回可授权菜单/按钮、策略中心化（策略服务）。
- 防御性设计：前端只做 UI 隐藏，关键权限必须在后端校验。
代码示例：简单 RBAC（React + route guard）
```jsx
// auth.js
export const currentUser = { roles: ['editor'] };
export const hasPermission = (permission) => {
const rolePerm = {
admin: ['read','write','delete'],
editor: ['read','write'],
guest: ['read']
};
return currentUser.roles.some(r => (rolePerm[r] || []).includes(permission));
};
// ProtectedButton.jsx
import React from 'react';
import { hasPermission } from './auth';

export default function ProtectedButton({ permission, children, ...rest }) {
if (!hasPermission(permission)) return null; // 或者disabled
return <button {...rest}>{children}</button>;
}
```
面试话术：“前端以 RBAC 做展示权限，后端做强校验；复杂场景可用 ABAC 实现细粒度策略。”

## 04 peerDependencies
要点
- peerDependencies 表示包需要宿主（项目）安装的依赖版本（通常用于插件/库与宿主共享同一份依赖，如 React）。
- 作用：避免库自带多份 React（避免版本冲突），让宿主控制依赖版本。
- 注意事项：发布时声明 peerDeps，配合 peerDependenciesMeta 标注可选项；在开发时 use npm/yarn/pnpm 的 --legacy-peer-deps/workspace 管理。
示例 package.json
```jsx
{
"name": "my-component-lib",
"version": "1.0.0",
"peerDependencies": {
"react": "^18.0.0",
"react-dom": "^18.0.0"
},
"peerDependenciesMeta": {
"react": { "optional": false }
}
}
```
面试话术：“peerDependencies 用在插件/组件库，确保宿主项目安装并统一控制依赖的版本，防止重复打包与运行时冲突。”

## 05 pnpm 有什么优势
要点
- 磁盘节省：内容寻址存储（store）+ 硬链接，避免重复依赖。
- 安装速度快、严格的 node_modules 布局（避免“幽灵依赖”），workspace 支持好，适合 monorepo。
- 对包管理策略（如 pnpmfile、hooks）与锁文件健壮。
- 面试可补充：需处理 Node resolution 的某些老工具兼容问题，但现代工具兼容良好。
示例：pnpm workspace 配置
```jsx
// pnpm-workspace.yaml
packages:
- 'packages/*'
  // package.json (root)
  {
  "name": "monorepo",
  "private": true,
  "devDependencies": {}
  }
  ```
  面试话术：“pnpm 在 monorepo 环境下能显著节省磁盘并提高安装速度，同时强制依赖声明，减少运行时问题。”

## 06 eslint 作用
要点
- 静态代码检查，保持代码风格一致、捕捉潜在错误（未使用变量、语法错误）。
- 支持自定义规则、插件（React、TypeScript、Security）。
- 在工程化中：作为 CI 门槛、pre-commit（husky + lint-staged）环节、IDE 即时反馈。
示例：ESLint + Prettier 配置
```jsx
// .eslintrc.js
module.exports = {
root: true,
parser: '@typescript-eslint/parser',
plugins: ['@typescript-eslint', 'react'],
extends: [
'eslint:recommended',
'plugin:react/recommended',
'plugin:@typescript-eslint/recommended',
'prettier'
],
rules: {
'no-unused-vars': 'warn',
'react/prop-types': 'off'
},
};
```
面试话术：“ESLint 是代码质量第一道防线，结合 CI 和 pre-commit 能有效控制代码回退成本。”

## 07 browserslist
要点
- browserslist 用来声明支持的浏览器范围，影响 Babel、Autoprefixer、PostCSS、webpack/bundler 的目标转译与 polyfill。
- 写法："> 1%, last 2 versions, not dead" 或针对不同环境（production/development）。
示例：package.json 中配置
```jsx
{
"browserslist": {
"production": [">0.2%", "not dead", "not op_mini all"],
"development": ["last 1 chrome version", "last 1 firefox version"]
}
}
```
面试话术：“通过 browserslist 明确目标环境，减小 polyfill 与转译体积，同时提升性能。”

## 08 minify 代码压缩
要点
- 目的是减小 JS/CSS 体积、提高首屏加载速度。通常使用 terser/uglify/esbuild/terser-webpack-plugin。
- 注意：不要混淆压缩与混淆，压缩保留逻辑，混淆改变变量名；需要处理 source map、console 去除、产物调试。
示例（webpack production 使用 terser）
```jsx
// webpack.config.prod.js (片段)
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
mode: 'production',
optimization: {
minimize: true,
minimizer: [new TerserPlugin({
terserOptions: { compress: { drop_console: true } }
})],
},
};
```
面试话术：“生产构建使用 terser/esbuild 来压缩，同时配置去掉 console 并保留 source map 以便排查。”

## 09 package-lock.json
要点
- package-lock.json（npm）锁定依赖树、保证安装一致性。pnpm-lock.yaml / yarn.lock 同理。
- 不应手动编辑，CI/CD 中应提交锁文件；在库项目中可有不同策略（应用必须提交，库可视发布策略）。
示例检查命令
# 查看被锁定版本
npm ci        # 保证使用 lockfile 安装，适合 CI
npm audit     # 安全审计
面试话术：“锁文件保证环境可复现，CI 用 npm ci 强制严格安装。”

## 10 serverless
要点
- Serverless：按需计算（函数）平台（AWS Lambda、Vercel、Netlify、Cloud Functions），免运维，按调用付费。
- 适用场景：事件驱动、API 后端、轻量短时任务；不适合长时任务（需要注意冷启动、资源上限、并发限制）。
- 工程要点：无状态、快速启动、合理冷启动优化、并发与超时、监控与本地调试（serverless-offline）。
示例：简单 AWS Lambda handler（Node）
```jsx
// handler.js
exports.handler = async (event) => {
const name = event.queryStringParameters?.name || 'world';
return {
statusCode: 200,
body: JSON.stringify({ msg: `hello ${name}` }),
};
};
Vercel Serverless（api/hello.js）
// api/hello.js
export default function handler(req, res) {
res.status(200).json({ hello: 'world' });
}
```
面试话术：“Serverless 省运维成本，但需要设计无状态、短时任务和冷启动优化策略，CI/CD 与本地模拟是关键。”

## 11 常见的 Loader（你用过哪些）
要点
- Webpack Loader 用于对模块进行转换：babel-loader, ts-loader, css-loader, style-loader, sass-loader, file-loader（v5 推荐 asset modules）, url-loader（已废弃），vue-loader。
- 使用场景举例：把 TS 转为 JS，编译 SASS，处理图片、字体。
示例 webpack loader 配置
```jsx
module.exports = {
module: {
rules: [
{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
{ test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
{ test: /\.(png|jpg|svg)$/, type: 'asset', parser: { dataUrlCondition: { maxSize: 8192 } } }
]
}
};
```
面试话术：“Loader 是文件到模块的转换器，我常用 babel-loader/ts-loader/vue-loader/css-loader/sass-loader 处理编译与资源。”

## 12 常见的 Plugin（见过哪些）
要点
- Webpack 插件用于扩展构建流程：HtmlWebpackPlugin, MiniCssExtractPlugin, DefinePlugin, HotModuleReplacementPlugin, TerserPlugin, CopyWebpackPlugin, ForkTsCheckerWebpackPlugin。
- 插件职责更广：影响构建生命周期、产物、输出等。
示例（常见插件配置）
```jsx
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
plugins: [
new HtmlWebpackPlugin({ template: './index.html' }),
new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
new (require('webpack')).DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
]
};
```
面试话术：“Plugin 能干预打包生命周期，常见插件用于 HTML 注入、提取 CSS、并行类型校验、代码压缩等。”

## 13 Loader 和 Plugin 的区别
要点
- Loader：用于把文件转换为模块（链式、针对单个模块），例如把 SASS -> CSS -> JS。
- Plugin：扩展打包器生命周期（全局影响），可以处理多个文件、控制输出、做优化、注入行为。
- 面试总结句子：Loader = 文件级转换，Plugin = 构建流程级别扩展。
简要示例：想把 .foo 文件转换为 JS 用 Loader；想在每次构建后生成报告用 Plugin。

## 14 Webpack 构建流程简单说一下
要点：六大阶段
1. 解析配置（Configuration）
2. 初始化 Compiler（Compiler）并注册插件
3. 从 entry 开始构建模块依赖图（Compilation）
4. 对模块应用 loader 转换，收集依赖
5. 进行优化（tree-shaking、code splitting、minify）
6. 输出 assets（emit）
   - 插件可以 tap 到这些钩子影响流程。
   面试话术：“Webpack 从配置出发创建 Compiler，遍历入口文件构建依赖图、对模块应用 Loader、使用 Plugin 做优化与打包，最后 emit 产物。”

## 15 使用 webpack 开发时可以提高效率的插件
常用插件
- HtmlWebpackPlugin（自动注入）
- ForkTsCheckerWebpackPlugin（TS 类型校验异步）
- HotModuleReplacementPlugin（HMR）
- webpack-dev-server / webpack-dev-middleware（本地开发）
- eslint-webpack-plugin（开发时即时 lint）
- SpeedMeasurePlugin（构建性能分析）
示例：dev config
```jsx
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = {
mode: 'development',
devtool: 'cheap-module-source-map',
plugins: [
new ForkTsCheckerWebpackPlugin(),
new (require('webpack')).HotModuleReplacementPlugin()
],
devServer: { hot: true, port: 3000 }
};
```
面试话术：“结合 HMR、异步类型检查和 lint 插件可以保持开发流畅且保证质量。”

## 16 文件指纹是什么？怎么用？
要点
- 文件指纹（hash）用于静态资源长缓存（Cache busting）。常见：[contenthash]、[chunkhash]、[hash]。
- 实践：生成带 hash 的文件名并在 HTML 中引用，CDN 缓存策略使用长缓存，变更时更新文件名。
示例 webpack output
```jsx
output: {
filename: '[name].[contenthash:8].js',
assetModuleFilename: 'assets/[name].[contenthash:8][ext]'
}
```
面试话术：“用 contenthash 保证只在内容变化时文件名变化，配合缓存策略大幅提升前端性能。”

## 17 如何优化 Webpack 构建速度？
要点（实战清单）
- 使用 cache（filesystem cache）
- 使用 thread-loader / esbuild-loader 或 swc-loader 替代 babel 在非复杂转译下加速
- 开启 parallel（terser 的并行）
- 使用 include/exclude 精准匹配 loader 范围
- 按需编译（DLL、模块联邦、持久化缓存）
- 使用 source-map 选择（开发 cheaper map）
- 减少 polyfills、合理拆分 vendor
示例：开启 filesystem cache 与 esbuild-loader
```jsx
module.exports = {
cache: { type: 'filesystem', buildDependencies: { config: [__filename] } },
module: {
rules: [
{ test: /\.tsx?$/, loader: 'esbuild-loader', options: { loader: 'tsx', target: 'es2017' } }
]
}
};
```
面试话术：“优先开启 filesystem cache 和用更快的编译器（esbuild/swc），再结合按需 loader 配置与并行化即可显著降构建时间。”

## 18 写过 Loader 吗？缩写 loader 思路
要点
- Loader 是一个导出函数：接收源内容，返回转换后的内容（或异步回调）。
- 思路：解析输入 -> 进行 transform（babel transform / regex / parse AST）-> 返回 JS module（module.exports / export default）。
- 注意 sourceMap 支持、异步处理、cacheable 声明。
示例：一个简单的 loader（把 // @upper 标记的字符串转为大写）
```jsx
// loaders/upper-loader.js
module.exports = function (source, map) {
this.cacheable && this.cacheable();
const result = source.replace(/\/\/\s*@upper\n([\s\S]*?)\n\/\/\s*@end/gi, (_, txt) => txt.toUpperCase());
this.callback(null, result, map);
};
// webpack config
module.exports = {
module: {
rules: [{ test: /\.txt$/, use: [{ loader: require.resolve('./loaders/upper-loader') }] }]
}
};
```
面试话术：“写 loader 的关键是处理输入输出与 sourceMap，通常结合 AST（babel/parser）进行复杂转换。”

## 19 写过 Plugin 吗？编写 Plugin 思路
要点
- Plugin 是一个类/函数，apply(compiler) 内注册钩子（compiler.hooks）。
- 思路：识别希望插手的阶段（比如 compilation, emit），使用同步/异步 tap 方法，并处理 assets 或信息。
示例：简单插件 — 在 emit 时注入 banner 文件
```jsx
// plugins/banner-plugin.js
class BannerPlugin {
constructor(options = {}) { this.options = options; }
apply(compiler) {
compiler.hooks.emit.tapAsync('BannerPlugin', (compilation, callback) => {
const banner = this.options.banner || 'Built by BannerPlugin';
compilation.assets['banner.txt'] = {
source: () => banner,
size: () => banner.length
};
callback();
});
}
}
module.exports = BannerPlugin;
// webpack.config.js
const BannerPlugin = require('./plugins/banner-plugin');
module.exports = { plugins: [new BannerPlugin({ banner: 'Hello from build' })] };
```
面试话术：“Plugin 本质是订阅 webpack 钩子，能全局影响流程，适合跨模块或构建产物级别的操作。”

## 20 Babel 原理
要点
- Babel 工作流程：parse -> AST -> transform（plugin/transpiler，使用 visitor 修改 AST）-> generate（输出代码 & sourceMap）。
- 插件结构：visitor（节点访问器）对 AST 节点进行替换/插入，preset 是一组插件的集合。
- Babel 的目标：把现代 JS 转为目标环境兼容的 JS（polyfill 与 transform 分开）。
示例：自定义 Babel plugin（把 log('x') -> console.log('x')）
```jsx
// babel-plugin-to-console.js
module.exports = function ({ types: t }) {
return {
visitor: {
CallExpression(path) {
if (t.isIdentifier(path.node.callee, { name: 'log' })) {
path.node.callee = t.memberExpression(t.identifier('console'), t.identifier('log'));
}
}
}
};
};
使用：
// .babelrc
{ "plugins": ["./babel-plugin-to-console.js"] }
```
面试话术：“Babel 是 AST 转换器，插件通过访问器模式在 AST 上做变换，最后再生成代码与 sourcemap。”

## 21 source map 是什么？生产环境怎么用？
要点
- source map 映射编译/压缩后的代码到源代码，便于调试。
- 生产使用策略：
- 选用合适的映射类型（source-map / hidden-source-map / nosources-source-map）。
- 若担心源码泄露，使用 hidden-source-map 并只在 Sentry/错误收集工具上上传 map，不在浏览器可直接访问。
- 注意：公开 source map 可能泄露源码或注入安全风险。
示例（webpack）
```jsx
// dev
devtool: 'eval-cheap-module-source-map'
// prod (不公开，但上传到错误收集)
devtool: 'hidden-source-map'
```
面试话术：“生产可使用 hidden-source-map 上传到错误监控（Sentry），避免直接暴露源码同时保留可追踪性。”

## 22 文件监听原理
要点
- 两种方式：轮询(polling) 与 文件系统事件（inotify on Linux, fsevents on macOS, ReadDirectoryChangesW on Windows）。
- Node.js 使用 fs.watch 或 fs.watchFile（后者是轮询），工具如 webpack-dev-server / chokidar 使用更稳定的跨平台库 chokidar。
- 面试补充：大量文件时轮询耗资源，inotify 有文件数上限 (可调整 fs.inotify.max_user_watches)。
示例（chokidar）
```jsx
const chokidar = require('chokidar');
const watcher = chokidar.watch('./src', { ignored: /node_modules/ });
watcher.on('change', path => console.log('changed', path));
```
面试话术：“一般用 chokidar 做跨平台监听，优先使用文件事件，轮询仅作 fallback 或 CI 环境下使用。”

## 23 Webpack 热更新（HMR）原理
要点
- HMR：在不刷新页面的情况下替换、添加或删除模块。
- 流程：Dev server 通过 websocket 通知客户端有更新 -> 客户端获取更新模块 -> 运行模块的 accept 回调（module.hot.accept） -> 局部替换模块并执行更新逻辑 -> 若不能处理则触发全页 reload。
- HMR 能保持应用状态（在组件层面实现），适合 UI 开发。
示例（React + webpack HMR）
```jsx
// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

if (module.hot) {
module.hot.accept('./App', () => {
const NextApp = require('./App').default;
root.render(<NextApp />);
});
}
```
面试话术：“HMR 将模块热替换并调用模块的 accept 回调，能保留应用内状态，提升开发效率。”

## 24 Webpack 事件机制了解吗？
要点
- Webpack 使用 Tapable（类似事件/钩子系统），提供同步/异步钩子（tap/tapAsync/tapPromise）。
- 常见钩子：compiler.hooks.beforeRun, compiler.hooks.emit, compilation.hooks.optimizeChunks 等。
- Plugin 利用这些钩子改变构建流程或产物。
示例（插件内 tap）
```jsx
compiler.hooks.emit.tapAsync('MyPlugin', (compilation, cb) => {
// 修改 compilation.assets
cb();
});
```
面试话术：“Webpack 钩子基于 Tapable，Plugin 通过 tap 注册不同阶段的逻辑。”

## 25 了解 Webpack5 吗，相比 Webpack4 有哪些提升？
要点
- 主要提升：
  - 更好的持久化 cache（filesystem cache）提升构建速度。
  - 内置 Module Federation（实验/插件生态），改善微前端。
  - 更现代的 asset modules（替代 file/url loaders）。
  - 更严格的默认性能/Tree shaking 改进。
  - 更小的 runtime 与优化机制。
- 面试话术：“Webpack5 将性能与模块共享作为核心改进，尤其是持久化 cache 与 Module Federation 对大型项目受益显著。”

## 26 模块联邦（Module Federation）理解
要点
- Module Federation：Webpack5 特性，允许在运行时动态加载并共享多个独立构建的模块（micro-frontends）。
- 优点：独立部署、共享 runtime/库，按需加载远程模块。
- 注意事项：共享依赖版本协调、跨域/运行时加载策略、安全（验证远端模块来源）。
示例（host & remote 简要）
```jsx
// remote webpack config
new ModuleFederationPlugin({
name: 'remoteApp',
filename: 'remoteEntry.js',
exposes: { './Button': './src/Button' },
shared: { react: { singleton: true, eager: true }, 'react-dom': { singleton: true } }
});
// host webpack config
new ModuleFederationPlugin({
name: 'host',
remotes: { remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js' },
shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
});
// host usage
const RemoteButton = React.lazy(() => import('remoteApp/Button'));
```
面试话术：“Module Federation 支持运行时共享模块，便于团队独立部署子应用并共享核心库。”

## 27 什么是 `Webpack`？它的作用是什么？
要点
- `Webpack` 是模块打包器`（module bundler）`，从入口构建依赖图并输出静态资源（JS/CSS/图片）。
- 作用：模块化、资源处理（`loader`）、构建优化（`plugin`）、代码分割、`tree-shaking`、生产构建。
面试话术：“Webpack 把前端项目的各种资源当模块来处理并生成优化后的静态资源，以支持现代前端开发流程。”

## 28 `Webpack` 中有哪些核心概念？
要点列表
- `Entry`：应用入口
- `Output`：构建输出
- `Module & Rules（Loader）`：模块及如何转换它
- `Plugins`：扩展构建流程
- `Chunk`：按需加载单元
- `Asset`：静态资源
- `Dependency Graph`：依赖图
- `Mode`：`production/development`
面试话术：“理解 entry/module/plugin/chunk/output 这些基本概念能帮助掌握 webpack 的整体构建模型。”

## 29 Webpack 的 mode 是什么
要点
- `mode = 'development' | 'production' | 'none'`，配置默认优化项（如 `uglify`、`tree shaking`）。
- `development`：更快构建、保留调试信息；`production`：启用优化、压缩、性能优化。
示例
```jsx
module.exports = { mode: process.env.NODE_ENV || 'development' }; 
```
面试话术：“mode 决定内置优化集合，CI 中请显式指定 production 以获得体积与性能优化。”

## 30 什么是代码分割（Code Splitting）？如何在 Webpack 中实现？
要点
- 代码分割：将包拆成多个 bundle，按需加载（减少首屏体积）。
- 实现方式：
  - 静态：entry 分割（multiple entries）
  - 动态：import()（动态 import）实现懒加载
  - CommonsChunk / SplitChunksPlugin（提取 vendor）
- 场景：路由懒加载、按需组件、按功能拆包。
示例：React 路由懒加载 + webpack splitChunks

```jsx
// App.jsx
import React, { Suspense } from 'react'

const Home = React.lazy(() => import('./Home'));
const Admin = React.lazy(() => import('./Admin'));

function App () {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* 假设基于路由 */}
            <Home/>
            <Admin/>
        </Suspense>
    );
}

export default App;
// webpack optimization
optimization: {
    splitChunks: {
        chunks: 'all',
            cacheGroups
    :
        {
            vendor: {
                test: /[\\/]node_modules[\\/]/, name
            :
                'vendors', chunks
            :
                'all'
            }
        }
    }
}
```
面试话术：“首屏加载最小化、路由/组件按需加载和 vendor 提取是代码分割的三大常见策略。”