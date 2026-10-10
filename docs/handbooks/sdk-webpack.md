---
title: "SDK 开发与 Webpack 5 工程化配置完整指南"
sidebar_position: 6
sidebar_class_name: shelf-eng
---

### 一、 开发准备与环境初始化

在开始 SDK 项目构建前，确保本机已安装 Node.js 及 npm 环境。



#### 1. 初始化项目目录

在本地创建项目文件夹，使用 VS Code 打开并在终端执行初始化命令：



Bash

```
npm init -y
```

- `npm init -y`：跳过所有交互式问答，直接生成默认配置的 `package.json` 文件。

#### 2. 安装核心构建依赖

建议采用**项目本地安装**（而非带 `-g` 的全局安装），避免不同项目对 Webpack 版本产生冲突：



Bash

```
pnpm add webpack webpack-cli webpack-dev-server --save-dev
```

- **依赖说明**：
  - `webpack`：模块化打包工具核心。
  - `webpack-cli`：提供在命令行运行 Webpack 的支持。
  - `webpack-dev-server`：开发环境本地服务器，支持热更新与本地调试。
- **参数说明**：`--save-dev`（简写 `-D`）将依赖安装到 `package.json` 的 `devDependencies`（仅在本地开发构建时使用，不上线运行）。
- **安装产物**：
  - `pnpm-lock.yaml`：锁定安装包及其依赖项的精确版本号。
  - `node_modules`：存放所有已下载的依赖包。

### 二、 源码目录与基础打包验证

#### 1. 建立源码结构

在根目录创建源码入口：



- 目录：`src`
- 入口文件：`src/index.js`

#### 2. 创建基础配置文件

在根目录下新建 `webpack.config.js`（文件名需严格保持一致）：



JavaScript

```
module.exports = {
  mode: 'development', // 指定环境为开发模式
  entry: './src/index.js' // 配置打包入口路径
};
```

