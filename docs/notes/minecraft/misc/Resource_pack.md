---
title: Resource pack
createTime: 2024/11/17 22:20:48
permalink: /notes/minecraft/misc/resource_pack/
---

`Resource pack` (资源包) 系统为玩家提供了一种自定义纹理、模型、音乐、声音、语言、文本(如终末之诗、闪烁标语、鸣谢与著作权说明屏幕)和字体的方式。它们通常与数据包一起使用，以向游戏中添加新内容。

## 文件结构

::: file-tree

- \<资源包名称>
  - pack.mcmeta
  - pack.png
  - assets
    - \<namespace>
      - blockstates # 方块状态映射文件
        - xxx.json
      - font # 字体定义文件
        - aaa.json
        - bbb.zip
        - ccc.ttf
      - lang # 语言文件
        - xxx.json
      - models # 模型文件
        - xxx.json
      - particles # 粒子精灵图定义文件
        - xxx.json
      - sounds # 声音文件
        - xxx.ogg
      - shaders # 着色器文件
        - aaa.json
        - bbb.vsh
        - ccc.fsh
      - texts # 文本文件
        - aaa.txt
        - bbb.json
      - textures # 纹理文件
        - aaa.png
        - bbb.mcmeta

:::