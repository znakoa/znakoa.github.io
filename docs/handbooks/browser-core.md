---
title: "浏览器核心原理与高频面试深度知识手册"
sidebar_position: 3
sidebar_class_name: shelf-react
---

### 一、 浏览器客户端存储方案与安全性

#### 1. 四大存储方式对比分析

| **特性维度**       | **Cookie**                                           | **localStorage**                      | **sessionStorage**                          | **IndexedDB**                            |
| ------------------ | ---------------------------------------------------- | ------------------------------------- | ------------------------------------------- | ---------------------------------------- |
| **数据生命周期**   | 由服务器生成或前端指定，可设置过期时间（默认会话期） | 永久有效，除非手动清除或调用 API 清空 | 仅在当前标签页会话期间有效，关闭 Tab 即清理 | 永久有效，除非手动清除                   |
| **数据容量上限**   | 约 4KB                                               | 约 5MB                                | 约 5MB                                      | 无限（受用户系统磁盘空间限制）           |
| **网络请求携带**   | 每次发送 HTTP 请求时均会自动携带在 Request Header 中 | 完全不参与网络传输                    | 完全不参与网络传输                          | 完全不参与网络传输                       |
| **数据类型与读写** | 纯文本键值对，同步读写                               | 纯文本字符串，同步阻塞读写            | 纯文本字符串，同步阻塞读写                  | 支持事务与二进制数据存储，异步非阻塞读写 |

#### 2. Cookie 安全防护属性

- **`value` 加密**：用于保存用户凭证（登录态）时必须经过服务端加密，严禁明文暴露用户 ID 或敏感数据。
- **`HttpOnly`**：禁止客户端 JavaScript 脚本读取或篡改 Cookie（如执行 `document.cookie` 获取不到），防范 XSS 攻击窃取登录凭证。
- **`Secure`**：强制规定浏览器仅在 HTTPS 加密传输通道中携带该 Cookie，防止明文抓包截获。
- **`SameSite`**：限制第三方跨站请求携带 Cookie，降低 CSRF（跨站请求伪造）攻击风险：
  - `Strict`：严禁第三方网站发起的跨站请求携带 Cookie。
  - `Lax`：默认规则，允许在导航到目标网址的 GET 请求中携带（如从外站点击链接跳转）。
  - `None`：必须与 `Secure` 配合使用，允许在跨站请求中发送。

#### 3. Service Worker 离线缓存机制

- **核心定义**：运行在浏览器渲染引擎背后的独立 Worker 线程，不阻塞主线程 DOM 操作。因具备全局网络请求拦截权限，必须依托 **HTTPS 协议** 保障安全性。
- **落地三部曲**：
  1. **注册 (Register)**：调用 `navigator.serviceWorker.register()` 注册脚本。
  2. **安装与预缓存 (Install)**：监听 `install` 事件，利用 `caches.open(CACHE_NAME)` 预先写入离线资源。
  3. **请求拦截与分发 (Fetch)**：监听 `fetch` 事件拦截网络请求，优先通过 `caches.match(event.request)` 查询本地命中；若命中则直读缓存，未命中则降级走真实网络请求并回写。

### 二、 浏览器全链路缓存机制（性能优化核心）

请求过程通常包含“发起网络请求”、“后端处理”和“浏览器响应”。合理配置缓存可以在第一和第三步最大化减少传输损耗与白屏耗时。



#### 1. 缓存层级优先级

当发起一个网络请求时，浏览器按照以下优先级依次检索缓存，全部未命中才会向服务端发起实际网络请求：



1. **Service Worker**：开发者自主控制缓存列表、匹配逻辑与更新策略，具备完全掌控权。
2. **Memory Cache（内存缓存）**：
   - 读写速度最快，但生命周期极短，随当前 Tab 页面进程销毁而彻底释放。
   - 操作系统按需管理内存分配，小体积文件（如 CSS/JS 片段、内存 base64 图）优先进内存，当前系统内存使用率高或体积较大时优先进磁盘。
3. **Disk Cache（硬盘缓存）**：
   - 容量大、覆盖面最广，根据 HTTP 响应头规则持久化存储在磁盘中，重启浏览器后依然有效。
