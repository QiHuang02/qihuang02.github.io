---
title: 太阳能发电机
createTime: 2024/09/30 18:16:09
permalink: /notes/kubejs/project/solar_panel/
---

<ImageCard
    image='/images/solar_panel.png'
    title="Solar Panel"
/>

想要使用KubeJS制作一个图中这样的太阳能发电机，我们得先解决几个问题

[[TOC]]

---

## 模型和纹理

我的世界支持Json格式的模型，那么我在这推荐一个Minecraft相关资源中的神器[Blockbench](../misc/software/blockbench.md)。它可以帮助我们快速制作出Json格式的模型文件和机器的纹理。

以下是我自己使用Blockbench制作的模型文件和纹理，如想使用请自取。对于代码中的`<namespace>`参数,请替换为自己的。详情请看[namespace](../misc/basic/namespace.md)。

- [solar_panel.json](https://github.com/QiHuang02/StellarisSpace/blob/main/kubejs/assets/stellaris_space/models/block/solar_panel.json)
- [solar_panel_base.png](https://github.com/QiHuang02/StellarisSpace/blob/main/kubejs/assets/stellaris_space/textures/block/solar_panel_base.png)
- [solar_panel_cell.png](https://github.com/QiHuang02/StellarisSpace/blob/main/kubejs/assets/stellaris_space/textures/block/solar_panel_cell.png)
- [solar_panel_column.png](https://github.com/QiHuang02/StellarisSpace/blob/main/kubejs/assets/stellaris_space/textures/block/solar_panel_column.png)

## 如何注册

注册是一个启动事件，因此代码需要以`ServerEvents.recipes`为头

```JS
StartupEvents.registry('block', (event) => {
    event.create('<namespace>:solar_panel', 'cardinal')
    .parentModel('<namespace>:block/solar_panel')
    .hardness(2)
    .resistance(100)
    .fullBlock(false)
    .requiresTool(false)
    .renderType('cutout')
    .box(0.1, 0, 0.1, 0.9, 0.5, 0.9, false)
    .suffocating(false)
    .viewBlocking(true)
    .blockEntity((entityInfo) => {
        entityInfo.energyStorage('energy', [], 2147483647, 0, 10000, 0)
        entityInfo.serverTicking()
        entityInfo.tickFrequency(20)
    });
});
```

你会发现这仅仅是注册了一个具有方块实体的方块，但是他不具备生成能量的作用，因此我们需要为它添加相应的功能。我选择监听该太阳能发电机的tick事件。

```JS
BlockEvents.blockEntityTick('<namecpace>:solar_panel', (event) => {
    let isDay = event.level.day;
    let isNight = event.level.night;
    let canSeeSky = event.block.canSeeSky;
    let entity = event.block.entity;

    if(canSeeSky) {
        if(isDay) entity.attachments.energy.addEnergy(500 * 20, false)
        else if(isNight) event.block.entity.attachments.energy.addEnergy(5 * 20, false)
    };
});
```

## 本地化

有两种方法来进行本地化

- 直接使用Json文件
- 使用KubeJS提供的方法

### 使用Json文件

```Json
{
    "block.<namespace>.solar_panel": "太阳能发电机"
}
```

### 使用Client事件

```JS
ClientEvents.lang('zh_cn', (event) => {
        event.add('block.<namespace>.solar_panel', '太阳能发电机');
});
```
