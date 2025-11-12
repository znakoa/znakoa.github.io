---
sidebar_position: 1
title: "综合题"
---

## 1 实现一个 sleep 函数，比如 `sleep(1000)` 意味着等待1000毫秒

```js
// 使用 promise来实现 sleep
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

sleep(1000).then(() => {
  // 这里写你的骚操作
})
```
## 2 给定两个数组，写一个方法来计算它们的交集
例如：给定 `nums1 = [1, 2, 2, 1]`，`nums2 = [2, 2]`，返回` [2, 2]`。

```js
function union (arr1, arr2) {
  return arr1.filter(item => {
    return arr2.indexOf(item) > - 1;
  })
}
const a = [1, 2, 2, 1];
const b = [2, 3, 2];
console.log(union(a, b)); // [2, 2]
```
## 3 异步并发数限制

```js showLineNumbers
/**
 * 关键点
 * 1. new promise 一经创建，立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行执行
 * 5. 任务完成后，需要从 doingTasks 中移出
 */
function limit(count, array, iterateFunc) {
  const tasks = []
  const doingTasks = []
  let i = 0
  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve()
    }
    const task = Promise.resolve().then(() => iterateFunc(array[i++]))
    tasks.push(task)
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))
    doingTasks.push(doing)
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()
    return res.then(enqueue)
  };
  return enqueue().then(() => Promise.all(tasks))
}

// test
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
  console.log(res)
})
```

## 4 异步串行 | 异步并行
```js showLineNumbers
// 字节面试题，实现一个异步加法
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 500);
}

// 解决方案
// 1. promisify
const promiseAdd = (a, b) => new Promise((resolve, reject) => {
  asyncAdd(a, b, (err, res) => {
    if (err) {
      reject(err)
    } else {
      resolve(res)
    }
  })
})

// 2. 串行处理
async function serialSum(...args) {
  return args.reduce((task, now) => task.then(res => promiseAdd(res, now)), Promise.resolve(0))
}

// 3. 并行处理
async function parallelSum(...args) {
  if (args.length === 1) return args[0]
  const tasks = []
  for (let i = 0; i < args.length; i += 2) {
    tasks.push(promiseAdd(args[i], args[i + 1] || 0))
  }
  const results = await Promise.all(tasks)
  return parallelSum(...results)
}

// 测试
(async () => {
  console.log('Running...');
  const res1 = await serialSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
  console.log(res1)
  const res2 = await parallelSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
  console.log(res2)
  console.log('Done');
})()

```

## 5 实现有并行限制的 Promise 调度器
题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
`
addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
的输出顺序是：2 3 1 4

整个的完整执行流程：

一开始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4
`
实现代码如下:
```js
class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.maxCount = limit;
    this.runCounts = 0;
  }
  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--;
        this.request();
      });
  }
}
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();

```

