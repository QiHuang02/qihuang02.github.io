---
title: 物品
createTime: 2024/10/03 23:00:55
permalink: /notes/kubejs/basic/registry/item/
---

::: tip

注册物品是一个启动事件，因此我们需要在`startup_scripts`文件夹内创建脚本文件。并且因为是启动事件，所以无法进行热重载，写完脚本需要我们重启游戏才能加载我们的自定义内容。

:::

## 基本语法

```JS
StartupEvents.registry('item', (event) => {
    event.create(name, type)
});
```

## 方法

这里的`event.create(name, type)`可以通过链式调用为物品添加更多的属性，这对于魔改来说十分方便。以下是一些可以进行链式调用的方法。

::: details 点我查看常用方法

|==\$BuilderBase<$Item>方法==|描述|
|:-|:-:|
|`displayName($Component$$Type)`|为物品设置名称，当存在lang文件时会被覆盖|
|`tag($ResourceLocation$$Type)`|为物品添加标签,例如 `minecraft:stone`|
|`translationKey(string)`|为物品设置翻译键,例如 `block.minecraft.stone`|
|==$ItemBuilder方法==|描述|
|`use($ItemBuilder$UseCallback$$Type)`|判断玩家是否开始使用该物品|
|`color(integer,  $ItemTintFunction$$Type)`|通过索引为物品上色,用于有多层纹理的情况|
|`color($ItemTintFunction$$Type)`|通过索引为物品上色|
|`maxStackSize()`|设置物品的最大堆叠数量。默认值为 64|
|`useDuration($ToIntBiFunction$$Type<($ItemStack), ($LivingEntity)>)`|物品使用的时间长度。例如，在进食食物时，这是进食食物所需的时间。这可以改变进食速度，或用于其他用途（如制作自定义弓）。|
|`hurtEnemy($Predicate$$Type<($ItemBuilder$HurtEnemyContext)>)`|当物品被用来伤害实体时被调用。|
|`food(integer, float)`|设置物品的饱和度和饱食度|
|`food($Consumer$$Type<($FoodBuilder)>)`|设置物品的食品属性|
|`disableRepair()`|设置物品为不可修复|
|`useAnimation($UseAnim$$Type)`|确定使用该物品时的动画效果，例如吃食物时的动画|
|`unstackable()`|设置物品无法堆叠，也就是设置物品的最大堆叠数量为1|
|`containerItem($ResourceLocation$$Type)`|设置物品的容器物品，例如牛奶桶的桶|
|`burnTime($TickDuration$$Type)`|设置物品的燃烧时间。默认为 0（非燃料）|
|`maxDamage(integer)`|设置物品的最大耐久度。默认为 0（无耐久度）|
|`releaseUsing($ItemBuilder$ReleaseUsingCallback$$Type)`|当玩家在使用物品的过程中没有完成，而是半途松开了鼠标右键时。以弓为例，当玩家松开鼠标右键时，箭就会被射出。为了确保弓不会完成使用，Minecraft 将 `useDuration` 设置为一个非常高的数值（1 小时）|
|`jukeboxPlayable($ResourceKey$$Type<($JukeboxSong)>, boolean)`|设置物品可以在唱片机中播放音乐|
|`finishUsing($ItemBuilder$FinishUsingCallback$$Type)`|当玩家完成物品的使用时。这仅在 `useDuration` 计时器走完时触发。例如，在进食时，这发生在玩家吃完食物后，此时饥饿值恢复|
|`fireResistant(boolean)`|使物品具有类似下界合金工具的防火特性（或不具有）|
|`rarity($Rarity$$Type)`|设置物品的稀有度。可以填入的参数有：`common`、`uncommon`、`rare`、`epic`|
|`barColor($Function$$Type<($ItemStack), ($KubeColor$$Type)>)`|设置物品耐久度条的颜色|
|`tooltip($Component$$Type)`|设置物品的工具提示|
|`barWidth`|设置物品耐久度条的宽度。该函数应返回一个介于 0 到 13（条最大宽度）之间的值|
|`glow(boolean)`|设置物品是否具有附魔光效，不论该物品是否具有附魔|

:::

## 参数解释

`name` 物品的物品的id

`type` 物品的类型

::: details 点我查看更多

|type|描述|
|:-:|:-:|
|sword|剑|
|pickaxe|镐|
|axe|斧|
|shovel|铲|
|hoe|锄|
|shears|剪刀|
|helmet|头盔|
|chestplate|胸甲|
|legging|护腿|
|boots|鞋子|
|animal_armor|动物装甲|
|smithing_template|锻造模板|

:::
