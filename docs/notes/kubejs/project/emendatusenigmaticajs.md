---
title: EmendatusEnigmaticaJS
createTime: 2024/10/01 00:35:39
permalink: /notes/kubejs/project/emendatusenigmaticajs/
---

## 关于 EmendatusEnigmaticaJS

EmendatusEnigmaticaJS最初来自于整合包[Omniworld](https://n-wither.github.io/projects/omniworld/)，但是Omniworld目前任然停留在1.20.1，于是我修改了部分代码，将其带到1.21。

需要更多资源请查看[我的仓库](https://github.com/QiHuang02/StellarisSpace)

> [!warning]
>
> 目前仍然处于WIP状态
>
> ToDoList：
>
> - [ ] 修复Ore类型的模型和纹理问题
> - [x] 自动创建Ore类型的LootTable文件
> - [ ] 修改Block类型的纹理设置
> - [x] 添加粗矿物及其方块的注册
> - [x] 添加锭、宝石、粒、板、棒、齿轮等物品的注册
> - [x] 添加对Mekanism的支持
> - [ ] 添加工具类型（稿、斧、锹、剑）的注册
> - [ ] 添加装备类型（头盔、胸甲、护腿、鞋子）的注册
> - [ ] 添加液体类型的注册
> - [ ] 添加矿物生成
> - [ ] 优化代码结构

[[TOC]]

### Strata.js

这一部分代码主要定义了矿物的地层，也是指容纳矿物的岩石。

```JS
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

```JS
// Global.js
// priority: 199

global.modid = 'emendatusenigmatica';

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

const OreModelJson = (base, overlay) => ({
    loader: 'neoforge:composite',
    parent: 'block/block',
    ambientocclusion: false,
    textures: {
        particle: base
    },
    children: {
        solid: {
            parent: 'block/cube_all',
            render_type: 'minecraft:solid',
            textures: {
                all: base,
            },
        },
        translucent: {
            parent: 'block/cube_all',
            render_type: 'minecraft:translucent',
            textures: {
                all: overlay,
            },
        },
    },
});

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

function createModelOre(name, strata) {
    let model = JsonIO.read(`${paths.models.block}${name}_ore_${strata}.json`) || {};
    if(model.parent === undefined) {
        console.log(`No block model found, creating new: ${name}_ore_${strata}.json`);
        JsonIO.write(
            `${paths.models.block}${name}_ore_${strata}.json`,
            OreModelJson(
                global.EE_STRATAS[strata].texture,
                `emendatusenigmatica:block/overlays/ore/${name}`
            )
        )
    }
};

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

Platform.setModName(`${global.modid}`, 'Emendatus Enigmatica');
```

### EmendatusEnigmatica.js

这一部分是EmendatusEnigmaticaJS最主要的一个部分，几乎所有的注册逻辑都在此。

```JS
// EmendatusEnigmatica.js
// priority: 198

/**
 * 
 * @param {EEConfig} config
 * @returns
 */
function EmendatusEnigmaticaJS(config) {
    this.name = config.name;
    this.type = config.type;
    this.harvestLevel = config.harvestLevel;
    this.processedTypes = config.processedTypes;
    this.strata = config.strata;
    this.color = config.color;
    this.burnTime = config.burnTime || undefined;
    this.gemTemplate = config.gemTemplate || -1;
    this.drop = config.drop;
};

EmendatusEnigmaticaJS.prototype = {
    registry() {
        let name = this.name;
        let type = this.type;
        let harvestLevel = this.harvestLevel;
        let processedTypes = this.processedTypes;
        let strata = this.strata;
        let color = this.color;
        let burnTime = this.burnTime;
        let gemTemplate = this.gemTemplate;
        let drop = this.drop;

        processedTypes.forEach((ptypes) => {
            switch(ptypes) {
                case 'ore':
                    registryOre(name, strata, harvestLevel, color, type, drop);
                    break;
                case 'raw':
                    registryRaw(name,color);
                    break;
                case 'ingot':
                case 'gem':
                    registryWithBlock(ptypes, name, color, burnTime, gemTemplate, processedTypes);
                    break;
                case 'dust':
                case 'gear':
                case 'nugget':
                case 'plate':
                case 'rod':
                    registryItem(ptypes, name, color, burnTime);
                    break;
                case 'mekanism':
                    registryMek(name, color);
                    break;
                case 'bloodmagic':
                    registryBlood(name, color);
                    break;
                case 'crush':
                    registryCrush(name, color);
                    break;
            }
        })
    }
};

/**
 * Description placeholder
 *
 * @param {String} name
 * @param {String} strata
 * @param {String} harvestLevel
 * @param {String[]} color
 * @param {String} type
 * @param {String} drop
 */
function registryOre(name, strata, harvestLevel, color, type, drop) {
    strata.forEach((strata) => {
        StartupEvents.registry('block', (event) => {
            let ore = event.create(`${global.modid}:${name}_ore_${strata}`)
            .modelGenerator((model) => {
                model.parent(`${global.EE_STRATAS[strata].texture}`)
                // model.texture()
            })
            .color(0, '#b8945f')
            .parentModel(`${global.modid}:block/ore/${strata}`)
            .renderType('cutout')
            .hardness(global.EE_STRATAS[strata].resistance)
            .soundType(SoundType.STONE)
            .requiresTool(true)
            .tagBoth('c:ores')
            .tagBoth(`c:ores/${name}`)
            .tagBoth(`c:ore_rates/singular`)
            .tagBlock(`minecraft:mineable/${global.EE_STRATAS[strata].tool}`)
            .tagBlock(`c:mineable/paxel`)
            .tagBlock(`minecraft:needs_${harvestLevel}_tool`)
            .tagBoth(`c:ores_in_ground/${strata}`)
            // createModelOre(name, strata);
            createLootOre(name, strata, drop);
        })
    })
}

/**
 * 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 */
function registryRaw(name, color) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`emendatusenigmatica:raw_${name}`)
            .tag('c:raw_materials')
            .tag(`c:raw_materials/${name}`)

            if(color) {
                for (let i = 0; i < color.length; i++) {
                    builder.texture(`layer${i}`, `${global.modid}:item/templates/raw/0${i}`)
                        .color(i, color[i]);
                }
            }
    });
    StartupEvents.registry('block', (event) => {
        let builder = event.create(`${global.modid}:raw_${name}_block`)
            .texture(`${global.modid}:block/overlays/raw_${name}_block`)
            .tagBoth('c:storage_blocks')
            .tagBoth(`c:storage_blocks/raw_${name}`)
            .tagBlock('minecraft:mineable/pickaxe')
            .soundType(SoundType.METAL)
            .requiresTool(true)
            .hardness(3)
            .resistance(3);
    });
};

