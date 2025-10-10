---
title: 服务端脚本
createTime: 2024/11/15 22:53:42
permalink: /minecraft/kubejs/basic/event/server_scripts/
---

`server_scripts` 文件夹包含每次服务器资源加载时（世界加载， /reload ）都会加载的脚本。

## 事件列表 {#event_list}

### **ItemEvents 事件** {#server_itemevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|rightClicked|-|link|
|crafted|-|link|
|dropped|-|link|
|firstRightClicked|-|link|
|pickedUp|-|link|
|destroyed|-|link|
|entityInteracted|-|link|
|foodEaten|-|link|
|firstLeftClicked|-|link|
|canPickUp|-|link|
|smelted|-|link|
|modifyTooltips|-|link|

### **LevelEvents 事件** {#server_levelevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|loaded|-|link|
|unloaded|-|link|
|beforeExplosion|-|link|
|saved|-|link|
|tick|-|link|
|afterExplosion|-|link|

### **NetworkEvents 事件** {#server_networkevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|dataReceived|-|link|

### **RecipeViewerEvents 事件** {#server_recipeviewevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|addEntries|-|link|
|removeEntriesCompletely|-|link|
|addInformation|-|link|
|removeRecipes|-|link|
|removeEntries|-|link|
|afterExplosion|-|link|
|removeCategories|-|link|
|registerSubtypes|-|link|
|groupEntries|-|link|

### **EntityEvents 事件** {#server_entityevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|afterHurt|-|link|
|spawned|-|link|
|drops|-|link|
|saved|-|link|
|checkSpawn|-|link|
|death|-|link|
|beforeHurt|-|link|

### **BlockEvents 事件** {#server_blockevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|broken|-|link|
|placed|-|link|
|leftClicked|-|link|
|randomTick|-|link|
|rightClicked|-|link|
|startedFalling|-|link|
|detectorPowered|-|link|
|farmlandTrampled|-|link|
|stoppedFalling|-|link|
|drops|-|link|
|detectorUnpowered|-|link|
|detectorChanged|-|link|
|blockEntityTick|-|link|

### **PlayerEvents 事件** {#server_playerevent}

|子事件|描述|相关链接|
|:-:|:-:|:-:|
|chestOpened|-|link|
|loggedOut|-|link|
|tick|-|link|
|stageRemoved|-|link|
|respawned|-|link|
|decorateChat|-|link|
|cloned|-|link|
|stageAdded|-|link|
|advancement|-|link|
|chat|-|link|
|chestClosed|-|link|
|loggedInd|-|link|
|inventoryClosed|-|link|
|inventoryChanged|-|link|
|inventoryOpened|-|link|