## 6 图片懒加载
```js
// <img src="default.png" src="https://xxxx/real.png">
function isVisible(el) {
  const position = el.getBoundingClientRect()
  const windowHeight = document.documentElement.clientHeight
  // 顶部边缘可见
  const topVisible = position.top > 0 && position.top < windowHeight;
  // 底部边缘可见
  const bottomVisible = position.bottom < windowHeight && position.bottom > 0;
  return topVisible || bottomVisible;
}

function imageLazyLoad() {
  const images = document.querySelectorAll('img')
  for (let img of images) {
    const realSrc = img.dataset.src
    if (!realSrc) continue
    if (isVisible(img)) {
      img.src = realSrc
      img.dataset.src = ''
    }
  }
}

// 测试
window.addEventListener('load', imageLazyLoad)
window.addEventListener('scroll', imageLazyLoad)
// or
window.addEventListener('scroll', throttle(imageLazyLoad, 1000))
```
## 7 实现 getValue/setValue 函数来获取path对应的值
```js
// 示例
var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'

function getValue(target, valuePath, defaultValue) {}

console.log(getValue(object, "a[0].b.c", 0)); // 输出3
console.log(getValue(array, "[0].a.b[0]", 12)); // 输出 1
console.log(getValue(array, "[0].a.b[0].c", 12)); // 输出 12
```
实现
```js
/**
 * 测试属性是否匹配
 */
export function testPropTypes(value, type, dev) {
  const sEnums = ['number', 'string', 'boolean', 'undefined', 'function']; // NaN
  const oEnums = ['Null', 'Object', 'Array', 'Date', 'RegExp', 'Error'];
  const nEnums = [
    '[object Number]',
    '[object String]',
    '[object Boolean]',
    '[object Undefined]',
    '[object Function]',
    '[object Null]',
    '[object Object]',
    '[object Array]',
    '[object Date]',
    '[object RegExp]',
    '[object Error]',
  ];
  const reg = new RegExp('\\[object (.*?)\\]');

  // 完全匹配模式，type应该传递类似格式[object Window] [object HTMLDocument] ...
  if (reg.test(type)) {
    // 排除nEnums的12种
    if (~nEnums.indexOf(type)) {
      if (dev === true) {
        console.warn(value, 'The parameter type belongs to one of 12 types：number string boolean undefined Null Object Array Date RegExp function Error NaN');
      }
    }

    if (Object.prototype.toString.call(value) === type) {
      return true;
    }

    return false;
  }
}
```
```js
const syncVarIterator = {
  getter: function (obj, key, defaultValue) {
    // 结果变量
    const defaultResult = defaultValue === undefined ? undefined : defaultValue;

    if (testPropTypes(obj, 'Object') === false && testPropTypes(obj, 'Array') === false) {
      return defaultResult;
    }

    // 结果变量，暂时指向obj持有的引用，后续将可能被不断的修改
    let result = obj;

    // 得到知道值
    try {
      // 解析属性层次序列
      const keyArr = key.split('.');

      // 迭代obj对象属性
      for (let i = 0; i < keyArr.length; i++) {
        // 如果第 i 层属性存在对应的值则迭代该属性值
        if (result[keyArr[i]] !== undefined) {
          result = result[keyArr[i]];

          // 如果不存在则返回未定义
        } else {
          return defaultResult;
        }
      }
    } catch (e) {
      return defaultResult;
    }

    // 返回获取的结果
    return result;
  },
  setter: function (obj, key, val) {
    // 如果不存在obj则返回未定义
    if (testPropTypes(obj, 'Object') === false) {
      return false;
    }

    // 结果变量，暂时指向obj持有的引用，后续将可能被不断的修改
    let result = obj;

    try {
      // 解析属性层次序列
      const keyArr = key.split('.');

      let i = 0;

      // 迭代obj对象属性
      for (; i < keyArr.length - 1; i++) {
        // 如果第 i 层属性对应的值不存在，则定义为对象
        if (result[keyArr[i]] === undefined) {
          result[keyArr[i]] = {};
        }

        // 如果第 i 层属性对应的值不是对象（Object）的一个实例，则抛出错误
        if (!(result[keyArr[i]] instanceof Object)) {
          throw new Error('obj.' + keyArr.splice(0, i + 1).join('.') + 'is not Object');
        }

        // 迭代该层属性值
        result = result[keyArr[i]];
      }

      // 设置属性值
      result[keyArr[i]] = val;

      return true;
    } catch (e) {
      return false;
    }
  },
};
```
使用promise来实现
创建 enhancedObject 函数
```js
const enhancedObject = (target) =>
  new Proxy(target, {
    get(target, property) {
      if (property in target) {
        return target[property];
      } else {
        return searchFor(property, target); //实际使用时要对value值进行复位
      }
    },
  });

let value = null;
function searchFor(property, target) {
  for (const key of Object.keys(target)) {
    if (typeof target[key] === "object") {
      searchFor(property, target[key]);
    } else if (typeof target[property] !== "undefined") {
      value = target[property];
      break;
    }
  }
  return value;
}
```
使用 enhancedObject 函数
```js
const data = enhancedObject({
  user: {
    name: "test",
    settings: {
      theme: "dark",
    },
  },
});

console.log(data.user.settings.theme); // dark
console.log(data.theme); // dark
```
以上代码运行后，控制台会输出以下代码：
`
dark
dark
`
通过观察以上的输出结果可知，使用 enhancedObject 函数处理过的对象，我们就可以方便地访问普通对象内部的深层属性。
## 8 创建10个标签，点击的时候弹出来对应的序号
```js
var a
for(let i=0;i<10;i++){
  a=document.createElement('a')
  a.innerHTML=i+'<br>'
  a.addEventListener('click',function(e){
    console.log(this)  //this为当前点击的<a>
    e.preventDefault()  //如果调用这个方法，默认事件行为将不再触发。
    //例如，在执行这个方法后，如果点击一个链接（a标签），浏览器不会跳转到新的 URL 去了。我们可以用 event.isDefaultPrevented() 来确定这个方法是否(在那个事件对象上)被调用过了。
    alert(i)
  })
  const d=document.querySelector('div')
  d.appendChild(a)  //append向一个已存在的元素追加该元素。
}
```
## 9 版本号排序的方法
题目描述:有一组版本号如下 `['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']`。现在需要对其进行排序，排序的结果为 `['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']`
```js
arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");

  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length;
    }

    if (s1 === s2) continue;

    return s2 - s1;
  }
});
console.log(arr);
```

