---
author: Riri
pubDatetime: 2023-04-15T03:18:27.536Z
title: Type Eslint Config
featured: true
tags:
  - release
description: Type Eslint Config.
---
I recently found a tool to assist in configuring eslint, called [eslint-defint-config](https://github.com/Shinigami92/eslint-define-config).

At first, I thought it could only assist in entering the outermost fields, such as extends, override, etc.

But I was wrong, it uses a very clever method to generate all the types of rules, including the types of rules for many common plugins.

```ts
export async function loadPlugin(plugin: Plugin): Promise<Plugin> {
  const mod: any = await import(plugin.module)
  const rules: PluginRules
    = plugin.module === 'eslint'
      ? Object.fromEntries(
        new mod.Linter().getRules().entries(),
      )
      : mod.rules ?? mod.default.rules
  return { ...plugin, rules }
}
```

So, it can complement almost any rule! And You can even be prompted by JsDoc what the rule does.

<img alt="preview" src="/blog/type-eslint-config/img.png">

As you can see, even a rule's options can be complemented!

I highly recommend using it.
