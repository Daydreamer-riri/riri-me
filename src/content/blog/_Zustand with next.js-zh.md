---
author: Riri
pubDatetime: 2023-05-26 18:00
title: Zustand with next.js
featured: true
tags:
  - release
description: zustand next.js
---

最近的工作中，我将项目中的`Redux`更换成了`Zustand`。

这个过程中遇到这个问题：在 next.js 中，客户端需要恢复服务端的状态。

Zustand 的基础写法是：

```ts
import { create } from 'zustand'

const useStore = create((set, get) => ({
  count: 0,
  increase: (by: number) => set({ count: get().increase + by })
}))
```

每次初始化时，InitialState都是相同，如果你在服务端已经设置过部分状态，则服务端与客户端的状态便不同步了。

所以我们需要将服务端的 store 状态序列化，随`getServerSideProps`带入到客户端，在客户端获取状态后将其作为客户端 store 的 InitialState。

```ts
async function getServerSideProps() {
  // 由于zustand的state同时包括actions，所以需要事先对其处理。
  const __PRELOADED_STATE__ = JSON.parse(JSON.stringify(zustandStore.getState()))
  return {
    __PRELOADED_STATE__,
  }
}
```

store 的初始化需要在一个可以获取到 `window.__NEXT_DATA__?.props.pageProps?.__PRELOADED_STATE__` 的地方。

```ts
import { createStore, useStore as useZustandStore } from 'zustand'

export function createUseStore<S, A = object>() {
  const useStore = <T>(
    selector: (state: S & Actions<S> & A) => T,
    equalityFn?: 'shallow' | ((left: T, right: T) => boolean),
  ) => {
    const store = useContext(zustandContext)

    if (!store)
      throw new Error('Store is missing the provider')

    if (equalityFn === 'shallow')
      equalityFn = shallow

    return useZustandStore(store, selector, equalityFn)
  }
  return useStore
}

export function initializeStore(initialState, extraAction) {
  const __PRELOADED_STATE__ = (typeof window === 'undefined' ? null : window.__NEXT_DATA__?.props.pageProps?.__PRELOADED_STATE__)

  const state = {
    ...initialState,
    ...(__PRELOADED_STATE__ || {}),
  }

  const generateActions = (state, set, get) => {
    return Object.keys(state).reduce((total, key) => {
      const actionName = `set${capitalize(key)}`
      total[actionName] = value => {
        typeof value === 'function'
          ? set({ [key]: value(get()[key]) })
          : set({ [key]: value })
      }
      return total
    }, {})
  }

  const store = createStore((set, get) => ({
    ...state,
    // 自动生成 actions
    ...generateActioins(state, set, get),
    ...(extraAction ? extraAction(set, get) : {}),
  }))

  return store
}
```
