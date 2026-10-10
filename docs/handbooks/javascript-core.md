---
title: "JavaScript 核心知识与高频面试深度解析"
sidebar_position: 2
sidebar_class_name: shelf-js
---

### 一、 类型系统与类型判断

#### 1. 类型判断方法深度对比

- **`typeof`**：
  - **原始类型**：除 `null` 外均能正确识别（`number`、`string`、`boolean`、`undefined`、`symbol`、`bigint`）。
  - **对象类型**：除函数返回 `'function'` 外，其余（普通对象、数组、正则、日期等）均返回 `'object'`。
  - **底层原理与特例**：直接基于数据底层的机器码二进制标识进行检测。在 JS 最初实现中，对象在内存中的低位前三位是 `000`，而 `null` 表示空指针（全 0），因而误判为 `'object'`；`typeof NaN === 'number'`。
- **`instanceof`**：
  - **底层原理**：基于原型链检索。只要目标类的 `prototype` 存在于当前实例的原型链上（即通过 `__proto__` 链式追溯），均返回 `true`。
  - **局限性**：不能直接判断原始字面量类型；跨 iframe/window 运行环境时原型链构造函数可能不一致。
- **`constructor`**：
  - 支持基本包装类型检测，但 `constructor` 属性容易被外部代码重写修改，可靠性低。
- **`Object.prototype.toString.call(val)`**：
  - 返回内部属性 `[[Class]]` 对应的信息（格式如 `[object Type]`），是目前最精准的全类型检测方案。

#### 2. 通用类型检测函数实现

JavaScript

```
function getType(val) {
  const typeStr = Object.prototype.toString.call(val); // 如 "[object Array]"
  return typeStr.slice(8, -1).toLowerCase(); // 提取 "array"
}
```

### 二、 类型转换与运算符机制

#### 1. 显式与隐式转换规则

在 JavaScript 中，类型转换主要分为三类：**转为布尔值**、**转为数字**、**转为字符串**。



- **转 Boolean**：
  - 仅以下 7 个值为 `false`：`undefined`、`null`、`false`、`NaN`、`''`（空字符串）、`0`、`-0`。
  - 其余所有值（包括空对象 `{}`、空数组 `[]` 等所有引用对象）均转换为 `true`。
- **对象转原始类型 (`[[ToPrimitive]]`)**：
  1. 若已经是原始类型，无需转换。
  2. 优先调用 `Symbol.toPrimitive(hint)`（优先级最高）。
  3. 若无上述方法，根据期望类型调用：
     - 期望 Number：优先调用 `valueOf()`，若未返回原始类型则调用 `toString()`。
     - 期望 String：优先调用 `toString()`，若未返回原始类型则调用 `valueOf()`。
  4. 若均未返回原始类型，则抛出 `TypeError`。

#### 2. 四则运算符特性

- **加法运算 (`+`)**：
  - 若其中一方为字符串，另一方强制转换为字符串执行拼接操作（如 `1 + '1' === '11'`）。
  - 若一方不是字符串也不是数字，先转换为数字或字符串（如 `true + 1 === 2`；`4 + [1, 2, 3] === '41,2,3'`，因为数组通过 `toString()` 转为了 `'1,2,3'`）。
  - 一元加号（`+`）会快速将其转换为数字（例如 `+ 'b'` 为 `NaN`，故 `'a' + + 'b' === 'aNaN'`；`+ '1' === 1`）。
- **其他数学运算符 (`-`, `\*`, `/`, `%`)**：
  - 只要一方为数字，另一方将被强制转换为数字执行运算。

### 三、 闭包原理与应用

#### 1. 核心概念

- **定义**：函数 A 内部定义并返回函数 B，函数 B 引用了函数 A 作用域链中的自由变量，即使函数 A 执行结束，其作用域内的变量依然驻留在内存中供函数 B 访问。
- **存在价值**：实现外部间接访问与操作函数内部私有变量，实现数据封装与缓存。

#### 2. 经典循环定时器问题与解法

JavaScript

```
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i); // 最终连续输出 5 个 6
  }, i * 1000);
}
```

- **解法一：利用 IIFE 立即执行函数生成独立闭包**

  JavaScript

  ```
  for (var i = 1; i <= 5; i++) {
    (function(j) {
      setTimeout(function timer() {
        console.log(j);
      }, j * 1000);
    })(i);
  }
  ```

