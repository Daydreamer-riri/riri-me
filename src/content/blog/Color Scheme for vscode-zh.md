---
author: Riri
pubDatetime: 2023-03-07T05:00:11.918Z
title: 获取 VS Code 的颜色方案
featured: true
tags:
  - release
description: Regarding how to retrieve color scheme in a VS Code extension.
---

这个问题起于我正在开发一款用于iconfont组件的提示插件时，我希望提示的图标颜色可以根据当前颜色主题的亮暗来变化，提高可阅读性。

VS Code extension 的 api 文档对我来说不是太清晰，在一开始我并没有寻找到相关的 api。

我从 antfu 的博客中发现了这样的方法：

> Since most of the themes follow the conversions of having Light or Dark in their names. Then we can have:
> 
> ``` js
> import { workspace } from 'vscode'
> 
> export function isDarkTheme() {
>   const theme = workspace.getConfiguration()
>     .get('workbench.colorTheme', '')
> 
>   // must be dark
>   if (theme.match(/dark|black/i) != null)
>     return true
> 
>   // must be light
>   if (theme.match(/light/i) != null)
>     return false
> 
>   // IDK, maybe dark
>   return true
> }
> ```

很有效，但是还是有些许别扭😣。于是我继续寻找，终于在 VS Code 的 issue 中发现我们可以这样获取亮暗主题：

```js
import { window } from 'vscode'

export function isDarkTheme() {
  const { kind } = window.activeColorTheme
  if (kind === 2 || kind === 3)
    return true
  else
    return false
}
```
