---
title: EmendatusEnigmaticaJS
createTime: 2024/10/01 00:35:39
permalink: /notes/minecraft/kubejs/project/emendatusenigmaticajs/
---

<CardGrid>
    <ImageCard
    image='/images/eejs_1.png'
    title="EmendatusEnigmaticaJS"
    />
    <ImageCard
    image='/images/eejs_2.png'
    title="EmendatusEnigmaticaJS"
    />
</CardGrid>

## 关于 EmendatusEnigmaticaJS

EmendatusEnigmaticaJS最初来自于整合包[Omniworld](https://n-wither.github.io/projects/omniworld/)，但是Omniworld目前任然停留在1.20.1，于是我修改了部分代码，将其带到1.21。

需要更多资源请查看[我的仓库](https://github.com/QiHuang02/StellarisSpace/tree/main/kubejs/assets/emendatusenigmatica)

> [!important]
>
> 目前仍然处于 ==WIP== 状态
>
> ToDoList：
>
> - [x] 修复方块类型的模型和纹理问题
> - [x] 添加自动创建矿物方块类型的LootTable文件集成
> - [x] 添加锭、宝石、粒、板、棒、齿轮等物品的注册
> - [x] 添加对Mekanism的集成（仅完成物品的注册，化学品相关暂缓）
> - [ ] 添加液体类型的集成
> - [ ] 添加本地化集成
> - [ ] 添加配方集成
> - [ ] 自动将注册的物品放入自定义的创造模式物品栏中
> - [ ] ~~添加工具类型（稿、斧、锹、剑）的注册~~
> - [ ] ~~添加装备类型（头盔、胸甲、护腿、鞋子）的注册~~
> - [ ] ~~添加矿物生成~~
> - [ ] 优化代码结构

[[TOC]]

### Strata.js

这一部分代码主要定义了矿物的地层，也是指容纳矿物的岩石。

```JS :collapsed-lines
// Strata.js
// priority: 200

global.EE_STRATAS = {
    stone: {
        name: 'stone',
        texture: 'minecraft:block/stone',
        fill: 'minecraft:stone',
        hardness: 1.5,
        resistance: 6,
        tool: 'pickaxe'
    },
    andesite: {
        name: 'andesite',
        texture: 'minecraft:block/andesite',
        fill: 'minecraft:andesite',
        hardness: 1.5,
        resistance: 6,
        tool: 'pickaxe'
    },
    diorite: {
        name: 'diorite',
        texture: 'minecraft:block/diorite',
        fill: 'minecraft:diorite',
        hardness: 1.5,
        resistance: 6,
        tool: 'pickaxe'
    },
    granite: {
        name: 'granite',
        texture: 'minecraft:block/granite',
        fill: 'minecraft:granite',
        hardness: 1.5,
        resistance: 6,
        tool: 'pickaxe'
    },
    deepslate: {
        name: 'deepslate',
        texture: 'minecraft:block/deepslate',
        fill: 'minecraft:deepslate',
        hardness: 3,
        resistance: 6,
        tool: 'pickaxe'
    },
    netherrack: {
        name: 'netherrack',
        texture: 'minecraft:block/netherrack',
        fill: 'minecraft:netherrack',
        hardness: 0.4,
        resistance: 0.4,
        tool: 'pickaxe'
    },
    end_stone: {
        name: 'end_stone',
        texture: 'minecraft:block/end_stone',
        fill: 'minecraft:end_stone',
        hardness: 3,
        resistance: 9,
        tool: 'pickaxe'
    }
};
```

### Global.js

这一部分主要用于定义一些全局的设定，例如各种路径、各种Json模板。

```JS :collapsed-lines
// Global.js
// priority: 199

global.modid = 'emendatusenigmatica';
Platform.setModName(`${global.modid}`, 'Emendatus Enigmatica');

const assetspath = `./kubejs/assets/${global.modid}`;
const datapath = `./kubejs/data/${global.modid}`;

const paths = {
    models: {
        block: `${assetspath}/models/block/`,
    },
    textures: {
        block: `${assetspath}/textures/blocks/templates`,
        item: `${assetspath}/textures/items/templates`
    },
    loots: {
        block: `${datapath}/loot_table/blocks/`,
    },
    recipes: {
        recipe: `${datapath}/recipe/`
    }
};

const OreLootJson = (block, item, sequence, min, max) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "bonus_rolls": 0.0,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "predicates": {
                                            "minecraft:enchantments": [
                                                {
                                                    "enchantments": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ],
                            "name": block
                        },
                        {
                            "type": "minecraft:item",
                            "functions": [
                                {
                                    "add": false,
                                    "count": {
                                        "type": "minecraft:uniform",
                                        "max": max,
                                        "min": min
                                    },
                                    "function": "minecraft:set_count"
                                },
                                {
                                    "enchantment": "minecraft:fortune",
                                    "formula": "minecraft:ore_drops",
                                    "function": "minecraft:apply_bonus"
                                },
                                {
                                    "function": "minecraft:explosion_decay"
                                }
                            ],
                            "name": item
                        }
                    ]
                }
            ],
            "rolls": 1.0
        }
    ],
    "random_sequence": sequence
});

function createLootOre(name, strata, drop) {
    let loot = JsonIO.read(`${paths.loots.block}${name}_ore_${strata}.json`) || {};
    if (loot.type === undefined) {
        console.log(`No block loot table found, creating new: ${name}_ore_${strata}.json`);
        let min = parseInt(drop.min);
        let max = parseInt(drop.max);
        JsonIO.write(
            `${paths.loots.block}${name}_ore_${strata}.json`,
            OreLootJson(
                `emendatusenigmatica:${name}_ore_${strata}`,
                `${drop.item}`,
                `emendatusenigmatica:blocks/${name}_ore_${strata}`,
                min,
                max
            )
        )
    }
};
```

### EmendatusEnigmatica.js

这一部分是EmendatusEnigmaticaJS最主要的一个部分，几乎所有的注册逻辑都在此。

```JS :collapsed-lines
// EmendatusEnigmatica.js
// priority: 199

global.modid = 'emendatusenigmatica';
Platform.setModName(`${global.modid}`, 'Emendatus Enigmatica');

const assetspath = `./kubejs/assets/${global.modid}`;
const datapath = `./kubejs/data/${global.modid}`;

const paths = {
    models: {
        block: `${assetspath}/models/block/`,
    },
    textures: {
        block: `${assetspath}/textures/blocks/templates`,
        item: `${assetspath}/textures/items/templates`
    },
    loots: {
        block: `${datapath}/loot_table/blocks/`,
    },
    recipes: {
        recipe: `${datapath}/recipe/`
    }
};

const OreLootJson = (block, item, sequence, min, max) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "bonus_rolls": 0.0,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "predicates": {
                                            "minecraft:enchantments": [
                                                {
                                                    "enchantments": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ],
                            "name": block
                        },
                        {
                            "type": "minecraft:item",
                            "functions": [
                                {
                                    "add": false,
                                    "count": {
                                        "type": "minecraft:uniform",
                                        "max": max,
                                        "min": min
                                    },
                                    "function": "minecraft:set_count"
                                },
                                {
                                    "enchantment": "minecraft:fortune",
                                    "formula": "minecraft:ore_drops",
                                    "function": "minecraft:apply_bonus"
                                },
                                {
                                    "function": "minecraft:explosion_decay"
                                }
                            ],
                            "name": item
                        }
                    ]
                }
            ],
            "rolls": 1.0
        }
    ],
    "random_sequence": sequence
});

function createLootOre(name, strata, drop) {
    let loot = JsonIO.read(`${paths.loots.block}${name}_ore_${strata}.json`) || {};
    if (loot.type === undefined) {
        console.log(`No block loot table found, creating new: ${name}_ore_${strata}.json`);
        let min = parseInt(drop.min);
        let max = parseInt(drop.max);
        JsonIO.write(
            `${paths.loots.block}${name}_ore_${strata}.json`,
            OreLootJson(
                `emendatusenigmatica:${name}_ore_${strata}`,
                `${drop.item}`,
                `emendatusenigmatica:blocks/${name}_ore_${strata}`,
                min,
                max
            )
        )
    }
};
```

### Material.js

这一部分主要用于材料的定义。

```JS :collapsed-lines
// Material.js
// priority: 197

let commonStratas = ['stone', 'andesite', 'diorite', 'granite', 'deepslate', 'netherrack', 'end_stone'];
let vanillaComplementStratas = ['netherrack', 'end_stone'];

/**
 * @type {EEConfig[]}
 */
global.EE_MATERIALS = [
    // Vanilla
    // Coal
    {
        name: 'coal',
        type: 'dust',
        processedTypes: ['dust'],
        color: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e'],
        burnTime: 1600
    },
    // Iron
    {
        name: 'iron',
        type: 'metal',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#ffffff', '#c9c9c9', '#828282', '#5e5e5e', '#353535'],
        strata: vanillaComplementStratas,
        drop: {
            item: 'minecraft:raw_iron',
            min: 1,
            max: 1
        },
        harvestLevel: 'stone'
    },
    // Copper
    {
        name: 'copper',
        type: 'metal',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#f7e6b7', '#f8b18d', '#cc6d51', '#a1383f', '#781c22'],
        strata: vanillaComplementStratas,
        drop: {
            item: 'minecraft:raw_copper',
            min: 2,
            max: 5
        },
        harvestLevel: 'stone'
    },
    // Gold
    {
        name: 'gold',
        type: 'metal',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#ffffff', '#fcf8a7', '#fad64a', '#dc9613', '#b26411'],
        strata: ['end_stone'],
        drop: {
            item: 'minecraft:raw_gold',
            min: 1,
            max: 1
        },
        harvestLevel: 'iron'
    },
    // Netherite
    {
        name: 'netherite',
        type: 'metal',
        processedTypes: ['nugget', 'dust', 'gear', 'plate', 'rod'],
        color: ['#737173', '#4d494d', '#443d3f', '#31292a', '#271c1d']
    },
    // Diamond
    {
        name: 'diamond',
        type: 'gem',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#f2fffc', '#a1fbe8', '#20c5b5', '#1aaaa7', '#1c919a'],
        strata: vanillaComplementStratas,
        drop: {
            item: 'minecraft:diamond',
            min: 1,
            max: 1
        },
        harvestLevel: 'iron'
    },
    // Emerald
    {
        name: 'emerald',
        type: 'gem',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#e6fcee', '#41f384', '#00aa2c', '#009529', '#007b18'],
        strata: vanillaComplementStratas,
        drop: {
            item: 'minecraft:emerald',
            min: 1,
            max: 1
        },
        harvestLevel: 'iron'
    },
    // Amethyst
    {
        name: 'amethyst',
        type: 'gem',
        processedTypes: ['dust', 'gear', 'plate', 'rod'],
        color: ['#fcfad2', '#fbc9e3', '#b18cf0', '#8b69ca', '#6e4ea9']
    },
    // Quartz
    {
        name: 'quartz',
        type: 'gem',
        processedTypes: ['dust', 'gear', 'plate', 'rod'],
        color: ['#ffffff', '#eae5de', '#d4caba', '#b6a48e', '#897b73']
    },
    // Lapis
    {
        name: 'lapis',
        type: 'gem',
        processedTypes: ['dust', 'gear'],
        color: ['#9db5ed', '#5981e1', '#1d54a9', '#1f4294', '#173782']
    },
    // Universal Modded Metals
    // Aluminum
    {
        name: 'aluminum',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#f2fafc', '#dfedf2', '#c5dbed', '#9da8c9', '#7a80a8'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_aluminum',
            min: 1,
            max: 1
        }
    },
    // Osmium
    {
        name: 'osmium',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#e6ede9', '#abd1ca', '#83b0bd', '#3d5680', '#2c3766'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_osmium',
            min: 1,
            max: 1
        }
    },
    // Lead
    {
        name: 'lead',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'iron',
        strata: commonStratas,
        color: ['#aebcbf', '#707e8a', '#414a6a', '#28254d', '#1f1d47'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_lead',
            min: 1,
            max: 1
        }
    },
    // Nickel
    {
        name: 'nickel',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'mekanism', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#f6f7f0', '#b0b59f', '#869071', '#5a5c57', '#40423f'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_nickel',
            min: 1,
            max: 1
        }
    },
    // Silver
    {
        name: 'silver',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'mekanism', 'bloodmagic'],
        harvestLevel: 'iron',
        strata: commonStratas,
        color: ['#ffffff', '#d8ecff', '#baccff', '#7b85d9', '#646db4'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_silver',
            min: 1,
            max: 1
        }
    },
    // Tin
    {
        name: 'tin',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#ebfaf9', '#bcd7e5', '#a1a6d3', '#74609e', '#473b61'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_tin',
            min: 1,
            max: 1
        }
    },
    // Uranium
    {
        name: 'uranium',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#ebe06a', '#98b350', '#43692f', '#113817', '#072411'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_uranium',
            min: 1,
            max: 1
        }
    },
    // Zinc
    {
        name: 'zinc',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'mekanism', 'bloodmagic'],
        harvestLevel: 'iron',
        strata: commonStratas,
        color: ['#efece6', '#d1d1a5', '#9ca67b', '#54714c', '#3c5a3b'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_zinc',
            min: 1,
            max: 1
        }
    },
    // Universal Modded Gems
    // Sulfur
    {
        name: 'sulfur',
        type: 'gem',
        processedTypes: ['ore', 'gem', 'dust', 'storage_block'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#fff8e5', '#ffea47', '#ded531', '#bdc43b', '#a0ad3b'],
        drop: {
            item: 'emendatusenigmatica:sulfur_gem',
            min: 1,
            max: 1
        },
        gemTemplate: 8
    },
    // Niter
    {
        name: 'niter',
        type: 'gem',
        processedTypes: ['ore', 'gem', 'dust', 'storage_block'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#ffffff', '#e0dde4', '#aea5b8', '#8b7f9a', '#716978'],
        drop: {
            item: 'emendatusenigmatica:niter_gem',
            min: 1,
            max: 1
        },
        gemTemplate: 8
    },
    // Fluorite
    {
        name: 'fluorite',
        type: 'gem',
        processedTypes: ['ore', 'gem', 'dust', 'storage_block'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: [],
        drop: {
            item: 'emendatusenigmatica:fluorite_gem',
            min: 2,
            max: 4
        }
    },
    // Misc
    // Wood
    {
        name: 'wood',
        type: 'misc',
        processedTypes: ['dust', 'storage_block'],
        color: ['#b8945f', '#987849', '#745a36', '#5f4a2b', '#4c3d26']
    },
    // Ender Pearl
    {
        name: 'ender_pearl',
        type: 'misc',
        processedTypes: ['dust', 'storage_block'],
        color: ['#8cf4e2', '#349988', '#0c3730', '#0b4d42', '#063931']
    },
    // Coal Coke
    {
        name: 'coal_coke',
        type: 'misc',
        processedTypes: ['gem', 'dust', 'storage_block'],
        color: ['#819da6', '#2e4049', '#1c1c1e', '#252525', '#1a2a36'],
        burnTime: 3200
    },
    // Alloys
    // Electrum
    {
        name: 'electrum',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#f4f7eb', '#eded91', '#e5b840', '#a85d1b', '#8c3a0e']
    },
    // Invar
    {
        name: 'invar',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#ffffff', '#b8c4bf', '#8d9f96', '#5b7669', '#495e57']
    },
    // Constantan
    {
        name: 'constantan',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#f0e8d8', '#e5c09e', '#d8876b', '#943a38', '#781e24']
    },
    // Bronze
    {
        name: 'bronze',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#ebe9be', '#ebd288', '#d38c53', '#ba5b2f', '#9c3a27']
    },
    // Signalum
    {
        name: 'signalum',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#ffe4c9', '#fc8638', '#e55c17', '#993d0f', '#82260d']
    },
    // Lumium
    {
        name: 'lumium',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#fdfff7', '#e5f3b5', '#dcd56b', '#bf8c39', '#a87132']
    },
    // Enderium
    {
        name: 'enderium',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#5de8cc', '#289799', '#1c5961', '#0b2e47', '#0f1e36']
    },
    // Brass
    {
        name: 'brass',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#dfedcc', '#c7d477', '#b5a642', '#8c6322', '#6b3c0d']
    },
    // Steel
    {
        name: 'steel',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#e4e6eb', '#9ea0a3', '#818185', '#454552', '#31313b']
    },
    {
        name: 'infinity',
        type: 'metal',
        processedTypes: ['ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block'],
        harvestLevel: 'end_stone',
    }
];

global.EE_MATERIALS.forEach(
    /**
     * 
     * @param {EEConfig} material 
     */
    material => {
        new EmendatusEnigmaticaJS(material).registry();
    }
);
```
