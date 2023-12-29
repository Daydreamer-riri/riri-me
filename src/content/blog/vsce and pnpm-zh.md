---
author: Riri
pubDatetime: 2023-03-22T17:18:59.136Z
title: vsce 与 pnpm 的兼容问题
featured: true
tags:
  - release
description: Compatibility issues between vsce and pnpm
---

在我准备发布 VS Code 扩展时，`vsce` 出现了依赖问题。

类似于这样：

```sh
npm ERR! missing: @sindresorhus/is@^1.0.0, required by got@10.5.5
npm ERR! missing: @szmarczak/http-timer@^4.0.0, required by got@10.5.5
npm ERR! missing: @types/cacheable-request@^6.0.1, required by got@10.5.5
npm ERR! missing: cacheable-lookup@^2.0.0, required by got@10.5.5
npm ERR! missing: cacheable-request@^7.0.1, required by got@10.5.5
npm ERR! missing: decompress-response@^5.0.0, required by got@10.5.5
npm ERR! missing: duplexer3@^0.1.4, required by got@10.5.5
npm ERR! missing: get-stream@^5.0.0, required by got@10.5.5
npm ERR! missing: lowercase-keys@^2.0.0, required by got@10.5.5
npm ERR! missing: mimic-response@^2.0.0, required by got@10.5.5
npm ERR! missing: p-cancelable@^2.0.0, required by got@10.5.5
npm ERR! missing: p-event@^4.0.0, required by got@10.5.5
...
```

这大概是因为 `pnpm` 的 symlinks 与 `vsce` 不兼容，如果使用 `yarn` 进行依赖安装就不会遇到类似的问题。

我更改了我的 workflows 来解决这个问题：

1. 不再使用 `vsce` 进行打包，转而使用 `tsup`

```sh
tsup src/extension.ts --format cjs --external vscode --no-shims
```

2. 在调用 `vsce` 时使用 `--no-dependencies` 跳过 vsce 的打包过程，使其无需寻找依赖

```sh
npx @vscode/vsce publish --no-dependencies
```
