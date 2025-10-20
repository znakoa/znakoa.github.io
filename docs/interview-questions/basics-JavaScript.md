---
sidebar_position: 1
title: "js基础相关"
---

:::info[总结]

- 回答结构建议：定义 -> 本质 -> 示例 -> 常考陷阱 -> 手写/代码实现（若会），这样面试官能快速抓住重点。
- 面试常要求手写：bind、curry、new、简单 Promise、深拷贝（带循环引用）
- 遇到异步题一定要说清楚微任务 vs 宏任务与环境差异（浏览器 vs Node）

:::

## 1. var / let / const 的区别

- **作用域**：var 函数作用域或全局；let/const 块级作用域。
- **提升（hoisting）**：var 声明会被提升并初始化为 undefined；let/const 被提升但处于 暂时性死区（TDZ），在声明前访问会报
  ReferenceError。
- **重声明/重赋值**：var 支持同一作用域重复声明；let 不允许重复声明；const 声明必须初始化且不能重新赋值（引用类型可修改内部状态）。
- **绑定到全局对象**：在浏览器的全局作用域中，var 会成为 window 属性，let/const 不会。
- **面试点**：TDZ、作用域链、const 与不可变性的误解（const 是不可变绑定，不是不可变值）

<details>
  <summary>示例代码</summary>

  ```js
    console.log(a) // undefined
var a = 1

console.log(b) // ReferenceError (TDZ)
let b = 2

const c = { x: 1 }
c.x = 2 // 合法，改变的是对象内容，不是绑定
  ```

</details>

## 2. 数据类型 与 typeof 的陷阱

- JS 基本类型（primitive）：undefined, null, boolean, number, bigint, string, symbol。
- 引用类型：object（包括 Array, Function, Date, RegExp, Map, Set 等）。
- typeof 陷阱：
- typeof null === 'object'（历史遗留）。
- typeof [] === 'object'（数组不是单独的 typeof）。
- typeof function(){} === 'function'（函数特殊）。
- typeof NaN === 'number'。
- typeof 10n === 'bigint'，typeof Symbol() === 'symbol'。
- 更准确的类型判断：
- 数组：Array.isArray(x)。
- 更一般：Object.prototype.toString.call(x)（返回 [object Type]）。
- Number.isNaN 更可靠（isNaN 会先强制转换）。

<details>
  <summary>示例代码</summary>

    ```javascript
     typeof null // "object"
    Array.isArray([]) // true
    Object.prototype.toString.call(/a/) // "[object RegExp]"
    Number.isNaN(NaN) // true
    isNaN('a') // true  <-- 因为 'a' -> NaN，再判定
    ```

</details> 

## 3. 值类型 vs 引用类型
- 值类型（primitive）：赋值/传参时拷贝值，互不影响（string, number, boolean, null, undefined, symbol, bigint）。
- 引用类型（object）：赋值/传参时拷贝的是引用（指针），多个引用指向同一对象，修改会反映到所有引用。
- 重要面试点：JS 始终是按值传递（但是引用的值是指向对象的指针），这常被误说为“按引用传递”。


## 4. 深拷贝 vs 浅拷贝（本质与常见实现）
- 本质：浅拷贝只复制一层属性（引用仍指向原对象的子对象）；深拷贝递归复制所有可复制的子结构（避免共享引用）。
- 常见实现：
  - 浅拷贝：
   ``` javascript
    Object.assign({}, obj)、{...obj}、Array.prototype.slice、arr.concat()
  ```
  - 深拷贝（简单）：**JSON.parse(JSON.stringify(obj))**（缺点：丢失函数、undefined、Symbol、BigInt、日期、正则、无法处理循环引用
  - 浏览器/Node：structuredClone(obj)（支持更多类型，自动处理循环，但并非所有环境都可用）。
  - 手写深拷贝：递归 + WeakMap 处理循环引用，并专门处理 Date、RegExp、Map、Set 等类型。
- 面试点：什么时候用浅拷贝（性能） vs 深拷贝（避免共享引用）；JSON 深拷贝的边界条件；循环引用处理

<details>
  <summary>示例（简化版深拷贝，支持循环引用、Date、RegExp、Map、Set）</summary>

