---
sidebar_position: 2
title: "vue相关"
---

# Vue (上)

## 1. 什么是 Vue 中的 slot？它有什么作用？

**要点**：slot 是组件内容分发机制（内容投影/插槽），用于父组件向子组件传入任意结构的 DOM/模板片段，使组件更具复用性和可配置性。
常见类型：
- 默认插槽（unnamed slot）
- 具名插槽（named slot）
- 作用域插槽 / 作用域插槽（scoped slot）——子组件向插槽提供数据，父组件接收并渲
示例（Vue 3 / Vue 2 语法一致）：
<details>
  <summary>子组件`BaseCard.vue`：</summary>

  ```vue showLineNumbers
<template>
    <div class="card">
        <header class="card-header">
            <slot name="header">默认头部</slot>
        </header>
        <main class="card-body">
            <slot>默认内容</slot>
        </main>
        <footer class="card-footer">
            <slot name="footer">默认底部</slot>
        </footer>
    </div>
</template>
<script>
    export default {
    name: 'BaseCard'
}
</script>
<style scoped>
    .card{border:1px solid #eee;padding:12px;border-radius:6px}
</style>
  ```

</details>
<details>
  <summary>父组件使用</summary>

  ```vue showLineNumbers
<template>
  <BaseCard>
    <template #header>
      <h3>我是头部</h3>
    </template>

    主体内容在这里

    <template #footer>
      <button>确定</button>
    </template>
  </BaseCard>
</template>
  ```

</details> 
作用域插槽示例（子提供数据，父使用）
<details>
  <summary>子组件 `ListProvider.vue`：</summary>

  ```vue showLineNumbers
<template>
  <ul>
    <slot v-for="item in items" :item="item" :index="indexOf(item)"></slot>
  </ul>
</template>
<script>
  export default {
    props: { items: Array },
    methods: { indexOf(i){ return this.items.indexOf(i) } }
  }
</script>
  ```

</details>
<details>
  <summary>父组件：</summary>

  ```vue showLineNumbers
<ListProvider :items="users">
  <template #default="{ item, index }">
    <li>{{ index }} - {{ item.name }}</li>
  </template>
</ListProvider>
  ```

</details> 

## 2. 在 Vue 渲染模板时，如何保留模板中的 HTML 注释？

要点：Vue 默认会移除模板中的 HTML 注释（<!-- -->）。如果需要保留注释，一般是调试或特定场景。
- 在 Vue 2 中可以使用 v-pre 来跳过编译（会保留注释？需谨慎 — v-pre 主要是跳过模板编译并保留原样内容）。
- 在编译阶段保留注释通常不推荐，Vue 的虚拟 DOM 不把注释视为常规节点。
实操建议：如果只是用于调试，直接在渲染前查看源模板或使用开发者工具。若确实需要在 DOM 中保留注释，可在 mounted 时手动插入注释节点。

<details>
  <summary>代码示例（手动插入注释）：</summary>

  ```vue showLineNumbers
<template>
  <div ref="container"></div>
</template>
<script>
  export default {
    mounted(){
      const comment = document.createComment('这是保留的注释');
      this.$refs.container.appendChild(comment);
    }
  }
</script>
  ```

</details> 

