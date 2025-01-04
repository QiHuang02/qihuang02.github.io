---
title: Resource location
createTime: 2024/09/30 21:22:20
permalink: /notes/minecraft/misc/Resource location/
---

`Resource location` (资源路径)，也被称为 `namespaced IDs`， `namespaced identifiers`， `resource identifiers`， 或者 `namespaced strings`，是一种用来声明和制定Minecraft中各种对象的方式，可以无歧义的识别内置的、自定义的对象，避免潜在的冲突。

## 定义 {#definition}

一个 `Resource location` 由两个部分组成:

`Resourcelocation` = `Namespac:Path`

一个 `Resourcelocation` 中仅能包含以下字符:

- 数字: `0123456789`
- 小写英文字母: `abcdefghijklmnopqrstuvwxyz`
- 下划线: `_`
- 连字符号: `-`
- 点: `.`

在 `Path` 部分还可以使用

- 正斜杠: `/`

### `Namespace` (命名空间) {#namespace}

- `Namespace`: 命名空间起到了对资源的隔离作用。它可防止潜在的内容冲突或无意中覆盖了相同名称的对象。也就是说命名空间可以有多个，但是必须唯一。
  
  例如，某一个模组ID为 `examplemod` 的模组使用 `examplemod` 作为命名空间，Minecraft 使用 `minecraft` 作为命名空间。假如在这两个命名空间下有一个同样名为 `stick` 的物品，但是由于它在两个命名空间中，所以其实是有两个物品存在，也就是 `examplemod:item/stick` 和 `minecraft:item/stick`。

### `Path` (路径) {#path}

- `Path`: 路径是指你命名空间内的任何对象。
  
  例如， `minecraft:cow` 是指向 `minecraft` 命名空间中名为 `cow` 的对象的引用，通常这个位置会被用来从实体注册表中获取实体牛。另一个例子是 `examplemod:example_item` ，可能被用来从物品注册表中获取你的模组 `example_item` 。