```javascript
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map) {
    const m = new Map();
    map.set(obj, m);
    for (const [k, v] of obj) m.set(deepClone(k, map), deepClone(v, map));
    return m;
  }
  if (obj instanceof Set) {
    const s = new Set();
    map.set(obj, s);
    for (const v of obj) s.add(deepClone(v, map));
    return s;
  }

  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);
  Reflect.ownKeys(obj).forEach(key => {
    copy[key] = deepClone(obj[key], map);
  });
  return copy;
}
```

</details> 


## 5. 数组常用方法背后的面试点
- 遍历/映射：
    - forEach：无返回值，无法中途跳出（除非抛异常）。
    - map：返回新数组，不改变原数组。
    - filter：返回满足条件的新数组。
    - reduce：最通用，可实现 map/filter/sum/groupBy 等。
- 查找：find, findIndex, indexOf, includes（includes 使用 SameValueZero，能检测 NaN）。
- 判断：some, every（短路）。
- 变更：push/pop/shift/unshift（原地变更），slice（不变更），splice（变更）。
- 排序：sort 默认按字符串比较；传 compareFn；注意数值排序需 a-b；稳定性依引擎/规范而变（现代引擎通常稳定）。
- 面试点：
  - 用 reduce 实现 map/filter（考察对高阶函数理解）。
  - sort 的副作用与 compare 函数实现。
  - map 中返回的数组长度/稀疏数组的问题。
  - 时间复杂度（map/filter O(n); sort O(n log n)）。
<details>
  <summary>示例（用 reduce 实现 map）</summary>

```javascript
function mapByReduce(arr, fn) {
  return arr.reduce((acc, cur, idx) => {
    acc.push(fn(cur, idx, arr));
    return acc;
  }, []);
}
```

</details> 

## 6. 对象遍历方式对比（for..in, Object.keys, Reflect 等）
- for..in：遍历对象可枚举属性，包括原型链上的可枚举属性（会遍历继承来的属性）；顺序不是严格保证（尽管现代引擎特定顺序）。
- Object.keys(obj)：返回自身可枚举属性的数组（不包含原型）。
- Object.getOwnPropertyNames(obj)：返回自身属性（包括不可枚举）但不包含 Symbol。
- Object.getOwnPropertySymbols(obj)：获取自身 Symbol 属性。
- Reflect.ownKeys(obj)：返回自身所有键（string + symbol）。
- for..of：用于可迭代对象（Array、Map、Set、字符串等）。
- 面试点：遍历时是否需要过滤原型属性；Symbol 属性如何遍历；性能差异（for 循环 vs forEach vs for..of）
<details>
  <summary>示例代码</summary>

```javascript
for (const k in obj) { /* 包含原型的可枚举属性 */ }
Object.keys(obj).forEach(k => { /* 只包含自身可枚举 */ });
Reflect.ownKeys(obj).forEach(k => { /* 包含 symbol 和不可枚举 */ });
```

</details> 

## 7. 隐式类型转换的坑
- 规则：
    - `+` 若一方是字符串则执行字符串拼接；否则数值化（ToNumber）。
    - 关系比较` <, >` 会先将两边转换为 primitive（可能是 number 或 string）。
    - == 会进行复杂的抽象相等比较（见第 8 条）。
    - 对象转原始值：会尝试 valueOf()，若返回原始值则用之；否则 toString()。
- 典型陷阱：
  - `'' + 1 -> '1'，1 + '2' -> '12'，1 - '2' -> -1`。
  - n`ull == undefined -> true`，但 `null == 0 -> false`（null 不与其它值强制转换）。
  - `[] + [] -> ''，[] + {} -> `"`[object Object]`"（对象 toString）。
  - `0 == false -> true，'0' == false -> true（'0' -> 0`）。
  - `isNaN('') -> false（'' -> 0）`，`isNaN('a') -> true`。推荐用 Number.isNaN。
- 面试点：能用具体例子说明 == 的行为；对象到原始值转换顺序；+ 的优先字符串拼接或数字转换问题。
<details>
  <summary>示例代码</summary>

```javascript
'' + 1 // "1"
1 - '2' // -1
null == undefined // true
'0' == false // true
Number.isNaN('a') // false (不会强制转换)
isNaN('a') // true (会先转 NaN)
```

</details> 


## 8. == 和 === 的核心考点
- `===`：严格相等，不做类型转换（若类型不同，直接 false）。
- `==`：抽象相等，会在许多情况下进行类型转换：
  - ` null == undefined -> true`
  - 如果类型不同，按表规则转换：字符串与数字 -> 字符串转数字；布尔 -> 转数字；对象 -> 转原始值（调用 valueOf / toString）。
