---
title: Block Registry
createTime: 2024/10/03 23:01:02
permalink: /notes/kubejs/basic/registry/block/
---

## 基本语法

```JS
StartupEvents.registry('block', (event) => {
    event.create(name, type)
});
```

## 函数

这里的`event.create(name, type)`可以通过链式调用为物品添加更多的属性，这对于魔改来说十分方便。以下是一些可以进行链式调用的函数。

::: details 点我查看更多

- `createProperties()`
- `property`
- `box`
- `color`
- `displayname`
- `tag`
- `item`
- `fullBlock`
- `noItem`
- `noDrops`
- `tagBlock`
- `hardness`
- `tagItem`
- `exploded`
- `notSolid`
- `steppedOn`
- `fallenOn`
- `bounciness`
- `tagBoth`
- `lightLevel`
- `jumpFactor`
- `drops`
- `soundType`
- `mapColor`
- `randomTick`
- `rightClick`
- `blockEntity`
- `noCollision`
- `transparent`
- `resistance`
- `canBeReplaced`
- `opaque`
- `renderType`
- `instrument`
- `waterlogged`
- `slipperiness`
- `requiresTool`
- `viewBlocking`
- `canBeWaterlogged`
- `generateLootTable`
- `copyPropertiesFrom`
- `defaultCutout`
- `afterFallenOn`
- `noValidSpawns`
- `redstoneConductor`
- `mirrorState`
- `dynamicMapColor`
- `noSoundType`
- `gravelSoundType`
- `rotateState`
- `createShape`
- `placementState`
- `defaultTranslucent`
- `unbreakable`
- `speedFactor`
- `defaultState`
- `suffocating`
- `transformObject`

:::

## 参数解释

`name` 方块的物品的id

`type` 方块的类型

::: details 点我查看更多

|type|描述|
|:-:|:-:|
|detector|剑|
|slab|镐|
|stairs|斧|
|fence|铲|
|wall|锄|
|fence_gate|剪刀|
|pressure_plate|头盔|
|button|胸甲|
|falling|护腿|
|crop|鞋子|
|cardinal|动物装甲|
|carpet|锻造模板|
|door|锻造模板|
|trapdoor|锻造模板|

:::