## 3. Vue 计算属性的函数名和 data 中的属性可以同名吗？为什么？
要点：不可以（或不应）同名。若同名，会产生冲突，后定义的会覆盖先定义的（Options API 下 Vue 会把 data、props、computed 等合并到实例上，命名冲突会警告或覆盖）。
原理：Vue 将 data、methods、computed 等代理到组件实例（this）上，命名冲突会导致不确定行为。computed 返回的是 getter (和可选 setter)，而 data 是响应式数据，混淆会导致难以调试。
示例（错误写法）：
```vue
data() { return { count: 1 } },
computed: {
count() { return this.count + 1 } // 会造成递归/覆盖问题
}
```
正确做法：使用不同命名或改为 `computedCount`。
## 4. Vue 的 v-show 和 v-if 有什么区别？使用场景分别是什么？
要点：
- v-if：真正的条件渲染，会在条件为 false 时移除/销毁 DOM 节点与组件实例；开销较大（创建/销毁）但在条件很少变更时更合适。
- v-show：通过 CSS display 控制显示/隐藏，始终保留 DOM 节点与组件实例；切换开销小但初始渲染始终会创建元素。适合频繁切换的场景。
选用建议：
- 条件很少改变（如登录后显示某个模块）使用 v-if。
- 频繁切换显示/隐藏（如标签页切换、弹窗显示）使用 v-show。
示例：
```vue
<!-- v-if -->
<div v-if="showModal">
  <ModalComponent />
</div>

<!-- v-show -->
<div v-show="visible">
  <HeavyButFrequentlyToggledComponent />
</div>
```
## 5. 如何在 Vue 中使用 defineAsyncComponent 实现异步组件加载？
要点：defineAsyncComponent 是 Vue 3 提供的 API（Vue 2 可使用异步组件工厂函数）。支持加载占位组件、超时、错误处理、延迟展示等。
Vue 3 示例：
```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./MyHeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,       // 延迟显示 loading（ms）
  timeout: 10000,   // 超时（ms）
  onError(error, retry, fail, attempts) {
    if (attempts <= 3) {
      retry()
    } else {
      fail()
    }
  }
})
```
模板中：
```vue
<template>
  <AsyncComp />
</template>
```
Vue 2 示例（异步工厂）：
```js
const AsyncComp = () => ({
  component: import('./MyHeavyComponent.vue'),
  loading: LoadingSpinner,
  error: ErrorDisplay,
  delay: 200,
  timeout: 10000
})
```
## 6. 请简单介绍一下你对 Vue 的理解，包括它的特点和优势 
要点（面试回答要点）：
● 响应式数据驱动视图`（Declarative Rendering）`
● 组件化`（Component-based）`，易组合与复用
● 渐进式框架：可以逐步引入（只用于视图层或全栈）
● 生态完善：`Vue Router`、`Vuex/Pinia`、`CLI、Vite` 支持
● 性能：虚拟 `DOM + `优化策略（Vue 3 使用 Proxy，性能更好）
● 开发体验：单文件组件`（SFC）`、良好文档、社区活跃
面试包装句：
“Vue 是一个以数据驱动视图的渐进式前端框架，强调组件化与简洁的 API，适合快速构建 SPA，同时在大型应用中也能通过组合式架构与成熟的生态（路由、状态管理、工具链）满足复杂需求。”
## 7. 在 Vue 项目中，你通常如何组织和管理组件？请描述一下你的组件化开发思路 
原则：
● 按功能/域（feature）划分目录（Domain-driven folder），而不是按类型（components/services/styles）
● 公共组件库（/components/ui）与业务组件（/views 或 /modules/**）分离
● 组件粒度：先抽象小且重复的 UI 组件（Button、Input、Modal），业务组件保持较高层次
● 组件命名：PascalCase 或 kebab-case 一致性
● 侧重可测试性与文档（Storybook）
● 使用 props + emits 明确数据流，尽量避免父子深层传递（使用 provide/inject 或状态管理）
示例目录结构：
```json
src/
  components/      # 通用 UI 组件
  modules/         # 按业务模块划分
    user/
      components/
      views/
      store/
  layouts/
  router/
  store/

```
组件开发流程（面试回答的流程化思路）：
1. 识别复用点 -> 抽取组件边界
2. 定义 props/slots/emits 合约
3. 写文档和示例（Story）
4. 编写单元测试
5. 优化样式与交互（无副作用）
## 8. Vue 的生命周期钩子有哪些？它们在什么阶段被调用？
Vue 2（Options API）主要钩子：
- `beforeCreate`：实例初始化（响应式未建立）
- `created`：实例已创建（可以访问 data、methods、computed，但 DOM 未挂载）
- `beforeMount`：模板编译并挂载之前
- `mounted`：DOM 已挂载（可以访问 $el）
- `beforeUpdate`：响应式数据改变但 DOM 还未更新
- `updated`：DOM 已更新
- `beforeDestroy`：实例销毁前（清理定时器、事件监听）
- `destroyed`：实例已销毁
Vue 3（名字略有变化，`destroy` -> `unmount`）：
- `beforeUnmount` / `unmounted`（替代 `beforeDestroy`/`destroyed`）
- 对 `Composition` API 使用 `onMounted`, `onUnmounted` 等等
示例（Options API）：
```js
export default {
  created() { console.log('created') },
  mounted() { console.log('mounted') },
  beforeUnmount() { console.log('beforeUnmount') }
}
```
示例（Composition API）：
```js
import { onMounted, onUpdated, onUnmounted } from 'vue'
setup(){
  onMounted(()=>console.log('mounted'))
  onUpdated(()=>console.log('updated'))
  onUnmounted(()=>console.log('unmounted'))
}

```

## 9. 谈谈你对 Vue 的响应式系统的理解，以及它是如何实现数据的双向绑定的
要点：
- Vue 2：使用 Object.defineProperty 的 getter/setter 检测属性访问与修改，不能直接检测新增/删除；通过数组方法重写（push/pop/splice）来拦截变动。
- Vue 3：采用 Proxy，对对象、数组等更全面地拦截（包括新增属性、删除等），性能与实现更简洁。
- 双向绑定（v-model）：在底层是 prop + 事件（modelValue + update:modelValue 在 Vue 3），组件监听事件并更新 prop 对应的外部数据，从而形成“类似双向”的交互。
工作原理简述：
1. 将数据变为响应式（Vue 2：defineReactive -> Object.defineProperty；Vue 3：reactive 使用 Proxy）
2. 渲染函数/模板收集依赖（在 getter 时收集当前副作用 watcher）
3. 当 setter 被触发时，通知相关 watcher 重新渲染或调用 computed/watch
   示例（Vue 3 reactive）：
```js
import { reactive } from 'vue'
const state = reactive({ count: 0 })
```
v-model 在父子组件传值上的示例（Vue 3）：
父组件：
```js
<Child v-model="name" />
```
子组件：
```js
<script>
  export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    methods: {
      onInput(e){ this.$emit('update:modelValue', e.target.value) }
    }
  }
    </script>
```
## 10. 在 Vue 中，如何进行路由管理？你是否使用过 Vue Router？
要点：
● Vue Router 是官方路由解决方案，支持 SPA 的路由、嵌套路由、路由守卫、动态路由、懒加载等。
● 常见用法：在 router/index.js 定义路由表，通过 createRouter（Vue 3）或 new VueRouter（Vue 2）创建实例，挂载到 App。
Vue 3 + Vue Router 4 示例：
```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const routes = [
  { path: '/', name:'Home', component: Home },
  { path: '/users/:id', name:'User', component: () => import('@/views/User.vue'), props: true },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
```
挂载：
```js

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
```
路由守卫示例（全局）：
```js
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) next('/login')
  else next()
})
```
## 11. 对于 Vue 的状态管理，你有什么经验？是否使用过 Vuex 或其他类似的状态管理库 
要点（面试回答）：
- 大型应用推荐集中式状态管理（Vuex 或 Pinia），用于跨组件共享、时间旅行、插件生态（持久化、日志、调试）。
- 小型或局部状态可以使用组件组合、provide/inject、或通过组合式 API 的 reactive 在模块间共享。
- 我在项目中既使用过 Vuex（V2/V3 时代），也在 Vue 3 项目中使用过 Pinia（更简洁、更 TS 友好）。
经验/实践：
- 使用模块化（namespaced modules）划分业务状态
- 把副作用（API 请求）放在 actions（Vuex）或 stores（Pinia）的 actions 中
- 使用持久化（localStorage）只保存必要状态（token、user），避免过度持久化
- 在 SSR 场景注意状态注水/反序列化
## 12. 请你说说 Pinia 和 Vuex 的不同
    要点：
    API 风格：Pinia 更轻量、基于函数（类似组合式 API），Vuex 更偏配置式（mutations / actions / getters）。
    写法：Pinia 使用 defineStore，没有 mutations 的强制分层（可直接修改 state 或通过 action 修改）；Vuex 需要通过 mutation 修改 state（更明确但冗长）。
    TypeScript 支持：Pinia 原生更友好，类型推断更自然。
    调试：两者都支持 devtools，但 Pinia 的插件系统更简单。
    体量与学习成本：Pinia 更小、更易上手，Vuex 适合已有大量 Vuex 代码库的中大型项目迁移成本较高。
    Pinia 示例：
```js
// stores/user.js
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({ name: '', token: '' }),
  actions: {
    setName(n){ this.name = n },
    async login(payload){ this.token = await api.login(payload) }
  }
})
```

## 13. 对于 Vue 的单文件组件（.vue），你对它的结构和用法有什么了解？
要点：`SFC（Single File Component）`包含三个主要块：
`<template>`：模板，可写 HTML + 指令
`<script>`：逻辑`（Options API / Composition API / setup）`
`<style>`：样式（支持` scoped、module、lang=less/scss`）
增强功能：
`<script setup>（Vue 3）`更简洁、自动类型推断
`<style scoped>`：作用域样式
SFC 支持 `<script setup lang="ts">`、多个 `<style>` 等
示例（Vue 3 + script setup）：
```vue
<template>
  <button @click="inc">{{ count }}</button>
</template>
<script setup>
  import { ref } from 'vue'
  const count = ref(0)
  function inc(){ count.value++ }
</script>
<style scoped>
  button { padding:8px 12px }
</style>
```

## 14. 请分享一些你在 Vue 项目中进行性能优化的经验和技巧 

要点与技巧：
路由懒加载（按需加载页面组件）
组件懒渲染 / keep-alive 控制（避免不必要重复渲染）
使用 v-once 渲染静态节点
减少响应式对象范围：只对必要数据做 reactive/ref
避免在模板中做复杂计算；把逻辑放到 computed
使用虚拟列表（virtual-scroller）处理长列表
使用 watch 代替 deep 大量遍历
服务端压缩/HTTP2、CDN、资源预加载、Cache-Control
图片懒加载、SVG 优化、合并小资源、代码分割
对第三方库进行按需引入（lodash 按需或只引入特定函数）
对频繁更新的 DOM 使用 v-show 而非 v-if（见第 4 点）
使用性能分析工具（Chrome DevTools、Lighthouse、Vue Devtools）
示例：路由懒加载：
```js
const routes = [
  { path: '/home', component: () => import('@/views/Home.vue') }
]
```

## 15. 如果要在 Vue 项目中集成第三方库或插件，你通常会采取哪些步骤？

流程：
确认兼容性（Vue 版本、SSR/CSR）
查看是否有官方或社区插件（优先）
按需引入并做 Tree-shaking（避免整个包引入）
在主入口 main.js 使用 .use() 或通过 provide/inject 注入
封装适配层（在项目中标准化使用接口）
在组件中注入/导入，写测试
做性能评估与样式隔离（若会污染全局 CSS）
编写使用文档与示例
示例（注册插件）：
```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import MyLib from 'my-lib'
createApp(App).use(MyLib, { option: true }).mount('#app')
```

## 16. 请描述一次你在 Vue 项目中遇到的挑战，并说明你是如何解决它的

示例回答（面试型）：
挑战：某项目首屏加载慢（首屏时间 > 3s），业务页面包含多个第三方图表、地图 SDK 与大量初始数据。
分析：通过 Lighthouse 与 Chrome Profile 定位到 JS 大包和阻塞渲染（同域 synchronous 请求、CSSOM 阻塞），以及首次渲染加载大量静态数据。
解决措施：
路由层面做懒加载，拆分 chunk。
将大型非必要 SDK（地图、图表）按需加载或延迟加载（`IntersectionObserver + import()`）。
对接口做分页/延迟加载，首屏仅请求必要数据，次屏请求异步加载。
打包优化：使用 `Vite + rollup` 动态拆包，并开启 `gzip/ brotli`；移除未用到的` polyfills`。
使用 SSR/预渲染（如果适合）或 HTML 预渲染部分静态内容。
结果：首屏时间从 3s 降到 1.2s，用户感知显著提升。
## 17. 请说说 Vue 项目中一般把数据请求这个操作放在那个位置
要点：
页面级（视图组件 mounted / setup）通常负责请求页面所需数据。
将通用或共享数据放到统一 store（Vuex/Pinia）的 action 中；组件触发 action 获取数据。
可把 API 请求封装到 services/api.js 层，便于复用与测试。
SSR 场景会在服务端做数据预取（如 asyncData 风格）。
示例（Composition API）：
```js
// services/api.js
export async function fetchUser(id){ return await fetch(`/api/user/${id}`).then(r=>r.json()) }

// 页面组件
import { onMounted, ref } from 'vue'
import { fetchUser } from '@/services/api'
setup(){
  const user = ref(null)
  onMounted(async ()=> { user.value = await fetchUser(1) })
  return { user }
}
```

## 18. Vue 组件之间的通信方式有哪些？

列表：
父子组件：`props / emit`
兄弟组件：通过父组件中转 props 或使用事件总线（不推荐），或使用状态管理（Pinia/Vuex）
跨层级：`provide / inject`
全局状态管理：`Vuex / Pinia`
自定义事件总线（`EventEmitter`）——小型场景可用，但易混乱
`$attrs / $listeners`（透传属性/事件）
插槽（slot）与作用域插槽（child->parent 数据流）
DOM 自定义事件（极少使用）
示例（父子）：

```vue
<!-- Parent -->
<Child :value="count" @update="val => count = val" />
```

## 19. 为什么 data 属性是一个函数而不是一个对象？

要点：组件是可复用的构造函数。若 data 是对象，则多个组件实例会共享同一对象，互相污染状态。将 data 写为函数可以为每个组件实例返回独立对象，确保实例隔离。
示例：
```js
data(){ return { count: 0 } } // 每个实例都有自己的 count
```

## 20. 动态给 Vue 的 data 添加一个新的属性时会发生什么？怎样解决？

问题：在 Vue 2 中，直接 `this.someNewProp = value` 不会使新属性成为响应式（因为` Object.defineProperty` 在初始化时未拦截新增属性）。
解决办法：
`Vue 2`：使用 `Vue.set(this.obj, 'newKey', value)` 或 `this.$set(this.obj, 'newKey', value)`。
`Vue 3（Proxy）`：新增属性是响应式的，直接赋值生效。
另外的设计建议：尽量在 data 中先声明所有预期字段，或使用 reactive 包装对象并初始化默认值。
示例（Vue 2）：
```js
this.$set(this.user, 'age', 25) // 响应式
```

## 21. 说说你对 Vue 的 mixin 的理解，有什么应用场景？

要点：Mixin 是一种复用组件逻辑的方式，将一组选项（data、methods、created 等）混入目标组件。但 mixin 会引入命名冲突和隐式依赖，难以追踪数据来源。
应用场景：
旧项目中快速复用通用逻辑（如日志、通用方法）
当逻辑很小且重复，且不适合状态管理时可短期使用
替代方案（更推荐）：
Composition API（useXxx hooks）更明确、可组合、类型安全
示例 mixin：
使用：
```js
// mixins/logger.js
export default {
  created(){ console.log('组件创建', this.$options.name) },
  methods: {
    $log(msg){ console.log(msg) }
  }
}
```
使用：
```js
import logger from '@/mixins/logger'
export default { mixins: [logger] }
```

## 22. Vue 常用的修饰符有哪些，有什么应用场景？

事件修饰符（常用）：
`.stop：@click.stop` 阻止事件冒泡
`.prevent：@submit.prevent` 阻止默认事件
`.capture：`使用事件捕获
`.self`：只有事件目标是元素本身才触发（常用于遮罩层）
`.once`：只触发一次
按键修饰符：
`.enter、.esc、.space` 等或自定义键码 .keyCode
表单修饰符：
`.lazy：`失去焦点或 change 时更新（默认 input 实时）
`.number：`把输入转为 Number
`.trim：`去掉首尾空格
指令修饰符：
`v-bind` 的` .prop, .camel`（用于属性名转换）
示例：
```vue
<input v-model.lazy="name" @keyup.enter="onEnter" />
<button @click.stop="onClick">点我</button>
```
## 23. Vue 的 computed 和 watch 有什么区别？

要点：
`computed`：基于依赖缓存的计算属性，适合用于模板绑定或衍生数据；只有相关依赖变化时才重新计算。
`watch`：观察数据变化并执行副作用（异步或开销较大操作），适合数据变化触发异步请求或手动执行逻辑。
使用建议：
需要返回值并用于模板/其他计算用 computed
需要执行副作用（API 调用、手动 DOM 操作）用 watch
示例：
```js
computed: {
  fullName(){ return `${this.first} ${this.last}` }
},
watch: {
  query: {
    handler: _.debounce(function(val){ this.fetch(val) }, 300),
      immediate: true
  }
}
```
## 24. 有写过自定义指令吗？自定义指令的应用场景有哪些？

常见场景：
直接操作 DOM：如自动聚焦 v-focus、节流滚动监听、拖拽、权限指令控制元素显示
第三方库 DOM 集成（如直接在元素上挂载某 SDK）
Vue 3 自定义指令示例（v-focus）：
模板使用：
```js
// directives/focus.js
export default {
  mounted(el){ el.focus() },
  updated(el){ /* 可选逻辑 */ }
}