- 面试点：要能列出若干典型 == 的例子并解释原因（尤其 null/undefined、布尔与字符串、对象与原始值比较），以及推荐在业务代码中尽量使用 ===。



## 9. 执行上下文（execution context）和作用域链（scope chain）
- 执行上下文 包括：变量环境（variable environment）、词法环境（lexical environment，环境记录 + 外部引用）、this 绑定和作用域链。
- 创建阶段（creation）：
  - 为函数/全局创建绑定（变量提升、函数提升、参数对象）。
- 执行阶段（execution）：执行代码，变量赋值，函数引用分配。
- 作用域链：当访问一个标识符时，JS 从当前执行上下文的词法环境开始查找，找不到则向上查找直至全局（或 null）。
- 面试点：区别词法作用域与动态作用域、变量提升的细节、let/const 和 TDZ、如何解释闭包是如何访问外层变量的。
<details>
  <summary>示例（展示作用域链）</summary>

```javascript
function a() {
  let x = 1;
  function b() {
    console.log(x); // 通过作用域链拿到 a 的 x
  }
  return b;
}
const f = a();
f(); // 1
```

</details> 

## 10. JS 中的 this 究竟指向谁？
-  四条规则（优先级）：
    - a. new：构造调用`（new Fn()）——this` 指向新创建的实例。
    - b. 显式绑定：`call/apply/bind `显式指定（bind 可创建固化 this 的函数）。
    - c. 隐式绑定：通过对象调用`（obj.fn()）——this `指向该对象（注意丢失绑定，比如 `const f = obj.fn; f()）`。
    - d. 默认绑定：非严格模式下全局（浏览器为window，严格模式为 undefined）。
- 箭头函数：没有自己的 this，this 由定义位置的词法环境确定（即继承外部 this）。
- 面试点：bind 与 new 的组合行为（若使用 new 调用 bind 后的函数，this 以 new 创建的实例为准）；箭头函数不能作为构造器。
<details>
  <summary>示例代码</summary>

```javascript
function Foo() { this.x = 1; }
const o = {};
Foo.call(o);
console.log(o.x); // 1

const obj = { x: 1, f() { console.log(this.x); } };
obj.f(); // 1
const g = obj.f;
g(); // undefined (strict) 或 window.x
```

</details> 



## 11. 闭包（closure）到底是什么？如何判断？
- 定义：闭包是函数与其创建时的词法环境（包含被捕获的变量）的组合。换言之，内部函数保留了对外层作用域变量的引用，即使外层函数已返回。
- 如何判断：若一个函数引用了在它外部定义的变量，并且该函数在外部函数执行完后仍被调用/保留，则构成闭包。
- 面试点：闭包引起的内存保留（小心大闭包导致内存），如何避免（避免在全局保存大的闭包状态，及时释放引用）；闭包与模块化的关系（实现封装）。
<details>
  <summary>示例代码</summary>

```javascript
function counter() {
  let n = 0;
  return function() {
    n += 1;
    return n;
  };
}
const c = counter();
c(); // 1  —— 闭包持有 n
```

</details> 

## 12. 高阶函数和柯里化（应用场景）
- 高阶函数（HOF）：接收函数或返回函数的函数（如 map, filter, reduce，或 compose）。
- 柯里化（currying）：把多参数函数转换为一系列单参数函数。常用于部分应用、配置化函数、函数复用。
- 面试点：区别柯里化和部分应用（partial application）；高阶函数在中间件、函数式编程、事件处理等场景的应用。
<details>
  <summary>示例(柯里化)</summary>

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...rest) => curried(...args, ...rest);
  };
}
const add = (a,b,c) => a+b+c;
const cadd = curry(add);
cadd(1)(2)(3); // 6
```

</details> 

## 13. 节流（throttle） vs 防抖（debounce）
- 防抖（debounce）：若短时间内多次触发，只在最后一次触发后执行（适合输入搜索、窗口调整完成后再计算）。
- 节流（throttle）：限定一定时间内只执行一次（适合滚动、resize 等持续事件）。
- 面试点：实现带 leading/trailing 选项（首次是否立即执行、最后一次是否执行），以及使用 requestAnimationFrame 实现节流以更平滑的动画。
- 实现：
<details>
  <summary>防抖</summary>

```javascript
function debounce(fn, wait) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}
```

</details> 
<details>
  <summary>节流（时间戳版）</summary>

```javascript
function throttle(fn, wait) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

