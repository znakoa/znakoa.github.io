---
sidebar_position: 3
title: "react相关"
---

## 1. 如何理解 UI = f(state) 这个公式？

解释（核心思想）：UI 是应用状态（state）在某个时刻的纯函数映射。给定相同的 state 输入，渲染结果应该一致；渲染逻辑不要产生副作用。把
UI 理解为“状态的视图”有助于构建可预测、可测试的界面——当 state 改变时，框架负责把 UI 从旧状态更新到新状态（差分/重渲染）。
面试要点：强调纯函数、可重现性、单向数据流、不可变性带来的简单比较（引用 shallow compare 优势）。
代码 demo：

## 2. 虚拟 DOM（Virtual DOM）是什么？它解决了哪些实际问题？

解释：虚拟 DOM 是 JS 对实际 DOM 的轻量内存表示（通常是树形对象）。当 state 改变时，框架先基于新的状态生成一棵新的虚拟
DOM，然后对新旧虚拟 DOM 做差分（reconciliation），只把必要的最小修改（patch）应用到真实 DOM。它解决了：频繁操作真实 DOM
的性能开销、手工高复杂度 DOM 更新逻辑以及跨平台渲染抽象（如服务端渲染、原生渲染）。
面试要点：区别“直接操作 DOM”与“构建树->差分->最小更新”的优势；并说明虚拟 DOM 并非万能（正确的性能策略还需避免过度重渲染、使用键
key 等）。
代码 demo（手写简化版本的虚拟 DOM diff）：

## 3. 说说你对 JSX 的理解

解释：`JSX` 是 `JavaScript` 的语法扩展，编写起来像 HTML，但本质是 `React.createElement(type, props, ...children)` 的语法糖。JSX
提高可读性、把组件结构表达为声明式树，并且允许在模板中直接使用 JS 表达式。编译工具（Babel/TypeScript）把 JSX 转成普通 JS
对象（React 元素）。
面试要点：解释 JSX 并不是模板引擎，强调表达式能力（花括号）、条件渲染、列表渲染与 key、以及与类型系统（TSX）的协作。
代码 demo：

## 4. 函数组件和类组件的本质区别是什么？

解释：本质上两者都是将 props 映射到 UI 的函数式抽象，但区别在于实现与生命周期模型：
类组件：通过 `class` `Component` `extends` `React.Component`，生命周期方法为实例方法（`constructor`、`componentDidMount` 等），内部使用
`this.state`，`this` 语义。
函数组件：本质上是函数（无实例），通过 Hooks（如 `useState`、`useEffect`）管理状态与副作用。Hooks 提供更灵活的组合能力、避免 this
相关陷阱，并鼓励小粒度复用。
React 团队的方向（从 React 16.8 后）是以函数组件` + Hooks` 为主流，类组件仍被支持但不推荐新写。
代码 demo（同功能对比）：

## 5. 为什么 React 中 props 不可变（immutable）？

解释：`props` 是父组件下发给子组件的只读输入参数。不可变性保证了组件之间的边界清晰——子组件不会悄然改变父组件的数据源。此外，不可变数据便于进行浅比较（`reference`
`compare`）从而优化渲染（`shouldComponentUpdate` / `PureComponent` / `memo`），减少不必要的重渲染。若需要改变父数据，应通过回调把意图通知父组件由父修改状态。
代码示例（错误示范 + 正确做法）：
参见：不可变数据便于引用比较与性能优化（可理解参考 React 文档）。`bennadel.com+1`

## 6. React 的 Fiber 架构主要是为了解决什么问题？

解释：`Fiber` 是对 `React` 内部 `reconciler` 的重写，目标是支持增量渲染与可中断/优先级调度。在早期版本 `React`
在执行大量同步渲染时会阻塞主线程，影响动画与交互体验。Fiber 将渲染拆分为可中断的“工作单元”，允许 `React`
在渲染中插入优先级判断与让步（yield），从而改善动画、手势响应以及并发特性（`concurrent` `rendering`）的实现基础。
面试要点：说明两个阶段（`reconciliation` 与 `commit`），Fiber 如何让中断与恢复成为可能，以及它对
`useTransition`/并发渲染等特性的支撑作用。`LogRocket Blog+1`
简化示意代码（伪代码展示任务分片）：

## 7. React 中的 key 属性有什么作用？

解释：key 用于在列表渲染时帮助 React 辨认元素的身份，从而在做 diff 时能正确地保留/复用 DOM 节点并最小化变更。合适的
key（稳定且唯一，如数据库 id）避免了错误的节点复用（例如输入框光标跳动、组件内部 state 错位）。不推荐使用索引作为
key（在列表会发生插入/删除/排序时会破坏复用）。
代码 demo：

## ## 8. React 的事件机制和合成事件是如何工作的？

解释：React 使用“合成事件”（`SyntheticEvent`）作为跨浏览器的事件封装层。`React` 在根节点上绑定少量真实 DOM 事件（事件委托），当事件发生时，React
会构建合成事件对象并按组件树执行回调。合成事件的好处：统一跨浏览器行为、事件池（老版本）以复用对象、以及更简单的生命周期一致性（在某些场景下
React 能更好地控制事件顺序）。注意：事件处理器中的 `event.persist()` 可阻止事件被复用（旧机制），`React` 现在已改进事件对象生命周期但概念仍然一致。
代码 demo：

## ## 9. 受控组件（`controlled`）和非受控组件（`uncontrolled`）有什么区别？