> 相关基础概念可参考 [Webpack 官方概念文档](https://webpack.docschina.org/concepts/)。

#### 3. 执行初次打包

因为是项目本地安装的 Webpack，需使用 `npx` 运行：



Bash

```
npx webpack
```

- **打包结果**：根目录下生成 `dist/main.js`。

- **输出路径配置**：若需修改默认输出文件名与目录，在配置文件中补充 `output` 字段：

  JavaScript

  ```
  const path = require('path');
  
  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    }
  };
  ```

### 三、 核心插件集成

#### 1. HTML 文件处理与模板注入 (`html-webpack-plugin`)

Webpack 默认仅处理 JS 模块，引入该插件可自动生成 HTML 并自动引入编译好的 JS 文件：



Bash

```
pnpm add html-webpack-plugin -D
```

*更多参数可参考 [npm 官方插件库](https://www.npmjs.com/)。*



在 `webpack.config.js` 中引入并挂载：



JavaScript

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // 指定自定义 HTML 模板文件路径
    })
  ]
};
```

配置完成后再次执行 `npx webpack`，打包目录将生成带有 `<script defer src="main.js"></script>` 的 `index.html`。



#### 2. 原样资源复制 (`copy-webpack-plugin`)

当 SDK 包含第三方静态资源、字体或不需要被 Webpack 解析编译的脚本（如 `static/s.js`）时，可通过该插件原样拷贝到产物目录：



Bash

```
npm i copy-webpack-plugin -D
```

配置规则：



JavaScript

```
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // ... 其他配置
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'static', to: 'staticTest' } // 将根目录 static 复制到输出目录的 staticTest
      ]
    })
  ]
};
```

### 四、 构建工程化与多环境拆分

随着构建复杂度提升，单配置文件维护成本过高。将构建配置拆分为通用、开发、生产以及主入口 4 个文件。



#### 1. 拆分后的目录结构

在项目根目录下新建 `build` 文件夹，并将配置组织如下：



Plaintext

```
├── build
│   ├── webpack.base.config.js  # 公共基础配置
│   ├── webpack.dev.config.js   # 开发环境独有配置
│   ├── webpack.pro.config.js   # 生产环境独有配置
│   └── webpack.config.js       # 入口合并配置文件
├── src
│   ├── index.html
│   └── index.js
├── package.json
└── pnpm-lock.yaml
```

#### 2. 各配置文件代码实现

- **公共配置 (`build/webpack.base.config.js`)**

  承载公共入口、出口及基础插件：

  JavaScript

  ```
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyPlugin = require('copy-webpack-plugin');
  const path = require('path');
  
  module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
      clean: true, // 每次打包自动清理输出目录
      filename: 'index.js',
      path: path.resolve(__dirname, '../dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html')
      }),
      new CopyPlugin({
        patterns: [{ from: 'static', to: 'staticTest' }]
      })
    ]
  };
  ```

- **开发环境配置 (`build/webpack.dev.config.js`)**

  开启高效源码映射，加快构建速度并方便断点调试：

  JavaScript

  ```
  module.exports = {
    devtool: 'eval-cheap-module-source-map'
  };
  ```

- **生产环境配置 (`build/webpack.pro.config.js`)**

  可在生产打包时配置额外的压缩优化或清理插件：

  Bash

  ```
  npm i clean-webpack-plugin -D
  ```

  JavaScript

  ```
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  
  module.exports = {
    plugins: [
      new CleanWebpackPlugin()
    ]
  };
  ```

- **入口合并配置 (`build/webpack.config.js`)**

  使用 `webpack-merge` 动态组装配置：

  Bash

  ```
  npm i webpack-merge -D
  ```

  JavaScript

  ```
  const { merge } = require('webpack-merge');
  const baseConfig = require('./webpack.base.config');
  const devConfig = require('./webpack.dev.config');
  const proConfig = require('./webpack.pro.config');
  
  module.exports = (env, argv) => {
    // 根据启动命令传进来的 --mode 决定当前加载的环境配置
    const config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
  };
  ```

#### 3. 配置 NPM 运行脚本

修改 `package.json` 中的 `scripts`，将开发服务器与生产打包指令标准化：



JSON

```
{
  "name": "webpacktest",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
    "build": "webpack --mode=production --config ./build/webpack.config.js"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^11.0.0",
    "html-webpack-plugin": "^5.5.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1",
    "webpack-merge": "^5.10.0"
  }
}
```

- **启动本地服务**：

  Bash

  ```
  npm run start
  ```

  启动 `webpack-dev-server` 本地服务器，支持热更新与端口访问预览。如需终止服务，在终端按下 `Ctrl + C`，输入 `y` 确认退出。

- **执行生产打包**：

  Bash

  ```
  npm run build
  ```

  根据生产模式进行代码压缩混淆（去除多余空格与换行），减小 SDK 产物体积。

### 五、 集成 Babel 语法降级

由于现代 JavaScript 包含 ES6~ES11 语法特性，直接打包发布可能导致部分旧版浏览器无法解析，因此需要通过 Babel 将代码向下编译为广泛兼容的 ES5 语法。



#### 1. 安装核心转译依赖

Bash

```
pnpm add -D babel-loader @babel/core @babel/preset-env
```

- **依赖职责**：
  - `@babel/core`：Babel 核心编译器。
  - `babel-loader`：使 Webpack 能够使用 Babel 加载与转译 `.js` 文件。
  - `@babel/preset-env`：根据目标浏览器环境自动适配降级语法的预设集合。

#### 2. 在 `build/webpack.base.config.js` 中配置 Loader

在公共配置文件中添加 `module.rules` 处理规则：



JavaScript

```
module.exports = {
  // ... 之前的 entry 与 output 配置
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 忽略第三方依赖，仅转译业务与 SDK 源码
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // ... 插件列表
  ]
};
```

接入 Babel 配置后重新执行打包，产物中的箭头函数、`const`/`let`、解构赋值等高级语法将自动转译为兼容性良好的 ES5 语法结构。
