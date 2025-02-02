---
title: 简介
createTime: 2024/11/11 00:31:04
permalink: /notes/minecraft/kubejs/addons/lootjs/introduction/
---

::: warning

本系列 LootJS 笔记基于 Minecraft 1.21+，并且大部分内容都将翻译自[官方Wiki](https://docs.almostreliable.com/lootjs/)和我个人的理解。

:::

## 关于 LootJS {#about_lootjs}

LootJS 是一个基于 Neoforge开发的 KubeJS 附属模组，最主要的作用是帮助我们使用编程的方式来修改战利品表。

LootJS主要包括 `LootJS.lootTables()` 和 `LootJS.modifiers()` 这两个事件。并且这两个事件都是服务器端，因此所有脚本应该放置于 `server_scripts` 下。

## 事件差异 {#event_difference}

### LootJS.lootTables()

此事件允许直接修改通过数据包加载的战利品表，从而在不丢失抽取(rolls)、条件(conditions)、战利品函数(loot functions)等信息的情况下进行更新。您可以遍历战利品表的各个部分并进行修改。由于是直接修改，因此这些更改会在 JER 或 RER 等模组中得到反映。

### LootJS.modifiers()

此事件对于战利品表的修改是在一个战利品表进行抽取后动态调用。也就是说该事件不直接修改战利品表，只是直接修改最终的战利品，因此只写更改不会再 JER 或 RER 等模组中得到反映。

NeoForge 提供了[全局战利品修改器（Global Loot Modifier）](https://docs.neoforged.net/docs/resources/server/loottables/glm/)系统，允许 mod 在抽取出特定战利品表时动态添加战利品。这些信息不在战利品表中，意味着 `LootJS.lootTables()` 事件无法跟踪任何关于它们的信息。相反，它们可以通过 `LootJS.modifiers()` 事件进行修改，因为它在 NeoForge 提供的钩子之后运行。