解释：
受控组件：表单元素的值由 `React` `state` 完全控制`（value + onChange）`。好处：单一真相、便于验证、条件禁用、联动等。
非受控组件：表单元素自己管理内部 state，通过 ref 在需要时读取值（类似传统 DOM 表单）。适用于简单场景或需要与第三方库集成且不想每次输入都触发渲染。
代码 demo（对比）：

## ## 10. 为什么在 React 中“组合优于继承”？

    解释：组合（`composition`）更灵活、可组合、符合函数式思想；通过把小组件组合起来可以构建复杂功能，而继承往往造成紧耦合、难以复用、难以理解的类层级。React 的 `props / children / render-props / hooks` 都是组合的体现。官方建议使用组合来复用组件逻辑（而不是继承）。
    代码 demo（组合示例）：

## ## 11. `React` 的严格模式（`StrictMode`）有什么作用？

    解释：`<StrictMode>` 在开发模式下启用额外检查与警告（并不影响生产构建），如：
    检查过时的生命周期方法；
    在开发环境对组件 `mount/unmount` 进行双重调用以暴露副作用中的不纯代码（例如不正确的清理）；
    启用对某些未来改动的警告（如对 refs 的变化等）。
    面试要点：说明 `StrictMode` 通过“在开发环境下执行额外运行”帮你发现副作用和不安全的生命周期。
    代码 demo：

## ## 12. `useState` 的更新是异步的吗？

    解释：在 `React` 中调用 `setState`（或 `setX`）不会立即更新当前渲染中的变量——它会安排一次重新渲染，更新会在随后渲染周期反映出来。并且 React 会对同一事件循环中的多个更新进行批处理（React 18+ 的自动批处理扩展了批处理的情形）。因此从调用 setState 到 DOM 更新是异步的（对当前渲染而言）；但如果你在同一个渲染里多次调用 setState，React 可能会合并这些更新（尤其在使用函数式更新时行为确定）。
    代码 demo（说明）：
    关于自动批处理（React 18）的工作方式可参考官方发布说明。`react.dev`

## 13. 使用 useState 的函数式更新方式能带来哪些好处？

    解释：函数式更新`（setState(prev => newVal)）`的优势：
    保证在多次更新（尤其依赖旧值）时的正确性，避免闭包捕获旧 state 导致竞态；
    在批处理或异步回调中能安全地基于最新值做计算；
    更容易避免依赖数组问题。
    代码 demo：

## 14. “状态提升”这种模式有哪些优缺点？

    解释：
    优点：把共享 state 放到最近的共同祖先，能保证单一数据源、易于同步与逻辑集中，便于验证与持久化。
    缺点：会导致“祖先”组件变大`（prop drilling）`，频繁更新可能导致更多子组件重渲染，降低局部封装性。需要配合 `memo`、`context`、或拆分组件来缓解。
    代码 demo（状态提升）：
    缓解方案：用 context、或者把不变部分 memo 化，或使用局部状态与事件回传。

## 15. useReducer 相比 useState 优势体现在哪？

    解释：
    更适合描述复杂状态逻辑（多子值，基于操作类型的更新），便于把更新逻辑集中到 `reducer` 函数；
    便于在多个组件之间共享或抽离状态逻辑（将 `reducer` 提取为纯函数）；
    与中间件 / 日志 / 时间旅行（像 Redux）思想契合。
    代码 demo（计数器）：

```jsx
    function reducer (state, action) {
    switch (action.type) {
        case 'inc':
            return { count: state.count + 1 };
        case 'dec':
            return { count: state.count - 1 };
        default:
            return state;
    }
}

function Counter () {
    const [state, dispatch] = React.useReducer(reducer, { count: 0 });
    return (
        <>
            <button onClick={() => dispatch({ type: 'dec' })}>-</button>
            {state.count}
            <button onClick={() => dispatch({ type: 'inc' })}>+</button>
        </>
    );
}

```

## 16. 如何优化因 `useContext` 引起的性能问题？

    解释：`Context` 更新会触发所有消费该 `context` 的组件重新渲染（即使它们读取的值未改变）。优化策略：
    将 context 值拆分为更粒度的 `context`（避免频繁更新的大对象）；
    在提供方使用 useMemo 或稳定引用（避免每次 render 提供新对象）；
    消费方用 memo 并把 `context` 中仅必要字段传入子组件，或使用选择器/订阅模式（像 Zustand 的订阅）；
    把高频更新（如动画、光标位置）移出 `React state`，使用 `ref` 或外部 `store`。
    代码 `demo（useMemo 防止不必要重渲染）`：

   ```jsx
    function Provider ({ children }) {
    const [count, setCount] = React.useState(0);
    const value = React.useMemo(() => ({ count, increment: () => setCount(c => c + 1) }), [count]);
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
   ```

## 17. 说一下 Redux 的核心思想

    解释：`Redux` 的核心思想：
    单一源`（single source of truth）`：整个应用的 state 存在一个 store；
    状态只读：不能直接修改 `state`，只能派发 `action`；
    使用纯函数 `reducer` 描述 state 如何更新：`reducer` 接收旧 `state` 与 `action`，返回新 `state`（纯函数）。
    Redux 强调可预测性、时间旅行（`devtools`）、中间件链（处理异步/副作用）与易于测试。
   ` 代码 demo（基本 Redux 概览，使用 @reduxjs/toolkit 推荐）`：

   ```jsx
    // 使用 Redux Toolkit 简化
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counter = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        inc: s => { s.value += 1; },
        dec: s => { s.value -= 1; }
    }
});

const store = configureStore({ reducer: { counter: counter.reducer } });
store.dispatch(counter.actions.inc());
console.log(store.getState());

```