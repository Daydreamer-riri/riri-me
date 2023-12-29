---
author: Riri
pubDatetime: 2023-03-22T17:18:59.136Z
title: Compatibility issues between vsce and pnpm
featured: true
tags:
  - release
description: Compatibility issues between vsce and pnpm
---

When I was preparing to publish my VS Code extension, `vsce` encountered a dependency issue.

Like this:

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

This is probably because the symlinks of `pnpm` are not compatible with `vsce`, if you use `yarn` for dependency installation you don't encounter similar problems.

I changed my workflows to solve this problem:

1. instead of using `vsce` for packaging, use `tsup`

```sh
tsup src/extension.ts --format cjs --external vscode --no-shims
```

2. Use `-no-dependencies` to skip the vsce packaging process when calling `vsce`, so it doesn't have to find dependencies

```sh
npx @vscode/vsce publish --no-dependencies
```
