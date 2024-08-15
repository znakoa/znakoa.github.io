---
slug: blog
title: 搭建个人博客
authors: [znakoa]
tags: [notes]
---

使用 Docusaurus 搭建个人博客网站

<!--truncate-->

# Docusaurus 介绍

[Docusaurus](https://docusaurus.io/zh-CN) 是一个静态网站生成器，它允许你使用 **Markdown** 和 **React** 来编写你的文档，然后生成一个网站。

Docusaurus 支持以下功能：

- 多语言
- 丰富的主题
- 丰富的配置
- 插件系统
- 丰富的功能

# 搭建步骤

1. 安装 Docusaurus CLI

   ```bash
   npx @docusaurus/init@latest init my-website classic
   ```

   **my-website** 是你项目名称，可以随便取

2. 本地预览

   使用 vscode 打开项目

   ```bash
   cd my-website
   npm run start
   ```

3. 修改配置