4. **Push Cache（推送缓存）**：
   - HTTP/2 特性，仅在当前会话（Session）连接期间存在，连接断开即释放，同一个 HTTP/2 连接上的多页面可共享该缓存，但单条缓存只能被使用一次。
5. **真实网络请求**。

#### 2. 强缓存策略

强缓存命中时，浏览器不发送任何网络请求到服务端，直接从本地返回数据，HTTP 状态码为 `200 (from disk cache / from memory cache)`。



- **`Expires` (HTTP/1.0)**：
  - 返回绝对时间戳（如 `Expires: Wed, 22 Oct 2028 08:41:00 GMT`）。
  - *缺陷*：强依赖客户端与服务端的时钟同步，客户端手动篡改本地系统时间会导致缓存失效或永久不更新。
- **`Cache-Control` (HTTP/1.1，优先级高于 Expires)**：
  - 基于相对时间段控制，支持多种指令组合：
    - `max-age=31536000`：资源在客户端可被缓存的时间长度（秒）。
    - `no-cache`：跳过强缓存，**强制向服务端发起协商缓存校验**。
    - `no-store`：**完全禁止任何缓存**（既不走强缓存，也不走协商缓存，每次完整下载）。
    - `public`：客户端和任何中间代理服务器（如 CDN）均可缓存该资源。
    - `private`：仅允许最终用户的客户端浏览器缓存，中间代理服务器禁止缓存。

#### 3. 协商缓存策略

当强缓存失效（已过期或配置为 `no-cache`）时，浏览器向服务端发送校验请求。如果服务端确认资源未修改，则返回 **`304 Not Modified`** 且不返回响应体（Body），通知浏览器继续使用本地旧缓存。



- **`Last-Modified` 与 `If-Modified-Since`**：
  - 服务端响应头返回 `Last-Modified`（文件最后修改绝对时间）。
  - 客户端下次请求通过 `If-Modified-Since` 带上该时间。
  - *缺陷*：时间精度为秒级，一秒内的多次快速修改无法被感知；本地文件若被编辑器打开保存但内容未变，会修改修改时间导致缓存穿透。
- **`ETag` 与 `If-None-Match` (HTTP/1.1，优先级高于 Last-Modified)**：
  - 服务端根据文件内容摘要/指纹生成唯一的 `ETag` 字符串。
  - 客户端下次请求在 `If-None-Match` 头中携带此指纹对比。精准反映文件改动，彻底解决秒级与无意义保存问题。
- **未设置任何缓存头时的浏览器处理**：
  - 触发**启发式算法 (Heuristic Cache)**：通常计算 `(Date - Last-Modified) * 10%` 作为默认缓存有效时长。

#### 4. 生产环境最佳实践

- **频繁变动的业务接口与 HTML**：设置 `Cache-Control: no-cache`，每次强行协商，配合 `ETag` 验证，既保证实时性又最大程度压缩传输体积。
- **静态资源（JS/CSS/图片）**：结合打包工具（Webpack/Vite）生成文件名哈希（如 `app.8f9b2c.js`），设置长期强缓存 `Cache-Control: max-age=31536000`。只有 HTML 中引用的哈希变动时才拉取新文件。

### 三、 从输入 URL 到网页渲染全流程

#### 1. 网络请求阶段

- **DNS 域名解析**：依次检索浏览器缓存 -> 操作系统缓存 -> Hosts 文件 -> 本地 Local DNS（递归查询） -> 根/顶级/权威 DNS 服务器（迭代查询），获取对应 IP 地址。
- **建立 TCP 连接**：客户端与服务端经历三次握手（HTTPS 协议需额外完成 TLS 握手与证书验证协商对称密钥）。
- **发送 HTTP 请求与响应**：浏览器生成请求报文，服务端返回 HTML 源码流。

#### 2. 解析构建阶段（字符串转化为结构化数据）

- **DOM 树构建**：浏览器词法分析、语法分析将 HTML 标签转化为 DOM 节点树。
- **CSSOM 树构建**：解析样式表规则生成样式树（Style Tree）。
- **合成渲染树 (Render Tree)**：DOM 树与 CSSOM 树结合，过滤掉不可见节点（如 `<head>`、`display: none` 元素），生成用于展示的 Render Tree。

