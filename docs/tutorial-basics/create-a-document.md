---
sidebar_position: 2
---

# 基础知识

<!--truncate-->
### 钩子函数

其实和回调是一个概念，当系统执行到某处时，检查是否有hook(钩子)，有的话就会执行回调。

通俗的说，hook就是在程序运行中，在某个特定的位置，框架的开发者设计好了一个钩子来告诉我们当前程序已经运行到特定的位置了，会触发一个回调函数，并提供给我们，让我们可以在生命周期的特定阶段进行相关业务代码的编写

**总的来说，Vue的生命周期可以分为以下八个阶段**

- beforeCreate 实例创建前
- created 实例创建完成
- beforeMount 挂载前
- mounted 挂载完成
- beforeUpdate 更新前
- updated 更新完成
- beforeDestory 销毁前
- destoryed 销毁完成

### [#](https://www.123fe.net/principle-docs/vue/01-从源码解读Vue生命周期.html#beforecreate)beforeCreate

这个钩子是new Vue()之后触发的第一个钩子，在当前阶段中data、methods、computed以及watch上的数据和方法均不能被访问。

### [#](https://www.123fe.net/principle-docs/vue/01-从源码解读Vue生命周期.html#created)created

这个钩子在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果你非要想，可以通过vm.$nextTick来访问Dom。

### [#](https://www.123fe.net/principle-docs/vue/01-从源码解读Vue生命周期.html#beforemount)beforeMount

这个钩子发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated

### [#](https://www.123fe.net/principle-docs/vue/01-从源码解读Vue生命周期.html#mounted)mounted

这个钩子在挂载完成后发生，在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$refs属性对Dom进行操作。也可以向后台发送请求，拿到返回数据

### [#](https://www.123fe.net/principle-docs/vue/01-从源码解读Vue生命周期.html#beforeupdate)beforeUpdate

这个钩子发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染

### [#](https://www.123fe.net/principle-docs/vue/01-从源码解读Vue生命周期.html#updated)updated

这个钩子发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新

### [#](https://www.123fe.net/principle-docs/vue/01-从源码解读Vue生命周期.html#beforedestroy)beforeDestroy

这个钩子发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。

### [#](https://www.123fe.net/principle-docs/vue/01-从源码解读Vue生命周期.html#destroyed)destroyed

这个钩子发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁

**注意点**

在使用生命周期时有几点注意事项需要我们牢记

1.除了beforeCreate和created钩子之外，其他钩子均在服务器端渲染期间不被调用。
2.上文曾提到过，在updated的时候千万不要去修改data里面赋值的数据，否则会导致死循环。
3.Vue的所有生命周期函数都是自动绑定到this的上下文上。 所以，你这里使用箭头函数的话，就会出现this指向的父级作用域，就会报错。
 
