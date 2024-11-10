---
title: DataComponents
createTime: 2024/09/28 15:13:56
permalink: /notes/minecraft/misc/data_components/
---

&emsp;&emsp;数据组件是一对映射中的键值对，用于在[物品堆](1.Item.md#itemstack)上存储数据。每个数据片段，如烟花爆炸或工具，都是以实际对象的形式存储在堆栈上的，使得这些值在无需动态转换通用编码实例（如 `CompoundTag`、`JsonElement`）的情况下可见并可操作。