</details>
## 14. bind、call、apply 的底层原理
- 实现思路：把函数作为对象的临时属性，然后调用该属性（这样 this 指向该对象），完成后删除该属性。apply 接收数组参数，call 接收参数列表，bind 返回新的函数（闭包）并记录要绑定的 this 与前置参数。
- 面试点：bind 返回的函数可用于 new（有特殊处理：若用 new 调用，this 指向实例），需要保留原函数的 prototype 链以支持 instanceof。
<details>
  <summary>示例（简化实现）</summary>

```javascript
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;
  const fnSym = Symbol();
  context[fnSym] = this;
  const result = context[fnSym](...args);
  delete context[fnSym];
  return result;
};

Function.prototype.myBind = function(context, ...args) {
  const self = this;
  function bound(...rest) {
    // 支持 new
    const isNew = this instanceof bound;
    return self.apply(isNew ? this : context, args.concat(rest));
  }
  bound.prototype = Object.create(self.prototype);
  return bound;
};
```

</details>  

## 15. 立即执行函数（IIFE）是怎么工作的？
- 目的：创建独立作用域，避免污染全局，常用于早期模块化或块级封装。
- 写法：
  - `(function(){ /*...*/ })()`;
  - `(() => { /*...*/ })()`;
  - `!function(){ /*...*/ }()`;（有趣但不常用）
- 注意：前面可能需要分号（防止与前一个未结束的语句造成解析错误）。


## 16. 纯函数、副作用 与 函数式编程入门
- 纯函数：相同输入总返回相同输出、不会产生副作用（不修改外部变量、无 I/O 等）。
- 副作用：修改外部状态、网络请求、DOM 操作、控制台输出等。
- 函数式编程（FP） 初识：强调不可变数据、纯函数、组合（compose）、高阶函数、声明式处理。
- 面试点：如何把副作用隔离到边缘（side-effect free core），以及用 Immutable/structural sharing 优化。


## 17. 手写 bind 实现（更完整版）

<details>
  <summary>示例代码</summary>

```javascript
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') throw new TypeError('Bind must be called on function');
  const self = this;
  function bound(...rest) {
    // 如果通过 new 调用，this 会是实例，忽略绑定的 context
    const isNew = this instanceof bound;
    return self.apply(isNew ? this : context, args.concat(rest));
  }
  // 保持原型链以支持 new
  bound.prototype = Object.create(self.prototype);
  return bound;
};
```

</details> 

## 18. 手写柯里化函数
- 支持一次或多次传参，直到参数数量满足原函数长度
<details>
  <summary>示例代码</summary>

```javascript
function curry(fn, ...preset) {
  return function curried(...args) {
    const all = [...preset, ...args];
    if (all.length >= fn.length) return fn(...all.slice(0, fn.length));
    return curry(fn, ...all);
  };
}

// 用法
const add = (a,b,c) => a+b+c;
const cAdd = curry(add);
cAdd(1)(2)(3); // 6
cAdd(1,2)(3); // 6
```

</details> 

## 19. 函数组合、记忆化（memoization）
- 组合（compose/pipe）

```javascript
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```
- 记忆化：利用 Map 缓存计算结果（注意：参数是对象时需要特殊处理或使用 WeakMap）：

```javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const res = fn.apply(this, args);
    cache.set(key, res);
    return res;
  };
}
``` 
- 面试点：记忆化适用于纯函数，注意缓存失效/内存泄漏问题以及参数可序列化性

## 20. setTimeout 和 setInterval 的陷阱
- setInterval 可能导致任务重叠（任务执行时间超过间隔），建议用递归 setTimeout 来确保间隔是任务完成后的固定延迟。
- 最小延迟限制（浏览器或 Node 在后台页或某些环境会限制最小延迟）。
- 清除需要 clearTimeout/clearInterval。
- 计时精度：不保证精确（受事件循环阻塞影响）。

<details>
  <summary>示例（安全的间隔）</summary>

```javascript
function safeInterval(fn, delay) {
  let stopped = false;
  function run() {
    if (stopped) return;
    const p = Promise.resolve().then(fn);
    p.finally(() => setTimeout(run, delay));
  }
  setTimeout(run, delay);
  return () => { stopped = true; };
}
```

</details>   

