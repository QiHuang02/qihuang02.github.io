---
title: 客户端脚本
createTime: 2024/11/15 22:53:31
permalink: /minecraft/kubejs/basic/event/client_scripts/
---

`client_scripts` 文件夹包含每次客户端资源重新加载时都会加载的脚本。可以通过快捷键 `F3` + `T` 或者使用指令 `/kubejs reload client_scripts` 来对该文件夹下的脚本进行重载。

## 事件列表 {#event_list}

### **ItemEvents 事件** {#client_itemevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|rightClicked|-|link|
|crafted|-|link|
|dropped|-|link|
|dynamicTooltips|-|link|
|firstRightClicked|-|link|
|pickedUp|-|link|
|destroyed|-|link|
|entityInteracted|-|link|
|foodEaten|-|link|
|firstLeftClicked|-|link|
|canPickUp|-|link|
|smelted|-|link|
|modifyTooltips|-|link|

### **LevelEvents 事件** {#client_levelevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|beforeExplosion|-|link|
|tick|-|link|
|afterExplosion|-|link|

### **NetworkEvents 事件** {#client_networkevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|dataReceived|-|link|

### **RecipeViewerEvents 事件** {#client_recipeviewevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|addEntries|-|link|
|removeEntriesCompletely|-|link|
|addInformation|-|link|
|removeRecipes|-|link|
|removeEntries|-|link|
|removeCategories|-|link|
|registerSubtypes|-|link|
|groupEntries|-|link|

### **EntityEvents 事件** {#client_entityevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|afterHurt|-|link|
|spawned|-|link|
|drops|-|link|
|checkSpawn|-|link|
|death|-|link|
|beforeHurt|-|link|

### **ClientEvents 事件** {#client_clientevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|rightDebugInfo|-|link|
|particleProviderRegistry|-|link|
|leftDebugInfo|-|link|
|loggedIn|-|link|
|atlasSpriteRegistry|-|link|
|loggedOut|-|link|
|generateAssets|-|link|
|tick|-|link|
|lang|-|link|

### **BlockEvents 事件** {#client_blockevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|broken|-|link|
|placed|-|link|
|leftClicked|-|link|
|rightClicked|-|link|
|startedFalling|-|link|
|detectorPowered|-|link|
|farmlandTrampled|-|link|
|stoppedFalling|-|link|
|detectorUnpowered|-|link|
|detectorChanged|-|link|
|blockEntityTick|-|link|

### **PlayerEvents 事件** {#client_playerevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|chestOpened|-|link|
|tick|-|link|
|stageRemoved|-|link|
|stageAdded|-|link|
|chestClosed|-|link|
|inventoryClosed|-|link|
|inventoryChanged|-|link|
|inventoryOpened|-|link|