// main.js
app.directive('focus', FocusDirective)
```
模板使用：
```vue
<input v-focus />
```

## 25. SPA 首屏加载速度慢的怎么解决？

策略汇总：
路由懒加载 & 代码分割（减少首包体积）
延迟/按需加载第三方 SDK（地图、图表）
减少初始请求：分页、首屏只请求必要数据
使用 `prefetch/preload` 或` HTTP/2`、`CDN`、压缩（`gzip/brotli`）
SSR 或预渲染以减少白屏（若适用）
使用` resource hints（<link rel="preload">）`
优化图片：缩放、WebP、懒加载
去掉/延迟执行阻塞 JS（critical JS inlined only）
使用浏览器缓存、长缓存策略
使用性能指标追踪（Lighthouse, RUM）持续监控
## 26. Vue 3 有了解过吗？能说说跟 Vue 2 的区别吗？
核心差异：
响应式实现：`Proxy（Vue3） vs Object.defineProperty（Vue2）`
`Composition API`：更好的逻辑复用与 `TypeScript` 支持
性能提升：更小` runtime`、更快的虚拟 DOM
`Tree-shaking` 更友好，生态重写以支持按需引入
新的生命周期钩子命名`（beforeUnmount/unmounted）`
更好的 `TypeScript `支持与` <script setup>`
## 27. Vue 3 为什么使用 Proxy 拦截数据？
要点：
Proxy 能拦截更多操作（属性读取、写入、删除、枚举、原型操作等），解决 Vue 2 在新增/删除属性和数组索引上的限制。
Proxy 性能更优，允许更简洁的实现，且代码更平台友好（更少 polyfill）。
## 28. Vue 3 新增特性
主要新增（面试摘要）：
`Composition API（setup、ref、reactive、computed）`
`<script setup>` 语法糖
`Teleport、Suspense` 组件
更快的虚拟 `DOM、Proxy` 响应式系统
更好的 `TypeScript` 支持
新的生命周期钩子和 API（onMounted 等）
## 29. 如何看待 Composition API 和 Options API
对比与看法：
`Options API`：结构化清晰，适合小团队或上手快的场景，代码可读性对初学者友好。
`Composition API`：更适合复杂逻辑、逻辑复用（hooks 风格）、`TypeScript` 支持好。将相关逻辑放在一起，便于维护。
实践建议：在团队中可混合使用（Vue 3 支持），对新项目推荐 `Composition API`（长远收益），对老项目可逐步迁移。
## 30. Vue 3.0 编译做了哪些优化？
要点：
静态提升`（static hoisting）`：把静态节点抽离，减少渲染开销
编译时静态树标记：优化 patch 流程
更细粒度的依赖跟踪与副作用收集
编译器输出更轻量（支持 `tree-shaking`）
## 31. watch 和 watchEffect 的区别？
要点（Vue 3）：
`watch`：显式依赖，传入要观察的响应式源（`ref、reactive、getter`），更适合观察特定变量并执行副作用；可以设置 `flush（sync/pre/post）`等。
`watchEffect`：自动收集依赖（在回调中引用的响应式值），适合立即执行并响应依赖变化的场景；不是用于对比前后值（watch 能获得 old/new）。
示例：
```js
// watch
    watch(()=>state.count, (newVal, oldVal) => console.log(newVal, oldVal))

      // watchEffect
      watchEffect(()=> { console.log(state.count) })
