---
sidebar_position: 5
title: "node.js相关"
---

## 1 Node 是什么
    Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，用于在服务端执行 JavaScript。它采用事件驱动、非阻塞 I/O 模型，非常适合高并发场景。
    特点
        单线程 + 异步非阻塞
        事件驱动
        可用于构建网络应用、工具脚本等

## Node 优缺点
    - 优点
        - 高性能：基于 V8 引擎
        - 异步非阻塞 I/O，适合高并发
        - JavaScript 全栈统一
        - 丰富的 npm 生态
    - 缺点
        - 单线程 CPU 密集型任务性能差
        - 异步编程复杂
        - 不适合计算密集型场景

## Node 的应用场景

    - Web 服务器（Express、Koa）
    - 实时应用（聊天、游戏）
    - API 网关
    - 流处理（文件上传、音视频处理）
    - 脚本工具（自动化、爬虫）

## Node 的 fs 模块

    `fs` 是 Node 内置模块，用于文件系统操作，包括读、写、删除、监控文件。

## Node 的 fs 文件基础知识

    - 文件路径：相对路径、绝对路径
    - 文件编码：utf8、binary
    - 同步/异步方法区别：
        - 异步：不阻塞主线程
        - 同步：阻塞主线程
    代码 demo
    
    ```js
    const fs = require('fs');
    const path = require('path');
    
    const filePath = path.join(__dirname, 'file.txt');
    
    // 同步读取
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(data);
    
    ```
## Node 的 fs 文件方式 — 写入

    - fs.writeFile：覆盖写入
    - 异步、同步均可

    ```js
    const fs = require('fs');
    
    fs.writeFile('test.txt', 'Hello Node.js', 'utf8', (err) => {
      if (err) throw err;
      console.log('文件写入成功');
    });
    ```
## Node 的 fs 文件方法 — 追加写入

    fs.appendFile：在文件末尾追加内容

    ```js
    const fs = require('fs');
    
    fs.appendFile('test.txt', '\n追加内容', (err) => {
      if (err) throw err;
      console.log('追加成功');
    });
    ```

## Node 的 fs 文件方法 — 文件拷贝

    - fs.copyFile 用于拷贝文件
    - 可指定覆盖模式
    ```js
    const fs = require('fs');
    
    fs.copyFile('test.txt', 'test_copy.txt', (err) => {
      if (err) throw err;
      console.log('文件复制成功');
    });
    ```
## Node 的 buffer 文件方法

    - Buffer 是 Node 用于处理二进制数据的全局对象
    - 文件读取时可以直接获取 buffer
```js
const fs = require('fs');

fs.readFile('test.txt', (err, data) => {
  if (err) throw err;
  console.log('Buffer:', data); // <Buffer 48 65 6c 6c 6f ...>
  console.log('String:', data.toString());
});
``` 
    - 创建 buffer：Buffer.alloc(size)、Buffer.from(string)
    - 常用方法：
        - toString()
        - slice()
        - length
```js
const buf1 = Buffer.alloc(10); // 10字节空buffer
const buf2 = Buffer.from('Hello Node'); // 从字符串创建

console.log(buf2.toString()); // Hello Node
console.log(buf2.length);     // 10
```

## JWT 鉴权机制是什么？

    - JWT（JSON Web Token）是一种基于 JSON 的身份认证方案
    - 结构：header.payload.signature
    - 特点：
        - 无状态（服务端无需存储 session）
        - 可跨域
        - 自包含（payload 可存储用户信息）
```js
header.payload.signature
```
## JWT 鉴权机制如何实现？

    - 用户登录 -> 服务端生成 JWT -> 返回给客户端
    - 客户端每次请求携带 JWT
    - 服务端验证 JWT 是否有效
```js
const jwt = require('jsonwebtoken');
const secret = 'my_secret';

// 登录生成 token
const token = jwt.sign({ userId: 123 }, secret, { expiresIn: '1h' });
console.log('Token:', token);
```
## JWT 鉴权机制 — 如何验证 token

    - 服务端使用 `jwt.verify(token, secret)` 验证
    - 验证成功即可继续访问，否则拒绝

##  Node 中 Stream 的基本使用

    - Stream 是处理流式数据的接口，避免一次性读写大文件
    - 四种类型：
        - Readable
        - Writable
        - Duplex
        - Transform
```js
const fs = require('fs');
const readStream = fs.createReadStream('large.txt', 'utf8');

readStream.on('data', chunk => {
  console.log('读取数据块:', chunk.length);
});

readStream.on('end', () => {
  console.log('读取完成');
});
```

## Node 中 Stream 的种类

    - Readable：可读
    - Writable：可写
    - Duplex：读写
    - Transform：可转换（例如 gzip 压缩）