/**
 * 
 * @param {String} type 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 * @param {Number} burnTime It can be a specific number or undefined 
 * @param {Number} gemTemplate If the type of a material is a gem, 
 * then there must be a value to specify the texture of the material, which is a specific number, from 1 to 10.
 * @param {String} processedTypes All processed types of one material.
 */
function registryWithBlock(type, name, color, burnTime, gemTemplate, processedTypes) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_${type}`)
            .tag(`c:${type}s`)
            .tag(`c:${type}s/${name}`)

            if (burnTime) builder.burnTime(burnTime)
            if (color) {
                switch(type) {
                    case 'ingot':
                        for (let i = 0; i < color.length; i++) {
                            builder.texture(`layer${i}`, `${global.modid}:item/templates/${type}/0${i}`)
                            .color(i, color[i]);
                        };
                        break;
                    case 'gem':
                        if (gemTemplate > -1 && color) {
                        for (let i = 0; i < color.length; i++) {
                            builder.texture(`layer${i}`, `${global.modid}:item/templates/gem/template_${gemTemplate}/0${i}`)
                            .color(i, color[i]);
                            }
                        };
                        break;
                }
            }
        }
    )
    if (processedTypes.includes('storage_block')){
        StartupEvents.registry('block', (event) => {
            let builder = event.create(`${global.modid}:${name}_block`)
                .texture(`${global.modid}:block/overlays/${name}_block`)
                .tagBoth('c:storage_blocks')
                .tagBoth(`c:storage_blocks/${name}`)
                .tagBlock('minecraft:mineable/pickaxe')
                .soundType(SoundType.METAL)
                .requiresTool(true)
                .hardness(3)
                .resistance(3)

                if (burnTime) 
                    builder.item(i => {
                        i.burnTime(burnTime * 10)
                    builder.tagBoth('fuelgoeshere:forced_fuels')
                });
            }
        );
    }
};

/**
 * 
 * @param {String} type 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 * @param {Number} burnTime The combustion value of the material.
 */
function registryItem(type, name, color, burnTime) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_${type}`)
            .tag(`c:${type}s`)
            .tag(`c:${type}s/${name}`);
        
            if (burnTime) {
                builder.burnTime(burnTime)
                builder.tag('fuelgoeshere:forced_fuels')
            };
            if (color) {
                for (let i = 0; i < color.length; i++) {
                    builder.texture(`layer${i}`, `${global.modid}:item/templates/${type}/0${i}`)
                    .color(i, color[i]);
                }
            }
        }
    );
};