```
32. 如何理解 `reactive`、`ref`、`toRef `和 `toRefs`？
要点：
`ref(value)`：创建一个响应式的引用对象，包含 .value。用于基本类型或需要单独引用的值。
`reactive(obj)`：将对象变为响应式代理（Proxy），直接使用对象属性，不需要 .value。
`toRef(obj, key)`：把 obj[key] 转为一个 ref，用于把 reactive 对象中的某个属性以 ref 的方式传递或解构而不丢失响应性。
`toRefs(obj)`：把 `reactive` 对象的每个属性都转换成 ref（常用于解构 reactive 对象而不丢失响应性）。
示例：
```vue
import { reactive, ref, toRef, toRefs } from 'vue'

const state = reactive({ count: 0, name: 'Alice' })
const countRef = toRef(state, 'count') // countRef.value == state.count

const { count, name } = toRefs(state) // 解构后仍然响应式，count.value 对应原 state.count

const n = ref(3) // 基本类型 ref
```
代码 Demo 集合（完整可运行示例）
下面给出一个小仓库式的 Demo，集中演示 `slot` / `async component` / `Pinia` / `reactive/ref/toRefs` / `watch/watchEffect` 等核心点（基于` Vue 3 + script setup`）。你可以直接在 `Vite` 环境里运行。
`App.vue：`

```vue 
<template>
  <div>
    <h2>1. Slot 示例</h2>
    <BaseCard>
      <template #header>头部插槽</template>
      这是主体插槽内容
      <template #footer>底部插槽</template>
    </BaseCard>

    <h2>2. Async Component 示例</h2>
    <Suspense>
      <template #default>
        <AsyncComp />
      </template>
      <template #fallback>加载中…</template>
    </Suspense>

    <h2>3. Reactive / toRefs 示例</h2>
    <CounterDemo />

    <h2>4. Watch vs WatchEffect</h2>
    <WatcherDemo />
  </div>
