import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    dir: 'minecraft/misc',
    link: '/notes/minecraft/misc',
    sidebar: [
        {
            text: '我的世界小知识',
            icon: 'https://zh.minecraft.wiki/images/Wiki.png?21467',
            items: [ //A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                '前言',
                'Attribute',
                'Blockbench',
                'DataComponents',
                'Resource_location',
                'Ingredient',
                'Item',
            ]
        }
    ]
})