---
title: Namespace
createTime: 2024/09/30 21:22:20
permalink: /notes/minecraft/misc/namespace/
---

> [!note]
>
> 以下内容来自于[Minecraft中文百科 命名空间ID#命名空间](https://zh.minecraft.wiki/w/命名空间ID?variant=zh-cn#命名空间)

命名空间起到了对资源的隔离作用。它可防止潜在的内容冲突或无意中覆盖了相同名称的对象。

例如，通过修改`zombie.json`战利品表来改变僵尸的战利品：假设此时没有命名空间存在，那么所有资源都将直接存储于数据包根目录下。此时管理与原版有差异的资源将相当困难——若新增一个`zombie.json`僵尸战利品表，则必定会完全覆盖掉原版数据包中的僵尸战利品表。使用命名空间，可以有效增加一个不同的`zombie.json`僵尸战利品表，且数据包作者和游戏都能够很轻松地识别。例如，原版僵尸战利品表位于minecraft命名空间内，而新增的僵尸战利品表位于`my_test`命名空间内，则这两个僵尸战利品表将被明确地识别为`minecraft:zombie`和`my_test:zombie`。

## `minecraft`命名空间

游戏本身使用`minecraft`命名空间。当没有指定命名空间时，将默认为`minecraft`[仅Java版]。只有当项目需要覆盖或修改现有的“minecraft”数据或将内容加入到原版标签时，才应该使用`minecraft`命名空间。比如在`minecraft:load`函数标签中加入函数。

> [!note]
>
> 当你在进行KubeJS魔改时，如果你想注册一个物品（或是方块等），KubeJS会默认使用`kubejs`作为命名空间。

## 自定义命名空间

不同的项目或内容创作（例如数据包、资源包、mod等），命名空间应该是不同的。仅当需要覆盖其他项目，或是追加标签的时候，才使用与其他项目相同的命名空间。

为了防止潜在的冲突，命名空间应该尽可能的特殊。

- 避免使用一堆字母的组合。例如，一个名为“nuclear craft”的项目不应该使用命名空间`nc`，因为太简单了。
- 避免使用过于模糊的词语。`battle_royale`也不能提供便于查找的信息，不过`player_name_battle_royale`会更好些。

这些不当的命名空间都会减少项目的适应程度，并在将多个项目加入到游戏时给调试带来困难。