</template>

<script setup>
  import BaseCard from './components/BaseCard.vue'
  import { defineAsyncComponent } from 'vue'
  const AsyncComp = defineAsyncComponent(() => import('./components/Heavy.vue'))

  import CounterDemo from './components/CounterDemo.vue'
  import WatcherDemo from './components/WatcherDemo.vue'
</script>
```
`components/BaseCard.vue（同上第 1 题示例）
components/Heavy.vue：`

``` vue
<template><div>Heavy component loaded</div></template>
<script setup>
  console.log('Heavy loaded')
</script>
```
`components/CounterDemo.vue：`


```vue
<template>
  <div>
    <p>reactive count: {{ state.count }}</p>
    <p>countRef.value: {{ count.value }}</p>
    <button @click="inc">+1</button>
  </div>
</template>
<script setup>
  import { reactive, toRefs, toRef } from 'vue'
  const state = reactive({ count: 0, name: 'vm' })
  const count = toRef(state, 'count')
  function inc(){ count.value++ }
</script>
```
`components/WatcherDemo.vue：`


``` vue
<template> 
  <div>
    <input v-model="q" placeholder="type to search"/>
    <p>watch result: {{ result }}</p>
  </div>
</template>
<script setup>
  import { ref, watch, watchEffect } from 'vue'
  const q = ref('')
  const result = ref('')

// watch：带防抖的请求示例（伪）
watch(q, (newVal) => {
result.value = `search: ${newVal}`
}, { immediate: true })

// watchEffect：打印依赖
watchEffect(() => {
console.log('watchEffect - q is', q.value)
})
</script>
```

# vue(下) 

## 1. Vue 的设计哲学 & 核心理念
   答案要点（面试话术）
   - 简单与渐进式：从 CDN 引入到完整框架，学习曲线平滑。
   - 以声明式渲染为中心：模板 -> 数据驱动视图。
   - 组件化：把 UI 拆成可复用、隔离的组件。
   - 响应式系统为核心：自动追踪依赖、最小更新单元。
   - 开发者体验优先：直观 API、良好错误提示、丰富生态`（CLI、Router、Pinia）`。
   可补充谈点
   - `Vue` 把可维护性、性能、开发体验做了折中（例如模板语法更直观）。
   - `Vue 3` 的设计目标：更小的体积、更快的性能、易于树摇（`tree-shakeable`）。
   示例（谈话示例）
   “我会把 `Vue` 的核心归结为：声明式 + 组件化 + 响应式。开发上，我优先把复杂逻辑拆组件、用 `Composition API` 管理逻辑复用，借助 Pinia 做状态明确化。”

## 2. `Composition-API` 与响应式系统整体介绍
   答案要点
   - `Composition API（setup()）`提供按功能/业务组织逻辑的能力，便于复用（hook 风格）。
   - 响应式系统包含 `reactive`, `ref`, `computed`, `watch` 等，底层基于 `Proxy` 做属性拦截与依赖收集。
   - `setup()` 在组件实例创建阶段执行，返回的数据会暴露给模板。
   面试话术
   “`Composition API` 解决了 `Options API` 在大型组件中逻辑散落的问题，使关注点按功能聚合，便于测试和复用。”
   Demo
```vue
   <!-- Composition API 基本示例 -->