- **解法二：利用 `setTimeout` 传参**

  JavaScript

  ```
  for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(j) {
      console.log(j);
    }, i * 1000, i);
  }
  ```

- **解法三：使用 ES6 块级作用域 `let`（推荐）**

  JavaScript

  ```
  for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  }
  ```

### 四、 原型、原型链与继承体系

#### 1. 原型三要素与执行规则

- 每个函数/类均具有显式原型 `prototype`。
- 每个对象实例均具有隐式原型 `__proto__`。
- 对象的 `__proto__` 指向其构造函数的 `prototype`。
- **属性检索规则**：读取对象属性或方法时，优先在自身属性中查找；若未找到，沿着 `__proto__` 原型链逐级向上检索，直到 `Object.prototype.__proto__`（即 `null`）。

#### 2. 原型继承模式对比

- **组合继承（原型链 + 借用构造函数）**：

  - *实现*：子类构造函数中执行 `Parent.call(this)`，子类原型设置为 `Child.prototype = new Parent()`。
  - *缺点*：父类构造函数被调用了两次，子类实例的原型上留存了冗余的父类实例属性，造成内存浪费。

- **寄生组合继承（推荐的原型继承方案）**：

  - *实现*：去除 `new Parent()`，改用 `Object.create(Parent.prototype)` 承接原型并修正 `constructor`。

  JavaScript

  ```
  function Parent(name) {
    this.name = name;
  }
  Parent.prototype.say = function() {
    console.log(this.name);
  };
  
  function Child(name, age) {
    Parent.call(this, name); // 借用构造函数继承属性
    this.age = age;
  }
  // 寄生式核心：切断多余的父类实例化
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child; // 修正构造器指向
  ```

- **Class 语法糖继承**：

  - ES6 提供了 `class ... extends`，子类构造函数内部通过 `super()` 调用父类构造逻辑，底层本质仍是寄生组合继承。

### 五、 模块化方案演进

#### 1. 早期方案

- **IIFE（立即执行函数）**：通过独立函数作用域规避全局变量污染。
- **AMD / CMD**：早期前端异步/按需模块加载规范（RequireJS、SeaJS）。

#### 2. CommonJS vs ES Module

| **比较维度** | **CommonJS**                                       | **ES Module (ESM)**                                    |
| ------------ | -------------------------------------------------- | ------------------------------------------------------ |
| **执行环境** | 主要用于 Node.js 服务端，也常见于 Webpack 构建     | ECMAScript 官方规范，主流浏览器与现代 Node.js 原生支持 |
| **加载时机** | **运行时同步加载**（文件均在本地磁盘）             | **编译时输出接口**（静态分析，支持 Tree Shaking）      |
| **数据传递** | **值的浅拷贝**（导出的值变更不会直接影响已加载值） | **值的实时动态绑定**（导入与导出指向同一内存地址）     |
| **动态加载** | 原生支持 `require(path + '.js')` 动态计算导入      | 原生语法只支持静态声明，动态加载需使用 `import()` 函数 |

### 六、 DOM 事件机制与代理

#### 1. 事件触发三阶段

1. **捕获阶段 (Capture)**：事件从 `window` 沿着 DOM 树向目标节点自顶向下传播，沿途触发捕获监听。
2. **目标阶段 (Target)**：到达事件实际触发的目标节点。
3. **冒泡阶段 (Bubble)**：从目标节点逆向沿着 DOM 树向 `window` 自底向上逐层向上传播。

> *注*：若给同一个 DOM 节点同时注册冒泡和捕获事件，在该目标节点上将按照**代码注册顺序**执行。

#### 2. 关键方法与属性

- `addEventListener(event, handler, options/useCapture)`：
  - 第三个参数若为布尔值，`false` 表示冒泡阶段触发（默认），`true` 表示捕获阶段触发。
  - 第三个参数若为对象，支持 `capture`、`once`（触发一次后自销毁）、`passive`（不调用 `preventDefault` 优化滚动性能）。
- `event.stopPropagation()`：阻止事件向上一层级冒泡或向下一层级捕获。
- `event.stopImmediatePropagation()`：不仅阻止事件进一步传播，还能阻止当前 DOM 节点绑定的后续其他事件回调执行。

#### 3. 事件代理（委托）

- **原理**：基于事件冒泡机制，将子节点的事件监听统一注册在其父节点上，通过 `event.target` 获取真正触发的目标元素。
- **核心优势**：大幅减少事件监听器的数量以节省内存开销；支持动态新增的子节点无需重复绑定。

