import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    dir: 'minecraft',
    link: '/notes/minecraft',
    sidebar: [
        {
            text: 'Minecraft',
            icon: 'https://zh.minecraft.wiki/images/Wiki.png?21467',
            items: [
                '前言',
                {
                    prefix: 'kubejs',
                    text: 'KubeJS',
                    link: '/notes/minecraft/kubejs/'
                },
                {
                    prefix: 'misc',
                    text: 'Minecraft Misc',
                    link: '/notes/minecraft/misc/'
                }
            ]
        }
    ]
})