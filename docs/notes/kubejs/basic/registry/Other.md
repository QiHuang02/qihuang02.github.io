---
title: Other
createTime: 2024/10/03 23:01:47
permalink: /notes/kubejs/basic/registry/other/
---

## 基本语法

```JS
StartupEvents.registry('item', (event) => {
    event.create(name, type)
});
```

## 函数

这里的`event.create(name, type)`可以通过链式调用为物品添加更多的属性，这对于魔改来说十分方便。以下是一些可以进行链式调用的函数。

::: details 点我查看更多

- `name()`
- `component()`
- `use()`
- `color()`
- `maxStackSize()`
- `subtypes`
- `createItemProperties()`
- `useDuration`
- `hurtEnemy`
- `food`
- `disableRepair`
- `useAnimation`
- `unstackable`
- `containerItem`
- `burnTime`
- `maxDamage`
- `releaseUsing`
- `jukeboxPlayable`
- `finishUsing`
- `fireResistant`
- `rarity`
- `barColor`
- `tooltip`
- `barWidth`
- `glow`
- `transformObject`

:::

## 参数解释

`name` 物品的物品的id

`type` 物品的类型

::: details 点我查看更多

|type|描述|
|:-:|:-:|
|sword|剑|

:::