```js
const fs = require('fs');
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello Stream\n');
writeStream.end();
```

## Node 中 Stream 的使用场景

    - 大文件处理（上传/下载）
    - 数据管道（pipe）
    - 实时日志处理
    - 网络请求流
```js
const fs = require('fs');
const readStream = fs.createReadStream('large.txt');
const writeStream = fs.createWriteStream('copy.txt');

readStream.pipe(writeStream);
```

## Node 的 process
    - process 是 Node 提供的全局对象，表示 Node 进程
    - 常用属性：
        - process.argv 命令行参数
        - process.env 环境变量
        - process.exit() 退出进程
```js
console.log('命令行参数:', process.argv);
console.log('环境变量:', process.env.NODE_ENV);
process.exit(0);
```
## Node 中 process 的基本使用
    - 监听事件：
        - exit
        - uncaughtException
    - 设置环境变量
    - 获取内存使用情况
```js
process.on('exit', code => {
  console.log('进程退出码:', code);
});

console.log('当前内存使用:', process.memoryUsage());
```
## Node 的 eventEmitter

    - EventEmitter 是 Node 事件驱动机制核心类
    - 可以注册、触发事件
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('sayHello', (name) => {
  console.log(`Hello, ${name}`);
});

emitter.emit('sayHello', 'Node');
```

## Node 中 eventEmitter 的基本使用

    - 注册事件：on / once
    - 触发事件：emit
    - 移除事件：removeListener
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

function greet(name) { console.log('Hi', name); }
emitter.on('greet', greet);
emitter.emit('greet', 'Alice');
emitter.removeListener('greet', greet);
```
## Node 中 eventEmitter 是如何实现的？
    - 内部维护一个事件名称到回调函数数组的映射
    - emit 遍历数组依次调用回调
    - 基于发布/订阅模式
```js
class MyEmitter {
  constructor() { this.events = {}; }
  on(event, fn) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(fn);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
}

const emitter = new MyEmitter();
emitter.on('msg', (text) => console.log(text));
emitter.emit('msg', 'Hello!');
```
## Node 的中间件

    - 中间件：函数链，接收 req, res, next
    - 在请求处理前/后做一些处理
    - 常见于 Express/Koa
```js
const express = require('express');
const app = express();

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logger);

app.get('/', (req, res) => res.send('Hello Middleware'));
app.listen(3000);
```
    - 使用 app.use() 或路由级中间件
    - 可做鉴权、日志、异常处理等
```js
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }
  next();
});
```
## Node 的事件循环机制是什么？
    - Node 单线程通过事件循环实现高并发
    - 异步任务分为宏任务（`setTimeout`, `setImmediate`）和微任务（`Promise`,` process.nextTick`）

## Node 的事件循环流程
    1. 执行栈执行同步代码
    2. 执行微任务队列（process.nextTick, Promise.then）
    3. 执行 I/O 回调（Timer, IO callbacks）
    4. 执行 setImmediate
    5. 进入下一轮循环
```js
console.log('start');

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

Promise.resolve().then(() => console.log('promise'));

process.nextTick(() => console.log('nextTick'));

console.log('end');
```
输出顺序：
```js
start
end
nextTick
promise
setTimeout
setImmediate
```
## Node 的事件循环流程在面试中如何回答？
    - 简洁版：Node 单线程，事件循环 + 异步非阻塞 I/O，微任务优先于宏任务
    - 可画图解释执行栈、回调队列和事件循环阶段
    - 面试题重点：
        - 微任务 vs 宏任务
        - setImmediate vs setTimeout
        - process.nextTick
## Node 的性能是什么？
    - 性能指标：
        - 响应时间
        - 吞吐量
        - CPU 占用
        - 内存使用
    - 性能瓶颈：
        - CPU 密集型任务
        - 大量同步 I/O
        - 阻塞事件循环
## Node 的监控
    - 常用指标：
        - Event Loop 延迟
        - CPU/内存
        - 请求数、错误率
    - 工具：
        - pm2
        - node-clinic
        - prometheus + grafana
        - 内置 process API
代码 demo（监控 event loop 延迟）
```js
const { performance } = require('perf_hooks');

setInterval(() => {
  const start = performance.now();
  setImmediate(() => {
    const delay = performance.now() - start;
    console.log('Event loop delay:', delay.toFixed(2), 'ms');
  });
}, 1000);
```
## Node 的性能优化
    - 异步 I/O，避免阻塞
    - 使用 Stream 处理大文件
    - 利用 cluster 或 worker_threads 多线程处理 CPU 密集任务
    - 缓存热点数据
    - 减少中间件和同步阻塞
代码 demo（cluster 多核）：
```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} exited`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.end('Hello Cluster');
  }).listen(3000);
}
```