#### 3. 布局与绘制阶段

- **回流/重排 (Reflow / Layout)**：根据渲染树计算每个节点在屏幕上的几何坐标、尺寸大小与包含块边界。
- **重绘 (Repaint)**：遍历渲染树，调用底层绘图指令将计算好的外观样式（颜色、背景、边框、阴影）绘制在各个图层上。
- **合成显示 (Composite)**：各个独立的绘制图层提交至 GPU 进行合成，最终呈现在用户屏幕视窗上。

#### 4. 核心追问：重绘 (Repaint) 与 重排 (Reflow) 的区别与优化

- **核心区别**：
  - **重排**：修改了影响几何布局的属性（如宽高、位置、隐藏显示、字体大小、DOM 增删），引发几何重新计算。**重排必定引发重绘**，开销大。
  - **重绘**：仅修改不改变几何布局的外观属性（如 `color`、`background-color`），不影响相邻元素位置。**重绘不一定会触发重排**，开销较小。
- **规避频繁重排的优化方案**：
  - **布局隔离**：合理应用 BFC（块级格式化上下文）特性，隔离内部排版，避免影响外部其他元素。
  - **高频事件优化**：针对 `resize`、`scroll` 等事件使用**节流 (Throttle)** 与 **防抖 (Debounce)**。
  - **批量 DOM 变更**：使用 `document.createDocumentFragment` 临时挂载节点，组装完成后一次性插入 DOM；读写 DOM 属性集中处理，避免频繁交错触发强制同步布局。
  - **脱离文档流**：对复杂变动的节点通过 `display: none` 或绝对定位脱离文档流，操作完毕后再恢复。
  - **动画与硬件加速**：复杂动画推荐使用 `requestAnimationFrame`；利用 CSS3 属性（`transform`、`opacity`、`filter`）开启 GPU 硬件加速，独立生成 Compositor Layer 复合层，绕过主线程重排与重绘。

#### 5. 资源解析阻塞规则与脚本优化

- **样式放在头部**：CSS 放在 `<head>` 内同步解析，避免样式加载过慢导致的闪屏（FOUC）。
- **JS 执行与 DOM 渲染互斥**：JavaScript 执行引擎与 GUI 渲染引擎共享同一浏览器主线程。当解析 HTML 遇到标准 `<script>` 标签时，必须暂停 HTML 解析，等待 JS 下载并执行完毕后再恢复解析。
- **`defer` 与 `async` 的区别**：
  - `<script>`：暂停 HTML 解析 -> 串行网络下载 JS -> 立即执行 JS -> 恢复 HTML 解析。
  - `<script defer>`：HTML 解析不中断 -> **并行异步下载 JS** -> 等待 **HTML 完全解析完毕后按标签顺序依次执行**（支持依赖顺序）。
  - `<script async>`：HTML 解析不中断 -> **并行异步下载 JS** -> **一旦下载完毕立即暂停 HTML 渲染执行脚本** -> 恢复 HTML 解析（执行顺序完全依赖网络加载先后，属于乱序执行，不适合有依赖关系的脚本）。

### 四、 常见 Web 前端安全攻击与防御

#### 1. XSS（跨站脚本攻击，Cross-Site Scripting）

- **攻击手段**：黑客将恶意 JS 代码注入到网页中，当正常用户访问时，浏览器自动执行恶意脚本（如获取 `document.cookie` 并回传给黑客服务器）。
- **核心防御**：
  - 对所有用户输入/输出中的敏感字符进行 HTML 转义（将 `<` 转换为 `<`，`>` 转换为 `>`）。
  - 关键鉴权凭证 Cookie 设置 `HttpOnly`，从源头切断 JS 访问链路。
  - 配置合理的 CSP（内容安全策略，Content Security Policy）。

#### 2. CSRF（跨站请求伪造，Cross-Site Request Forgery）

