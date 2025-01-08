---
title: Loot Tables
createTime: 2025/01/08 21:38:04
permalink: /notes/minecraft/kubejs/addons/lootjs/loot_tables/
outline: [2,6]
---

::: important WIP

本篇笔记目前处于 WIP 状态

:::

## Loot Table Event

该事件允许我们直接修改战利品表，可以在其他模组将它们的战利品更改注入到原版战利品表之后触发。

### Loot Tbales

#### `getLootTableIds`

- 返回一个数组，该数组包括所有可用的战利品表的ID。支持过滤。
- 语法：
  - `getLootTableIds()`
  - `getLootTableIds(filter: string | regex)`

::: code-tabs

@tab 无过滤

```JS

LootJS.lootTables(event => {
    let ids = event.getLootTableIds()
})

```

@tab 有过滤

```JS

LootJS.lootTables(event => {
    let ids = event.getLootTableIds(/.*chests\/.*/)
})

```

:::

#### `getLootTable`

- 返回指定ID的战利品表，若没有对应的战利品表则返回 `null`。
- 语法：
  - `getLootTable(id: string)`

```JS

LootJS.lootTables(event => {
    let table = event.getLootTable("minecraft:chests/simple_dungeon")

    console.log(table)

    // 实际测试中会直接报错（模组版本3.2.2）
})

```

#### `hasLootTable`

- 返回一个 `boolean` 值用于表示一个给定ID的战利品表是否存在。
- 语法：
  - `hasLootTable(id: string)`

```JS

LootJS.lootTables(event => {
    let exists = event.hasLootTable("minecraft:chests/simple_dungeon")

    console.log(exists)

    // 若 exists 返回值为 true ，则该ID的战利品表存在
    // 若返回值为 false ，则该ID的战利品表不存在
})

```

#### `clearLootTables`

- 清空所有可以匹配给定过滤器的战利品表。
- 另外，我们可以直接对从 `getLootTable` 方法获得的战利品表对象上调用 `.clear()` 方法。
- 语法：
  - `clearLootTables(filter: string | regex)`

```JS

LootJS.lootTables(event => {
    event.getLootTable("minecraft:chests/bastion_treasure")
         .clear()
         .print()

    // 日志中将会打印以下信息：
    // Loot table: minecraft:chests/bastion_treasure
    // % Pools [
    // ]
})

```

#### `create`

- 创建一个新的[战利品表](./api/loottable.md)。
- 语法：
  - `create(id: string, type?: LootType)`, 其中 `type` 未指定的情况下，默认为 `LootType.CHEST`。

```JS

LootJS.lootTables(event => {
    event.create("lootjs:table1", LootType.ENTITY).createPool(pool => {
        // 编辑战利品池
    })
})

```

#### `modifyLootTables`

- 返回所有匹配给定过滤器的战利品表，并将它们作为一个集合返回。该集合允许您一次性修改所有匹配的战利品表。
- 另外，我们还可以通过使用战利品表类型来进行过滤。
- 语法：
  - `modifyLootTables(filter: LootTableFilter | LootTableFilter[])`，其中 一个 `LootTableFilter` 可以是一个字符串、正则表达式或者是一个 [`LootType`](../../../misc/LootType.md#all_loottype)。

::: code-tabs

@tab 单一过滤器

```JS

LootJS.lootTables(event => {
    event.modifyLootTables(/.*chests\/.*/).createPool(pool => {
        // 编辑战利品池
    })

    event.modifyLootTables(LootType.CHEST).createPool(pool => {
        // 编辑战利品池
    })
})

```

@tab 多重过滤器

```JS

LootJS.lootTables(event => {
    event.modifyLootTables(LootType.CHEST, "minecraft:gameplay/fishing").createPool(pool => {
        // 编辑战利品池
    })

    event.modifyLootTables(LootType.CHEST, LootType.ENTITY).createPool(pool => {
        // 编辑战利品池
    })
})

```

:::

### Block Loot Tables

#### `getBlockTable`

- 返回指定方块的战利品表，若没有对应的战利品表则返回 `null`。
- 语法：
  - `getBlockTable(block: string | Block)`

```JS

LootJS.lootTables(event => {
    let table = event.getBlockTable("minecraft:diamond_ore")

    
})

```

#### `modifyBlockTables`

- 返回所有匹配给定方块的战利品表，并将它们作为一个集合返回。该集合允许您一次性修改所有匹配的战利品表。

::: important

由于 Minecraft 1.21 之后的加载顺序，战利品表会在标签存在之前加载。因此，无法使用 `modifyBlockTables` 方法通过标签进行修改。

如果需要通过标签进行修改，请考虑使用 [`loot modifier event`](./loot_modifiers.md)。

:::

- 语法：
  - `modifyBlockTables(filter: string | string[] | Block | Block[])`

::: code-tabs

@tab 单一过滤器

```JS
LootJS.lootTables(event => {
    event.modifyBlockTables("minecraft:diamond_ore")
         .createPool(pool => {
        // edit the pool
    })
})
```

@tab 多重过滤器

```JS
LootJS.lootTables(event => {
    event.modifyBlockTables("minecraft:diamond_ore", "minecraft:emerald_ore")
         .createPool(pool => {
        // edit the pool
    })
})
```

:::

### Entity Loot Tables

#### `getEntityTable`

- 返回指定方块的战利品表，若没有对应的战利品表则返回 `null`。
- 语法：
  - `getEntityTable(entity: string | Block)`

```JS

LootJS.lootTables(event => {
    let table = event.getEntityTable("minecraft:sheep")

    
})

```

#### `modifyEntityTables`

- 返回所有匹配给定实体的战利品表，并将它们作为一个集合返回。该集合允许您一次性修改所有匹配的战利品表。

::: important

由于 Minecraft 1.21 之后的加载顺序，战利品表会在标签存在之前加载。因此，无法使用 `modifyEntityTables` 方法通过标签进行修改。

如果需要通过标签进行修改，请考虑使用 [`loot modifier event`](./loot_modifiers.md)。

:::

- 语法：
  - `modifyEntityTables(filter: string | string[] | EntityType | EntityType[])`

::: code-tabs

@tab 单一过滤器

```JS
LootJS.lootTables(event => {
    event.modifyEntityTables("minecraft:sheep")
         .createPool(pool => {
        // edit the pool
    })
})
```

@tab 多重过滤器

```JS
LootJS.lootTables(event => {
    event.modifyEntityTables("minecraft:sheep", "minecraft:pig")
         .createPool(pool => {
        // edit the pool
    })
})
```

:::

## 修改你的第一个战利品表 {#modify-your-first-loot-table}

## 创建你的第一个战利品表 {#create-your-first-loot-table}
