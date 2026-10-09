/**
 * 索书号色位路由
 * ------------------------------------------------------------------
 * 按当前路由把「索书号色位」写入 <html> 的 --sc-shelf-l / --sc-shelf-d，
 * 于是正文书脊、标题左标、代码左轨、表头、折叠答案抽屉、页内索引
 * 全部跟随该主题的颜色 —— 颜色在这里是导航信息，不是装饰。
 *
 * 为什么用 clientModule 而不是 swizzle Root：
 *   onRouteDidUpdate 是 Docusaurus 官方支持的客户端钩子，SPA 跳转时会重新触发，
 *   且完全不介入 React 渲染树，风险最低。侧栏色点由 CSS 静态负责，
 *   所以即使 JS 未执行，主题依然成立（正文退回默认色位）。
 */

/** [匹配规则, 亮色色位, 暗色色位] —— 越具体越靠前 */
const SHELF = [
  [/basics-javascript/i, '#3b5ba5', '#8fa8e0'], // JS
  [/basics-vue/i,        '#2f7f76', '#79c3b7'], // Vue
  [/basics-react/i,      '#6b5493', '#b49cd6'], // React
  [/basics-node/i,       '#6e7b3e', '#a9c177'], // Node
  [/basics-mini-programs/i, '#a6603a', '#db9569'], // 小程序
  [/basics-engineering/i,   '#4a5a6a', '#93a7bb'], // 工程化
  [/handwritten-questions/, '#8e3b4a', '#d48695'], // 手写题
  [/\/docs\/daily-work\//,  '#a6603a', '#db9569'], // 工作日常（小程序向）
  [/\/docs\/gitorder/,      '#4a5a6a', '#93a7bb'], // 工具参考
  [/\/docs\/export-word/,   '#4a5a6a', '#93a7bb'],
  [/\/docs\/class-name/,    '#4a5a6a', '#93a7bb'],
  [/\/docs\/material/,      '#5d7285', '#93a9bc'], // 相关资料
  [/^\/blog/,               '#5d7285', '#93a9bc'], // 日常随记
];

/** 站点默认色位（首页、关于页、未匹配路由） */
const DEFAULT = ['#3b5ba5', '#8fa8e0'];

export function onRouteDidUpdate({location}) {
  const root = document.documentElement;
  const pathname = (location && location.pathname) || window.location.pathname;
  const hit = SHELF.find(([re]) => re.test(pathname));
  const [light, dark] = hit ? [hit[1], hit[2]] : DEFAULT;

  root.style.setProperty('--sc-shelf-l', light);
  root.style.setProperty('--sc-shelf-d', dark);
}