## 21. 事件循环（Event Loop）完整解析
- 主要概念：
  - 调用栈（call stack）
  - 宏任务队列（macrotasks）：`setTimeout`, `setInterval`, `I/O`, `UI rendering callbacks`
  - 微任务队列（microtasks）：`Promise.then/catch/finally`, `queueMicrotask`, `DOM MutationObserver`
- 执行顺序：执行当前 call stack -> 执行所有微任务直到空 -> 渲染（浏览器）-> 执行一个宏任务 -> 重复。
- Node vs 浏览器差异：
- Node 有` process.nextTick`（比 microtask 更高优先级），也有宏任务队列细分。
- 面试点：用例子说明输出顺序（微任务优先于宏任务），并能说明在某个输出序列中为啥 `Promise.then` 先于 `setTimeout`。

<details>
  <summary>示例代码</summary>

```javascript
console.log('script start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => {
  console.log('promise1');
}).then(() => {
  console.log('promise2');
});

console.log('script end');
// 输出： script start, script end, promise1, promise2, timeout
```

</details> 

## 22. Promise 基本语法 + 错误捕获
- `.then(onFulfilled, onRejected)`：推荐链式 `.then(...).catch(...)`；catch 等于 `.then(null, onRejected)`。
- 错误传播：.then 内抛错会变成返回的 Promise 的 `reject`，可被后续的 `.catch` 捕获。
- `finally`：无论成功或失败都会执行；返回值会被忽视（但可用于清理）。
- 面试点：错误冒泡链、在 `.then` 内返回 Promise 会等待它 `resolve/reject`。

<details>
  <summary>示例代码</summary>

```javascript
Promise.resolve(1)
  .then(x => x+1)
  .then(x => { throw new Error('err') })
  .catch(err => console.error('caught', err));
```

</details>

## 23. async / await 的底层运行机制
- async 函数总是返回 Promise。
- await 会暂停 async 函数的执行（在当前执行帧结束后，await 后的代码会作为微任务恢复执行），等待表达式解析（若不是 Promise，会被 Promise.resolve() 包装）。
- 底层等效：用 Generator + Promise 来实现（Babel 转译思路）。
- 面试点：await 只会暂停当前 async 函数，不会阻塞主线程；错误可被 try/catch 捕获。

<details>
  <summary>伪转译（概念）</summary>

```javascript
async function foo() {
  const a = await p1();
  const b = await p2();
  return a + b;
}
// 大致像
function foo() {
  return new Promise((resolve, reject) => {
    p1().then(a => {
      p2().then(b => resolve(a+b), reject);
    }, reject);
  });
}
```

</details>   

## 24. `Promise.all`、`allSettled`、`race`、`any` 用法对比
- `Promise.all(iterable)`：全部成功 -> 返回结果数组；任意一个失败 -> 立刻` reject`（返回第一个遇到的 reject）。
- `Promise.allSettled(iterable)`：等待全部完成（不论成功失败），返回每项 `{status, value/reason}`。
- `Promise.race(iterable)`：返回第一个完成`（resolve 或 reject）`的 Promise 的结果。
- `Promise.any(iterable)（ES2021）`：返回第一个 resolve 的值；若全部 reject，则 reject 一个` AggregateError`（包含所有错误）。
- 面试点：选择哪个取决于业务需求（是“全成功”还是“先到先得”或“至少一个成功”）。

<details>
  <summary>示例代码</summary>

```javascript
Promise.all([p1,p2]).then(results => {});
Promise.allSettled([p1,p2]).then(results => {});
Promise.race([p1,p2]).then(first => {});
Promise.any([p1,p2]).then(firstFulfilled => {});
```

</details> 

## 25. 手写一个简化版 Promise（核心功能：then 链式）
<details>
  <summary>下面实现为简化版，支持链式 .then，基本的 resolve/reject，Promise 值穿透与 thenable 兼容（简化版，未实现所有 edge case）：</summary>

