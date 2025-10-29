---
sidebar_position: 5
title: "如何命名更规范class"
---

# 如何命名更规范class， 看起来更专业

相信写css的人都会遇到下面的问题：
怎么命名这个class，总结通用一定的知识
如果编写项目的 CSS 代码只有你一个人，或者项目的 CSS 代码量很小，你可以用你自己喜欢，习惯的方式去组织你的 CSS 代码。
但是项目更大，更复杂，有多人编写项目的 CSS 代码（每个人有自己的风格），代码量大的时候，就需要一种统一形式去组织 CSS 代码
在企业里面工作也是 一定要按照规范去命名

### 常见class关键词：

- 布局类：header, footer, container, main, content, aside, page, section
- 包裹类：wrap, inner
- 区块类：region, block, box
- 结构类：hd, bd, ft, top, bottom, left, right, middle, col, row, grid, span
- 列表类：list, item, field
- 主次类：primary, secondary, sub, minor
- 大小类：s, m, l, xl, large, small
- 状态类：active, current, checked, hover, fail, success, warn, error, on, off
- 导航类：nav, prev, next, breadcrumb, forward, back, indicator, paging, first, last
- 交互类：tips, alert, modal, pop, panel, tabs, accordion, slide, scroll, overlay,
- 星级类：rate, star
- 分割类：group, seperate, divider
- 等分类：full, half, third, quarter
- 表格类：table, tr, td, cell, row
- 图片类：img, thumbnail, original, album, gallery
- 语言类：cn, en
- 论坛类：forum, bbs, topic, post
- 方向类：up, down, left, right
- 其他语义类：btn, close, ok, cancel, switch; link, title, info, intro, more, icon; form, label, search, contact, phone, date, email, user; view,

### 制定简单规则：

- 以中划线连接，如.item-img
- 使用两个中划线表示特殊化，如.item-img.item-img--small表示在.item-img的基础上特殊化
- 状态类直接使用单词，参考上面的关键词，如.active, .checked
- 模块采用关键词命名，如.slide, .modal, .tips, .tabs，特殊化采用上面两个中划线表示，如.imgslide--full, .modal--pay, .tips--up, .tabs--simple
- s操作的类统一加上js-前缀
- 不要超过四个class组合使用，如.a.b.c.d  基本上3个就差不多 xxx-xxx-xxx

## css文件名命名

**———-CSS样式表文件命名———-**
主要的 master.css
模块 module.css
基本共用 base.css
布局、版面 layout.css
主题 themes.css
专栏 columns.css
文字 font.css
表单 forms.css
补丁 mend.css
打印 print.css

# 开源的组件库的命名规范
一般采用BEM
## 什么是BEM
BEM(Block Element Modifier) 是一种命名CSS class的模式，使用这种模式可以让 CSS 代码更加利于维护。标准的 BEM 写法是 .block-name__element-name--modifier-name。

比如以开源的element组件库为例
```javascript
<header class="header"></header>

.header {
  color: #333;
  background: #f5f5f5;
}
```
```javascript
<article class="article">
  <h2 class="article__title"></h2>
  <p class="article__content"></p>
</article>

.article {
  padding: 12px;
}

.article__title {
  font-size: 1rem;
}

.article__content {
   font-size: .9rem;
}
```
这样的卡片是一个单独的块
```javascript
<div class="list-card">
  <img class="list-card__img" />
  <div class="list-card__content">
    <a class="list-card__link"></a>
    <p class="list-card__desc"></p>
    <div class="list-card__stats">
      <span class="list-card__stat"><i class="list-card__icon"></i></span>
      <span class="list-card__stat"><i class="list-card__icon"></i></span>
      <span class="list-card__stat"><i class="list-card__icon"></i></span>
      <span class="list-card__date"></span>
    </div>
  </div>
</div>

```
## 常用CSS class名
* **包裹类：** container, wrapper, outer, inner, box, header, footer, main, content, aside, page, section, block
* **状态类：** primary, secondary, success, danger, warning, info, error, Link, light, dark, disabled, active, checked, loading
* **尺寸类：** large, middle, small, bigger, smaller
* **组件类：** card, list, picture, carousel, swiper, menu, navs, badge, hint, modal, dialog
* **位置类：** first, last, current, prev, next, forward, back
* **文本类：** title, desc, content, date, author, category，label，tag
* **人物类：** avatar, name, age, post, intro

**BEM 不是必须的，你依然可以选择自己喜欢的方式编写，组织你的 CSS 代码。使用 BEM 主要目的是为了在团队开发中有一个统一的规范，更利于代码的维护，在别人接手你的代码，或者接手别的代码时能够更加快速的理解代码。**