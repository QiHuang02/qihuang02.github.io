import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    dir: 'minecraft/misc',
    link: '/notes/minecraft/misc',
    sidebar: [
        {
            text: '我的世界小知识',
            icon: 'https://zh.minecraft.wiki/images/Wiki.png?21467',
            items: [
                '前言',
                'Namespace',
                'Item',
                'DataComponents',
                'Ingredient',
                'Blockbench'
            ]
        }
    ]
})