## 10 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式

```html
<div>
  <span>
    <a></a>
    </span>
    <span>
    <a></a>
    <a></a>
    </span>
    </div>
```

  把上面dom结构转成下面的JSON格式

```json
  {
    tag: 'DIV',
      children: [
      {
        tag: 'SPAN',
        children: [
          { tag: 'A', children: [] }
        ]
      },
      {
        tag: 'SPAN',
        children: [
          { tag: 'A', children: [] },
          { tag: 'A', children: [] }
        ]
      }
    ]
  }
```

实现代码如下:
```js
function dom2Json(domtree) {
  let obj = {};
  obj.name = domtree.tagName;
  obj.children = [];
  domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child)));
  return obj;
}
```
## 11 分片思想解决大数据量渲染问题
题目描述: 渲染百万条结构简单的大数据时 怎么使用分片思想优化渲染
扩展思考：对于大数据量的简单 dom 结构渲染可以用分片思想解决 如果是复杂的 dom 结构渲染如何处理？
这时候就需要使用虚拟列表了，虚拟列表和虚拟表格在日常项目使用还是很多的
```js
let ul = document.getElementById("container");
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total / once;
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal, curIndex) {
  if (curTotal <= 0) {
    return false;
  }
  //每页多少条
  let pageCount = Math.min(curTotal, once);
  window.requestAnimationFrame(function () {
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement("li");
      li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
      ul.appendChild(li);
    }
    loop(curTotal - pageCount, curIndex + pageCount);
  });
}
loop(total, index);
```
## 12 实现一个add方法完成两个大数相加
```js
// 题目
let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
  //...
}
```
实现代码如下:
```js
function add(a ,b){
  //取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length);
  //用0去补齐长度
  a = a.padStart(maxLength , 0);//"0009007199254740991"
  b = b.padStart(maxLength , 0);//"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0;   //"进位"
  let sum = "";
  for(let i=maxLength-1 ; i>=0 ; i--){
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t/10);
    sum = t%10 + sum;
  }
  if(f!==0){
    sum = '' + f + sum;
  }
  return sum;
}
```
## 13 怎么在制定数据源里面生成一个长度为 n 的不重复随机数组 能有几种方法 时间复杂度多少（字节）
第一版 时间复杂度为 O(n^2)
```js
function getTenNum(testArray, n) {
  let result = [];
  for (let i = 0; i < n; ++i) {
    const random = Math.floor(Math.random() * testArray.length);
    const cur = testArray[random];
    if (result.includes(cur)) {
      i--;
      break;
    }
    result.push(cur);
  }
  return result;
}
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const resArr = getTenNum(testArray, 10);
```
第二版 标记法 / 自定义属性法 时间复杂度为 O(n)
```js
function getTenNum(testArray, n) {
  let hash = {};
  let result = [];
  let ranNum = n;
  while (ranNum > 0) {
    const ran = Math.floor(Math.random() * testArray.length);
    if (!hash[ran]) {
      hash[ran] = true;
      result.push(ran);
      ranNum--;
    }
  }
  return result;
}
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const resArr = getTenNum(testArray, 10);
```
第三版 交换法 时间复杂度为 O(n)
```js
function getTenNum(testArray, n) {
  const cloneArr = [...testArray];
  let result = [];
  for (let i = 0; i < n; i++) {
    debugger;
    const ran = Math.floor(Math.random() * (cloneArr.length - i));
    result.push(cloneArr[ran]);
    cloneArr[ran] = cloneArr[cloneArr.length - i - 1];
  }
  return result;
}
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const resArr = getTenNum(testArray, 14);
```
值得一提的是操作数组的时候使用交换法 这种思路在算法里面很常见
最终版 边遍历边删除 时间复杂度为 O(n)
```js
function getTenNum(testArray, n) {
  const cloneArr = [...testArray];
  let result = [];
  for (let i = 0; i < n; ++i) {
    const random = Math.floor(Math.random() * cloneArr.length);
    const cur = cloneArr[random];
    result.push(cur);
    cloneArr.splice(random, 1);
  }
  return result;
}
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const resArr = getTenNum(testArray, 14);
```
## 14 查找数组公共前缀（美团）
题目描述
`
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

示例 1：

输入：strs = ["flower","flow","flight"]
输出："fl"

示例 2：

输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
`
答案
```js
const longestCommonPrefix = function (strs) {
  const str = strs[0];
  let index = 0;
  while (index < str.length) {
    const strCur = str.slice(0, index + 1);
    for (let i = 0; i < strs.length; i++) {
      if (!strs[i] || !strs[i].startsWith(strCur)) {
        return str.slice(0, index);
      }
    }
    index++;
  }
  return str;
};
```
## 15 判断括号字符串是否有效（小米）
题目描述
`
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。

示例 1：

输入：s = "()"
输出：true

示例 2：

输入：s = "()[]{}"
输出：true

示例 3：

输入：s = "(]"
输出：false
`

