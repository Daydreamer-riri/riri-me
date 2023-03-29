---
author: Riri
pubDatetime: 2023-03-29T11:16:20.363Z
title: Read the ts configuration file
featured: true
tags:
  - release
description: Read the ts configuration file.
---

Sometimes you may want to read some configurations in your npm package or vscode extension. If the user's project is in JavaScript, it is not difficult to achieve this by using dynamic imports:
```ts
const config = await import('config.js')
```
However, if it is a TypeScript configuration file, it is relatively complex.

Currently, many npm packages do not yet support TypeScript in their configuration files, such as `webpack`, and `rollup` also requires explicitly specifying the ts plugin to use `rollup.config.ts`.

However, the open-source [c12](https://github.com/unjs/c12) from [unjs](https://github.com/unjs) can easily help you obtain configuration files.
```ts
// Get loaded config
const { config } = await loadConfig({})
```

It will read the configuration file in the root directory by default.

However, in my scenario, I need a more flexible way to get the default export of a certain TypeScript file. Therefore, I used [jiti](https://github.com/unjs/jiti), which is relied on by `c12`.
```ts
const config: Record<string, string> = await jiti(configPath, {
  interopDefault: true,
  cache: false,
  requireCache: false,
  v8cache: false,
  esmResolve: true,
})(configPath)
```
Besides ts files, jiti can also read the content of json files.