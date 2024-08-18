---
author: Riri
pubDatetime: 2024-08-18 17:00
title: Server-only data fetch
featured: true
tags:
  - release
description: Server-only data fetch.
---

## 路由跳转时的数据请求

在 Next.js 中，你可以使用 `getServerSideProps` 进行数据请求。这一 API 的前身叫做 `getInitialProps`
两者的区别就是 `getServerSideProps` 中的所有的逻辑都只在服务端执行，而 `getInitialProps` 则是服务端渲染时在服务端执行，前端路由跳转时会在客户端执行。

> 本文不会详细介绍 Next.js 中的 API，如果需要了解其具体功能可以阅读：[data-fetching](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)、[getInitialProps](https://nextjs.org/docs/pages/api-reference/functions/get-initial-props)

只在服务端执行的数据获取有诸多优点：

- 可以在逻辑中书写只有服务端才能执行的代码，如连接数据库或者 Node API
- 可以使用体积非常大的库处理数据而无需担心你的网页加载时间变得更久。比如你可以在服务端使用 `shiki` 渲染具有语法高亮的代码块，而用户无需将其下载到浏览器中。
- 在 SSG（静态页面生成）中，这也会保证不同路由的初始数据在“首次加载时”与“路由跳转时”是一致的（每个路由的初始数据应在构建时获取完毕，而不是在用户浏览时进行路由跳转才获取）。

## `React-router` 中的 `loader`

我一直在开发维护一个名为 [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) 的库，它的作用是以最小侵入的方式，在 Vite 中实现基于 React-router 的 SSG。

> 什么？你问我最小侵入是多小？你只需：
>
> ```diff
> // package.json
> {
>   "scripts": {
> -   "build": "vite build"
> +   "build": "vite-react-ssg build"
>     // If you need ssr when dev
> -   "dev": "vite",
> +   "dev": "vite-react-ssg dev",
>   }
> }
> ```
>
> ```tsx
> // src/main.ts
> import { ViteReactSSG } from 'vite-react-ssg'
> import routes from './App.tsx'
>
> export const createRoot = ViteReactSSG(
>   // react-router-dom data routes
>   { routes },
>   // function to have custom setups
>   ({ router, routes, isClient, initialState }) => {
>     // do something.
>   },
> )
> ```
>
> 即可实现开箱即用的 SSG。

作为使用了 React-router 的库，其自然拥有与 React-router 一样的数据获取方式：[`loader`](https://reactrouter.com/en/main/route/loader#loader)。

你可以很简单的在 vite-react-ssg 中使用 `loader` 实现路由级别的数据获取：

```tsx
import type { Params } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'

export function Component() {
  const data = useLoaderData()
  return (
    <div>{/* your component */}</div>
  )
}

export async function loader({ params }: { params: Params<string> }) {
  const data = await fetch(`/api/${params.path}/data`)
  return data
}
```

SSG 会在构建时调用每个路由的 `loader`，并使用其返回的数据去渲染每个页面。在用户访问某个路由时，对应路由的 `loader` 并不会被调用。

这很棒对吧？静态页面生成的数据就应该是静态的，只在构建时获取。

**但是，当用户在不同路由之间跳转时，情况就不一样了。**

这时，客户端的行为已经由 `React-router` 接管了。而 `React-router` 的行为就是会在每个路由跳转前调用目标路由的 `loader`，并在其完成后将数据注入到目标路由中以供渲染。

这代表着数据获取将会在用户访问时再次执行，静态页面不再静态。而且你无法在 `loader` 中编写只有在 node 中才能执行的逻辑，因为这段逻辑有可能会在用户的浏览器中执行。

## 实现仅在服务端执行的 `loader`

解决方案实际上会比想象中简单许多。

需要确保你编写的 `lodaer` 不在客户端执行，就需要显式地在客户端替换掉每条路由的 `loader`。

需要做到两点：

- 在构建时，依旧使用你编写的 `loader` 中的逻辑，去渲染每个页面，同时记录下每条路由 `loader` 的结果。
- 在客户端水和时，将每条路由的 `loader` 都替换为“获取到构建时记录的 `loader` 结果”

由于 `vite-react-ssg` 在开发模式下还会提供服务端渲染的能力，所以我还需要让每条路由在开发模式下的客户端行为变成“向服务端发起一个带有特殊参数的 GET 请求”，当开发服务器收到带有特殊参数的请求时，找到对应的路由的 `lodaer`，并返回其调用结果。

这部分的实现可见[这次提交](https://github.com/Daydreamer-riri/vite-react-ssg/commit/0cc31192da8a4594899516ee638166233d108fa1#diff-7c2c257c7c6cdac70e5dbc7bbc6e9b71798cc26828c205aa71a64bc96ca7afb4R128-R165)

至此，我们的 `loader` 将只在服务端执行。你可以编写任何只能在服务端执行的逻辑：

```tsx
import { useLoaderData } from 'react-router-dom'

export default function Docs() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return (
    <>
      <div>{data.key}</div>
      {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
      <div dangerouslySetInnerHTML={{ __html: data.packageCodeHtml }} />
    </>
  )
}

export const Component = Docs

export async function loader() {
  // The code here will not be executed on the client side,
  // and the modules imported will not be sent to the client.
  const fs = (await import('node:fs'))
  const cwd = process.cwd()
  const json = (await import('../docs/test.json')).default

  const packageJson = await fs.promises.readFile(`${cwd}/package.json`, 'utf-8')
  const { codeToHtml } = await import('shiki')
  const packageJsonHtml = await codeToHtml(packageJson, { lang: 'json', theme: 'vitesse-light' })

  return {
    ...json,
    packageCodeHtml: packageJsonHtml,
  }
}
```

就这样，我们又解锁了前端开发的新姿势。希望这篇分享能让你更加了解服务端渲染的过程。下次见！
