---
title: 简介
createTime: 2024/11/11 00:31:04
permalink: /notes/minecraft/kubejs/addons/lootjs/introduction/
---

::: warning

本系列 LootJS 笔记基于 Minecraft 1.21+

:::

LootJS 是一个基于 Neoforge开发的 KubeJS 附属模组，最主要的作用是帮助我们使用编程的方式来修改战利品表。

LootJS主要包括 `LootJS.lootTables()` 和 `LootJS.modifiers()` 这两个事件。并且这两个事件都是服务器端，因此所有脚本应该放置于 `server_scripts` 下。
