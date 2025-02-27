---
slug: BPMN
title: BPMN2.0规范学习
authors: [znakoa]
tags: [notes]
---

## 一、BPMN2.0 介绍

**BPMN 的主要目的是提供一套所有业务用户容易理解和使用的标准符号，利用这些符号将业务流程建模简单化、图形化、将复杂的过程视觉化**

<!--truncate-->

## 二、BPMN2.0 规范的基础元素

大致分为四类

流对象（Flow Objects): 包括事件、活动、网关，是 bpmn 中的核心元素

1.1 、事件

​ 作用：用于对流程生命周期中发生的事件进行建模

分类

1.1.1 开始事件：开始事件指示流程从何处开始

1.  空事件

没有启动事件，需要调用**startProcessInstanceByXXX**方法执行该空开始事件

图形表示

![1721615863448](./_image/1721615863448.png)

xml 表示

```bash
<startEvent id="start" name="my start event" />
```

1.1.2 中间事件

1.1.3 结束事件：标志着流程的结束

​ 1）空结束事件

​ 没有结束事件，当流程引擎检测到执行到该空结束事件时会自动执行，已结束整个流程。

图形表示

![1721616188799](./_image/1721616188799.png)

xml 表示

```bash
<endEvent id="end" name="my end event" />
```

1.2 活动

1.3 网关（节点）
