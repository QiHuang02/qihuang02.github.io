---
title: 方块
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

::: details 点我查看常用方法

|==\$BuilderBase<$Block>方法==|描述|
|:-|:-:|
|`displayName($Component$$Type)`|为方块设置名称，当存在lang文件时会被覆盖|
|`tag($ResourceLocation$$Type)`|为方块添加标签,例如 `minecraft:stone`|
|`translationKey(string)`|为方块设置翻译键,例如 `block.minecraft.stone`|
|==$BlockBuilder方法==|描述|
|`box(double, double, double, double, double, double, boolean)`|设置方块的形状|
|`color(integer,  $BlockTintFunction$$Type)`|通过索引为方块上色,用于有多层纹理的情况|
|`color($BlockTintFunction$$Type)`|通过索引为方块上色|
|`item($Consumer$$Type<($ItemBuilder)>)`|修改方块的物品表示形式|
|`fullBlock(boolean)`|设置方块是否应该是一个完整的块，类似于仙人掌或门|
|`noItem()`|设置该方块没有对应的物品|
|`noDrops()`|设置该方块没有掉落物|
|`tagBlock(($ResourceLocation$$Type)[])`|设置方块的标签|
|`hardness(float)`|设置方块硬度。默认值为 1.5。将此值设置为-1 将使方块不可破坏，如同基岩|
|`tagItem(($ResourceLocation$$Type)[])`|设置方块对应物品（`blockitem`）的标签|
|`exploded($Consumer$$Type<($BlockExplodedCallbackJS)>)`|设置此方块在爆炸后的反应。注意，此时方块已经被摧毁|
|`notSolid()`|设置方块不为固体|
|`steppedOn($Consumer$$Type<($EntitySteppedOnBlockCallbackJS)>)`|设置当实体踩到方块时发生的事情|
|`fallenOn($Consumer$$Type<($EntityFallenOnBlockCallbackJS)>)`|设置当实体掉落在方块上时发生的事情|
|`bounciness(float)`|实体落在该方块上时，会根据其弹跳性乘以下落速度进行弹跳。不要将弹跳性设置为负值，因为这会导致实体掉入虚空！|
|`tagBoth(($ResourceLocation$$Type)[])`|同时设置该方块和该方块对应的物品的标签|
|`lightLevel(float)`|设置方块的发光等级，默认为0（不发光）|
|`jumpFactor(float)`|设置实体在方块上能跳多高的高度|
|`drops($BlockDropSupplier$$Type)`|改变方块的掉落物|
|`soundType($SoundType$$Type)`|设置方块的声音，默认为木头|
|`randomTick($Consumer$$Type<($RandomTickCallbackJS)>)`|设置方块的随机tick回调|
|`rightClick($Consumer$$Type<($BlockRightClickedKubeEvent)>)`|设置方块的鼠标右键回调|
|`blockEntity($Consumer$$Type<($BlockEntityInfo)>)`|为该方块创建方块实体|
|`noCollision()`|使该方块不与实体碰撞|
|`transparent(boolean)`|使方块透明|
|`resistance(float)`|设置方块的抗爆强度。默认值为3|
|`canBeReplaced($Predicate$$Type<($CanBeReplacedCallbackJS)>)`|设置是否可以将该方块替换为其他东西|
|`opaque(boolean)`|设置方块为不透明。不透明方块不允许光线穿透|
|`renderType($BlockRenderType$$Type)`|设置块的渲染类型。可以是 `cutout`、`cutout_mipped`、`translucent` 或 `solid`|
|`requiresTool()`|设置方块需要对应的工具挖掘才会掉落|

:::

## 参数解释

`name` 方块的id

`type` 方块的类型

::: details 点我查看更多

|type|描述|
|:-:|:-:|
|detector|侦测器|
|slab|台阶|
|stairs|楼梯|
|fence|栅栏|
|wall|锄|
|fence_gate|栅栏门|
|pressure_plate|压力板|
|button|按钮|
|falling|重力方块|
|crop|作物|
|cardinal|朝向方块|
|carpet|地毯|
|door|门|
|trapdoor|活板门|

:::