<template>
  <div>
    <p>count: {{ count }}</p>
    <p>double: {{ double }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```



## 3. `Composition-API` 基础语法讲解
重点 API
   - `setup(props, ctx)`：初始化逻辑，返回对象暴露给模板。
   - `ref(value)`：创建基本类型响应式引用。
   - `reactive(obj)`：创建深层响应式对象。
   - `computed(fn)`：计算属性，带缓存。
   - `watch(source, cb, options)`：监听副作用。
   - `onMounted`, `onUnmounted` 等生命周期钩子（在 setup 内使用）。
   示例（组合使用）

```vue
 <template>
  <div>
    <input v-model="form.name" placeholder="name" />
    <p>Hello, {{ greeting }}</p>
    <button @click="submit">Submit</button>
  </div>
</template>
```



## 4. Vue 的响应式陷阱
常见陷阱（面试应答点）
   - 直接解构 `reactiv`e 对象会失去响应性：`const { a } = reactiveObj` 会脱离响应系统。
   - ref 包装对象时，访问嵌套属性可能需要 `.value` 或用 `toRefs/reactive`。
   - 在模板内直接操作 `v-for` 的索引或 key 使用不当导致重用/渲染问题。
   - 对数组直接更改索引（例如 `arr[3] = x`）在 Vue 2 有问题，`Vue 3` 的 Proxy 已修复大部分，但需注意赋值与变更触发场景。
   - 深度监听对象时容易造成性能问题。
   修复示例
```js
import { reactive, toRefs } from 'vue';
const state = reactive({ count: 0, nested: { val: 1 } });
// 错误做法（会失去响应）
const { nested } = state; // nested 不再是响应式的 proxy 引用
// 正确做法
const { nested: nestedRef } = toRefs(state); // nestedRef 是 ref，保持响应
```
  

## 5. Vue 响应式底层原理 `Proxy`（简述）
核心要点
   - `Vue3` 使用 Proxy 为对象创建代理，拦截 `get/set` 等操作。
   - `get` 时收集依赖（在依赖收集阶段记录当前 `activeEffect -> key`）。
   - `set` 时触发已订阅的 `effect` 执行（调度更新）。
   - `Proxy` 支持对数组、`Map/Set`、动态添加属性等更好支持（相较于 Vue2 的 `defineProperty`）。
   示例（手写极简版本，面试中可以白板/口述）
  ```js
  // 极简依赖收集示意（非完整实现）
   const bucket = new WeakMap();
   let activeEffect = null;
   function effect(fn) {
   activeEffect = fn; fn(); activeEffect = null;
   }
   function reactive(obj) {
   return new Proxy(obj, {
   get(target, key) {
   if (!activeEffect) return Reflect.get(target, key);
   let depsMap = bucket.get(target);
   if (!depsMap) bucket.set(target, (depsMap = new Map()));
   let deps = depsMap.get(key);
   if (!deps) depsMap.set(key, (deps = new Set()));
   deps.add(activeEffect);
   return Reflect.get(target, key);
   },
   set(target, key, value) {
   const res = Reflect.set(target, key, value);
   const depsMap = bucket.get(target);
   if (depsMap) {
   const deps = depsMap.get(key);
   if (deps) deps.forEach(fn => fn());
   }
   return res;
   }
   });
   }
   ```

## 6. Vue 响应式底层原理 依赖追踪机制
   要点
   - 依赖收集阶段：当执行` effec`t（即组件渲染或 `computed/watcher`）时，全局记录当前 `activeEffect`，在 get 中把 `activeEffect` 存到对应 key 的依赖集合。
   - 触发阶段：set 时查找对应 key 的依赖，依次执行/调度（队列化、去重、异步刷新）。
   - 调度策略：Vue 会把更新放入微任务或 `nextTick` 队列（批量更新，避免重复渲染）。
   - `computed` 是懒求值：只有被读取时才计算，并在依赖变化时标记为 dirty。
   代码示例：`computed` 实现核心（伪代码）
  ```js
  function computed(getter) {
   let value;
   let dirty = true;
   const runner = () => {
   if (dirty) { value = getter(); dirty = false; }
   return value;
   };
   effect(() => {
   getter(); // 触发依赖收集
   dirty = true; // 当依赖变化时，effect 会把 dirty 置 true
   });
   return { get value() { return runner(); } };
   }
   ```

## 7. Vue 响应式更新 vs React 状态更新
   对比要点（面试回答结构化）
   - `Vue`：基于依赖追踪，细粒度更新（只更新受影响的组件/模板片段）；响应式对象追踪属性级别。
   - `React`：基于不可变状态（`setState / useState`）触发组件重新渲染，组件内所有依赖都会重新执行（整体函数组件重新运行），需借助 memo/pureComponent 做局部优化。
   - 优点/缺点：
     - `Vue` 的优点：更高效的局部更新、模板更直观。缺点：当大量副作用和复杂依赖时，调试依赖链可能复杂。
     - `React` 的优点：模型简单（全量重新渲染）、易于推理与测试。缺点：可能造成不必要的重复计算，需要额外优化。
     面试话术
     “面试可以举例：修改对象的某个属性，在 Vue 中只会触发使用该属性的 watcher 或组件片段重新渲染；在 `React` 中默认会导致整个组件函数运行一次，除非用 memo/selector 等做优化。”
     示例对比（伪示意）
   - Vue:
`<p>{{ user.name }}</p> <!-- 只有 name 被依赖，修改 age 不会重新渲染该绑定 -->
● React:
function Profile({ user }) {
  return <p>{user.name}</p>; // 只要父组件 setState 导致 user reference 变化，Profile 会重新渲染
}`

## 8. Vue 常用的生命周期函数
   列表（setup 环境下）
   - `beforeCreate` / `created（Options API，setup 前后）`
   - `setup()`（执行点）
   - `onBeforeMount`、`onMounted`
   - `onBeforeUpdate`、`onUpdated`
   - `onBeforeUnmount`、`onUnmounted`
   - `onActivated` / `onDeactivated（keep-alive）`
   - `onErrorCaptured`
   示例
  ` import { onMounted, onUnmounted } from 'vue';
   export default {
   setup() {
   onMounted(() => console.log('mounted'));
   onUnmounted(() => console.log('unmounted'));
   return {};
   }
   };`
   面试话术
   “常见问题：`mounted` 里访问 DOM 合理，`created/ setup` 更适合做数据初始化。`onBeforeUnmount` 可用于清理定时器或取消订阅。”

## 9. Vue 的副作用清理逻辑
   要点
   - `watch` 返回一个停止函数：`const stop = watch(...); stop()`;
   - `onUnmounted `用于组件销毁时清理副作用（事件监听、定时器、订阅）。
   - `watchEffect` 的回调接收 onInvalidate，用于清理上一次副作用（例如取消请求）。
   - effect/computed 内也有调度与清理机制（computed 的缓存、watch 的 lazy/flush 选项）。
   示例：`watchEffect` 清理
   `import { watchEffect } from 'vue';
   setup() {
   const stop = watchEffect((onInvalidate) => {
   const ctrl = new AbortController();
   fetch('/api/data', { signal: ctrl.signal }).then(...);
   onInvalidate(() => { ctrl.abort(); }); // 清理上一次的 fetch
   });
   return { stop };
   }`

## 10. 模板语法`v-if` `v-for` `v-bind` `v-model`
    要点与注意
    ●` v-if` 与` v-for`：尽量不要把 `v-if` 放在 `v-for` 上的同一元素，否则会在每次迭代执行条件判断。优先在父层做过滤。
    - `v-bind` 缩写 :。可以绑定对象 `:class`、`:style`、`v-bind="props"`（属性展开）。
    - `v-model` 在 Vue3 支持多个参数和自定义` prop/event` 名（`v-model:foo`），`modelValue` 与 `update:modelValue` 约定。
    - `key` 在 `v-for` 中很重要，避免复用错误 DOM。尽量使用稳定唯一的 id。
    示例
```vue
<!-- 不推荐 -->
<li v-for="item in list" :key="item.id" v-if="item.show">{{ item.text }}</li>

<!-- 推荐 -->
<li v-for="item in filteredList" :key="item.id">{{ item.text }}</li>
v-model 自定义组件
<!-- Parent -->
<CustomInput v-model="value" />

  <!-- Child -->
  <script>
    export default {
      props: { modelValue: String },
      emits: ['update:modelValue'],
      setup(props, { emit }) {
        const onInput = e => emit('update:modelValue', e.target.value);
        return () => h('input', { value: props.modelValue, onInput });
      }
    };
  </script>
  ```

## 11. Vue 的通信基础
    方式
    - 父子：`props + events（emit）`。
    - 兄弟/跨层级：全局状态管理（`Pinia`）、`provide/inject`、`event bus`（不推荐）。
    - 插槽：父向子传渲染内容（可配 scoped slot 实现数据回传）。
    - `Router params / query` 用于页面级通信。
    面试话术
    “首选` props + event`；复杂跨多层共享状态优先` Pinia `或 `provide/inject`（只作依赖注入，不做全局状态替代）。”
    代码示例（父子通信）
```vue
<!-- Parent.vue -->
<Child :count="count" @inc="count++" />
  <!-- Child.vue -->
  <script>
    export default {
      props: ['count'],
      emits: ['inc'],
      template: `<div>{{ count }} <button @click="$emit('inc')">+1</button></div>`
    };
  </script>
  ```


## 12.` Provide-Inject` 的用法
要点
- `provide` 在上层组件提供值，`inject` 在子组件任意深度获取。
- 常用于插件、主题、依赖注入（但不用于频繁变更的共享状态，因不是响应式，除非提供` ref/reactive`）。
- 可以传默认值。
示例
```vue
// Provider.vue
import { provide, ref } from 'vue';
setup() {
const theme = ref('dark');
provide('theme', theme); // 提供 ref 保持响应
return {};
}
   
```
```js
// Consumer.vue
import { inject } from 'vue';
setup() {
const theme = inject('theme', ref('light'));
return { theme };
}
```



## 13. 插槽 `slot` 与具名插槽
    要点
    - 默认插槽`（<slot/>）`用于未命名的内容。
    - 具名插槽：`<slot name="header"/>` 与父组件` <template #header>...</template>`。
    - 插槽由父提供，子决定渲染位置，适合高阶组件或容器组件布局。
    示例
```vue
<!-- MyCard.vue -->
<template>
  <div class="card">
    <header><slot name="header"></slot></header>
    <section><slot></slot></section>
    <footer><slot name="footer"></slot></footer>
  </div>
</template>

<!-- 使用 -->
  <MyCard>
    <template #header>Title</template>
  Main content
    <template #footer>Footer</template>
    </MyCard>
```


## 14. 插槽作用域（`Scoped Slots`）
    要点
    - 子组件通过 `<slot :data="x">` 向父传数据，父用 `<template #default="{ data }"> `解构接收。
    - 用于渲染高可配置性内容（像表格、列表项自定义渲染）。
    示例
```vue
<!-- List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item">{{ item.text }}</slot>
    </li>
  </ul>
</template>

<!-- Parent.vue -->
<List :items="things">
  <template #default="{ item }">
    <strong>{{ item.name }}</strong> - {{ item.desc }}
  </template>
</List>
```


## 15. `Vue-Router` 的基本配置与使用
    要点
    - 创建 `router：createRouter({ history: createWebHistory(), routes })`。
    - 路由文件化建议：按页/模块组织 views/。
    - 在组件内可用 `useRouter()`（编程式导航）和 `useRoute()`（读取当前 `route`）。
    示例
```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/about', component: About, name: 'about' },
];
export const router = createRouter({ history: createWebHistory(), routes });

// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
createApp(App).use(router).mount('#app');
```
  

## 16. `Vue-Router` 的路由参数与传参方式
方式
- 动态路由 `params：/user/:id -> route.params.id`
- `query：/search?q=vue -> route.query.q`
- `props` 传参（组件接收 props）：`{ path: '/user/:id', component: User, props: true }`
- 编程式导航传参：`router.push({ name: 'user', params: { id: 1 }, query: { q: 'x' } })`（注意 params 与 name 搭配更稳）
    示例
```js
// route config
{ path: '/user/:id', name: 'user', component: User, props: true }

// User.vue
export default {
  props: ['id'],
  setup(props) {
    // props.id 可用，无需从 route 里取
  }
};
```
   

## 17. `Vue-Router` 的路由守卫
类型
- 全局前置守卫 `router.beforeEach`
- 全局解析守卫` router.beforeResolve`
- 全局后置守卫 `router.afterEach`
- 单路由守卫 `beforeEnter`
- 组件内守卫 `beforeRouteEnter`, `beforeRouteUpdate`, `beforeRouteLeave`
示例：全局守卫做鉴权
```js
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const loggedIn = Boolean(localStorage.getItem('token'));
  if (requiresAuth && !loggedIn) next({ name: 'login', query: { redirect: to.fullPath } });
  else next();
});
```

## 18. `Vue-Router` 的路由元信息
    要点
    - 在路由配置里使用 meta 字段（如 `meta: { requiresAuth: true, title: '首页' `}）。
    - 常用于权限校验、动态标题、面包屑或布局选择。
    - 可在 `beforeEach` 或 `afterEach` 使用` to.meta`。
    示例