function registryMek(name, color) {
    StartupEvents.registry('item', (event) => {
        let crystal = event.create(`${global.modid}:${name}_crystal`).tag('mekanism:crystals').tag(`mekanism:crystals/${name}`)
        let shard = event.create(`${global.modid}:${name}_shard`).tag('mekanism:shards').tag(`mekanism:shards/${name}`)
        let clump = event.create(`${global.modid}:${name}_clump`).tag('mekanism:clumps').tag(`mekanism:clumps/${name}`)
        let dirtyDust = event.create(`${global.modid}:${name}_dirty_dust`).tag('mekanism:dirty_dusts').tag(`mekanism:dirty_dusts/${name}`)

        if(color) {
            for (let i = 0; i < color.length; i++) {
                crystal.texture(`layer${i}`, `${global.modid}:item/templates/crystal/0${i}`)
                .color(i, color[i]);
                shard.texture(`layer${i}`, `${global.modid}:item/templates/shard/0${i}`)
                .color(i, color[i]);
                clump.texture(`layer${i}`, `${global.modid}:item/templates/clump/0${i}`)
                .color(i, color[i]);
                dirtyDust.texture(`layer${i}`, `${global.modid}:item/templates/dirty_dust/0${i}`)
                .color(i, color[i]);
            }
        }
    });
};

function registryBlood(name, color) {
    StartupEvents.registry('item', (event) => {
        let fragment = event.create(`${global.modid}:${name}_fragment`).tag('bloodmagic:fragments').tag(`bloodmagic:fragments/${name}`);
        let gravel = event.create(`${global.modid}:${name}_gravel`).tag('bloodmagic:gravels').tag(`bloodmagic:gravels/${name}`);

        if (color) {
            for (let i = 0; i < color.length; i++) {
                fragment.texture(`layer${i}`, `${global.modid}:item/templates/fragment/0${i}`)
                .color(i, color[i]);
                gravel.texture(`layer${i}`, `${global.modid}:item/templates/gravel/0${i}`)
                .color(i, color[i]);
            }
        }
    })
};

function registryCrush(name, color) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_crushed_ore`)
            .tag('create:crushed_raw_materials')
            .tag(`create:crushed_raw_materials/${name}`)
        
        if(this.color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/crushed_ore/0${i}`)
                .color(i, color[i]);
            };
        }
    });
};
```

### Material.js

这一部分主要用于材料的定义。

```JS
// Material.js
// priority: 197

let commonStratas = ['andesite', 'diorite', 'granite' ,'stone', 'deepslate', 'netherrack', 'end_stone'];
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
        type: 'dust',
        processedTypes: ['dust', 'storage_block'],
        color: ['#b8945f', '#987849', '#745a36', '#5f4a2b', '#4c3d26']
    },
    // Ender Pearl
    {
        name: 'ender_pearl',
        type: 'dust',
        processedTypes: ['dust', 'storage_block'],
        color: ['#8cf4e2', '#349988', '#0c3730', '#0b4d42', '#063931']
    },
    // Coal Coke
    {
        name: 'coal_coke',
        type: 'gem',
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
