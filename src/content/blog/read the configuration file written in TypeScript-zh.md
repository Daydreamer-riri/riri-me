---
author: Riri
pubDatetime: 2023-03-29T11:16:19.363Z
title: 读取用TypeScript编写的配置文件
featured: true
tags:
  - release
description: Read the ts configuration file.
---

有时你会想在你的npm包，或者vscode扩展中读取一些配置。
如果用户的项目是JavaScript的，这做到这一点并不难，只需要使用动态引入：

```ts
const config = await import('config.js')
```

便可以得到配置文件的默认导出。
但如果是ts的配置文件，就相对复杂了。

目前许多npm包的配置文件都还不支持TypeScript，比如`webpack`，而`rollup`也需要显示指定ts插件才能使用`rollup.config.ts`。

不过[unjs](https://github.com/unjs)开源的[c12](https://github.com/unjs/c12)便可以让你轻松的获取配置文件。

```ts
// Get loaded config
const { config } = await loadConfig({})
```

它会默认读取项目根目录的配置文件。

不过在我的场景，我需要更灵活的获取某一个ts文件的默认导出，所以我使用了`c12`所依赖的[jiti](https://github.com/unjs/jiti)：

```ts
const config: Record<string, string> = await jiti(configPath, {
  interopDefault: true,
  cache: false,
  requireCache: false,
  v8cache: false,
  esmResolve: true,
})(configPath)
```

除了ts文件外，jiti还可以读取json文件的内容。