```js
{ path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, layout: 'admin' } }
```


## 19. Vue 何时需要全局状态
    判断点（面试回答）
    - 多个组件或页面需要共享同一份数据（用户信息、权限、主题、购物车）。
    - 需要跨层级或跨页面的可预测状态管理（不会频繁变化的小配置信息可用 provide/inject）。
    - 要实现时间旅行 / 可追踪变更或复杂缓存策略时（更倾向使用状态管理库如 Pinia）。
    面试话术
    “若仅父子传递则不用全局；若是多页面、多组件共享并且需要统一操作（登录态、购物车），就上 Pinia。”

## 20. Pinia 基本用法
示例：简单 store
```js
// stores/counter.js
  import { defineStore } from 'pinia';
  export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0 }),
    getters: {
      double: (state) => state.count * 2
    },
    actions: {
      increment() { this.count++; }
    }
  });

  // main.js
  import { createApp } from 'vue';
  import { createPinia } from 'pinia';
  const pinia = createPinia();
  createApp(App).use(pinia).mount('#app');

  // 组件中使用
  import { useCounterStore } from '@/stores/counter';
  export default {
    setup() {
      const counter = useCounterStore();
      return { counter };
    }
  };
```


## 21. Pinia三大核心概念
三大要点
1. `State：`可响应的数据源`（state()）`。
2. G`etters：`基于 `state` 的计算（类似 `computed`）。
3. `Actions：`改变 `state` 的方法（可以是异步），内部 this 指向 store 实例。
   面试话术
   “`Pinia API `简洁，支持模块化、`TypeScript` 友好，且 store 实例可直接在组件中使用，便于聚合与测试。”

