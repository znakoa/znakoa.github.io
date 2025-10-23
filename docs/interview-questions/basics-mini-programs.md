---
sidebar_position: 5
title: "小程序基础相关"
---

## 1. 微信小程序的实现原理
   要点（概念层面）
   - 小程序是一个运行在微信容器`（WeChat runtime）`内的轻量级应用。它由两部分组成：
     - 视图层`（View）`：`WXML + WXSS`（类似 HTML/CSS）在微信内置渲染引擎里渲染，是受限的 DOM。
     - 逻辑层`（Logic）`：JS 运行在 V8/C++ 等环境里，与视图层通过**消息机制（异步桥）**交互（通过 setData / 事件回传等）。
   - 组件化 + 沙箱：每个小程序被沙箱化运行，权限受限制（API 由微信提供），资源使用受限（包体、API 调用等）。
   - 网络/存储：网络请求走 `wx.request`（有域名白名单），本地有缓存`（wx.setStorageSync）`、文件系统`（wx.getFileSystemManager）`。
   - 分包/按需加载：支持分包加载（主包 + 分包 + 子包），可优化首包体积。
   - 生命周期与页面栈：小程序维护页面栈（最多10层），路由 API 在容器层实现（navigateTo、redirectTo 等）。
   简短图示（文字）
   用户操作 → 微信容器 → 视图层渲染 + 逻辑层 JS 处理 → 通过异步消息桥修改视图（setData）或调用原生 API（支付、定位等）
  <details>
  <summary>代码演示（最小运行示例）：</summary>
 项目结构：

  ```
 /minapp-demo
  /pages/index/index.wxml
  /pages/index/index.js
  /app.json
  /app.js
  /app.wxss
  
  ```
`app.json`

```json
{
  "pages": ["pages/index/index"],
  "window": {
    "navigationBarTitleText": "示例"
  }
}
```
`app.js`

```javascript
App({
  onLaunch() {
    console.log('App onLaunch');
    // 初始化逻辑，例如获取用户授权、读取本地缓存等
  }
});
```
`pages/index/index.wxml`

```wxml
<view class="container">
  <text>{{msg}}</text>
  <button bindtap="onTap">点击改变数据</button>
</view>

```
`pages/index/index.js`

```javascript
Page({
  data: { msg: 'Hello 小程序' },
  onTap() {
    // 逻辑层修改数据后，视图层刷新
    this.setData({ msg: '数据已更新：' + Date.now() });
  }
});
```
`app.wxss`

```wxss
.container { padding: 20px; }
```
</details>
   

## 2. 微信小程序的支付流程
   要点（高层流程）
   1. 小程序调用 `wx.login` 获取 code（临时登录凭证），或直接走支付流程时先登录拿到 user info（非必需）。
   2. 小程序向自己后端发起“创建支付订单”请求（包含订单信息、用户标识等）。
   3. 后端使用微信商户平台的 API（统一下单 `API：/pay/unifiedorder`）向微信服务器申请生成 prepay_id。后端需要签名（商户 key）、商户号、appId、notify_url 等。
   4. 微信返回 prepay_id 给后端，后端将所需参数`（nonceStr、timeStamp、package=prepay_id、signType、paySign）`签名后返回给小程序。
   5. 小程序调用` wx.requestPayment({...})` 使用后端返回的参数拉起支付界面。
   6. 支付完成后，微信服务器异步回调商户后端的 notify_url（需校验签名并处理订单状态）。
   7. 后端更新订单状态并通知小程序/前端（可通过轮询/推送/消息）。
      关键点与注意事项
      - 所有与商户密钥相关的签名必须在后端完成（不能在客户端做），商户 key 不能暴露。
      - notify_url 必须可公网访问且可校验签名。
      - 小程序 prepay 流程需要在微信商户平台配置小程序 appId、商户号、API key、证书（部分接口）。
      - 调试时使用沙箱或真机环境，微信开发者工具支持模拟 `wx.requestPayment` 但真实支付需真机。
      示例代码（后端 Node + 小程序端）
      后端：`server.js（Express + axios + xml2js）`
      这是最简示例，真实项目要做签名、错误处理、幂等、证书、回调验证等更严谨的实现。

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.text({ type: '*/xml' }));
app.use(express.json());