- **攻击手段**：用户在 A 网站处于登录状态并存有 Cookie。用户被诱导访问黑客建立的恶意网站 B，B 网站内部自动向 A 网站的受保护接口发送业务请求。浏览器会默认附带 A 网站的 Cookie，使 A 网站误认为是用户的主动合法行为。
- **核心防御**：
  - 将关键认证 Cookie 设置 `SameSite=Lax` 或 `SameSite=Strict`，限制跨域请求携带。
  - 接口引入随机校验字段：**Anti-CSRF Token**（黑客仅能借用 Cookie 发送请求，无法读取页面上下文中的自定义 Token）。
  - 校验 HTTP 头部中的 `Referer` 与 `Origin` 字段，拦截非信任来源域名。
  - 核心交易操作强制引入双重验证（如短信验证码、图形验证码）。

#### 3. 点击劫持 (Clickjacking)

- **攻击手段**：攻击者在诱导页面中嵌入一个透明的 `iframe`（覆盖在其精心设计的伪装按钮之上），诱骗受害者点击透明层下的核心功能。
- **核心防御**：
  - 服务端响应头增加 `X-Frame-Options: SAMEORIGIN`（仅允许同源嵌入）或 `DENY`（全面禁止任何页面以 `iframe` 嵌入）。
  - 前端利用 Frame Busting 脚本判断：`if (top.location !== self.location) top.location.href = self.location.href;`。

#### 4. DDOS 与 SQL 注入

- **DDOS（分布式拒绝服务）**：
  - 攻击者调用大规模肉鸡集群向目标服务器发起高频流量拥塞，导致正常业务瘫痪。纯软件层防御成本极高，需接入硬件抗 D 与高防 WAF 清洗流量。
- **SQL 注入**：
  - 攻击者在表单或 URL 参数中植入恶意 SQL 语法，后端拼接执行导致数据库被破坏或泄露。防御策略为后端全面禁止裸拼接 SQL，强制采用预编译参数化查询（Prepared Statements）并对特殊字符统一过滤。

### 五、 跨域解决方案实战全解

由于浏览器**同源策略 (Same-Origin Policy)** 限制（协议、域名、端口三者任意一个不同即为跨域），AJAX/Fetch 网络请求会被浏览器拦截阻断。



#### 1. CORS（跨域资源共享，业界标准首选）