```javascript
class SimplePromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];

    const resolve = (val) => {
      setTimeout(() => this._resolve(val), 0);
    };
    const reject = (err) => {
      setTimeout(() => this._reject(err), 0);
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  _resolve(val) {
    if (this.state !== 'pending') return;
    if (val && (typeof val === 'object' || typeof val === 'function')) {
      // thenable 处理
      try {
        const then = val.then;
        if (typeof then === 'function') {
          return then.call(val, v => this._resolve(v), e => this._reject(e));
        }
      } catch (e) {
        return this._reject(e);
      }
    }
    this.state = 'fulfilled';
    this.value = val;
    this.handlers.forEach(h => h.onFulfilled(val));
  }

  _reject(err) {
    if (this.state !== 'pending') return;
    this.state = 'rejected';
    this.value = err;
    this.handlers.forEach(h => h.onRejected(err));
  }

  then(onFulfilled, onRejected) {
    return new SimplePromise((resolve, reject) => {
      const handle = () => {
        try {
          if (this.state === 'fulfilled') {
            if (typeof onFulfilled === 'function') {
              resolve(onFulfilled(this.value));
            } else {
              resolve(this.value);
            }
          } else if (this.state === 'rejected') {
            if (typeof onRejected === 'function') {
              resolve(onRejected(this.value)); // 注意：如果 onRejected 返回值，视为 resolve
            } else {
              reject(this.value);
            }
          } else {
            this.handlers.push({
              onFulfilled: (v) => {
                try {
                  if (typeof onFulfilled === 'function') resolve(onFulfilled(v));
                  else resolve(v);
                } catch (e) { reject(e); }
              },
              onRejected: (e) => {
                try {
                  if (typeof onRejected === 'function') resolve(onRejected(e));
                  else reject(e);
                } catch (err) { reject(err); }
              }
            });
          }
        } catch (e) { reject(e); }
      };

      // 如果已经 settled，异步执行处理
      if (this.state !== 'pending') setTimeout(handle, 0);
      else this.handlers.push({
        onFulfilled: (v) => { try { if (typeof onFulfilled === 'function') resolve(onFulfilled(v)); else resolve(v); } catch (e) { reject(e); } },
        onRejected: (e) => { try { if (typeof onRejected === 'function') resolve(onRejected(e)); else reject(e); } catch (err) { reject(err); } }
      });
    });
  }

  catch(fn) {
    return this.then(null, fn);
  }

  static resolve(v) {
    return new SimplePromise((res) => res(v));
  }

  static reject(e) {
    return new SimplePromise((_, rej) => rej(e));
  }
}
```

</details>

## 26. 实战：用 Promise 重写 setTimeout 任务队列
- 需求：按顺序执行一组带延迟的任务（每个任务按指定延迟执行，前一个完成才开始下一个）。
- 实现思路：用 Promise 链或 async/await 顺序调度。
<details>
  <summary>示例（任务队列类</summary>

```javascript
class TimeoutQueue {
    constructor() { this.chain = Promise.resolve(); }

    // task: () => Promise|value, delay: ms
    add(task, delay = 0) {
        this.chain = this.chain.then(() => new Promise((resolve) => {
            setTimeout(() => {
                Promise.resolve().then(task).then(resolve, resolve); // 即使 task 抛错，也让队列继续（可根据需要改为 reject）
            }, delay);
        }));
        return this.chain;
    }
}

// 用法
const q = new TimeoutQueue();
q.add(() => console.log('task1'), 1000);
q.add(() => fetch('/api'), 500);
```

</details>
- 也可以把 setTimeout 包装为 Promise 

```javascript
const wait = ms => new Promise(res => setTimeout(res, ms));
await wait(1000);
```

## 27. 实战：Async / await 错误处理的 3 种方式 
1.try / catch（最直观）

```javascript
try {
  const res = await foo();
} catch (err) {
  // 处理
}
```

2.对 Promise 使用 .catch（适用于并行）

```javascript
const p = foo();
p.catch(err => { /* 处理 */ });
```

3.返回` [err, result]` 的封装（避免 try/catch）

```javascript
const to = (p) => p.then(data => [null, data]).catch(err => [err]);
const [err, data] = await to(foo());
if (err) { /* 处理 */ }
```

## 28. “异步题大汇总”：输出顺序、陷阱解析（几个常见面试题)
<details>
  <summary>经典例子（解释输出）</summary>

```javascript
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
// 输出： start, end, promise, timeout
```

</details> 
<details>
  <summary>更复杂（微任务链）</summary>

```javascript
Promise.resolve().then(() => {
    console.log('p1');
    Promise.resolve().then(() => console.log('p2'));
});
console.log('sync');
// 输出： sync, p1, p2
```

</details>  