答案
```js
const isValid = function (s) {
  if (s.length % 2 === 1) {
    return false;
  }
  const regObj = {
    "{": "}",
    "(": ")",
    "[": "]",
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "{" || s[i] === "(" || s[i] === "[") {
      stack.push(s[i]);
    } else {
      const cur = stack.pop();
      if (s[i] !== regObj[cur]) {
        return false;
      }
    }
  }

  if (stack.length) {
    return false;
  }

  return true;
};
```
## 16 实现一个`padStart()`或`padEnd()`的`polyfil`
`String.prototype.padStar`t 和 `String.prototype.padEnd`是ES8中新增的方法，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。我们先看下使用语法：
`String.padStart(targetLength,[padString])`
用法：
```js
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'

// 1. 若是输入的目标长度小于字符串原本的长度则返回字符串本身
'xxx'.padStart(2, 's') // 'xxx'

// 2. 第二个参数的默认值为 " "，长度是为1的
// 3. 而此参数可能是个不确定长度的字符串，若是要填充的内容达到了目标长度，则将不要的部分截取
'xxx'.padStart(5, 'sss') // ssxxx

// 4. 可用来处理日期、金额格式化问题
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

polyfill实现：
```js
String.prototype.myPadStart = function (targetLen, padString = " ") {
  if (!targetLen) {
    throw new Error('请输入需要填充到的长度');
  }
  let originStr = String(this); // 获取到调用的字符串, 因为this原本是String{}，所以需要用String转为字符串
  let originLen = originStr.length; // 调用的字符串原本的长度
  if (originLen >= targetLen) return originStr; // 若是 原本 > 目标 则返回原本字符串
  let diffNum = targetLen - originLen; // 10 - 6 // 差值
  for (let i = 0; i < diffNum; i++) { // 要添加几个成员
    for (let j = 0; j < padString.length; j++) { // 输入的padString的长度可能不为1
      if (originStr.length === targetLen) break; // 判断每一次添加之后是否到了目标长度
      originStr = `${padString[j]}${originStr}`;
    }
    if (originStr.length === targetLen) break;
  }
  return originStr;
}
console.log('xxx'.myPadStart(16))
console.log('xxx'.padStart(16))
```
还是比较简单的，而padEnd的实现和它一样，只需要把第二层for循环里的`${padString[j]}${orignStr}`换下位置就可以了。
## 17 设计一个方法提取对象中所有value大于2的键值对并返回最新的对象
实现：
```js
var obj = { a: 1, b: 3, c: 4 }
foo(obj) // { b: 3, c: 4 }
```
方法有很多种，这里提供一种比较简洁的写法，用到了ES10的Object.fromEntries()：
```js
var obj = { a: 1, b: 3, c: 4 }
function foo (obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value > 2)
  )
}
var obj2 = foo(obj) // { b: 3, c: 4 }
console.log(obj2)
```

```js
// ES8中 Object.entries()的作用：
var obj = { a: 1, b: 2 }
var entries = Object.entries(obj); // [['a', 1], ['b', 2]]
// ES10中 Object.fromEntries()的作用：
Object.fromEntries(entries); // { a: 1, b: 2 }
```
## 18 实现一个拖拽
```html
<style>
  html, body {
    margin: 0;
    height: 100%;
  }
  box {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: 100px;
    left: 100px;
  }