## 22. `Pinia — Store` 的响应式解构（常见问题）
问题
- 直接解构 `store`（如 `const { count } = useStore()）`会脱离响应（变成普通值）。
正确做法
- 使用 `storeToRefs` 把 `store` 的 `state -> refs`，或直接在模板中使用` store.count`。
```js
import { storeToRefs } from 'pinia';
const store = useCounterStore();
const { count } = storeToRefs(store); // count 是 ref，保持响应性
```


## 23. Pinia 最小可变点原则
    要点
    - 把可变状态集中到最小范围（`store`），其余尽量使用纯计算与组合函数，减少副作用。
    - 设计时思考：哪些是源状态（`single source of truth`），哪些是派生状态（`computed`）。
    - 有利于调试（`time-travel`、快照）与可测试性。
    面试话术
    “实际项目中把真实的可变数据放 store，把 UI 局部状态留在组件，能减少冲突与不必要重渲染。”

## 24. Vue 的自定义指令
用途
- 操作 DOM（聚焦、悬浮提示、长按等），需要直接 DOM 操作时用指令。
 API
- `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeUnmount`, `unmounted`。

```js
// directives/focus.js
  export default {
    mounted(el) { el.focus(); }
  };

  // main.js
  app.directive('focus', import('./directives/focus.js'));

  // 使用
  <input v-focus />
```




## 25. Vue 模板编译流程（概述）
步骤
1. 模板解析（`parse`）：将模板字符串解析为 AST（抽象语法树）。
2. 转换（`transform`）：对 AST 做静态提升、`v-for/v-if` 转换、slot 编译等优化。
3. 代码生成`（codegen）`：生成渲染函数（`render`），包含 `createVNode` 的调用。
4. 运行时`（runtime）`：执行 `render`，触发响应式依赖收集与 `DOM patch`。
   面试话术
   “重要优化点：静态提升（`static hoist`）减少渲染成本；编译时把模板转换为高效 JS 代码以便 runtime 复用。”

## 26. Vue 的 diff 算法
    要点
    - Vue 的 patch 算法参考了 Snabbdom：先对比同层节点（同 key/tag），处理 DOM 复用、props 更新、children diff。
    - 对 children 使用双端指针优化（头尾对比）并对中间区使用 key -> index map 进行最少移动（最长递增子序列 LIS）以最少 DOM 操作实现移动最小更新。
    - Vue3 在编译阶段生成更高效的 VNode shape & 静态标记，减少 runtime diff 工作。
    面试话术
    “简述时突出：双端比较 + key map + LIS 最小移动策略，是面试中的高分点。”

## 27. nextTick 的作用是什么？
    要点
    - nextTick 用于在 DOM 更新完成、视图刷新后执行回调（在当前事件循环的微任务/宏任务之后）。
    - 场景：在修改响应式数据后需要读取更新后的 DOM（例如获取元素尺寸、聚焦、滚动）。
    - Vue 内部的 DOM 更新是异步批量的，nextTick 保证在 DOM 更新并渲染完成后执行。
    示例
```js
<template>
  <div ref="box">{{ text }}</div>
  <button @click="change">Change</button>
</template>

<script>
  import { ref, nextTick } from 'vue';
  export default {
    setup() {
      const text = ref('a');
      const box = ref(null);
      async function change() {
        text.value = 'longer text';
        await nextTick(); // 等待 DOM 更新完成
        console.log(box.value.getBoundingClientRect()); // 获取最新尺寸
      }
      return { text, box, change };
    }
  };
</script>
```
  

总结与面试准备建议（一句话）
准备面试时：把每个概念讲清楚“是什么 → 为什么 → 怎么用 → 注意点 → 代码示例”，并用自己参与过的项目举例说明如何选择并在工程中落地（这是打动面试官的关键）。