- **核心机制**：由服务端在响应头中附加一组特定的 `Access-Control-*` 头信息，授权浏览器放行跨域响应。
- **简单请求 vs 需预检请求**：
  - **简单请求**：满足请求方法为 `GET` / `HEAD` / `POST`，且 Header 仅限于 `Accept`、`Accept-Language`、`Content-Language`，`Content-Type` 仅限于 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`。浏览器直接发送正式请求。
  - **需预检请求 (Preflighted)**：包含自定义头部、使用 `PUT`/`DELETE` 方法或 `Content-Type: application/json` 时，浏览器会先发送一次 **`OPTIONS` 预检请求**。
- **核心响应头配置**：
  - `Access-Control-Allow-Origin: [https://client.domain.com](https://client.domain.com)`（生产环境严禁在有凭据时配置为 `*`）。
  - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`。
  - `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`。
  - `Access-Control-Allow-Credentials: true`（允许跨域携带 Cookie 认证凭证，此时前端需开启 `xhr.withCredentials = true`）。

#### 2. JSONP 方案

- **原理**：利用 `<script>` 标签不受同源策略限制的特性，向服务端请求动态生成的 JS 脚本文件，服务端将数据作为参数包裹在前端指定的回调函数名中返回（形如 `callbackName({ ...data })`）。
- **优缺点**：兼容老旧浏览器，但**严格受限于只支持 GET 请求**，且存在潜在的 XSS 安全风险。

#### 3. Nginx 反向代理

- **原理**：同源策略仅在浏览器端存在，服务器之间不存在跨域限制。前端请求发送给 Nginx 代理服务器（同源），由 Nginx 在服务器端转发给真实的跨域后端接口。

- **配置示例**：

  Nginx

  ```
  server {
      listen 80;
      server_name client.domain.com;
  
      location /api/ {
          proxy_pass http://api.service.internal:8080/;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
  }
  ```

#### 4. 本地构建代理（Webpack / Vite Proxy）

通过前端脚手架在开发环境开启一个本地 Node.js 中间服务器代理转发请求，仅在本地本地调试起效，生产环境仍需配合 Nginx 或后端 CORS 方案。



#### 5. WebSocket 双向通信

WebSocket 握手升级基于 HTTP，随后脱离 HTTP 协议栈运行，协议标准天然不遵循浏览器的同源策略限制，支持全双工通信。



#### 6. 跨域在监控与图像中的特殊应用

- **前端异常监控 `Script Error`**：跨域加载的第三方 CDN 脚本在抛出异常时，浏览器出于隐私保护会屏蔽详细堆栈信息，仅上报 `Script Error`。
  - *解决方式*：在 `<script src="..." crossorigin="anonymous">` 增加属性，且服务端响应头附带 `Access-Control-Allow-Origin: *`。
- **Canvas 图片跨域污染**：跨域图片绘制到 Canvas 后调用 `toDataURL()` 或 `getImageData()` 会抛出安全错误。
  - *解决方式*：在图片实例上设置 `img.crossOrigin = "Anonymous"`，且 CDN 响应头支持 CORS。

### 六、 现代浏览器机制与高级渲染特性

#### 1. 移动端 H5 300ms 点击延迟

- **成因**：移动端早期浏览器为了识别用户是在单击还是在进行“双击缩放页面”，会在监听到 `touchend` 后强制等待 300ms 观察是否有第二次点击。
- **解决方案**：
  - 在 `<head>` 中规范化声明 Viewport：`<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">`。现代主流浏览器检测到视口宽度声明后会自动停用 300ms 延迟。
  - 早期兼容方案使用 `fastclick.js`，通过拦截底层 `touchend` 事件并使用自定义事件模拟触发原生 `click`，同时阻止 300ms 后的默认点击。

#### 2. 多标签页（Tab）跨页面通讯

- **`localStorage` 方案（推荐，同域）**：A 页面更新 `localStorage.setItem('key', val)`，同域下的 B 页面通过监听事件感知：

  JavaScript

  ```
  window.addEventListener('storage', (event) => {
    console.log(`变更的键: ${event.key}, 新值: ${event.newValue}`);
  });
  ```

- **`SharedWorker` 方案**：创建多标签页共享的后台独立 Worker 进程，通过端口连接（`port.postMessage`）分发消息。

- **`postMessage` 方案**：适用于具有直接引用关系的页面通信（如 `window.open` 返回的子窗口或内嵌的 `iframe`），接收方通过校验 `event.origin` 确保安全性。

#### 3. `requestAnimationFrame` vs `requestIdleCallback`

- **`requestAnimationFrame` (rAF)**：
  - **高优先级**：每次屏幕刷新渲染前触发（通常为 60Hz 屏幕下的 16.6ms 周期），用于高频动画与平滑的界面重绘，避免掉帧。
- **`requestIdleCallback` (rIC)**：
  - **低优先级**：在浏览器每一帧完成输入响应、JS 执行、DOM 布局重绘后的**空闲时间段**内触发执行。
  - **经典应用（React Fiber）**：React Fiber 架构利用类似思想实现调度，将大型组件树切片为链表，利用浏览器空闲周期分片执行可中断的渲染工作，保障交互流畅。

#### 4. 资源预加载优化对比

- **`preload`**：`<link rel="preload" href="xxx" as="script">`
  - 针对**当前页面必须的高优先级核心资源**，强制浏览器立即提前下载，不受解析位置限制。
- **`prefetch`**：`<link rel="prefetch" href="xxx">`
  - 针对**未来可能访问的页面资源**，浏览器利用网络和 CPU 空闲时段在后台低优先级静默下载，存储在 Disk Cache 中。
- **`dns-prefetch`**：`<link rel="dns-prefetch" href="//api.example.com">`
  - 仅针对跨域第三方域名提前执行 DNS 预解析，消除后续网络请求的 DNS 查询时延。
- **`preconnect`**：`<link rel="preconnect" href="//api.example.com">`
  - 比 `dns-prefetch` 更进一步，提前完成 DNS 解析、TCP 三次握手和 TLS 安全协商，建立就绪连接。