</style>
```
```html
<div id="box"></div>
```
```js
window.onload = function () {
  var box = document.getElementById('box');
  box.onmousedown = function (ev) {
    var oEvent = ev || window.event; // 兼容火狐,火狐下没有window.event
    var distanceX = oEvent.clientX - box.offsetLeft; // 鼠标到可视区左边的距离 - box到页面左边的距离
    var distanceY = oEvent.clientY - box.offsetTop;
    document.onmousemove = function (ev) {
      var oEvent = ev || window.event;
      var left = oEvent.clientX - distanceX;
      var top = oEvent.clientY - distanceY;
      if (left <= 0) {
        left = 0;
      } else if (left >= document.documentElement.clientWidth - box.offsetWidth) {
        left = document.documentElement.clientWidth - box.offsetWidth;
      }
      if (top <= 0) {
        top = 0;
      } else if (top >= document.documentElement.clientHeight - box.offsetHeight) {
        top = document.documentElement.clientHeight - box.offsetHeight;
      }
      box.style.left = left + 'px';
      box.style.top = top + 'px';
    }
    box.onmouseup = function () {
      document.onmousemove = null;
      box.onmouseup = null;
    }
  }
}
```
## 19 基于Promise.all实现Ajax的串行和并行
基于`Promise.all`实现Ajax的串行和并行
串行：请求是异步的，需要等待上一个请求成功，才能执行下一个请求
并行：同时发送多个请求「HTTP请求可以同时进行，但是JS的操作都是一步步的来的，因为JS是单线程」,等待所有请求都成功，我们再去做什么事情?
```js
Promise.all([
  axios.get('/user/list'),
  axios.get('/user/list'),
  axios.get('/user/list')
]).then(results => {
  console.log(results);
}).catch(reason => {

});
```
Promise.all并发限制及async-pool的应用
并发限制指的是，每个时刻并发执行的promise数量是固定的，最终的执行结果还是保持与原来的
```js
const delay = function delay(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if (interval === 1003) reject('xxx');
      resolve(interval);
    }, interval);
  });
};
let tasks = [() => {
  return delay(1000);
}, () => {
  return delay(1003);
}, () => {
  return delay(1005);
}, () => {
  return delay(1002);
}, () => {
  return delay(1004);
}, () => {
  return delay(1006);
}];

