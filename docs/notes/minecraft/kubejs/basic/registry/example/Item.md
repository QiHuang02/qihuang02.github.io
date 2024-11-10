---
title: 物品注册
createTime: 2024/10/26 20:50:54
permalink: /notes/minecraft/kubejs/basic/registry/example/item/
outline: [2,6]
---

## ==自定义音频 & 唱片==

在这里将会说明如何创建一个可以播放自定义音频的唱片。这里提到的JS代码将会被放于`startup_scripts`和`server_scripts`文件夹下。

### 一、音频文件

1、首先我们得知道原版 Minecraft 只识别OGG格式的音频，所以第一步是先找一个OGG格式的音频。
例如我将某易云的歌下载下来并转换为OGG格式。

2、我们将OGG格式的音频文件放于 `./kubejs/assets/<namespace>/sounds/` 文件夹下。

### 二、注册音频

首先我们需要先注册音频，否则我们的唱片就是一个哑巴唱片，播放不了我们自定义的音频。

1、StartupEvents事件

我们需要先在启动事件中将音频注册进游戏

```JS
StartupEvents.registry('sound_event', (event) => {
    event.create('<namespace>:music_id')
})
```

2、ServerEvents事件

然后将我们刚才注册的音频注册为唱片音频

```JS
ServerEvents.registry('jukebox_song', (event) => {
    event.create('<namespace>:music_id')
         .song('<namespace>:music_id', time)
})
```

### 三、注册物品

```js
StartupEvents.registry('item', (event) => {
    event.create('<namespace>:music_id')
         .jukeboxPlayable('<namespace>:music_id', true)
})
```

### 四、编写sounds.json文件

```Json
{
    // 这里的 'music_id' 指的是刚才在注册唱片音频那里的 `music_id`
    "music_id": {
        // 固定格式
        "sounds": [
            {
                // 创建声音的文件夹 也就是我们上面的 kubejs/assets/<namespace>/sounds
                "name": "<namespace>:music_id",
                // 以声音流输出，建议填写true(唱片)
                "stream": true
            }
        ]
    },
}
```

### 五、本地化和纹理

纹理路径为`kubejs/assets/<namespace>/textures/item`，将已经画好的唱片材质放在该路径下并命名为`music_id.png`这里和物品id名称一样

#### 1、使用Json文件

```Json
{
    "item.<namespace>.music_id": "音乐唱片",
    "jukebox_song.<namespace>.music_id": "我的音乐 - 私人歌手",
    "sound.<namespace>.music_id": "我的音乐"
}
```

#### 2、使用Client事件

以下是我自己使用的一个简单的轮子

```JS
let discResourceLang = [
    [`<namespace>.music_id`, "zh_cn", "en_us", "singer"],
];
discResourceLang.forEach(([key, zh_cn, en_us, singer]) => {
    ClientEvents.lang('zh_cn', (event) => {
        event.add('jukebox_song.' + key, zh_cn + " - " + singer);
        event.add('sound.' + key, zh_cn);
    });
    ClientEvents.lang('en_us', (event) => {
        event.add('jukebox_song.' + key, en_us + " - " + singer);
        event.add('sound.' + key, zh_cn);
    })
});
```
