---
title: Attribute
createTime: 2024/11/17 17:32:38
permalink: /notes/minecraft/misc/attribute/
---

Attribute (属性) 是决定生物、盔甲架和玩家某些特性的值。属性具有调整其效果强度的修饰符。

[[TOC]]

## Applying attributes {#applying_attributes}

属性可以直接通过指令 `/attribute` 来修改生物、盔甲架和玩家的属性。

## Attribute {#attribute}

每个独立的属性都控制着生物的一些能力，例如攻击伤害和速度等。所有的属性值都是双精度浮点数。

一个属性总是有一个基础值，并且可能有任意数量的[修饰符](#modifiers)。属性还有默认值（用于生成具有未定义属性基础值的怪物时使用），以及硬编码的最小和最大值。修饰符作用于属性的基础值，但计算出的值始终受最小值和最大值的限制。

因此一个生物的属性最终以计算值生效。

### 目前所有的属性值 {#all_current_attribute_values}

:::important
这里仅列出 1.21.1 版本提供的属性值。
:::

|属性名称|属性ID|类型|描述|
|:-:|:-:|:-:|:-:|
|护甲值|`generic.armor`|正面|护甲值|
|盔甲韧性|`generic.armor_toughness`|正面|盔甲韧性值|
|攻击伤害|`generic.attack_damage`|正面|攻击造成的伤害值，以半颗心为单位|
|击退|`generic.attack_knockback`|正面|攻击造成的击退强度的增量|
|攻击速度|`generic.attack_speed`|正面|攻击速度|
|着火时间|`generic.burning_time`|负面|设置生物剩余着火时间效果的乘数|
|爆炸击退抗性|`generic.explosion_knockback_resistance`|正面|生物对爆炸击退的抵抗强度|
|摔落伤害倍数|`generic.fall_damage_multiplier`|负面|生物受到的摔落伤害的乘数|
|飞行速度|`generic.flying_speed`|正面|飞行速度修正数|
|生物跟随距离|`generic.follow_range`|正面|生物AI可追踪和寻路的最大范围|
|重力|`generic.gravity`|中性|生物在垂直方向上持续受到的向下加速的加速度|
|跳跃力度|`generic.jump_strength`|正面|生物进行跳跃时获得的垂直速度|
|击退抗性|`generic.knockback_resistance`|正面|生物对击退的抵抗强度|
|幸运值|`generic.luck`|正面|高幸运值使玩家获得更好的战利品|
|最大伤害吸收值|`generic.max_absorption`|正面|生物的最大伤害吸收值|
|最大生命值|`generic.max_health`|正面|生物的最大生命值|
|移动效率|`generic.movement_efficiency`|正面|生物对脚下方块影响移动效果的抵抗|
|速度|`generic.movement_speed`|正面|生物的地面移动速度|
|额外氧气|`generic.oxygen_bonus`|正面|生物抵抗氧气下降的能力|
|安全摔落高度|`generic.safe_fall_distance`|正面|生物不受摔落伤害的高度|
|尺寸|`generic.scale`|中性|生物的尺寸乘数|
|最大行走高度|`generic.step_height`|正面|生物不需要跳跃就可以走上的最大高度|
|水中移动效率|`generic.water_movement_efficiency`|正面|生物对水影响移动效果的抵抗|
|方块破坏速度|`player.block_break_speed`|正面|玩家破坏方块的速度乘数|
|方块交互距离|`player.block_interaction_range`|正面|玩家可以与方块交互的距离|
|实体交互距离|`player.entity_interaction_range`|正面|玩家可以与实体交互的距离|
|挖掘效率|`player.mining_efficiency`|正面|玩家的挖掘速度增量|
|潜行速度|`player.sneaking_speed`|正面|玩家的潜行时的速度乘数|
|水下挖掘速度|`player.submerged_mining_speed`|正面|玩家浸没在水中时的挖掘速度乘数|
|横扫伤害比率|`player.sweeping_damage_ratio`|正面|玩家的横扫伤害于近战伤害的比例|
|僵尸增援|`zombie.spawn_reinforcements`|正面|僵尸生成僵尸增援的能力|

## Modifiers {#modifiers}

Modifiers (修饰符) 作用于[属性](#attribute)的基础值。被修饰符修改后的值总会在一个属性的最低值和最高值之间，例如：在原版中，`armor` 属性的最小值和最大值为`[0，30]`，当我们将玩家的护甲值经过修饰符后获得一个值为 `32` 时，该属性在游戏中任然会表现为30护甲值。

与[属性](#attribute)一样，修饰符也具有一个[命名空间ID](Resource_location.md#namespace-命名空间)。

修饰符的ID或名称与它的具体效果无关，而由它的`作用属性类型（type）`、 `运算模式（operation）`和`修饰值（amount）`决定。

### Operations {#operations}

修饰符运算模式决定了它是如何对属性的基础值进行修改的。

更多关于运算模式请查看[Wiki](https://zh.minecraft.wiki/w/属性#运算模式)。