### 七、 箭头函数的核心限制

1. **无 arguments 绑定**：若需获取入参集合，需使用 Rest 参数（`...args`）替代。
2. **无 prototype 属性**：无法使用 `new` 操作符实例化。
3. **this 机制不可变**：`this` 严格绑定其定义时所在上下文的外层作用域 `this`，不可通过 `call()`、`apply()`、`bind()` 改变其指向。
4. **无法作为 Generator**：内部禁止使用 `yield` 关键字。
5. **不适用场景**：对象字面量方法定义、原型链方法、构造函数、动态绑定上下文的回调、Vue 选项式配置中的 methods/生命周期钩子。

### 八、 垃圾回收 (GC) 与内存泄漏防御

#### 1. 垃圾回收算法演进

- **引用计数（已淘汰）**：
  - 跟踪每个值被引用的次数，计数为 0 时清理。
  - *缺陷*：无法解决对象之间的**循环引用**（如早年 IE 浏览器中 JS 对象与 DOM 相互引用导致的内存挂起）。
- **标记清除（现代引擎主流方案）**：
  - 从根对象（Root）出发递归遍历所有可达对象并打上标记；遍历结束后，清除所有未被标记（不可达）的对象。
  - *缺陷*：会导致**内存碎片化**与**内存分配效率下降**。
- **标记整理 (Mark-Compact)**：
  - 解决碎片问题。标记完成后将活跃对象整体向内存一端挤压整理，随后统一释放边界外内存。
- **V8 分代回收优化**：
  - **新生代**：存放存活期短的对象，采用 Scavenge 算法并行复制回收。
  - **老生代**：存放常驻对象，采用增量标记（Incremental Marking）与惰性回收（Lazy Sweeping）避免主线程长时间卡顿。

#### 2. 常见内存泄漏场景

- 全局变量未清除（挂载在 `window` 上未释放）。
- 被遗忘的全局定时器（`setInterval` 未 `clearInterval`）或全局事件监听（`window.addEventListener` 未解绑）。
- DOM 引用滞留（JS 缓存了已从 DOM 树移除的节点对象引用）。
- **弱引用防护**：利用 `WeakMap` 与 `WeakSet`。其键名所引用的对象为弱引用，不计入垃圾回收机制的引用计数，能在对象没有其他强引用时自动被系统回收，常用于临时记录元数据或组件实例关联。

### 九、 异步编程模型：Promise、async/await 与 Event Loop

#### 1. Promise 核心状态机

- **三大状态**：`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）。状态变迁一旦发生便不可逆转。
- **链式调用法则**：
  - 处于 `pending` 状态时，不会执行后续回调。
  - `then` 与 `catch` 方法默认均返回全新的处于 `fulfilled` 状态的 Promise；只有在回调内部抛出异常（`throw`）或主动返回一个 `rejected` 态 Promise 时，才会转化为 `rejected`。

#### 2. async/await 异步本质

- `async` 函数执行后返回一个 Promise。
- `await` 本质是 `promise.then` 的同步书写语法糖：**只要遇到 `await`，后续整段代码在逻辑上都会被推入微任务队列**中等待当前调用栈清空。
- `try...catch` 用于捕获 Promise 抛出的 `rejected` 状态。

#### 3. 浏览器 Event Loop 运行机制

1. **执行主栈**：主线程从 Call Stack 顶部同步执行宏代码，遇到函数调用入栈，执行完毕立即出栈。
2. **任务分发**：遇到异步 API 分发至宿主线程（如 Web API 处理定时器或网络监听）；触发完成时，回调任务分别排入**宏任务队列**与**微任务队列**。
3. **清空微任务**：当前 Call Stack 执行完毕清空后，Event Loop 立即执行并**清空当前所有的微任务**（`Promise.then`、`MutationObserver` 等）。
4. **DOM 渲染**：微任务清空完毕后，浏览器判定是否需要重新渲染更新 DOM 视图。
5. **提取宏任务**：渲染完成后，Event Loop 从宏任务队列（`setTimeout`、`setInterval`、I/O 等）中取出一个新的任务压入 Call Stack，循环往复。

> **关键差异**：微任务由 ECMAScript 引擎核心标准调度，在当前轮次 DOM 渲染前集中清空；宏任务由浏览器宿主环境驱动，在 DOM 渲染之后按轮次推进。