const MCH_ID = 'your_mch_id';
const APP_ID = 'your_appid';
const API_KEY = 'your_api_key';
const UNIFIED_ORDER_URL = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

// util: build sign (MD5 uppercase)
function buildSign(params) {
  const ordered = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
  return crypto.createHash('md5').update(ordered + `&key=${API_KEY}`).digest('hex').toUpperCase();
}

function toXml(obj) {
  const builder = new xml2js.Builder({ headless: true, rootName: 'xml' });
  return builder.buildObject(obj);
}

function parseXml(xml) {
  return xml2js.parseStringPromise(xml, { explicitArray: false, trim: true });
}

// 创建预支付订单
app.post('/create-unified-order', async (req, res) => {
  const { openid, out_trade_no, total_fee, body } = req.body;
  const nonce_str = crypto.randomBytes(16).toString('hex');
  const params = {
    appid: APP_ID,
    mch_id: MCH_ID,
    nonce_str,
    body,
    out_trade_no,
    total_fee: String(total_fee), // 分
    spbill_create_ip: req.ip.replace('::ffff:', ''),
    notify_url: 'https://yourdomain.com/pay/notify',
    trade_type: 'JSAPI',
    openid
  };
  params.sign = buildSign(params);
  const xml = toXml(params);

  try {
    const r = await axios.post(UNIFIED_ORDER_URL, xml, { headers: { 'Content-Type': 'text/xml' } });
    const parsed = await parseXml(r.data);
    const result = parsed.xml;
    if (result.return_code === 'SUCCESS' && result.result_code === 'SUCCESS') {
      // 返回 prepay_id 给小程序（后端需再生成签名给前端）
      const prepay_id = result.prepay_id;
      const timeStamp = String(Math.floor(Date.now() / 1000));
      const paySignParams = {
        appId: APP_ID,
        timeStamp,
        nonceStr: nonce_str,
        package: `prepay_id=${prepay_id}`,
        signType: 'MD5'
      };
      const paySign = buildSign(paySignParams);
      res.json({ success: true, data: { ...paySignParams, paySign } });
    } else {
      res.json({ success: false, error: result });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 支付结果通知（微信回调）
app.post('/pay/notify', async (req, res) => {
  // req.body is xml
  try {
    const parsed = await parseXml(req.body);
    const data = parsed.xml;
    // TODO: 校验签名，更新订单状态
    // 返回给微信 SUCCESS
    const ok = { return_code: 'SUCCESS', return_msg: 'OK' };
    res.set('Content-Type', 'text/xml').send(toXml(ok));
  } catch (e) {
    res.status(500).send('error');
  }
});

app.listen(3000, () => console.log('server listening 3000'));
```
小程序端：`pages/pay/pay.js`

```javascript
// 调用后端创建订单并拉起支付
Page({
  async createOrderAndPay() {
    try {
      const openid = wx.getStorageSync('openid'); // 事先登录并保存
      const resp = await wx.request({ 
        url: 'https://yourdomain.com/create-unified-order',
        method: 'POST',
        data: {
          openid,
          body: '商品描述',
          out_trade_no: 'order' + Date.now(),
          total_fee: 1 // 分
        }
      });
      const data = resp.data.data;
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success(res) { console.log('支付成功', res); },
        fail(err) { console.error('支付失败', err); }
      });
    } catch (err) {
      console.error(err);
    }
  }
});
```



## 3. 提高微信小程序应用速度的手段（性能优化）
   按“启动/渲染/网络/运行时”分类列出常用手段，并给代码/配置示例。
   启动/包体与分包
   - 主包最小化：把非首屏资源放到分包、子包、异步组件里。 app.json 中配置 subPackages。

```json
{
  "subPackages": [
    {
      "root": "packageA",
      "pages": ["pages/a/index"]
    }
  ]
}
```
  
   - 使用插件 & 云函数按需加载：将耗时逻辑放到后端/云函数。
   渲染优化
   - 尽量减少 setData 的数据量与频繁调用：只更新必要字段，批量更新。
```js
// 不建议：每项单独 setData
this.setData({ a: 1 });
this.setData({ b: 2 });
// 建议：
this.setData({ a: 1, b: 2 });
```

  
   - 组件化/纯数据组件：避免把大量无关数据放在父组件导致不必要重渲染。
   - WXS 用于小量计算/模板逻辑：在视图层做少量处理，减少逻辑层通信。

```js
// utils.wxs
module.exports = {
  format: function(s) { return s + '!' }
}
```
  
   网络/请求
   - 开启 gzip，使用 CDN：后端返回静态资源使用 CDN；接口响应体支持 gzip。
   - 缓存策略：使用 wx.setStorageSync 缓存列表/静态数据，利用 ETag/If-Modified-Since。
   - 合并请求与接口分页：接口聚合或多路合并减少网络多次往返。
   列表渲染
   - 虚拟列表（长列表不可一次渲染）：用第三方或手写虚拟滚动（只渲染可视区）。
   - 分段渲染：首屏先渲染必要项，非关键延后。
   主线程/计算密集
   - 使用 Worker（小程序支持 Worker）：把 hash、图片压缩等放到 Worker，避免卡 UI。
```javascript
// main.js
const worker = wx.createWorker('workers/task.js');
worker.postMessage({ cmd: 'hash', filePath: '/tmp/x' });
worker.onMessage(res => console.log(res));
``` 
`workers/task.js`

```javascript
// worker script
onMessage((msg) => {
  if (msg.cmd === 'hash') {
    // 假装计算
    postMessage({ result: 'done' });
  }
});
```
渲染性能工具与监控
- 使用小程序性能面板（微信开发者工具）查看 FPS、页面渲染耗时；在产品中埋点采集首屏时间、接口耗时等。
代码示例：分包 + 延迟加载组件
`app.json`
```json
{
  "pages": ["pages/index/index"],
    "subPackages": [
    { "root": "packageLarge", "pages": ["pages/large/index"] }
  ]
}
```
在首页点击跳转时再加载：

```javascript
wx.navigateTo({ url: '/packageLarge/pages/large/index' });
```


## 4. 微信小程序中路由跳转方式与区别
   微信提供 5 种主要路由 API：
1. `wx.navigateTo({url})`
   ○ 向页面栈添加一页（保留当前页面），最多 10 层。用于非 tab 页面之间的跳转。
   ○ 返回后页面保持状态（未卸载）。
   2. `wx.redirectTo({url})`
      ○ 替换当前页面（不保留当前页面），不会增加页面栈深度。用于不需要返回的场景（例如登录后跳转）。
   3. `wx.switchTab({url})`
      ○ 切换到 tabBar 页面（tab 必须在 app.json 的 tabBar 中配置）。会关闭所有非 tab 页面。用于底部导航切换。
   4. `wx.reLaunch({url})`
      ○ 关闭所有页面并打开到指定页面。通常用于重大流程后重置栈（如登出后回到登录页）。
   5. `wx.navigateBack({delta})`
      ○ 回退到上一个页面或指定层级。不能用于打开新页面。
      区别总结
      - 保留与否：`navigateTo` 保留当前，`redirectTo` 不保留，`reLaunch` 全部清空。
      - 目标类型：`switchTab` 只能跳 `tabBar` 页面。
      - 场景：`navigateTo` 用于细节页，`redirectTo` 用于替换页面（如一步完成跳转），`reLaunch` 用于重置整个 app 流程。
      示例代码
```javascript
// 从首页 navigateTo 详情页
wx.navigateTo({ url: '/pages/detail/index?id=123' });

// 登录后替换到主页（不需要后退）
wx.redirectTo({ url: '/pages/home/index' });

// 切换底部 tab
wx.switchTab({ url: '/pages/tab/home' });

// 完成结账后重启到成功页
wx.reLaunch({ url: '/pages/success/index' });

// 返回两级页面
wx.navigateBack({ delta: 2 });
```

## 5. 微信小程序的登录流程
   要点（标准流程）
   1. 小程序端：调用 `wx.login()` 获得 code（有效期短）。
   2. 小程序端：把 code 发给自己后端（不要直接把 code 发给微信）。
   3. 后端 调用微信服务器的 `code2session` 接口`（https://api.weixin.qq.com/sns/jscode2session）`，传 appId、secret、js_code，获取 openid、session_key（以及 unionid 可选）。
   4. 后端 使用 `session_key` 进行后续数据解密（如解密 `getUserInfo` 的 `encryptedData`），或者基于 openid 创造自家用户体系并发放自签名 Token（例如 JWT）。
   5. 小程序端 存储后端返回的 `token（wx.setStorageSync）`，后续接口携带 token 做鉴权。
      注意点
      - code 要在后端换取 `session_key`，并且不要把 `session_key` 或 `secret` 踢到客户端。
      - 如果需要解密用户信息`（encryptedData + iv）`，必须在后端用 `session_key` 解密以确保安全。
      - `session_key` 有效期，后端需要设计登录态续期（刷新或重新 login）。
      示例代码（小程序 + 后端 Node）
      小程序端：
```javascript
// login.js
async function loginToServer() {
  const res = await new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject });
  });
  const code = res.code;
  // 调用自己服务端
  const r = await wx.request({ url: 'https://yourdomain.com/auth/login', method: 'POST', data: { code } });
  // 后端返回 token
  wx.setStorageSync('token', r.data.token);
}
```
后端（Node + axios）：

```javascript
// auth.js
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const APPID = 'your_appid';
const SECRET = 'your_secret';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { code } = req.body;
  const r = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: { appid: APPID, secret: SECRET, js_code: code, grant_type: 'authorization_code' }
  });
  const data = r.data;
  if (data.errcode) return res.status(500).json({ error: data });
  const openid = data.openid;
  // 查库/创建用户
  const user = { id: openid };
  const token = jwt.sign({ uid: user.id }, 'your_jwt_key', { expiresIn: '7d' });
  res.json({ token });
});

module.exports = router;
```
      
     
        

## 6. 微信小程序的生命周期函数有哪些
   分两类：App 生命周期 与 Page（页面）生命周期。
   App 生命周期（在 app.js）
   -` onLaunch(options)`：小程序初始化时触发，且只触发一次。可做全局初始化、获取系统信息、登录等。
   - `onShow(options)`：小程序启动，或从后台进入前台时触发。options 包含 scene、query 等。
   - `onHide()`：小程序从前台进入后台时触发。
   - `onError(msg)`：脚本错误/API 调用报错时触发。
   - `onPageNotFound(res)`：页面不存在时触发（可重定向）。
   Page 生命周期（在 `pages/.../index.js`）
   - `onLoad(options)`：页面加载时触发（只触发一次），可接收路由参数 options。
   - `onShow()`：页面显示/切到前台时触发（每次显示都会触发）。
   - `onReady()`：页面第一次渲染完成后触发（只触发一次）。
   - `onHide()`：页面被遮挡或切到后台时触发。
   - `onUnload()`：页面被关闭时触发（`navigateBack` 或 `redirectTo` 替换会触发）。
   - 页面相关事件：
   ○ `onPullDownRefresh()`：下拉刷新触发（需在` page config` 打开）。
   ○ `onReachBottom()`：滚动到底部触发。
   ○ `onShareAppMessage()`：用户点击右上角转发时触发（返回转发信息）。
   ○` onResize()`：窗口尺寸变化时触发（部分平台）。
   - 组件也有生命周期（如 `lifetimes` / `attached` / `detached` 等）。
   示例
```javascript
Page({
  onLoad(options) { console.log('onLoad', options); },
  onShow() { console.log('onShow'); },
  onReady() { console.log('onReady'); },
  onHide() { console.log('onHide'); },
  onUnload() { console.log('onUnload'); },
  onPullDownRefresh() { console.log('refresh'); wx.stopPullDownRefresh(); },
  onReachBottom() { console.log('reach bottom'); }
});
```
## 7. 你对微信小程序的理解？优缺点？
理解（一句话）：
微信小程序是“在微信生态内可快速触达、低门槛发布、受限容器环境下运行”的轻量级应用形态，适合轻量业务、入口导流、工具型场景。
优点
- 低门槛分发：用户无需安装即可使用，强大的流量入口（公众号、社群、扫一扫、分享等）。
- 统一平台 SDK：微信提供支付、授权、位置、开放能力、模板消息等一站式能力。
- 快速迭代：发布流程简单，上线速度快。
- 跨平台（近）：在微信生态内能覆盖 iOS/Android，同时对开发者门槛友好。
  缺点 / 局限
- 受限的能力：沙箱限制、API 受限（如复杂 native 能力弱），不能随意访问设备底层。
- 包体与性能限制：首包体积限制、页面栈限制（10 层），渲染能力不及原生应用，在复杂可视化、高性能场景下受限。
- 平台依赖：依赖微信生态，商业规则与审核可能限制某些功能。
- 调试与兼容性：微信版本差异、真机差异、不同手机厂商表现差异等。
  面试展示角度（建议回答模板）
- 说明应用场景（适合电商轻量成交页、工具、活动页、SaaS 轻量客户端等），并给出优缺点，最后给出一个 mitigation 策略，例如在高性能场景用原生小程序或 H5 + 原生容器，或把复杂计算放服务端/Worker。




### A. 使用 Worker 做文件 hash（示例）

`workers/md5.js`
```javascript
importScripts('spark-md5.min.js'); // 如果可用
onMessage(function(e) {
  const { chunk } = e;
  // 假设使用 spark-md5 来增量计算
  const md5 = SparkMD5.ArrayBuffer.hash(chunk, true);
  postMessage({ md5 });
});
```
主线程：

```javascript
const worker = wx.createWorker('workers/md5.js');
worker.onMessage(function(res) { console.log('md5', res); });
worker.postMessage({ chunk: arrayBuffer }, [arrayBuffer]);
```
### B. setData 性能优化示例（批量更新/最小化更新）
```javascript
// 误用：每次都 setData
for (let i = 0; i < 100; i++) {
  this.setData({ ['items[' + i + '].value']: i });
}

// 优化：先构建对象，再一次 setData
const update = {};
for (let i = 0; i < 100; i++) update['items[' + i + '].value'] = i;
this.setData(update);
```
### C. 分包示例（app.json）
```json
{
  "pages":["pages/index/index"],
  "subPackages":[
    {
      "root":"packageA",
      "pages":["pages/a/index","pages/a/detail"]
    }
  ],
  "tabBar": {
    "list": [{ "pagePath": "pages/index/index", "text": "首页" }]
  }
}
```


面试答题小策略（如何包装回答）
- 给出定义 → 原理 → 场景 → 注意点 → 代码示例 五段式回答，既有理论又能展示工程实践。
- 遇到开放题（性能/优缺点），用“分层/分类”方式列举（启动/渲染/网络/运算），并至少给 2 个真实项目中可落地的优化措施。
- 代码 demo 要能直接运行（可脱敏），并标注“关键安全点（签名/密钥在后端）”。