/* Promise.all(tasks.map(task => task())).then(results => {
    console.log(results);
}); */

let results = [];
asyncPool(2, tasks, (task, next) => {
  task().then(result => {
    results.push(result);
    next();
  });
}, () => {
  console.log(results);
});
```
```js
const delay = function delay(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(interval);
    }, interval);
  });
};
let tasks = [() => {
  return delay(1000);
}, () => {
  return delay(1003);
}, () => {
  return delay(1005);
}, () => {
  return delay(1002);
}, () => {
  return delay(1004);
}, () => {
  return delay(1006);
}];
```
JS实现Ajax并发请求控制的两大解决方案
tasks：数组，数组包含很多方法，每一个方法执行就是发送一个请求「基于Promise管理」
```js
function createRequest(tasks, pool) {
  pool = pool || 5;
  let results = [],
    together = new Array(pool).fill(null),
    index = 0;
  together = together.map(() => {
    return new Promise((resolve, reject) => {
      const run = function run() {
        if (index >= tasks.length) {
          resolve();
          return;
        };
        let old_index = index,
          task = tasks[index++];
        task().then(result => {
          results[old_index] = result;
          run();
        }).catch(reason => {
          reject(reason);
        });
      };
      run();
    });
  });
  return Promise.all(together).then(() => results);
} 

/* createRequest(tasks, 2).then(results => {
    // 都成功，整体才是成功，按顺序存储结果
    console.log('成功-->', results);
}).catch(reason => {
    // 只要有也给失败，整体就是失败
    console.log('失败-->', reason);
}); */
```
```js
function createRequest(tasks, pool, callback) {
  if (typeof pool === "function") {
    callback = pool;
    pool = 5;
  }
  if (typeof pool !== "number") pool = 5;
  if (typeof callback !== "function") callback = function () {};
  //------
  class TaskQueue {
    running = 0;
    queue = [];
    results = [];
    pushTask(task) {
      let self = this;
      self.queue.push(task);
      self.next();
    }
    next() {
      let self = this;
      while (self.running < pool && self.queue.length) {
        self.running++;
        let task = self.queue.shift();
        task().then(result => {
          self.results.push(result);
        }).finally(() => {
          self.running--;
          self.next();
        });
      }
      if (self.running === 0) callback(self.results);
    }
  }
  let TQ = new TaskQueue;
  tasks.forEach(task => TQ.pushTask(task));
}
createRequest(tasks, 2, results => {
  console.log(results);
});
```

## 20 修改嵌套层级很深对象的 key
```js
// 有一个嵌套层次很深的对象，key 都是 a_b 形式 ，需要改成 ab 的形式，注意不能用递归。

const a = {
  a_y: {
    a_z: {
      y_x: 6
    },
    b_c: 1
  }
}
// {
//   ay: {
//     az: {
//       yx: 6
//     },
//     bc: 1
//   }
// }
```
方法1：序列化 JSON.stringify + 正则匹配
```js
const regularExpress = (obj) => {
  try {
    const str = JSON.stringify(obj).replace(/_/g, "");
    return JSON.parse(str);
  } catch (error) {
    return obj;
  }
};;
```
方法2：递归
```js
const recursion = (obj) => {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const newKey = key.replace(/_/g, "");
    obj[newKey] = recursion(obj[key]);
    delete obj[key];
  });
  return obj;
};
```