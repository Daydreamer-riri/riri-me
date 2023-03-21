---
author: Riri
pubDatetime: 2023-03-07T05:00:11.918Z
title: Color Scheme for VS Code
featured: true
tags:
  - release
description: Regarding how to retrieve color scheme in a VS Code extension.
---

When I was developing a prompt plugin for the icon font component, I wanted the color of the prompt icon to change according to the current color scheme to improve readability.

At first, the API documentation for VS Code extensions was not clear to me, and I couldn't find relevant APIs. 

Then I came across a method on antfu's blog:

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

This method was effective, but still somewhat awkward😣. So I continued my search and finally found in a VS Code issue that we can get the brightness of the current color theme like this:

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