- setTimeout 与 Promise.then 的优先级（Promise microtask 优先于宏任务）。
- Node 特例：process.nextTick 比 Promise 微任务更早执行（面试可能考）。
- 面试点：能够解释任意给定代码片段的输出顺序、理解微任务与宏任务优先级、Promise 回调的异步性（即使 Promise 已经 resolved）等。





## 29. 什么是原型？什么是原型链？
- 原型（prototype）：每个函数（构造函数）都有 prototype 对象，实例对象通过` __proto__`（或 Object.getPrototypeOf）指向构造函数的 prototype。属性查找会沿着这条链向上查找，这就是原型链。
- 面试点：区分 prototype（函数的属性，用于实例的原型）与 `__proto__`（实例的指针）；Object.prototype 的` __proto__ `是 null（链的终点）。

<details>
  <summary>示例代码</summary>

```javascript
function A() {}
A.prototype.say = function(){ console.log('hi'); };
const a = new A();
a.say(); // 查找：a -> A.prototype -> Object.prototype
```

</details> 
  

## 30. 构造函数与 new 的机制 
new 的执行过程（面试常考）简述：
1. 创建一个新对象：obj = {}。
2. 将新对象的 __proto__ 指向构造函数的 prototype（obj.__proto__ = Fn.prototype）。
3. 将构造函数内部 this 绑定到新对象并执行构造函数：Fn.call(obj, ...args)。
4. 若构造函数返回一个对象（非 null 且类型为 object 或 function），则返回该对象；否则返回 obj
5. 要写出 new 的手写实现（见第 31 条）

## 31. 手写 new 的实现逻辑

<details>
  <summary>示例代码</summary>

```javascript
function myNew(fn, ...args) {
  if (typeof fn !== 'function') throw new TypeError('myNew must be called with constructor');
  const obj = Object.create(fn.prototype);
  const res = fn.apply(obj, args);
  return (res !== null && (typeof res === 'object' || typeof res === 'function')) ? res : obj;
}

// 用法
function Person(name) { this.name = name; }
const p = myNew(Person, 'Tom');
```

</details> 

## 32. instanceof 背后的原理
- 原理：判断构造函数的 prototype 是否出现在对象的原型链上。
<details>
  <summary>手写实现</summary>

    ```javascript
    function myInstanceOf(obj, constructor) {
let proto = Object.getPrototypeOf(obj);
const prototype = constructor.prototype;
while (proto !== null) {
if (proto === prototype) return true;
proto = Object.getPrototypeOf(proto);
}
return false;
}  
    ```

</details> 

## 33. Object.create 是怎么实现继承的？
- Object.create(proto) 本质上创建了一个新的对象并将它的内部 [[Prototype]] 指向 proto。
- 简单 polyfill：

```javascript
function objectCreate(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
```
- ES6 中可直接用 `Object.create(proto)。Object.create(null)` 创建无原型的纯字典对象。

## 34. class 是语法糖吗？背后发生了什么？
- 是的：ES6 class 只是构造函数 + 原型链的语法糖，提供更清晰的语法（constructor、extends、静态方法、super 等）。
- 背后：class 声明会创建一个构造函数（不可被提升），并把实例方法放在 .prototype 上，把静态方法放在构造函数上。extends 会设置子类的 prototype 指向父类实例的 prototype（通过 Object.create），同时设置 super 调用链。
- 面试点：class 的方法是不可枚举的；class 的 constructor 不可在非构造情境直接调用（class 的 toString、name 等），以及 extends null 的特殊情况。

示例（等价思想）：
```javascript
class A {
  constructor(x) { this.x = x; }
  foo() { return this.x; }
}
// 转换为
function A(x) { this.x = x; }
A.prototype.foo = function() { return this.x; };
```

## 35. JS 中常见继承方式对比总结
- 原型链继承（Child.prototype = new Parent()）：共享引用属性问题。
- 构造函数继承（借用构造）（Parent.call(this)）：可以继承实例属性，无法继承方法（需用 prototype）。
- 组合继承（借用构造 + 原型链）：常见且实用（constructor 调用 + prototype 链接）。
- 寄生组合继承（优化组合继承，避免调用两次父构造）：使用 Object.create(Parent.prototype) 并修复 constructor。
- ES6 class extends：语法糖，背后处理原型链与 super。
- 面试点：每种方式的优缺点（比如共享引用带来的 bug、性能或重复调用父构造函数的问题），以及如何修复（使用 Object.create、修复 constructor 等）。